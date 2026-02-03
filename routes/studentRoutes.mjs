import express from "express";
import {
  enterExam,
  startExamAttempt,
  resumeAttempt,
  submitExam,
  cheatReport
} from "../controllers/StudentController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student exam flow (enter, start, resume, submit, cheat)
 */

/**
 * @swagger
 * /api/student/enter:
 *   post:
 *     summary: Enter exam using a code
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Exam access code
 *             example:
 *               code: "1a2b3c"
 *     responses:
 *       200:
 *         description: Exam info and teacher ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 examId:
 *                   type: string
 *                 teacherId:
 *                   type: string
 *                 exam:
 *                   type: object
 *               example:
 *                 examId: "64f7d7f9b8d5c2a1f0a67890"
 *                 teacherId: "64f7c7f9b8d5c2a1f0a12345"
 *                 exam:
 *                   title: "Math Exam"
 *                   duration: 60
 *                   questions:
 *                     - question: "What is 2+2?"
 *                       correctAnswer: "4"
 */

/**
 * @swagger
 * /api/student/start:
 *   post:
 *     summary: Start exam attempt (one-time)
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentName:
 *                 type: string
 *               examId:
 *                 type: string
 *               teacherId:
 *                 type: string
 *               code:
 *                 type: string
 *             example:
 *               studentName: "Sara Mohamed"
 *               examId: "64f7d7f9b8d5c2a1f0a67890"
 *               teacherId: "64f7c7f9b8d5c2a1f0a12345"
 *               code: "1a2b3c"
 *     responses:
 *       200:
 *         description: Started attempt with duration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptId:
 *                   type: string
 *                 duration:
 *                   type: number
 *               example:
 *                 attemptId: "64f8e7f9b8d5c2a1f0a99999"
 *                 duration: 60
 */

/**
 * @swagger
 * /api/student/resume:
 *   get:
 *     summary: Resume an ongoing exam attempt
 *     tags: [Student]
 *     parameters:
 *       - in: query
 *         name: attemptId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the attempt to resume
 *     responses:
 *       200:
 *         description: Remaining time and exam questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptId:
 *                   type: string
 *                 remainingTime:
 *                   type: integer
 *                   description: Remaining time in seconds
 *                 exam:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                       correctAnswer:
 *                         type: string
 *                 finished:
 *                   type: boolean
 *                 message:
 *                   type: string
 *               example:
 *                 attemptId: "64f8e7f9b8d5c2a1f0a99999"
 *                 remainingTime: 1800
 *                 exam:
 *                   - question: "What is 2+2?"
 *                     correctAnswer: "4"
 *                 finished: false
 *                 message: ""
 */

/**
 * @swagger
 * /api/student/submit:
 *   post:
 *     summary: Submit exam answers
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attemptId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionIndex:
 *                       type: integer
 *                     answer:
 *                       type: string
 *             example:
 *               attemptId: "64f8e7f9b8d5c2a1f0a99999"
 *               answers:
 *                 - questionIndex: 0
 *                   answer: "4"
 *                 - questionIndex: 1
 *                   answer: "Paris"
 *     responses:
 *       200:
 *         description: Submitted attempt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 studentName:
 *                   type: string
 *                 score:
 *                   type: number
 *                 finishedAt:
 *                   type: string
 *                   format: date-time
 *               example:
 *                 _id: "64f8e7f9b8d5c2a1f0a99999"
 *                 studentName: "Sara Mohamed"
 *                 score: 85
 *                 finishedAt: "2026-02-03T12:00:00.000Z"
 */

/**
 * @swagger
 * /api/student/cheat:
 *   post:
 *     summary: Report cheating activity
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attemptId:
 *                 type: string
 *               type:
 *                 type: string
 *                 description: Type of cheating (TAB_SWITCH, WINDOW_BLUR, DEVTOOLS)
 *             example:
 *               attemptId: "64f8e7f9b8d5c2a1f0a99999"
 *               type: "TAB_SWITCH"
 *     responses:
 *       200:
 *         description: Updated cheat score and attempt status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 cheatScore:
 *                   type: integer
 *                 status:
 *                   type: string
 *               example:
 *                 success: true
 *                 cheatScore: 2
 *                 status: "flagged"
 */

router.post("/enter", enterExam);


router.post("/start", startExamAttempt);


router.get("/resume", resumeAttempt);


router.post("/submit", submitExam);

router.post("/cheat",cheatReport);
export default router;
