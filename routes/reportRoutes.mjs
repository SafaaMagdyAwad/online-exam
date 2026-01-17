import express from "express";
import {
  getExamReport,
  getExamStats
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

export default router;
