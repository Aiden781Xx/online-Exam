import React from "react";
import UploadBox from "./UploadBox";
import ExamClock from "./ExamClock";
import { Button } from "@mui/material";

const MakeExam = () => {
  return (
    <>
      <div className="exam1 min-h-screen ">
        <div className="format max-w-7xl mx-auto">

          {/* ===== Header ===== */}
          <h1 className="text-center mt-5 font-bold text-3xl">
            Make Exam
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between px-10 mt-6 gap-4">
            <div className="text-left">
              <label className="font-bold text-xl block">Exam Name : JEE</label>
            </div>

            <div className="w-full md:w-1/3">
              <ExamClock />
            </div>
          </div>

          <div className="w-full border mt-4"></div>

          {/* ===== Question 1 ===== */}
          <div className="flex justify-center mt-10">
            <div className="flex gap-6 w-[90%]">

              {/* Question Form */}
              <div className="w-[70%] p-5 border rounded-lg ">
                <label className="font-semibold">Question 1 :</label>
                <input
                  type="text"
                  placeholder="Enter question"
                  className="border ml-3 p-2 rounded-md w-[80%]"
                />

                <div className="mt-4">
                  <label className="font-semibold">Option A :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option B :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option C :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option D :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Correct Answer :</label>
                  <input
                    placeholder="A / B / C / D"
                    className="border ml-3 p-2 rounded-md w-[70%]"
                  />
                </div>
              </div>
              <div className="button">
                <Button className="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-blue-600">
                  Add Question
                </Button>
                <Button className="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-blue-600 !mt-5">Add Option</Button>
                
              </div>

              {/* Upload Box */}
              <div className="w-[30%] flex items-start justify-center">
                <UploadBox />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <div className="flex gap-6 w-[90%]">

              {/* Question Form */}
              <div className="w-[70%] p-5 border rounded-lg ">
                <label className="font-semibold">Question 1 :</label>
                <input
                  type="text"
                  placeholder="Enter question"
                  className="border ml-3 p-2 rounded-md w-[80%]"
                />

                <div className="mt-4">
                  <label className="font-semibold">Option A :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option B :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option C :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option D :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Correct Answer :</label>
                  <input
                    placeholder="A / B / C / D"
                    className="border ml-3 p-2 rounded-md w-[70%]"
                  />
                </div>
              </div>
              <div className="button">
                <Button className="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-blue-600">
                  Add Question
                </Button>
                <Button className="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-blue-600 !mt-5">Add Option</Button>
                
              </div>

              {/* Upload Box */}
              <div className="w-[30%] flex items-start justify-center">
                <UploadBox />
              </div>
            </div>
          </div>
         
          <div className="flex justify-center mt-10">
            <div className="flex gap-6 w-[90%]">

              {/* Question Form */}
              <div className="w-[70%] p-5 border rounded-lg ">
                <label className="font-semibold">Question 1 :</label>
                <input
                  type="text"
                  placeholder="Enter question"
                  className="border ml-3 p-2 rounded-md w-[80%]"
                />

                <div className="mt-4">
                  <label className="font-semibold">Option A :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option B :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option C :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Option D :</label>
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>

                <div className="mt-3">
                  <label className="font-semibold">Correct Answer :</label>
                  <input
                    placeholder="A / B / C / D"
                    className="border ml-3 p-2 rounded-md w-[70%]"
                  />
                </div>
              </div>
              <div className="button">
                <Button className="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-blue-600">
                  Add Question
                </Button>
                <Button className="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-blue-600 !mt-5">Add Option</Button>
                
              </div>

              {/* Upload Box */}
              <div className="w-[30%] flex items-start justify-center">
                <UploadBox />
              </div>
            </div>
          </div>

        </div>
        <div className="submit flex items-center justify-center mb-10">
          <Button className="!bg-green-500 !text-white !px-4 !py-2  !rounded-md hover:!bg-green-600 !mt-5">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default MakeExam;
