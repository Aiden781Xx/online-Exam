import express from "express";
import {
  studentLogin,
  teacherLogin,
  principalLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/student/login", studentLogin);
router.post("/teacher/login", teacherLogin);
router.post("/principal/login", principalLogin);

export default router;
