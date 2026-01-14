import StudentAttempt from "../models/StudentAttempt.js";
import mongoose from "mongoose";

/**
 * Get exam report with filters
 */
export const getExamReportService = async (
  teacherId,
  examId,
  filters,
  page = 1,
  limit = 5
) => {
  const query = {
    teacherId,
    examId
  };

  // 🔍 البحث باسم الطالب
  if (filters.name) {
    query.studentName = {
      $regex: filters.name,
      $options: "i"
    };
  }

  // 🎯 نطاق الدرجات
  if (filters.minScore || filters.maxScore) {
    query.score = {};
    if (filters.minScore) query.score.$gte = Number(filters.minScore);
    if (filters.maxScore) query.score.$lte = Number(filters.maxScore);
  }

  // 📅 نطاق التاريخ
  if (filters.from || filters.to) {
    query.createdAt = {};
    if (filters.from) query.createdAt.$gte = new Date(filters.from);
    if (filters.to) query.createdAt.$lte = new Date(filters.to);
  }

  const totalCount = await StudentAttempt.countDocuments(query); // إجمالي عدد النتائج

  const attempts = await StudentAttempt.find(query)
    .select("studentName score startedAt finishedAt")
    .sort({ score: -1 })
    .skip((page - 1) * limit) // تخطي الصفوف حسب الصفحة
    .limit(limit);            // عدد الصفوف لكل صفحة

  return { attempts, totalCount };
};


/**
 * Get exam statistics
 */
export const getExamStatsService = async (
  teacherId,
  examId
) => {
  const stats = await StudentAttempt.aggregate([
    {
      $match: {
        teacherId: new mongoose.Types.ObjectId(teacherId),
        examId: new mongoose.Types.ObjectId(examId)
      }
    },
    {
      $group: {
        _id: null,
        avgScore: { $avg: "$score" },
        maxScore: { $max: "$score" },
        minScore: { $min: "$score" },
        totalStudents: { $sum: 1 }
      }
    }
  ]);

  return stats[0] || {
    avgScore: 0,
    maxScore: 0,
    minScore: 0,
    totalStudents: 0
  };
};
