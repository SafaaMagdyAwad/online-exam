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
    expiresAt: Date
  },
  { timestamps: true }
);


export default mongoose.model("ExamAccess", ExamAccessSchema);
