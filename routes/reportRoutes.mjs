import express from "express";
import {
  getExamReport,
  getExamStats,
  getHardestQuestions
} from "../controllers/ReportController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";

const router = express.Router();

router.use(authTeacher);

// Full report with filters
/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Exam reports & stats
 */

/**
 * @swagger
 * /api/teacher/reports/{examId}:
 *   get:
 *     summary: View exam report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 */

router.get(
  "/:examId",
  getExamReport
);

// Statistics
/**
 * @swagger
 * /api/teacher/reports/{examId}/stats:
 *   get:
 *     summary: Exam statistics
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 */

router.get(
  "/:examId/stats",
  getExamStats
);

/**
 * @swagger
 * /api/teacher/reports/hardest/{examId}:
 *  get:
 *    summary: Hardest questions in the exam
 *   tags: [Reports]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *     name: examId
 *    schema:
 *     type: string
 *    required: true
 *   description: The exam ID
 *  responses:
 *   200:
 *    description: List of hardest questions
 *   content:
 *    application/json:
 *    schema:
 *    type: object
 *   properties:
 *   hardestQuestions:
 *    type: array
 *   items:
 *   type: object
 *  properties:
 * questionIndex:
 *   type: integer
 *  description: Index of the question in the exam
 * incorrectCount:
 *  type: integer
 * description: Number of incorrect attempts for this question
 *  example:
 *  hardestQuestions: [
 *   { questionIndex: 2, incorrectCount: 15 },
 *  { questionIndex: 5, incorrectCount: 12 }
 * ]
 * */
router.get('/hardest/:examId', getHardestQuestions);



export default router;
