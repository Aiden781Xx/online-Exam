import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "student") {
      const student = await Student.findById(decoded.id);
      if (!student)
        return res.status(401).json({ success: false, error: "Invalid token" });
      req.user = {
        id: student._id,
        ...student.toObject(),
        role: "student",
      };
    } else {
      const teacher = await Teacher.findById(decoded.id);
      if (!teacher)
        return res.status(401).json({ success: false, error: "Invalid token" });
      req.user = {
        id: teacher._id,
        ...teacher.toObject(),
        role: decoded.role,
      };
    }
    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, error: "Invalid or expired token" });
  }
};
