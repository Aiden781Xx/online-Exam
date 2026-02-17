import 'dotenv/config';

const API_URL = 'http://localhost:8000/api';

async function testExamCreation() {
  try {
    // Step 1: Login
    console.log('Step 1: Teacher login...');
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
    
    const token = loginData.token;
    console.log('✅ Login successful');
    
    // Step 2: Create exam
    console.log('\nStep 2: Creating exam...');
    const examPayload = {
      title: 'Hindi Test ' + Date.now(),
      subject: 'Hindi',
      class: '10',
      section: 'A',
      duration: 60,
      totalMarks: 100,
      examDate: new Date().toISOString().split('T')[0]
    };
    
    console.log('Payload:', JSON.stringify(examPayload, null, 2));
    
    const examRes = await fetch(`${API_URL}/exams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(examPayload)
    });
    
    const examData = await examRes.json();
    console.log('\nResponse status:', examRes.status);
    console.log('Full Response:', JSON.stringify(examData, null, 2));
    
    if (examData.success) {
      console.log('\n✅ Exam created successfully!');
      console.log('Exam ID:', examData.exam._id);
    } else {
      console.error('\n❌ Exam creation failed:');
      console.error('Error:', examData.error);
      console.error('Errors:', examData.errors);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

testExamCreation();
