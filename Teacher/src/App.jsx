import React from 'react'
import Navbar from './components/Navbar/Index'
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import TeacherLogin from './components/TeacherLogin/Index';
import Exam from './components/Exam';
import AddExam from './components/MakeExam/AddExam';
import MakeExam from './components/MakeExam/Index';
const App = () => {
  return (
    <>
     <BrowserRouter>
            <Routes>
             <Route path="/" element={<Navbar />}></Route>
            <Route path='/teacher-login' element={<TeacherLogin/>}></Route>
            <Route path='/exam' element={<Exam/>}></Route>
            <Route path='/add-exam' element={<AddExam/>}></Route>
            <Route path='/make-exam' element={<MakeExam/>}></Route>
            </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
