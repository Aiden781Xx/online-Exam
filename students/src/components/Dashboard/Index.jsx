import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("studentUser");
    if (!u) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(u));
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    api.get("/exams/student").then((res) => setExams(res.data.exams || [])).catch(() => setExams([])).finally(() => setLoading(false));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <span className="font-semibold">Welcome, {user.name} (Class {user.class}-{user.section})</span>
          <div className="flex gap-2">
            <button onClick={() => navigate("/results")} className="px-4 py-2 bg-gray-600 text-white rounded-lg">My Results</button>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Logout</button>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Available Exams</h2>
        {loading ? <p>Loading...</p> : exams.length === 0 ? <p>No exams available for your class.</p> : (
          <div className="grid gap-4 sm:grid-cols-2">
            {exams.map((exam) => (
              <div key={exam._id} className="bg-white rounded-xl shadow p-4 border border-gray-200">
                <h3 className="font-semibold text-lg">{exam.title}</h3>
                <p className="text-gray-600 text-sm">{exam.subject} • Class {exam.class}-{exam.section}</p>
                <p className="text-gray-600 text-sm">Duration: {exam.duration} min • Total: {exam.totalMarks} marks</p>
                {exam.alreadySubmitted ? (
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded text-sm">Submitted</span>
                ) : (
                  <button onClick={() => navigate(`/exam/${exam._id}`)} className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg font-medium">Start Exam</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
