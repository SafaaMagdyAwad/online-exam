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
    totalMarks: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    instructions: {
      type: String,
      required: false
    },
    
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number // index of the correct answer
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Exam", ExamSchema);
