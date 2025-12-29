import mongoose from mongoose

const userSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    standard: { type: String, required: true },
    section: { type: String, required: true },
    rollno:{type: Number, required: true},
     examDate: { type: Date, default: Date.now },
    profileImageUrl: { type: String, default: null },

},
 { timestamps: true }
);



 
module.exports = mongoose.model("User", userSchema); 
