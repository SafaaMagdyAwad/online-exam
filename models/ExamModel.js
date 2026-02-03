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
        question: {
          type: String,
          required: [true, "Question text is required"],
          trim: true,
        },
        questionImage: {
          type: String,
          default: null,
          required: false,
        },
        options: {
          type: [String],
          required: [true, "Options are required"],
          validate: {
            validator: function (arr) {
              return arr.length >= 2; // must have at least 2 options
            },
            message: "There must be at least 2 options",
          },
        },
        correctAnswer: {
          type: Number,
          required: [true, "Correct answer index is required"],
          validate: {
            validator: function (value) {
              return this.options && value >= 0 && value < this.options.length;
            },
            message: "Correct answer must be a valid index in the options array",
          },
        },
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Exam", ExamSchema);
