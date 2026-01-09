import Exam from "../models/ExamModel.js";
import ExamAccess from "../models/ExamAccessCodeModel.js";
import StudentAttempt from "../models/StudentAttempt.js";

/**
 * Enter exam by code
 */
export const enterExamService = async (studentName, code) => {
  const access = await ExamAccess.findOne({
    code,
    active: true
  });

  if (!access) {
    throw new Error("Invalid or inactive exam code");
  }

  if (access.expiresAt && access.expiresAt < new Date()) {
    throw new Error("Exam code expired");
  }

  const exam = await Exam.findById(access.examId);

  if (!exam || !exam.active) {
    throw new Error("Exam not available");
  }

  return {
    exam,
    teacherId: access.teacherId,
    examId: exam._id
  };
};

/**
 * Start exam attempt (one time only)
 */
export const startExamAttemptService = async (
  studentName,
  examId,
  teacherId,
  code
) => {
  const exists = await StudentAttempt.findOne({
    studentName,
    examId,
    code
  });

  if (exists) {
    throw new Error("You already attempted this exam");
  }

  return await StudentAttempt.create({
    studentName,
    examId,
    teacherId,
    code,
    startedAt: new Date()
  });
};

/**
 * Submit exam
 */
export const submitExamService = async (
  attemptId,
  answers
) => {
  const attempt = await StudentAttempt.findById(attemptId);
  if (!attempt) throw new Error("Attempt not found");

  if (attempt.finishedAt) {
    throw new Error("Exam already submitted");
  }

  const exam = await Exam.findById(attempt.examId);
  console.log("exam from service",exam);
  
  if (!exam) throw new Error("Exam not found");
const questionScore=exam.totalMarks / exam.questions.length;
  let score = 0;

  exam.questions.forEach((q, index) => {
    const userAnswer = answers.find(
      (a) => a.questionIndex === index
    );
    if (userAnswer && userAnswer.answer === q.correctAnswer) {
      score += questionScore;
    }
  });

  attempt.answers = answers;
  attempt.score = score;
  attempt.finishedAt = new Date();

  await attempt.save();
  return attempt;
};
