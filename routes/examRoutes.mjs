import express from "express";
import {
  createExam,
  generateExamCode,
  getMyExams
} from "../controllers/ExamController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";

const router = express.Router();

router.use(authTeacher);

// Create exam
router.post("/", createExam);

// Get teacher exams
router.get("/", getMyExams);

// Generate access code
router.post("/:examId/code", generateExamCode);

export default router;
