import Exam from "../models/ExamModel.js";
import ExamAccess from "../models/ExamAccessCodeModel.js";
import crypto from "crypto";

/**
 * Create new exam
 */
export const createExamService = async (teacherId, examData) => {
  const exam = await Exam.create({
    ...examData,
    teacherId
  });
  return exam;
};

/**
 * Generate access code for exam
 */
export const generateExamCodeService = async (teacherId, examId) => {
  const code = crypto.randomBytes(4).toString("hex"); // 8 chars

  const accessCode = await ExamAccess.create({
    code,
    examId,
    teacherId
  });

  return accessCode;
};

export const getExamByIdService = async (examId) => {
  try {
    const exam = await Exam.findById(examId); 
    console.log(exam, "exam");
    return exam;
  } catch (error) {
    console.error("Error fetching exam:", error);
    throw error;
  }
};

/**
 * Get exams for teacher
 */
export const getTeacherExamsService = async (teacherId, skip, limit) => {
  const [exams, total] = await Promise.all([
    Exam.find({ teacherId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Exam.countDocuments({ teacherId }),
  ]);

  return { exams, total };
};
