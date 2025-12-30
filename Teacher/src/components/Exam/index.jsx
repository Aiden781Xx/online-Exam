import React from 'react'
import logo from '../../assets/logo.jpeg'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
const Exam = () => {
  return (
    <>
      <div className='exam-navbar flex  flex-row justify-end mt-5 items-end '>
        <div className='w-full h-[10vh] '>
        <img src={logo} alt="" className='w-[10vh] ml-10' />
        <h1 className='text-center mt-[-60px] font-bold capitalize text-3xl'>New Era Sr. Sec School</h1>
        <h1 className='text-end mt-[-30px] mr-19 capitalize text-[20px]'>Role</h1>
        </div>
      </div>

       <div className='format'>
        <div className='text-center mt-20 ' >
          <Link to='/add-exam'>
            <Button className='!bg-blue-400 !text-black !px-4 !py-2 !rounded !mr-5 hover:!bg-zinc-300'>Make Exam</Button>
            </Link>
        </div>
          <div className='text-center mt-9 ' >
            <Button className='!bg-blue-400 !text-black !px-4 !py-2 !rounded !mr-5 hover:!bg-zinc-300'>View Exam</Button>
        </div>
          <div className='text-center mt-9 ' >
            <Button className='!bg-blue-400 !text-black !px-4 !py-2 !rounded !mr-5 hover:!bg-zinc-300'>Show Result</Button>
        </div>
        </div>
    </>
  )
}

export default Exam
