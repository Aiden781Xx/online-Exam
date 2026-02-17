import Exam from "../models/examModel.js";

export const addQuestion = async (req, res) => {
  try {
    const { examId, questionText, image, options, correctAnswer, marks } = req.body;
    if (!examId || !questionText || !options || !Array.isArray(options)) {
      return res
        .status(400)
        .json({ success: false, error: "examId, questionText and options array required" });
    }
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ success: false, error: "Exam not found" });

    const q = {
      questionText,
      options: options.map((opt) => opt.toString()),
      correctAnswer: typeof correctAnswer === 'number' ? correctAnswer : 0,
      marks: marks || 1,
      image: image || null,
    };
    exam.questions.push(q);
    await exam.save();
    res.status(201).json({ success: true, question: q });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const addMultipleQuestions = async (req, res) => {
  try {
    const { examId, questions } = req.body;
    if (!examId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ success: false, error: "examId and questions array required" });
    }
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ success: false, error: "Exam not found" });
    const toInsert = (questions || []).map((q) => ({
      questionText: q.questionText,
      options: (q.options || []).map((opt) => opt.toString()),
      correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
      marks: q.marks || 1,
      image: q.image || null,
    }));
    exam.questions.push(...toInsert);
    await exam.save();
    res.status(201).json({ success: true, count: toInsert.length, questions: toInsert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getQuestionsByExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId).lean();
    if (!exam) return res.status(404).json({ success: false, error: "Exam not found" });
    res.json({ success: true, questions: exam.questions || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { examId, questionIndex } = req.params;
    const { questionText, options, correctAnswer, marks, image } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ success: false, error: "Exam not found" });
    if (questionIndex < 0 || questionIndex >= exam.questions.length)
      return res.status(404).json({ success: false, error: "Question not found" });
    const q = exam.questions[questionIndex];
    q.questionText = questionText || q.questionText;
    q.options = options ? options.map((o) => o.toString()) : q.options;
    q.correctAnswer = typeof correctAnswer === 'number' ? correctAnswer : q.correctAnswer;
    q.marks = typeof marks === 'number' ? marks : q.marks;
    q.image = typeof image !== 'undefined' ? image : q.image;
    await exam.save();
    res.json({ success: true, question: q });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { examId, questionIndex } = req.params;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ success: false, error: "Exam not found" });
    if (questionIndex < 0 || questionIndex >= exam.questions.length)
      return res.status(404).json({ success: false, error: "Question not found" });
    exam.questions.splice(questionIndex, 1);
    await exam.save();
    res.json({ success: true, message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
