# 🚀 Online Exam System - Quick Reference

## 📱 Services Status

| Service | URL | Status | Port |
|---------|-----|--------|------|
| Backend API | http://localhost:8000 | ✅ Running | 8000 |
| Student App | http://localhost:5173 | ✅ Running | 5173 |
| Teacher Portal | http://localhost:5174 | ✅ Running | 5174 |
| MongoDB | Online (Atlas) | ✅ Connected | - |

---

## 👥 Account Credentials

### Student
```
No credentials needed!
Just provide: Name, Father Name, Class, Section, Roll No
```

### Teacher
```
Username: teacher
Password: teacher123
```

### Alternative Teacher
```
Username: testshivamUser
Password: testshivam123
```

### Principal
```
Username: principal
Password: principal123
```

---

## 🎯 Main URLs

**Student**: http://localhost:5173
**Teacher Login**: http://localhost:5174/teacher-login
**Principal Login**: http://localhost:5174/principal-login
**API Health**: http://localhost:8000/api/health

---

## 📂 Project Structure

```
online-Exam/
├── server/                    # Node.js Backend
│   ├── app.js                # Main Express app
│   ├── seed.js               # Initialize data
│   ├── models/               # Database schemas
│   ├── controllers/          # Business logic
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth & validation
│   ├── utils/                # Helpers (Excel, upload)
│   ├── config/               # DB & Cloudinary config
│   └── .env                  # Environment variables
│
├── students/                 # React Student App
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── api/              # API calls
│   │   ├── App.jsx           # Main app
│   │   └── main.jsx          # Entry point
│   └── vite.config.js        # Vite config
│
└── Teacher/                  # React Teacher App
    ├── src/
    │   ├── components/       # UI components
    │   ├── api/              # API calls
    │   ├── App.jsx           # Main app
    │   └── main.jsx          # Entry point
    └── vite.config.js        # Vite config
```

---

## 🔧 Command Reference

### Start Services

**Backend**:
```bash
cd online-Exam/server
npm install          # First time only
npm start           # Start on port 8000
```

**Student Frontend**:
```bash
cd online-Exam/students
npm install         # First time only
npm run dev         # Start on port 5173
```

**Teacher Frontend**:
```bash
cd online-Exam/Teacher
npm install         # First time only
npm run dev         # Start on port 5174
```

### Seed Database
```bash
cd online-Exam/server
node seed.js        # Create default teacher & principal
```

---

## 🌐 REST API Quick Reference

### Authentication
```bash
# Student Login
POST /api/auth/student/login
Body: { name, fatherName, class, section, rollNo }

# Teacher Login
POST /api/auth/teacher/login
Body: { username, password }

# Principal Login
POST /api/auth/principal/login
Body: { username, password }
```

### Exams
```bash
# Get student exams
GET /api/exams/student
Headers: { Authorization: "Bearer <token>" }

# Create exam (teacher)
POST /api/exams
Body: { title, subject, class, section, duration, totalMarks }

# Get all exams
GET /api/exams

# Get specific exam
GET /api/exams/:id

# Update exam
PUT /api/exams/:id

# Delete exam
DELETE /api/exams/:id
```

### Questions
```bash
# Get exam questions
GET /api/questions/exam/:examId

# Add question
POST /api/questions
Body: { examId, questionText, options, marks }

# Update question
PUT /api/questions/:id

# Delete question
DELETE /api/questions/:id
```

### Results
```bash
# Submit exam
POST /api/results/submit
Body: { examId, answers: [{ questionId, selectedOptionIndex }] }

# Get student results
GET /api/results/student

# Get results for exam
GET /api/results/exam/:examId

# Get class results
GET /api/results/class?class=10&section=A

# Get all results (principal only)
GET /api/results

# Export Excel
GET /api/results/export/excel?examId=<id>
```

---

## 🗄️ Database Schema

### Student
```javascript
{
  _id: ObjectId,
  name: String,
  fatherName: String,
  class: String,
  section: String,
  rollNo: String,
  role: "student",
  createdAt: Date,
  updatedAt: Date
}
```

### Teacher
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String (encrypted),
  name: String,
  email: String,
  role: "teacher" | "principal",
  createdAt: Date,
  updatedAt: Date
}
```

### Exam
```javascript
{
  _id: ObjectId,
  title: String,
  subject: String,
  class: String,
  section: String,
  duration: Number (minutes),
  totalMarks: Number,
  createdBy: TeacherId (ref),
  createdAt: Date,
  updatedAt: Date
}
```

### Question
```javascript
{
  _id: ObjectId,
  examId: ExamId (ref),
  questionText: String,
  questionImage: String (optional URL),
  options: [
    { text: String, isCorrect: Boolean }
  ],
  marks: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Result
```javascript
{
  _id: ObjectId,
  studentId: StudentId (ref),
  examId: ExamId (ref),
  answers: [
    { questionId: String, selectedOptionIndex: Number }
  ],
  totalMarks: Number,
  marksObtained: Number,
  percentage: Number,
  status: "submitted" | "graded",
  submittedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚙️ Configuration Files

### .env
```env
JWT_SECRET=jasonwebtokensecret@123
PORT=8000
MONGO_URI=mongodb+srv://kdyd2940_db_user:iYniIWKFSnZLHMSD@cluster0.qbr94dc.mongodb.net/online_exam

CLOUDINARY_CLOUD_NAME=NewEraSchool
CLOUDINARY_API_KEY=589936563556422
CLOUDINARY_API_SECRET=yL0GY1H-FzZs9VwcwhLuNY4ul7k
CLOUDINARY_PROJECT_FOLDER=school_exam_system
```

### vite.config.js (Students & Teacher)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173 // or 5174 for teacher
  }
})
```

---

## 🔐 Security Features

✅ **JWT Authentication**: Secure token-based authentication
✅ **Password Hashing**: bcrypt for secure password storage
✅ **Role-Based Access Control**: Separate routes for roles
✅ **CORS Enabled**: Prevents unauthorized cross-origin requests
✅ **Cloudinary Upload**: Secure file storage
✅ **Environment Variables**: No sensitive data in code
✅ **Token Expiry**: 7-day expiration for JWT

---

## 🎯 Feature Checklist

### For Students
- [x] Simple no-password login
- [x] View available exams
- [x] MCQ interface with timer
- [x] Auto calculation of results
- [x] View past results
- [x] Cannot retake exam

### For Teachers
- [x] Create/manage exams
- [x] Add questions with images
- [x] View per-exam results
- [x] Class-wise filtering
- [x] Excel export
- [x] Edit/delete exams

### For Principal
- [x] View all results
- [x] Multi-level filtering
- [x] Master data export
- [x] Analytics dashboard

---

## 📊 Sample Test Data

### Create Exam (Teacher)
```
Title: "Mid Term Exam - Hindi"
Subject: "Hindi"
Class: "10"
Section: "A"
Duration: "30" minutes
Total Marks: "100"
```

### Add Question
```
Question: "भारत की राजधानी क्या है?"
Option 1: "नई दिल्ली" ✓ (correct)
Option 2: "मुंबई"
Option 3: "कोलकाता"
Option 4: "चेन्नई"
Marks: "1"
```

### Student Login
```
Name: "Raj Kumar"
Father Name: "Ramesh Kumar"
Class: "10"
Section: "A"
Roll No: "001"
```

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend not starting | Check port 8000 is free: `netstat -ano \| grep 8000` |
| Frontend blank page | Clear browser cache (Ctrl+Shift+Del) |
| API 404 errors | Verify backend is running and routes are mounted |
| Database connection error | Check MongoDB URI in .env |
| Image upload fails | Verify Cloudinary credentials in .env |
| Token errors | Clear localStorage and re-login |
| Port already in use | Kill process: `lsof -t -i:5173 \| xargs kill -9` |

---

## 📈 Performance Tips

- MongoDB indexes on `(class, section)` for student queries
- Redis caching for exam questions (optional)
- Lazy load components in frontend
- Cloudinary CDN for image delivery
- Gzip compression on backend

---

## 🔗 Useful Links

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary Console](https://cloudinary.com/console)
- [Express.js Docs](https://expressjs.com/)
- [React.js Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material-UI](https://mui.com/)

---

## 💬 Support Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# View all running processes
tasklist

# Kill process by port (Windows)
netstat -ano | findstr :8000

# View backend logs
tail -f server/logs.txt

# Clear npm cache
npm cache clean --force

# Reinstall modules
rm -r node_modules
npm install
```

---

**Last Updated**: February 10, 2026
**Version**: 1.0.0
**Status**: ✅ Production Ready
