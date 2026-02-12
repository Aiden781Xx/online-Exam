import Result from "../models/Result.js";
import Question from "../models/Question.js";
import { exportResultsToExcel } from "../utils/generateExcel.js";

export const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const studentId = req.user.id;
    if (!examId || !answers || !Array.isArray(answers)) {
      return res
        .status(400)
        .json({ success: false, error: "examId and answers array required" });
    }
    const existing = await Result.findOne({ studentId, examId });
    if (existing)
      return res
        .status(400)
        .json({ success: false, error: "Already submitted this exam" });
    const questions = await Question.find({ examId });
    const questionMap = {};
    questions.forEach((q) => {
      questionMap[q._id.toString()] = q;
    });
    let marksObtained = 0;
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    answers.forEach((ans) => {
      const q = questionMap[ans.questionId];
      if (!q) return;
      const selected = q.options[ans.selectedOptionIndex];
      if (selected && selected.isCorrect) marksObtained += q.marks;
    });
    const percentage =
      totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;
    const result = await Result.create({
      studentId,
      examId,
      answers,
      totalMarks,
      marksObtained,
      percentage,
      status: "graded",
    });
    res.status(201).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getStudentResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user.id })
      .populate("examId", "title subject class section totalMarks duration")
      .sort({ submittedAt: -1 });
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getResultsByExam = async (req, res) => {
  try {
    const results = await Result.find({ examId: req.params.examId })
      .populate("studentId", "name fatherName class section rollNo")
      .sort({ marksObtained: -1 });
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getResultsByClass = async (req, res) => {
  try {
    const {
      class: classFilter,
      section,
      examId,
    } = req.query;
    let query = {};
    if (examId) query.examId = examId;
    let results = await Result.find(query)
      .populate("studentId", "name fatherName class section rollNo")
      .populate("examId", "title subject")
      .sort({ submittedAt: -1 });
    if (classFilter)
      results = results.filter(
        (r) => r.studentId && r.studentId.class === classFilter
      );
    if (section)
      results = results.filter(
        (r) => r.studentId && r.studentId.section === section
      );
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("studentId", "name fatherName class section rollNo")
      .populate("examId", "title subject")
      .sort({ submittedAt: -1 });
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const exportToExcel = async (req, res) => {
  try {
    const { examId } = req.query;
    let results;
    if (examId) {
      results = await Result.find({ examId })
        .populate("studentId", "name fatherName class section rollNo")
        .populate("examId", "title subject totalMarks");
    } else {
      results = await Result.find()
        .populate("studentId", "name fatherName class section rollNo")
        .populate("examId", "title subject totalMarks");
    }
    const buffer = await exportResultsToExcel(results);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=results-${Date.now()}.xlsx`
    );
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
