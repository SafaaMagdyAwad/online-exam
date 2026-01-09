import StudentAttempt from "../models/StudentAttempt.js";
import mongoose from "mongoose";

/**
 * Get exam report with filters
 */
export const getExamReportService = async (
  teacherId,
  examId,
  filters
) => {
  const query = {
    teacherId,
    examId
  };

  // 🔍 search by student name
  if (filters.name) {
    query.studentName = {
      $regex: filters.name,
      $options: "i"
    };
  }

  // 🎯 score range
  if (filters.minScore || filters.maxScore) {
    query.score = {};
    if (filters.minScore)
      query.score.$gte = Number(filters.minScore);
    if (filters.maxScore)
      query.score.$lte = Number(filters.maxScore);
  }

  // 📅 date range
  if (filters.from || filters.to) {
    query.createdAt = {};
    if (filters.from)
      query.createdAt.$gte = new Date(filters.from);
    if (filters.to)
      query.createdAt.$lte = new Date(filters.to);
  }

  const attempts = await StudentAttempt.find(query)
    .select("studentName score startedAt finishedAt")
    .sort({ score: -1 });

  return attempts;
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
