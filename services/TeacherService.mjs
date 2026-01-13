import ExamAccess from "../models/ExamAccessCodeModel.js";
import crypto from "crypto";
import TeacherModel from "../models/TeacherModel.js";
import bcrypt from "bcryptjs";

/**
 * أضف قائمة الطلاب لامتحان معين وولّد لكل طالب كود فريد
 * الآن يعتمد على examId + teacherId
 */
export const addStudentsWithCodesService = async (teacherId, examId, studentNames) => {
  const access = await ExamAccess.findOne({ examId, teacherId });
  if (!access) throw new Error("Exam access not found for this teacher");

  studentNames.forEach(name => {
    if (!access.allowedStudents.find(s => s.name === name)) {
      const studentCode = crypto.randomBytes(3).toString("hex"); // كود 6 أحرف
      access.allowedStudents.push({ name, studentCode });
    }
  });

  await access.save();
  return access.allowedStudents; // ترجع الاسماء والكود
};


export const updateTeacherService = async (teacherId, updates) => {
  // 🔐 hash password manually
  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }

  const updatedTeacher = await TeacherModel.findByIdAndUpdate(
    teacherId,
    updates,
    { new: true, runValidators: true }
  );

  if (!updatedTeacher) {
    throw new Error("Teacher not found");
  }

  return updatedTeacher;
};

