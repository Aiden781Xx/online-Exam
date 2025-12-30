import React from "react";
import UploadBox from "./UploadBox";
import ExamClock from "./ExamClock";

const MakeExam = () => {
  return (
    <>
      <div className="exam1 min-h-screen ">
        <div className="format max-w-7xl mx-auto">

          {/* ===== Header ===== */}
          <h1 className="text-center mt-5 font-bold text-3xl">
            Make Exam
          </h1>

          <div className="flex items-center justify-between px-10 mt-6">
            <label className="font-bold text-xl">
              Exam Name : JEE
            </label>
            <ExamClock />
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

              {/* Upload Box */}
              <div className="w-[30%] flex items-start justify-center">
                <UploadBox />
              </div>
            </div>
          </div>

          {/* ===== Question 2 ===== */}
          <div className="flex justify-center mt-10">
            <div className="flex gap-6 w-[90%]">

              <div className="w-[70%] p-5 border rounded-lg ">
                <label className="font-semibold">Question 2 :</label>
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
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>
              </div>

              <div className="w-[30%] flex items-start justify-center">
                <UploadBox />
              </div>
            </div>
          </div>

          {/* ===== Question 3 ===== */}
          <div className="flex justify-center mt-10 mb-20">
            <div className="flex gap-6 w-[90%]">

              <div className="w-[70%] p-5 border rounded-lg ">
                <label className="font-semibold">Question 3 :</label>
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
                  <input className="border ml-3 p-2 rounded-md w-[70%]" />
                </div>
              </div>

              <div className="w-[30%] flex items-start justify-center">
                <UploadBox />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default MakeExam;
