import 'dotenv/config';
import fetch from 'node-fetch';

async function run(){
  const res=await fetch('http://localhost:8000/api/auth/teacher/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'teacher',password:'teacher123'})});
  const data=await res.json();
  console.log('status',res.status);
  console.log(data);
}

run().catch(e=>{console.error(e); process.exit(1) });
