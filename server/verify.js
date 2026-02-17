import 'dotenv/config';

const API_URL = 'http://localhost:8000/api';

async function test() {
  try {
    console.log('Testing teacher login and exam creation...\n');
    
    const loginRes = await fetch(`${API_URL}/auth/teacher/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'teacher',
        password: 'teacher123'
      })
    });
    const loginData = await loginRes.json();
    
    if (!loginData.success) {
      console.error('❌ Login failed:', loginData);
      process.exit(1);
    }
    
    console.log('✅ Teacher login successful');
    const token = loginData.token;

    const examRes = await fetch(`${API_URL}/exams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Test Exam',
        subject: 'Mathematics',
        class: '10',
        section: 'A',
        duration: 60,
        totalMarks: 100,
        examDate: new Date().toISOString()
      })
    });
    
    const examData = await examRes.json();
    
    if (examData.success) {
      console.log('✅ Exam created successfully!');
      console.log('Exam Name:', examData.exam.examName);
    } else {
      console.error('❌ Exam creation failed:', examData);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
  process.exit(0);
}

test();
