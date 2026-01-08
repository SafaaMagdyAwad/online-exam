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

/**
 * Get exams for teacher
 */
export const getTeacherExamsService = async (teacherId) => {
  return await Exam.find({ teacherId });
};
