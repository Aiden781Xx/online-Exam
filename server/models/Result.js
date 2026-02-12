import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedOptionIndex: { type: Number, required: true },
});

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    answers: [answerSchema],
    totalMarks: { type: Number, required: true },
    marksObtained: { type: Number, required: true },
    percentage: { type: Number, required: true },
    status: {
      type: String,
      enum: ["submitted", "graded"],
      default: "submitted",
    },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

resultSchema.index({ studentId: 1, examId: 1 }, { unique: true });

export default mongoose.model("Result", resultSchema);
