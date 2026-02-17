/**
 * Creates default Teacher and Principal. Run: node seed.js
 * Requires MongoDB running and .env with MONGO_URI (or MONGODB_URI) and JWT_SECRET.
 */
import "dotenv/config";
import mongoose from "mongoose";
import Teacher from "./models/teacherModel.js";

const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/online_exam";

async function seed() {
  try {
    await mongoose.connect(uri);
    let teacher = await Teacher.findOne({ username: "teacher" });
    if (!teacher) {
      await Teacher.create({
        username: "teacher",
        email: "teacher@exam.local",
        password: "teacher123",
        role: "teacher",
        name: "Default Teacher",
      });
      console.log("Created teacher: username=teacher, password=teacher123");
    } else console.log("Teacher already exists");

    let principal = await Teacher.findOne({ username: "principal" });
    if (!principal) {
      await Teacher.create({
        username: "principal",
        email: "principal@exam.local",
        password: "principal123",
        role: "principal",
        name: "Default Principal",
      });
      console.log("Created principal: username=principal, password=principal123");
    } else console.log("Principal already exists");

    let testUser = await Teacher.findOne({ username: "testshivamUser" });
    if (!testUser) {
      await Teacher.create({
        username: "testshivamUser",
        email: "testshivam@exam.local",
        password: "testshivam123",
        role: "teacher",
        name: "Test Shivam User",
      });
      console.log("Created test user: username=testshivamUser, password=testshivam123");
    } else console.log("testshivamUser already exists");
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
