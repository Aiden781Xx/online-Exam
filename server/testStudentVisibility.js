import 'dotenv/config';

const API_URL = 'http://localhost:8000/api';

async function run() {
  try {
    console.log('1) Teacher login');
    let res = await fetch(`${API_URL}/auth/teacher/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'teacher', password: 'teacher123' })
    });
    const tdata = await res.json();
    if (!tdata.success) { console.error('Teacher login failed', tdata); return; }
    const teacherToken = tdata.token;

    console.log('2) Create exam (title->class A, section A)');
    const payload = {
      title: 'Visibility Test ' + Date.now(),
      subject: 'Science',
      class: '10',
      section: 'A',
      duration: 30,
      totalMarks: 10,
      examDate: new Date().toISOString().split('T')[0]
    };
    res = await fetch(`${API_URL}/exams`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${teacherToken}` },
      body: JSON.stringify(payload)
    });
    const createData = await res.json();
    console.log('Create response', createData.success, createData.error || createData.exam?._id);
    if (!createData.success) return;

    console.log('3) Student login (same class/section)');
    res = await fetch(`${API_URL}/auth/student/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Auto Student', fatherName: 'Auto', class: '10', section: 'A', rollNo: '101' })
    });
    const sdata = await res.json();
    if (!sdata.success) { console.error('Student login failed', sdata); return; }
    const studentToken = sdata.token;

    console.log('4) Fetch exams for student');
    res = await fetch(`${API_URL}/exams/student`, { method: 'GET', headers: { 'Authorization': `Bearer ${studentToken}` } });
    const examsList = await res.json();
    console.log('Exams visible to student:', JSON.stringify(examsList.exams?.map(e=>({id:e._id, name:e.examName||e.title, section:e.section})), null, 2));
  } catch (err) {
    console.error('Error', err.message);
  }
}

run();
