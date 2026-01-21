import express from "express";
import {
  enterExam,
  startExamAttempt,
  resumeAttempt,
  submitExam,
  cheatReport
} from "../controllers/StudentController.mjs";

const router = express.Router();

// Student enters the exam using code
/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student exam flow
 */

/**
 * @swagger
 * /api/student/enter:
 *   post:
 *     summary: Enter exam using code
 *     tags: [Student]
 */

router.post("/enter", enterExam);

// Start exam attempt (one-time only)
/**
 * @swagger
 * /api/student/start:
 *   post:
 *     summary: Start exam
 *     tags: [Student]
 */

router.post("/start", startExamAttempt);

// Resume exam (after refresh or disconnect)
// [عشان لو الطالب رفرش الصفحه ميرجعش العداد من الاول ]
/**
 * @swagger
 * /api/student/resume:
 *   get:
 *     summary: Resume exam
 *     tags: [Student]
 */

router.get("/resume", resumeAttempt);

// Submit exam answers
/**
 * @swagger
 * /api/student/submit:
 *   post:
 *     summary: Submit exam answers
 *     tags: [Student]
 */

router.post("/submit", submitExam);
/**
 * @swagger
 * /api/student/cheat:
 *   post:
 *     summary: Report cheating activity  
 *     tags: [Student]
 */
router.post("/cheat",cheatReport);
export default router;
