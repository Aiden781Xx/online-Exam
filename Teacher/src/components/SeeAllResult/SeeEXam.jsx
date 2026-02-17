import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const SeeEXam = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("teacherToken")) {
      navigate("/principal-login");
      return;
    }
    api
      .get("/exams")
      .then((res) => setExams(res.data.exams || []))
      .catch(() => setExams([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="view min-h-screen p-4">
      <h1 className="text-center mt-5 font-bold text-3xl">View All Exams</h1>
      <div className="w-full border mt-4" />
      {loading ? (
        <p className="mt-6">Loading...</p>
      ) : exams.length === 0 ? (
        <p className="mt-6 text-gray-600">No exams yet.</p>
      ) : (
        <div className="exam-card flex gap-6 flex-wrap mt-6 max-w-4xl mx-auto">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="w-[280px] p-5 border rounded-lg shadow-sm bg-white"
            >
              <div className="mb-1 font-semibold">{exam.examName || exam.title}</div>
              <div className="mb-2 text-sm">{exam.subject} • Class {exam.class}-{exam.section}</div>
              <div className="mb-2 text-sm">Marks: {exam.totalMarks} • {exam.duration} min</div>
              <Link to={`/add-questions/${exam._id}`}>
                <Button className="!bg-blue-400 !text-black !px-4 !py-2 !rounded hover:!bg-zinc-300">
                  Add Questions
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeeEXam;
