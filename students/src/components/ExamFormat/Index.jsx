import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import api from "../../api/axios";
import StopWatch from "../StopWatch/Index";

const ExamFormat = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("studentUser");
    if (!u) {
      navigate("/");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (!examId) return;
    Promise.all([
      api.get(`/exams/${examId}`),
      api.get(`/questions/exam/${examId}`),
    ])
      .then(([examRes, qRes]) => {
        setExam(examRes.data.exam);
        setQuestions(qRes.data.questions || []);
        setTimeLeft((examRes.data.exam?.duration || 30) * 60);
      })
      .catch(() => navigate("/dashboard"));
  }, [examId, navigate]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const currentQuestion = questions[currentIndex];
  const selectedValue = currentQuestion
    ? answers[currentQuestion._id] !== undefined
      ? String(answers[currentQuestion._id])
      : ""
    : "";

  const handleChange = (event) => {
    if (!currentQuestion) return;
    const value = Number(event.target.value);
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    const answerList = Object.entries(answers).map(([questionId, selectedOptionIndex]) => ({
      questionId,
      selectedOptionIndex,
    }));
    setSubmitting(true);
    try {
      await api.post("/results/submit", { examId, answers: answerList });
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.error || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!exam) return <div className="p-8 text-center">Loading exam...</div>;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-700">Exam Submitted Successfully</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const mins = Math.floor((timeLeft || 0) / 60);
  const secs = (timeLeft || 0) % 60;

  return (
    <div className="exam mt-5">
      <div className="exam-box">
        <div className="h-[97vh] w-full border-indigo-500/50">
          <div className="relative flex items-center justify-between px-4">
            <div className="flex flex-col">
              <span className="text-[14px] mt-1">Time: {mins}:{String(secs).padStart(2, "0")}</span>
            </div>
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-center">
              {exam.title}
            </h1>
            <div className="text-right">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-blue-600"
              >
                ← Back
              </button>
            </div>
          </div>
          <div className="w-full border-indigo-500/50 mt-2" />
          {currentQuestion ? (
            <>
              <div className="exam-format-box flex items-center justify-center mt-10">
                <div className="w-full max-w-3xl rounded-md border border-indigo-500/50 p-4">
                  <h1 className="text-center mt-1">
                    Q{currentIndex + 1}. {currentQuestion.questionText} ({currentQuestion.marks} marks)
                  </h1>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-6 gap-3 max-w-3xl mx-auto">
                {currentQuestion.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="option w-full border-2 flex items-center rounded-md border-indigo-500/50 pl-4 py-2"
                  >
                    <Radio
                      value={idx}
                      checked={selectedValue === String(idx)}
                      onChange={handleChange}
                    />
                    <span className="ml-2">{opt.text}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center mt-8">No questions in this exam.</p>
          )}
          <div className="flex justify-between max-w-3xl mx-auto mt-8 px-4">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="!bg-[#FFF7E6] hover:!bg-zinc-400 !text-black"
            >
              <GrFormPrevious className="!text-[16px]" /> Previous
            </Button>
            {currentIndex === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={submitting || questions.length === 0}
                className="!bg-[#FFF7E6] hover:!bg-zinc-400 !text-black"
              >
                {submitting ? "Submitting..." : "Submit Exam"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="!bg-[#FFF7E6] hover:!bg-zinc-400 !text-black"
              >
                Next <GrFormNext className="!text-[16px]" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamFormat;
