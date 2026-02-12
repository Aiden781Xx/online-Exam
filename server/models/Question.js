import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    questionText: { type: String, required: true },
    questionImage: { type: String, default: null },
    options: [optionSchema],
    marks: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
