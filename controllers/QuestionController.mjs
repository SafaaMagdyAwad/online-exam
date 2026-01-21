import e from "express";
import {
  addQuestionService,
  updateQuestionService,
  deleteQuestionService,
  getQuestionsService
} from "../services/QuestionService.mjs";

/**
 * @desc Add question
 * @route POST /api/teacher/exams/:examId/questions
 */
export const addQuestion = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const examId = req.params.examId;
    const questionData = req.body;
console.log(teacherId,",",examId,",",questionData);

    const question = await addQuestionService(teacherId, examId, questionData);
    res.status(201).json({
      message: "Question added successfully",
      question
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc Update question
 * @route PUT /api/teacher/exams/:examId/questions/:questionId
 */
export const updateQuestion = async (req, res) => {
  try {
    const question = await updateQuestionService(
      req.user.id,
      req.params.examId,
      req.params.questionId,
      req.body
    );

    res.json({
      message: "Question updated successfully",
      question
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc Delete question
 * @route DELETE /api/teacher/exams/:examId/questions/:questionId
 */
export const deleteQuestion = async (req, res) => {
  try {
    await deleteQuestionService(
      req.user.id,
      req.params.examId,
      req.params.questionId
    );

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc Get exam questions
 * @route GET /api/teacher/exams/:examId/questions
 */
export const getQuestions = async (req, res) => {
  try {
    const questions = await getQuestionsService(
      req.user.id,
      req.params.examId
    );

    res.json({ questions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
