import { addStudentsWithCodesService } from "../services/TeacherService.mjs";

/**
 * إضافة الطلاب مع كود دخول
 * الآن يعتمد على examId و teacherId
 */
export const addStudentsWithCodes = async (req, res) => {
  try {
    const teacherId = req.user._id; // من الـ middleware
    const { examId, studentNames } = req.body; // ["Ahmed", "Sara"]

    // نرسل examId و teacherId للـ service
    const students = await addStudentsWithCodesService(teacherId, examId, studentNames);
    res.json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
