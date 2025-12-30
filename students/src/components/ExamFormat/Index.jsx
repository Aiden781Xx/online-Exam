import React, { useState } from "react";
import StopWatch from "../StopWatch/Index";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const ExamFormat = () => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    const value = event.target.value;
    setSelectedValue(value);

    setAnswers({
      ...answers,
      [currentIndex]: value,
    })
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const questions = [
    {
      question: "What is the capital of India this is Good contry in world?",
      option: [
        { key: "a", text: "New Delhi" },
        { key: "b", text: "Mumbai" },
        { key: "c", text: "Chennai" },
        { key: "d", text: "Kolkata" },
      ],
    },
    {
      question: "What is the capital of India this is in world?",
      option: [
        { key: "a", text: "New Delhi" },
        { key: "b", text: "Mumbai" },
        { key: "c", text: "Chennai" },
      ],
    },
    {
      question: "What is the capital of India this is Good contry in world?",
      option: [
        { key: "a", text: "New Delhi" },
        { key: "b", text: "Mumbai" },
        { key: "c", text: "Chennai" },
        { key: "d", text: "Kolkata" },
      ],
    },
    {
      question: "What is the capital of India this is Good contry in world?",
      option: [
        { key: "a", text: "New Delhi" },
        { key: "b", text: "Mumbai" },
        { key: "c", text: "Chennai" },
        { key: "d", text: "Kolkata" },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      
      setCurrentIndex(currentIndex + 1);
      setSelectedValue(answers[nextIndex] || "");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(currentIndex - 1);
      setSelectedValue(answers[prevIndex] || "");
    }
  };

  const [answers, setAnswers] = useState({});

  

  return (
    <>
      <div className="exam mt-5">
        <div className="exam-box">
          <div className="h-[97vh] w-full  border-indigo-500/50 ">
            <h1 className="text-3xl font-bold text-center mt-1">Select Exam:- jee</h1>
            <h3 className="text-2xl ml-2 mt-[-30px] "> User Name:- Kunal</h3>
            <h2 className="text-2xl ml-55 mt-[-30px]">class:- 12th</h2>
              <h2 className="text-2xl ml-87 mt-[-30px]">Marks:- 50</h2>
               
            <p className="text-end mt-[-30px] mr-10">
              <StopWatch />
                <h2 className="text-2xl mr-40 mt-[-30px]">Dates:- 12/3/2025</h2>
            </p>
            <div className=" w-full  border-indigo-500/50 mt-2"></div>
            <div className="exam-format-box flex items-center justify-center mt-10">
              <div className="w-[150vh] h-[5vh]  rounded-md border-indigo-500/50 ">
                <h1 className="text-center mt-1">
                  Q{currentIndex + 1}. {currentQuestion.question}
                </h1>
              </div>
            </div>
            {currentQuestion.option.map((opt) => (
              <div className="exam-options-box flex flex-col items-center justify-center mt-10  gap-5 ">
                <div
                  key={opt.key}
                  className="option w-[150vh] h-[5vh] border-2 flex items-center rounded-md border-indigo-500/50 pl-4"
                >
                  <Radio
                    value={opt.key}
                    checked={selectedValue === opt.key}
                    onChange={handleChange}
                  />
                  <span className="ml-2">
                    {opt.key.toUpperCase()}. {opt.text}
                  </span>
                </div>
               
              </div>
            ))}
            <div className="w-[200vh] h-[10vh] mt-5">
              <div className="text-end mr-20 mt-5">
                {
                  currentIndex === questions.length - 1 ? (
                    <Link to='/'>
                    <Button onClick={()=> alert("submit", answers)} className="!bg-[#FFF7E6] hover:!bg-zinc-400 !text-black">Submit Exam</Button>
                    </Link>
                  ): (
                        <Button
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  className="!bg-[#FFF7E6] hover:!bg-zinc-400 !text-black"
                >
                  Next
                  <GrFormNext className="!text-[16px]" />
                </Button>
                  )
                }
              
              </div>
              <div className="text-start ml-20 mt-[-30px]">
                <Button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="!bg-[#FFF7E6] hover:!bg-zinc-400 !text-black"
                >
                  <GrFormPrevious className="!text-[16px]" />
                  Previous
                </Button>
              </div>
             
               
            </div>
            <div className="flex items-center justify-center mt-[-50px]">
              <img
                src="https://imgs.search.brave.com/oC2Mt26iiUVvhY1CoB11gu6s9K2n5pNv0YsW3P6ygYo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZmxhdC1pbGx1/c3RyYXRpb24tcmVh/Y3QtbmF0aXZlLXBy/b2dyYW1tZXItY29u/Y2VwdC1pbGx1c3Ry/YXRpb24td2Vic2l0/ZXMtbGFuZGluZy1w/YWdlcy1tb2JpbGUt/YXBwbGljYXRpb25z/LXBvc3RlcnMtYmFu/bmVyc18xMDgwNjEt/NzM2LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA"
                alt=""
                className="w-[40vh] rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamFormat;
