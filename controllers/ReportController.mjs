import {
  getExamReportService,
  getExamStatsService,
  getHardestQuestionsService
} from "../services/ReportService.mjs";

/**
 * @desc Get exam report
 * @route GET /api/teacher/reports/:examId
 */
export const getExamReport = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const { attempts, totalCount } = await getExamReportService(
      req.user.id,
      req.params.examId,
      req.query,
      page,
      limit
    );

    res.json({
      count: totalCount, // إجمالي عدد الطلاب
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


export const getHardestQuestions = async (req, res) => {
  try {
    const { examId } = req.params;

    const stats = await getHardestQuestionsService(examId);

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load hardest questions"
    });
  }
};



