import Exam from "../models/ExamModel.js";
import ExamAccess from "../models/ExamAccessCodeModel.js";
import StudentAttempt from "../models/StudentAttempt.js";

/**
 * Enter exam by code
 * Returns exam info and teacherId
 */
export const enterExamService = async (code) => {
  const access = await ExamAccess.findOne({
    code,
    active: true
  });

  if (!access) throw new Error("Invalid or inactive exam code");

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
 * Returns attemptId + exam duration for frontend timer
 */
export const startExamAttemptService = async (studentName, examId, teacherId, code) => {
  const exists = await StudentAttempt.findOne({
    studentName,
    examId,
    code
  });

  if (exists) {
    throw new Error("You already attempted this exam");
  }

  const attempt = await StudentAttempt.create({
    studentName,
    examId,
    teacherId,
    code,
    startedAt: new Date()
  });

  const exam = await Exam.findById(examId);

  return {
    attemptId: attempt._id,
    duration: exam.duration // بالدقائق
  };
};

/**
 * Resume attempt (calculate remaining time)
 */
export const resumeAttemptService = async (attemptId) => {
  const attempt = await StudentAttempt.findById(attemptId);
  if (!attempt) throw new Error("Attempt not found");

  const exam = await Exam.findById(attempt.examId);
  if (!exam) throw new Error("Exam not found");

  if (attempt.finishedAt) {
    return { message: "Exam already submitted", finished: true };
  }

  const elapsedTime = Date.now() - attempt.startedAt.getTime();
  const totalTime = exam.duration * 60 * 1000;
  const remainingTime = totalTime - elapsedTime;

  if (remainingTime <= 0) {
    attempt.finishedAt = new Date();
    await attempt.save();
    return { message: "Time's up!", finished: true };
  }

  return {
    attemptId: attempt._id,
    remainingTime: Math.floor(remainingTime / 1000), // ثواني للfrontend
    exam: exam.questions
  };
};

/**
 * Submit exam
 */
export const submitExamService = async (attemptId, answers) => {
  const attempt = await StudentAttempt.findById(attemptId);
  if (!attempt) throw new Error("Attempt not found");

  if (attempt.finishedAt) throw new Error("Exam already submitted");

  const exam = await Exam.findById(attempt.examId);
  if (!exam) throw new Error("Exam not found");

  const questionScore = exam.totalMarks / exam.questions.length;
  let score = 0;

  exam.questions.forEach((q, index) => {
    const userAnswer = answers.find(a => a.questionIndex === index);
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
