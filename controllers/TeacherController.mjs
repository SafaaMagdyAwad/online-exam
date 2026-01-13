import TeacherModel from "../models/TeacherModel.js";
import { addStudentsWithCodesService, updateTeacherService } from "../services/TeacherService.mjs";

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


export const updateTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { password, repassword } = req.body;

    // 🔐 password confirmation
    if (password) {
      if (!repassword) {
        return res.status(400).json({
          message: "repassword is required when updating password"
        });
      }

      if (password !== repassword) {
        return res.status(400).json({
          message: "password and repassword do not match"
        });
      }
    }

    // allowed fields
    const allowedUpdates = ["name", "email", "phone", "password","jopTitle"];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedTeacher = await updateTeacherService(teacherId, updates);

    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Wait for the query to finish
    const teacher = await TeacherModel.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Log the actual document
    console.log(teacher);

    // Send the teacher data to client
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

