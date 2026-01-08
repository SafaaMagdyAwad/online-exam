import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },
    duration: {
      type: Number, // بالدقائق
      required: true
    },
    totalMarks: Number,
    active: {
      type: Boolean,
      default: true
    },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number // index
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Exam", ExamSchema);
