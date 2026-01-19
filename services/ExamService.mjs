import Exam from "../models/ExamModel.js";
import ExamAccess from "../models/ExamAccessCodeModel.js";
import crypto from "crypto";
import mongoose from "mongoose";

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
    // 1. Validate if examId exists/is valid before querying
    if (!examId) {
      throw new Error("No Exam ID provided");
    }

    // 2. findById is the shorthand for findOne({ _id: id })
    const exam = await Exam.findById(examId.toString().trim()); //null

    if (!exam) {
      console.warn(`No exam found with ID: ${examId}`);
    }

    return exam;
  } catch (error) {
    console.error("Error fetching exam:", error);
    throw error;
  }
};


export const toggleExamStatusService = async (examId) => {
  // Validate ID format to prevent Mongoose "CastError"
  if (!mongoose.Types.ObjectId.isValid(examId)) {
    throw new Error("Invalid Exam ID format");
  }

  // Find the exam first to see its current state
  const exam = await Exam.findById(examId);
  console.log(exam);
  
  if (!exam) return null;

  // Toggle and save
  exam.active = !exam.active;
  return await exam.save();
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
