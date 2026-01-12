import express from "express";
import {
  createExam,
  generateExamCode,
  getMyExams,
  getExamById,
  updateExamById,
  updateExamVById,
  deleteExam
} from "../controllers/ExamController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";

const router = express.Router();

router.use(authTeacher);

// Create exam
router.post("/", createExam);

// Get teacher exams
router.get("/", getMyExams);

//get exam by id
router.get("/:examId", getExamById);

//update exam by id
router.put("/:examId", updateExamById);

//update exam visibility
router.get("/:examId/active", updateExamVById);
// Generate access code
router.post("/:examId/code", generateExamCode);

//delete exam
router.delete("/:examId", deleteExam);
export default router;
