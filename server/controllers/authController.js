import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

const generateToken = (payload, role) => {
  return jwt.sign(
    { id: payload._id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const studentLogin = async (req, res) => {
  try {
    const {
      name,
      fatherName,
      class: studentClass,
      section,
      rollNo,
    } = req.body;
    if (!name || !fatherName || !studentClass || !section || !rollNo) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    let student = await Student.findOne({
      class: studentClass,
      section,
      rollNo,
    });
    if (!student) {
      student = await Student.create({
        name,
        fatherName,
        class: studentClass,
        section,
        rollNo,
      });
    } else {
      if (student.name !== name || student.fatherName !== fatherName) {
        return res
          .status(401)
          .json({
            success: false,
            error: "Name or Father name does not match records",
          });
      }
    }
    const token = generateToken(student, "student");
    res.json({
      success: true,
      token,
      user: {
        id: student._id,
        name: student.name,
        role: "student",
        class: student.class,
        section: student.section,
        rollNo: student.rollNo,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const teacherLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Username and password required" });
    }
    const teacher = await Teacher.findOne({ username, role: "teacher" });
    if (!teacher)
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    const match = await teacher.comparePassword(password);
    if (!match)
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    const token = generateToken(teacher, "teacher");
    res.json({
      success: true,
      token,
      user: {
        id: teacher._id,
        name: teacher.name,
        role: "teacher",
        username: teacher.username,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const principalLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Username and password required" });
    }
    const principal = await Teacher.findOne({
      username,
      role: "principal",
    });
    if (!principal)
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    const match = await principal.comparePassword(password);
    if (!match)
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    const token = generateToken(principal, "principal");
    res.json({
      success: true,
      token,
      user: {
        id: principal._id,
        name: principal.name,
        role: "principal",
        username: principal.username,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
