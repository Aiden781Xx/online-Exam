import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
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
    api
      .get("/results/student")
      .then((res) => setResults(res.data.results || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
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
          <span className="font-semibold">My Results</span>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Past Results</h2>
        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No results yet.</p>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Exam</th>
                  <th className="text-left p-3">Subject</th>
                  <th className="text-left p-3">Marks</th>
                  <th className="text-left p-3">Percentage</th>
                  <th className="text-left p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r._id} className="border-t">
                    <td className="p-3">{r.examId?.title}</td>
                    <td className="p-3">{r.examId?.subject}</td>
                    <td className="p-3">
                      {r.marksObtained} / {r.totalMarks}
                    </td>
                    <td className="p-3">{r.percentage}%</td>
                    <td className="p-3">
                      {r.submittedAt
                        ? new Date(r.submittedAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
