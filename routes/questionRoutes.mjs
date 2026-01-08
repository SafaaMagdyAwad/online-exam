import express from "express";
import {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions
} from "../controllers/QuestionController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";

const router = express.Router();

router.use(authTeacher);

router.post(
  "/:examId",
  addQuestion
);

router.get(
  "/:examId",
  getQuestions
);

router.put(
  "/:examId/:questionId",
  updateQuestion
);

router.delete(
  "/:examId/:questionId",
  deleteQuestion
);

export default router;
