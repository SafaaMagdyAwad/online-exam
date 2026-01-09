import mongoose from "mongoose";

const ExamAccessSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    //can be removed if the teacher wants unlimited access
    allowedStudents: [
      {
        name: String,
        studentCode: String
      }
    ],
    expiresAt: Date
  },
  { timestamps: true }
);


export default mongoose.model("ExamAccess", ExamAccessSchema);
