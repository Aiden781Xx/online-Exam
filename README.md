# 📚 Online Exam System

> A complete school-based Online Examination Platform with Role-Based Access Control (Student, Teacher, Principal)

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node](https://img.shields.io/badge/Node.js-v18+-blue)
![React](https://img.shields.io/badge/React-v19+-blue)
![Database](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Live Services

| Service | URL | Status |
|---------|-----|--------|
| Backend API | http://localhost:8000 | ✅ Running |
| Student Portal | http://localhost:5173 | ✅ Running |
| Teacher Portal | http://localhost:5174 | ✅ Running |

## 🎯 Key Features

### 👨‍🎓 Student Portal
- **Simple Login**: No password needed! Just provide name, class, section, roll no
- **Browse Exams**: See all exams available for their class/section
- **Take Exams**: MCQ-based interface with timer and question navigation
- **View Results**: Check marks, percentage, and submission dates
- **Auto-Grading**: Instant result calculation after submission

### 👨‍🏫 Teacher Portal  
- **Create Exams**: Define exam details with custom duration and total marks
- **Manage Questions**: Add MCQ questions with image support
- **View Results**: See student performance and analytics
- **Export**: Download results as professional Excel files
- **Edit/Delete**: Manage exams as needed

### 🔐 Principal Dashboard
- **View All Results**: Access results from all classes and exams
- **Advanced Filtering**: Filter by class, section, exam, or subject
- **Master Reports**: Export comprehensive institution-wide data
- **Analytics**: View performance trends and statistics

---

## 📝 Table of Contents

- [Features](#-key-features)
- [Technologies](#-technology-stack)
- [Setup](#-quick-setup)
- [Demo Accounts](#-demo-accounts)
- [Workflow](#-complete-workflow)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database](#-database-schemas)
- [Deployment](#-deployment-guide)
- [Troubleshooting](#-troubleshooting)
- [Documentation](#-documentation-files)

---

## 🚀 Quick Setup (5 minutes)

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB (Cloud/Local)
- Modern Browser

### Installation

**1. Clone/Navigate to project:**
```bash
cd online-Exam
```

**2. Start Backend:**
```bash
cd server
npm install
npm start
# Runs on http://localhost:8000
```

**3. Start Student App:**
```bash
cd students
npm install
npm run dev
# Runs on http://localhost:5173
```

**4. Start Teacher App:**
```bash
cd Teacher
npm install
npm run dev
# Runs on http://localhost:5174
```

**All running! Open URLs above in your browser.**

---

## 👥 Demo Accounts

### Student Login
```
No password needed!
Just enter: Name, Father Name, Class (10), Section (A), Roll No (001)
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

## 📊 Technology Stack

### Backend
```
✅ Node.js + Express.js
✅ MongoDB (Mongoose ODM)
✅ JWT Authentication
✅ Cloudinary (File Storage)
✅ ExcelJS (Report Generation)
✅ Bcrypt (Password Hashing)
```

### Frontend
```
✅ React 19 + Vite
✅ React Router DOM
✅ Axios (HTTP Client)
✅ Tailwind CSS
✅ Material-UI Components
✅ React Icons
```

---

## 📂 Directory Structure

```
online-Exam/
├── server/                    # Node.js Backend
│   ├── models/               # MongoDB schemas
│   ├── controllers/          # Business logic
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth & validation
│   ├── utils/                # Helpers
│   ├── config/               # Database config
│   ├── app.js               # Express app
│   ├── seed.js              # Initialize data
│   └── .env                 # Environment variables
│
├── students/                 # React Student App
│   └── src/components/      # UI components
│
├── Teacher/                  # React Teacher App
│   └── src/components/      # UI components
│
└── 📄 Documentation Files
    ├── README.md            # This file
    ├── SETUP_GUIDE.md       # Detailed setup
    ├── TESTING_GUIDE.md     # Test procedures
    └── QUICK_REFERENCE.md   # Developer reference
```

---

## 🌐 API Endpoints

### Auth
```bash
POST /api/auth/student/login       # Student login/register
POST /api/auth/teacher/login       # Teacher login
POST /api/auth/principal/login     # Principal login
```

### Exams
```bash
GET  /api/exams/student            # Get student exams
GET  /api/exams                    # Get all exams
POST /api/exams                    # Create exam
GET  /api/exams/:id                # Get exam details
PUT  /api/exams/:id                # Update exam
DELETE /api/exams/:id              # Delete exam
```

### Questions
```bash
GET  /api/questions/exam/:id       # Get questions
POST /api/questions                # Add question
PUT  /api/questions/:id            # Update
DELETE /api/questions/:id          # Delete
```

### Results
```bash
POST /api/results/submit           # Submit exam
GET  /api/results/student          # My results
GET  /api/results/exam/:id         # Exam results
GET  /api/results/export/excel     # Export Excel
```

---

## 🗄️ Database Schemas

**Student**
```javascript
{ name, fatherName, class, section, rollNo, role: "student" }
```

**Teacher**
```javascript
{ username, password (encrypted), name, email, role: "teacher"|"principal" }
```

**Exam**
```javascript
{ title, subject, class, section, duration, totalMarks, createdBy }
```

**Question**
```javascript
{ examId, questionText, options: [{text, isCorrect}], marks }
```

**Result**
```javascript
{ studentId, examId, answers, totalMarks, marksObtained, percentage }
```

---

## 🔐 Security Features

✅ JWT Authentication (7-day expiry)
✅ Password Hashing (Bcrypt)
✅ Role-Based Access Control
✅ CORS Protection
✅ Environment Variables
✅ Input Validation
✅ Error Handling

---

## 📖 Documentation Files

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing checklist
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Developer reference

---

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables
# Deploy Node.js app
```

### Frontend (Vercel/Netlify)
```bash
cd students && npm run build  # Build student app
cd ../Teacher && npm run build # Build teacher app
# Deploy dist/ folders
```

---

## 🆘 Troubleshooting

| Issue | Fix |
|-------|-----|
| MongoDB error | Check MONGO_URI in .env |
| API 404 | Verify backend on port 8000 |
| Blank page | Clear browser cache |
| Image upload fails | Check Cloudinary keys |
| Can't create exam | Ensure teacher is logged in |

---

## 📞 Support

- **Setup Issues**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Testing Help**: See [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- **API Reference**: See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## 📄 Environment Variables

```env
JWT_SECRET=jasonwebtokensecret@123
PORT=8000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/online_exam
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_PROJECT_FOLDER=school_exam_system
```

---

## 🎓 Use Cases

✅ School Examinations
✅ Competitive Exam Practice
✅ Online Assessments
✅ Certifications
✅ Quizzes & Tests

---

## 📝 License

MIT License - See LICENSE file

---

## ⭐ Features Highlight

- ⚡ Real-Time Result Calculation
- 📱 Responsive Design (Mobile/Tablet/Desktop)
- 🔒 Secure JWT Authentication
- 📊 Advanced Analytics & Reporting
- 🖼️ Image Support in Questions
- 📈 Scalable Architecture
- 🌍 Cloud-Ready Deployment

---

**Version**: 1.0.0 | **Status**: ✅ Production Ready | **Last Updated**: Feb 10, 2026

👉 **Get Started**: Read [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. **Student portal:** `cd students` → `npm install` → `npm run dev`. Set `VITE_API_URL=http://localhost:8000/api` in `.env` if needed.
3. **Teacher portal:** `cd Teacher` → `npm install` → `npm run dev`. Set `VITE_API_URL=http://localhost:8000/api` in `.env` if needed.

Default logins (after `node seed.js` in server): Teacher `teacher` / `teacher123`, Principal `principal` / `principal123`, Test user `testshivamUser` / `testshivam123`. Students log in with Name, Father Name, Class, Section, Roll No.

## 🚀 Deploying your own bot <a name = "deployment"></a>

To see an example project on how to deploy your bot, please see my own configuration:

- **Heroku**: https://github.com/kylelobo/Reddit-Bot#deploying_the_bot

## ⛏️ Built Using <a name = "built_using"></a>

- [PRAW](https://praw.readthedocs.io/en/latest/) - Python Reddit API Wrapper
- [Heroku](https://www.heroku.com/) - SaaS hosting platform

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
