//student can view the exam by adding the exam code and his name 
// student can view his marks
import {
    enterExamService,
    startExamAttemptService,
    submitExamService
} from "../services/StudentService.mjs";

/**
 * @desc Enter exam by code
 * @route POST /api/student/enter
 */
export const enterExam = async (req, res) => {
    try {
        const { studentName, code } = req.body;

        if (!studentName || !code) {
            return res.status(400).json({
                message: "Student name and code are required"
            });
        }

        const { exam, teacherId, examId } =
            await enterExamService(studentName, code);
        console.log(teacherId, "teacherId", examId, "examId");

        res.json({
            examId,
            teacherId,
            title: exam.title,
            duration: exam.duration,
            questions: exam.questions.map((q) => ({
                _id: q._id,
                question: q.question,
                options: q.options
            }))
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc Start exam attempt
 * @route POST /api/student/start
 */
export const startExam = async (req, res) => {
    try {
        const { studentName, examId, teacherId, code } = req.body;

        const attempt = await startExamAttemptService(
            studentName,
            examId,
            teacherId,
            code
        );

        res.status(201).json({
            message: "Exam started",
            attemptId: attempt._id,
            startedAt: attempt.startedAt
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc Submit exam
 * @route POST /api/student/submit
 */
export const submitExam = async (req, res) => {
    try {
        const { attemptId, answers } = req.body;
        const attempt = await submitExamService(attemptId, answers);
console.log(attempt,"att");

        res.json({
            message: "Exam submitted successfully",
            score: attempt.score
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
