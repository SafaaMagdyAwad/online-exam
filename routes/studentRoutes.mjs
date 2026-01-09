import express from "express";
import {
  enterExam,
  startExamAttempt,
  resumeAttempt,
  submitExam
} from "../controllers/StudentController.mjs";

const router = express.Router();

// Student enters the exam using code
router.post("/enter", enterExam);

// Start exam attempt (one-time only)
router.post("/start", startExamAttempt);

// Resume exam (after refresh or disconnect)
// [عشان لو الطالب رفرش الصفحه ميرجعش العداد من الاول ]
router.get("/resume", resumeAttempt);

// Submit exam answers
router.post("/submit", submitExam);

export default router;
