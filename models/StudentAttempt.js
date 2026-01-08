import mongoose from "mongoose";

const StudentAttemptSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true
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
    code: {
      type: String,
      required: true
    },
    answers: [
      {
        questionIndex: Number,
        answer: Number
      }
    ],
    score: Number,
    startedAt: Date,
    finishedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("StudentAttempt", StudentAttemptSchema);
