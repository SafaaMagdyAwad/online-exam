import express from "express";
import {
  getExamReport,
  getExamStats,
  getHardestQuestions
} from "../controllers/ReportController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";

const router = express.Router();

router.use(authTeacher);
/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Exam reports & statistics for teachers
 */

/**
 * @swagger
 * /api/teacher/reports/{examId}:
 *   get:
 *     summary: Get full exam report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: The exam ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of results per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by student name
 *       - in: query
 *         name: minScore
 *         schema:
 *           type: number
 *         description: Minimum score filter
 *       - in: query
 *         name: maxScore
 *         schema:
 *           type: number
 *         description: Maximum score filter
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for report filter
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for report filter
 *     responses:
 *       200:
 *         description: Paginated exam report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of students
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       studentName:
 *                         type: string
 *                       score:
 *                         type: number
 *                       startedAt:
 *                         type: string
 *                         format: date-time
 *                       finishedAt:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                       cheatingLogs:
 *                         type: array
 *                         items:
 *                           type: string
 *                       cheatScore:
 *                         type: number
 */

/**
 * @swagger
 * /api/teacher/reports/{examId}/stats:
 *   get:
 *     summary: Get exam statistics
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: The exam ID
 *     responses:
 *       200:
 *         description: Exam statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   properties:
 *                     avgScore:
 *                       type: number
 *                     maxScore:
 *                       type: number
 *                     minScore:
 *                       type: number
 *                     totalStudents:
 *                       type: integer
 *               example:
 *                 stats:
 *                   avgScore: 75.5
 *                   maxScore: 100
 *                   minScore: 50
 *                   totalStudents: 20
 */

/**
 * @swagger
 * /api/teacher/reports/hardest/{examId}:
 *   get:
 *     summary: Get hardest questions in the exam
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: The exam ID
 *     responses:
 *       200:
 *         description: List of hardest questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionIndex:
 *                         type: integer
 *                       questionText:
 *                         type: string
 *                       totalAttempts:
 *                         type: integer
 *                       correctCount:
 *                         type: integer
 *                       wrongCount:
 *                         type: integer
 *                       errorPercentage:
 *                         type: number
 *                         format: float
 *               example:
 *                 success: true
 *                 stats:
 *                   - questionIndex: 2
 *                     questionText: "What is 2+2?"
 *                     totalAttempts: 20
 *                     correctCount: 5
 *                     wrongCount: 15
 *                     errorPercentage: 75.0
 *                   - questionIndex: 5
 *                     questionText: "Capital of France?"
 *                     totalAttempts: 20
 *                     correctCount: 8
 *                     wrongCount: 12
 *                     errorPercentage: 60.0
 */

router.get("/:examId", getExamReport);

router.get("/:examId/stats", getExamStats);

router.get('/hardest/:examId', getHardestQuestions);



export default router;
