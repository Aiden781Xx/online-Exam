import React from 'react'
import Navbar from './components/Navbar/Index'
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import TeacherLogin from './components/TeacherLogin/Index';
import Exam from './components/Exam';
import AddExam from './components/MakeExam/AddExam';
import MakeExam from './components/MakeExam/Index';
import ViewExam from './components/View Exam/Index';
import ViewExam1 from './components/View Exam/ViewExam1';
import Result from './components/Result';
import ShowResult from './components/Result/ShowResult';
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
            <Route path='/view-exam' element={<ViewExam/>}></Route>
            <Route path='/view' element={<ViewExam1/>}></Route>
            <Route path='/show' element={<Result/>}></Route>
             <Route path='/show-result' element={<ShowResult/>}></Route>
            </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
