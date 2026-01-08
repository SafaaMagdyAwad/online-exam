import {
  createExamService,
  generateExamCodeService,
  getTeacherExamsService
} from "../services/ExamService.mjs";

/**
 * @desc Create new exam
 * @route POST /api/teacher/exams
 */
export const createExam = async (req, res) => {
  try {
    const exam = await createExamService(req.user.id, req.body);

    res.status(201).json({
      message: "Exam created successfully",
      exam
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Generate exam access code
 * @route POST /api/teacher/exams/:examId/code
 */
export const generateExamCode = async (req, res) => {
  try {
    const { examId } = req.params;

    const accessCode = await generateExamCodeService(
      req.user.id,
      examId
    );

    res.status(201).json({
      message: "Access code generated",
      code: accessCode.code
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get all exams for teacher
 * @route GET /api/teacher/exams
 */
export const getMyExams = async (req, res) => {
  try {
    const exams = await getTeacherExamsService(req.user.id);
    res.json({ exams });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
