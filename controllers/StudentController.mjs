import {
  enterExamService,
  startExamAttemptService,
  resumeAttemptService,
  submitExamService,
  reportCheatService
} from "../services/StudentService.mjs";

/**
 * Enter exam by code
 */
export const enterExam = async (req, res) => {
  try {
    const {  code } = req.body;
    const data = await enterExamService( code);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Start exam attempt
 */
export const startExamAttempt = async (req, res) => {
  try {
    const { studentName, examId, teacherId, code } = req.body;
    const data = await startExamAttemptService(studentName, examId, teacherId, code);
    res.json(data); // includes attemptId + duration
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Resume attempt (calculate remaining time)
 */
export const resumeAttempt = async (req, res) => {
  try {
    const { attemptId } = req.query;
    const data = await resumeAttemptService(attemptId);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Submit exam
 */
export const submitExam = async (req, res) => {
  try {
    const { attemptId, answers } = req.body;
    const attempt = await submitExamService(attemptId, answers);
    res.json(attempt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const cheatReport = async (req, res) => {
  try {
    const { attemptId, type } = req.body;

    const result = await reportCheatService({ attemptId, type });

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
