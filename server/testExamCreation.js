import 'dotenv/config';
import { default as fetch } from 'node-fetch';

const API_URL = 'http://localhost:8000/api';

async function test() {
  try {
    console.log('1. Testing teacher login...');
    const loginRes = await fetch(`${API_URL}/auth/teacher/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'teacher',
        password: 'teacher123'
      })
    });
    const loginData = await loginRes.json();
    console.log('Login status:', loginRes.status);
    if (!loginData.success) {
      console.error('Login failed:', loginData);
      return;
    }
    const token = loginData.token;
    console.log('✅ Teacher login successful, token:', token.substring(0, 20) + '...');

    console.log('\n2. Testing exam creation...');
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
    console.log('Exam creation status:', examRes.status);
    if (examData.success) {
      console.log('✅ Exam created successfully!');
      console.log('Exam ID:', examData.exam._id);
      console.log('Exam Name:', examData.exam.examName);
    } else {
      console.error('❌ Exam creation failed:', examData);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
