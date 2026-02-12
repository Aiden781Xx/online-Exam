import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    rollNo: { type: String, required: true },
    role: { type: String, default: "student" },
  },
  { timestamps: true }
);

studentSchema.index({ class: 1, section: 1, rollNo: 1 }, { unique: true });

export default mongoose.model("Student", studentSchema);
