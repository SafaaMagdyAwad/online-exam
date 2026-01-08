import Exam from "../models/ExamModel.js";

/**
 * Add question to exam
 */
export const addQuestionService = async (teacherId, examId, questionData) => {
  const exam = await Exam.findOne({
    _id: examId,
    teacherId
  });

  if (!exam) {
    throw new Error("Exam not found or unauthorized");
  }

  exam.questions.push(questionData);
  await exam.save();

  return exam.questions[exam.questions.length - 1];
};

/**
 * Update question
 */
export const updateQuestionService = async (
  teacherId,
  examId,
  questionId,
  questionData
) => {
  const exam = await Exam.findOne({
    _id: examId,
    teacherId
  });

  if (!exam) {
    throw new Error("Exam not found or unauthorized");
  }

  const question = exam.questions.id(questionId);
  if (!question) {
    throw new Error("Question not found");
  }

  question.question = questionData.question ?? question.question;
  question.options = questionData.options ?? question.options;
  question.correctAnswer =
    questionData.correctAnswer ?? question.correctAnswer;

  await exam.save();
  return question;
};

/**
 * Delete question
 */
export const deleteQuestionService = async (
  teacherId,
  examId,
  questionId
) => {
  const exam = await Exam.findOne({
    _id: examId,
    teacherId
  });

  if (!exam) {
    throw new Error("Exam not found or unauthorized");
  }

  const question = exam.questions.id(questionId);
  if (!question) {
    throw new Error("Question not found");
  }

  question.deleteOne();
  await exam.save();

  return true;
};

/**
 * Get exam questions (teacher view)
 */
export const getQuestionsService = async (teacherId, examId) => {
  const exam = await Exam.findOne({
    _id: examId,
    teacherId
  }).select("questions");

  if (!exam) {
    throw new Error("Exam not found or unauthorized");
  }

  return exam.questions;
};
