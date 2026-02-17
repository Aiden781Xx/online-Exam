import Exam from "../models/examModel.js";
import Result from "../models/resultModel.js";

export const createExam = async (req, res) => {
  try {
    console.log('createExam called - content-type:', req.headers['content-type']);
    console.log('createExam - raw body:', req.body);
    const body = req.body && Object.keys(req.body).length ? req.body : (req.rawBody ? JSON.parse(req.rawBody || '{}') : {});
    const {
      examName,
      title,
      subject,
      class: examClass,
      section,
      examDate,
      duration,
      totalMarks,
      questions,
      isActive,
    } = body;
    
    // Accept both 'examName' and 'title' for backward compatibility
    const finalExamName = examName || title;
    
    // Validate required fields
    if (!finalExamName) {
      return res.status(400).json({ success: false, error: "Exam title is required" });
    }
    if (!subject || !examClass || duration === undefined || !totalMarks) {
      return res.status(400).json({ success: false, error: "Missing required exam fields: subject, class, duration, totalMarks" });
    }
    
    const exam = await Exam.create({
      examName: finalExamName,
      subject,
      class: examClass,
      section: section || null,
      examDate: examDate ? new Date(examDate) : new Date(),
      duration: Number(duration),
      totalMarks: Number(totalMarks),
      questions: Array.isArray(questions) ? questions : [],
      isActive: typeof isActive === 'boolean' ? isActive : true,
      createdBy: req.user.id,
    });
    res.status(201).json({ success: true, exam });
  } catch (err) {
    console.error('Exam creation error:', err);
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
    // normalize class/section to strings so mismatched types (number vs string)
    // don't prevent matches. Treat exam.section falsy as "all sections".
    const studentClass = String(student.class || "");
    const studentSection = student.section == null ? null : String(student.section);

    const examsAll = await Exam.find({ class: studentClass })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    const exams = examsAll.filter((exam) => {
      // if exam.section is falsy (null/''/undefined), treat it as available to all sections
      if (!exam.section) return true;
      return String(exam.section) === studentSection;
    });
    const results = await Result.find({ student: student.id }).select(
      "exam"
    );
    const submittedExamIds = results.map((r) => (r.exam ? r.exam.toString() : null)).filter(Boolean);
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
    await Result.deleteMany({ exam: exam._id });
    res.json({ success: true, message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
