import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import api from "../../api/axios";

const Exam = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("teacherToken");
    const u = localStorage.getItem("teacherUser");
    if (!token || !u) {
      navigate("/teacher-login");
      return;
    }
    setUser(JSON.parse(u));
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    api
      .get("/exams")
      .then((res) => setExams(res.data.exams || []))
      .catch(() => setExams([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this exam and all its questions?")) return;
    try {
      await api.delete(`/exams/${id}`);
      setExams((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h1 className="text-2xl font-bold">Exams</h1>
          <div className="flex gap-2">
            <Link to="/add-exam">
              <Button className="!bg-blue-500 !text-white !px-4 !py-2 !rounded hover:!bg-blue-600">
                Create Exam
              </Button>
            </Link>
            <Button
              className="!bg-gray-500 !text-white"
              onClick={() => {
                localStorage.removeItem("teacherToken");
                localStorage.removeItem("teacherUser");
                navigate("/teacher-login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : exams.length === 0 ? (
          <p className="text-gray-600">No exams yet. Create one.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="w-full p-5 border rounded-lg shadow-sm bg-white"
              >
                <div className="mb-1 font-semibold">{exam.examName || exam.title}</div>
                <div className="mb-1 text-sm text-gray-600">{exam.subject}</div>
                <div className="mb-1 text-sm">Class: {exam.class}-{exam.section}</div>
                <div className="mb-2 text-sm">Marks: {exam.totalMarks} • {exam.duration} min</div>
                <div className="flex flex-wrap gap-2">
                  <Link to={`/add-questions/${exam._id}`}>
                    <Button size="small" className="!bg-blue-400 !text-white">
                      Add Questions
                    </Button>
                  </Link>
                  <Link to={`/show-result/${exam._id}`}>
                    <Button size="small" className="!bg-green-500 !text-white">
                      Results
                    </Button>
                  </Link>
                  <Button
                    size="small"
                    className="!bg-red-500 !text-white"
                    onClick={() => handleDelete(exam._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;
