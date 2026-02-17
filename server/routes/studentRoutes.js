import express from "express";
import { protectStudent } from "../middleware/studentAuthMiddleware.js";
import { studentLogin, getExamQuestions, submitExam, getAvailableExams } from "../controllers/studentController.js";
import { validateBody } from "../middleware/validationMiddleware.js";
import { submitExamSchema } from "../validators/examValidators.js";

const router = express.Router();

router.post("/login", studentLogin);

// List active exams for the authenticated student's class
router.get("/exams", protectStudent, getAvailableExams);

// Get questions for a specific exam (student view) - requires student auth
router.get("/exam/:examId/questions", protectStudent, getExamQuestions);

// Submit exam - student only
router.post("/submit-exam", protectStudent, validateBody(submitExamSchema), submitExam);

export default router;
