import Exam from "../models/Exam.js";
import Question from "../models/Question.js";
import Result from "../models/Result.js";

export const createExam = async (req, res) => {
  try {
    const {
      title,
      subject,
      class: examClass,
      section,
      duration,
      totalMarks,
    } = req.body;
    if (!title || !subject || !examClass || !section || !duration || !totalMarks) {
      return res
        .status(400)
        .json({ success: false, error: "All exam fields are required" });
    }
    const exam = await Exam.create({
      title,
      subject,
      class: examClass,
      section,
      duration: Number(duration),
      totalMarks: Number(totalMarks),
      createdBy: req.user.id,
    });
    res.status(201).json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json({ success: true, exams });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getExamsForStudent = async (req, res) => {
  try {
    const student = req.user;
    const exams = await Exam.find({
      class: student.class,
      section: student.section,
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    const results = await Result.find({ studentId: student.id }).select(
      "examId"
    );
    const submittedExamIds = results.map((r) => r.examId.toString());
    const examsWithStatus = exams.map((exam) => ({
      ...exam.toObject(),
      alreadySubmitted: submittedExamIds.includes(exam._id.toString()),
    }));
    res.json({ success: true, exams: examsWithStatus });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!exam)
      return res.status(404).json({ success: false, error: "Exam not found" });
    res.json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!exam)
      return res.status(404).json({ success: false, error: "Exam not found" });
    res.json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam)
      return res.status(404).json({ success: false, error: "Exam not found" });
    await Question.deleteMany({ examId: exam._id });
    await Result.deleteMany({ examId: exam._id });
    res.json({ success: true, message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
