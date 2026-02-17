import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { applySecurity } from "./middleware/securityMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import Exam from "./models/examModel.js";

dotenv.config();
connectDB();

// apply security headers and rate limiting
const app = express();
// apply security headers and rate limiting
applySecurity(app);

app.use(cors());
// Restrict CORS origin via env var if provided
const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin }));
// parse JSON and keep a raw copy for debugging (without consuming the stream)
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf && buf.toString(); } }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// debug: log incoming exam creation requests to diagnose body parsing issues
app.use((req, res, next) => {
  if (req.path && req.path.startsWith('/api/exams') && req.method === 'POST') {
    console.log('[debug] Incoming POST', req.path, 'headers:', req.headers['content-type']);
    // req.rawBody is already available after express.json verify
    console.log('[debug] rawBody:', req.rawBody ? req.rawBody.slice(0, 500) : '<empty>');
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

// Temporary fallback endpoint to create exam directly (safe-parsing)
app.post('/api/exams/create2', async (req, res) => {
  try {
    const body = req.body || {};
    const examName = body.examName || body.title;
    if (!examName || !body.subject || !body.class || !body.duration || !body.totalMarks) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    const exam = await Exam.create({
      examName,
      subject: body.subject,
      class: body.class,
      section: body.section || null,
      examDate: body.examDate ? new Date(body.examDate) : new Date(),
      duration: Number(body.duration),
      totalMarks: Number(body.totalMarks),
      questions: Array.isArray(body.questions) ? body.questions : [],
      isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
      createdBy: null,
    });
    res.status(201).json({ success: true, exam });
  } catch (err) {
    console.error('create2 error', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Online Exam Backend Running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Online Exam System API is running" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
