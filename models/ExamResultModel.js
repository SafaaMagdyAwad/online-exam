import mongoose from "mongoose";
const ExamResultSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
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
        score: {
            type: Number,
            required: true
        },
        startedAt: {
            type: Date,
            required: true,
        },
        completedAt: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("ExamResult", ExamResultSchema);