import mongoose from "mongoose";
import bcrypt from "bcrypt";

const teacherSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, sparse: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["teacher", "principal"], default: "teacher" },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

teacherSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

teacherSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("Teacher", teacherSchema);
