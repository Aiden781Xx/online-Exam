import Question from "../models/Question.js";
import Exam from "../models/Exam.js";

export const addQuestion = async (req, res) => {
  try {
    const { examId, questionText, questionImage, options, marks } = req.body;
    if (!examId || !questionText || !options || !Array.isArray(options)) {
      return res
        .status(400)
        .json({
          success: false,
          error: "examId, questionText and options array required",
        });
    }
    const exam = await Exam.findById(examId);
    if (!exam)
      return res.status(404).json({ success: false, error: "Exam not found" });
    const question = await Question.create({
      examId,
      questionText,
      questionImage: questionImage || null,
      options: options.map((opt) => ({
        text: opt.text,
        isCorrect: !!opt.isCorrect,
      })),
      marks: marks || 1,
    });
    res.status(201).json({ success: true, question });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const addMultipleQuestions = async (req, res) => {
  try {
    const { examId, questions } = req.body;
    if (!examId || !questions || !Array.isArray(questions)) {
      return res
        .status(400)
        .json({
          success: false,
          error: "examId and questions array required",
        });
    }
    const exam = await Exam.findById(examId);
    if (!exam)
      return res.status(404).json({ success: false, error: "Exam not found" });
    const toInsert = questions.map((q) => ({
      examId,
      questionText: q.questionText,
      questionImage: q.questionImage || null,
      options: (q.options || []).map((opt) => ({
        text: opt.text,
        isCorrect: !!opt.isCorrect,
      })),
      marks: q.marks || 1,
    }));
    const inserted = await Question.insertMany(toInsert);
    res.status(201).json({ success: true, count: inserted.length, questions: inserted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getQuestionsByExam = async (req, res) => {
  try {
    const questions = await Question.find({
      examId: req.params.examId,
    }).sort({ createdAt: 1 });
    res.json({ success: true, questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!question)
      return res
        .status(404)
        .json({ success: false, error: "Question not found" });
    res.json({ success: true, question });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question)
      return res
        .status(404)
        .json({ success: false, error: "Question not found" });
    res.json({ success: true, message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
