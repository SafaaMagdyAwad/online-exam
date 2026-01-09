import {
  getExamReportService,
  getExamStatsService
} from "../services/ReportService.mjs";

/**
 * @desc Get exam report
 * @route GET /api/teacher/reports/:examId
 */
export const getExamReport = async (req, res) => {
  try {
    const attempts = await getExamReportService(
      req.user.id,
      req.params.examId,
      req.query
    );

    res.json({
      count: attempts.length,
      results: attempts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to load report"
    });
  }
};

/**
 * @desc Get exam statistics
 * @route GET /api/teacher/reports/:examId/stats
 */
export const getExamStats = async (req, res) => {
  try {
    const stats = await getExamStatsService(
      req.user.id,
      req.params.examId
    );

    res.json({ stats });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load stats"
    });
  }
};
