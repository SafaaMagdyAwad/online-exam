import express from "express";
import {
  getExamReport,
  getExamStats
} from "../controllers/ReportController.mjs";
import authTeacher from "../middlewares/authTeacher.mjs";

const router = express.Router();

router.use(authTeacher);

// Full report with filters
router.get(
  "/:examId",
  getExamReport
);

// Statistics
router.get(
  "/:examId/stats",
  getExamStats
);

export default router;
