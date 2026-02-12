import express from "express";
import {
  submitExam,
  getStudentResults,
  getResultsByExam,
  getResultsByClass,
  getAllResults,
  exportToExcel,
} from "../controllers/resultController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/submit", authenticate, authorize("student"), submitExam);
router.get("/student", authenticate, authorize("student"), getStudentResults);
router.get(
  "/exam/:examId",
  authenticate,
  authorize("teacher", "principal"),
  getResultsByExam
);
router.get(
  "/class",
  authenticate,
  authorize("teacher", "principal"),
  getResultsByClass
);
router.get("/", authenticate, authorize("principal"), getAllResults);
router.get(
  "/export/excel",
  authenticate,
  authorize("teacher", "principal"),
  exportToExcel
);

export default router;
