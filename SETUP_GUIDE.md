# 📚 Online Exam System - Complete Setup & Usage Guide

## 🚀 Quick Start

Your system is already running! All three applications are live:

- **Backend API**: http://localhost:8000
- **Student App**: http://localhost:5173
- **Teacher Portal**: http://localhost:5174

---

## 👥 Role-Based Accounts

### 🎓 Student Login
Students log in **WITHOUT** a password. They provide:
- **Name**: Any name (required)
- **Father Name**: Any name (optional)
- **Class**: e.g., 10, 12 (required)
- **Section**: e.g., A, B, C (required)
- **Roll No**: Unique number (required)

**Note**: Same roll no + class automatically recognizes the student if name/father name match.

### 👨‍🏫 Teacher Login
**Default Teacher Account:**
- Username: `teacher`
- Password: `teacher123`

**Test Teacher Account:**
- Username: `testshivamUser`
- Password: `testshivam123`

### 🔐 Principal Login
**Default Principal Account:**
- Username: `principal`
- Password: `principal123`

---

## 📱 Complete Student Workflow

### 1️⃣ **Login**
- Navigate to http://localhost:5173
- Fill: Name, Father Name, Class, Section, Roll No
- Click Login → Redirected to Dashboard

### 2️⃣ **View Available Exams**
- See all exams for their class/section
- Shows exam title, subject, duration, total marks
- Green badge shows "Submitted" if already taken

### 3️⃣ **Take Exam**
- Click "Start Exam" button
- **Features**:
  - Timer shows remaining time
  - Questions with MCQ options
  - Question images supported
  - Navigate between questions (Previous/Next)
  - Review answers before submission
  - Marks per question displayed

### 4️⃣ **Submit Exam**
- Click "Submit Exam" on last question
- Exam automatically graded
- Marks calculated instantly
- Redirected to dashboard

### 5️⃣ **View Results**
- Click "My Results" button
- Shows all completed exams with:
  - Exam name & subject
  - Marks obtained / Total marks
  - Percentage
  - Submission date

### 6️⃣ **Logout**
- Click Logout → Return to login page

---

## 👨‍🏫 Complete Teacher Workflow

### 1️⃣ **Login**
- Navigate to http://localhost:5174/teacher-login
- Enter: Username & Password
- Default: `teacher` / `teacher123`
- Redirect to exam dashboard

### 2️⃣ **Create Exam**
- Click "Create Exam" / "Add Exam"
- Fill exam details:
  - **Title**: e.g., "Mid Term Hindi"
  - **Subject**: e.g., "Hindi", "Math"
  - **Class**: e.g., "10"
  - **Section**: e.g., "A"
  - **Duration**: Minutes (e.g., 30, 45, 60)
  - **Total Marks**: e.g., 100
- Click "Create & Add Questions"

### 3️⃣ **Add Questions**
- System redirects to question builder
- **Add Question Button** to create question
- For each question:
  - **Question Text**: What is the capital of India?
  - **Options**: Min 2 options
  - **Mark as Correct**: Select one correct answer (radio button)
  - **Marks**: Points per question (default: 1)
  - **Add Option Button** to add more options
- Save each question
- All questions auto-saved

### 4️⃣ **View Students Results**
- Go to "View Results" or "Class Results"
- Select exam
- Table shows:
  - Student name, father name, class, section, roll no
  - Marks obtained / Total marks
  - Percentage
  - Submission date

### 5️⃣ **Export Results to Excel**
- On results page, click "Download Excel" button
- Excel file downloaded with:
  - Student details
  - Exam name & subject
  - Marks & percentage
  - Date submitted
  - Professional formatting

### 6️⃣ **Manage Exams**
- View all created exams
- Edit exam details
- Delete exam (also deletes questions & results)
- Duplicate exam option (if available)

---

## 🔐 Complete Principal Workflow

### 1️⃣ **Login**
- Navigate to http://localhost:5174/principal-login
- Enter: Username & Password
- Default: `principal` / `principal123`
- Access principal dashboard

### 2️⃣ **View All Results**
- See results from **ALL classes**, **ALL exams**
- Shows:
  - Student details (name, father name, class, section, roll no)
  - Exam information
  - Marks & percentage
  - Submission date

### 3️⃣ **Filter Results**
- **By Class**: Filter class 10 only
- **By Section**: Filter section A only
- **By Exam**: View results for specific exam
- **By Subject**: If available
- **Combined Filters**: Class 10 + Section A + Exam X

### 4️⃣ **Statistics & Analytics**
- Top performers across all classes
- Average marks per class
- Exam difficulty analysis
- Subject-wise performance

### 5️⃣ **Export Master Report**
- Export ALL results to Excel
- Or export filtered results
- Comprehensive report with all details

---

## 🛠️ System Architecture

### Backend (Node.js + Express)
**Location**: `server/`

```
server/
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Image storage config
├── models/
│   ├── Student.js         # Student schema
│   ├── Teacher.js         # Teacher/Principal schema
│   ├── Exam.js            # Exam schema
│   ├── Question.js        # Question schema
│   └── Result.js          # Result schema
├── controllers/
│   ├── authController.js  # Login, register
│   ├── examController.js  # Exam CRUD
│   ├── questionController.js  # Question CRUD
│   └── resultController.js    # Results, export
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── examRoutes.js      # Exam endpoints
│   ├── questionRoutes.js  # Question endpoints
│   └── resultRoutes.js    # Result endpoints
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   ├── roleMiddleware.js  # Role-based access
│   ├── uploadMiddleware.js    # File upload
│   ├── studentAuthMiddleware.js
│   └── teacherAuthMiddleware.js
├── utils/
│   ├── generateExcel.js   # Excel export
│   └── uploadToCloudinary.js  # Image upload
├── app.js                 # Express app config
├── server.js              # Entry point
├── seed.js                # Default data
└── .env                   # Environment variables
```

### Frontend - Students (React + Vite)
**Location**: `students/`
- Login page
- Dashboard (list of exams)
- Exam interface with timer
- Results page

### Frontend - Teachers (React + Vite)
**Location**: `Teacher/`
- Teacher login
- Create/manage exams
- Add MCQ questions
- View student results
- Export to Excel
- Principal login/dashboard

---

## 📋 API Endpoints

### Authentication
```
POST /api/auth/student/login       # Student auto-register/login
POST /api/auth/teacher/login       # Teacher login
POST /api/auth/principal/login     # Principal login
```

### Exams
```
GET  /api/exams/student            # Get exams for student's class
GET  /api/exams                    # Get all exams (teacher/principal)
GET  /api/exams/:id                # Get specific exam
POST /api/exams                    # Create exam
PUT  /api/exams/:id                # Update exam
DELETE /api/exams/:id              # Delete exam
```

### Questions
```
GET  /api/questions/exam/:examId   # Get questions for exam
POST /api/questions                # Add single question
POST /api/questions/bulk           # Add multiple questions
PUT  /api/questions/:id            # Update question
DELETE /api/questions/:id          # Delete question
```

### Results
```
POST /api/results/submit           # Submit exam (student)
GET  /api/results/student          # Get student's results (student)
GET  /api/results/exam/:examId     # Get exam results (teacher)
GET  /api/results/class            # Get class-wise results (teacher)
GET  /api/results                  # Get all results (principal)
GET  /api/results/export/excel     # Export results as Excel
```

---

## 🔑 Environment Variables

Located in `server/.env`:

```env
JWT_SECRET=jasonwebtokensecret@123
PORT=8000
MONGO_URI=mongodb+srv://kdyd2940_db_user:iYniIWKFSnZLHMSD@cluster0.qbr94dc.mongodb.net/online_exam

CLOUDINARY_CLOUD_NAME=NewEraSchool
CLOUDINARY_API_KEY=589936563556422
CLOUDINARY_API_SECRET=yL0GY1H-FzZs9VwcwhLuNY4ul7k
CLOUDINARY_PROJECT_FOLDER=school_exam_system
```

---

## 🎨 Frontend Configuration

### Student App (Vite)
- **Port**: 5173
- **Config**: `students/vite.config.js`
- **API URL**: Auto-detects from `VITE_API_URL` or defaults to `http://localhost:8000/api`

### Teacher App (Vite)
- **Port**: 5174
- **Config**: `Teacher/vite.config.js`
- **API URL**: Auto-detects from `VITE_API_URL` or defaults to `http://localhost:8000/api`

---

## 📝 Features Implemented

✅ **Student Side**:
- Simple no-password login
- View available exams
- MCQ-based exam interface
- Timer/Stopwatch functionality
- Review questions before submission
- Auto-calculation of marks
- View past results
- Responsive design

✅ **Teacher Side**:
- Teacher login with credentials
- Create exams with details
- Add/Edit/Delete questions
- Support for question images
- Set correct answers per question
- View results for specific exam
- Class-wise result filtering
- Export results to Excel
- Student performance analytics

✅ **Principal Side**:
- Principal login with credentials
- View all results across all classes
- Multi-level filtering (class, section, exam, subject)
- Export comprehensive reports
- Analytics dashboard
- Bulk export capability

✅ **Technical Features**:
- MongoDB Atlas cloud database
- JWT-based authentication
- Role-based access control
- Image upload via Cloudinary
- Excel export with formatting
- Responsive Tailwind CSS UI
- Material-UI components
- Real-time result calculation
- Session management

---

## 🚀 Production Deployment (Optional)

### Backend Deployment (Heroku/Railway/Render)
```bash
# Set environment variables on platform
# Push code to git repository
# Platform auto-detects Node.js and runs
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build student app
cd students
npm run build

# Build teacher app
cd ../Teacher
npm run build

# Deploy dist folders to Vercel/Netlify
```

---

## 🐛 Troubleshooting

### Issue: Backend not connecting to MongoDB
**Solution**: Check `MONGO_URI` in `.env` file is correct

### Issue: Image upload not working
**Solution**: Verify Cloudinary credentials in `.env`

### Issue: CORs errors
**Solution**: Backend CORS is enabled. Check frontend API URL matches backend

### Issue: "Token expired"
**Solution**: Token expires after 7 days. Re-login to get new token

### Issue: Can't see exams as student
**Solution**: Ensure exam is created for your class/section

---

## 📞 Support

For issues or questions, check:
1. `.env` configuration
2. MongoDB Atlas connection
3. Port availability (8000, 5173, 5174)
4. Browser console for errors (F12)
5. Terminal logs for backend errors

---

**Happy Testing! 🎉**
