import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import api from "../../api/axios";

const AddExam = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    subject: "",
    class: "",
    section: "",
    duration: 30,
    totalMarks: 10,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("teacherToken")) navigate("/teacher-login");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "duration" || name === "totalMarks" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.subject || !form.class || !form.section) {
      setError("Title, Subject, Class and Section are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/exams", form);
      navigate(`/add-questions/${res.data.exam._id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exam1 min-h-screen p-4">
      <div className="format max-w-xl mx-auto">
        <h1 className="font-bold text-3xl mb-6">Create Exam</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold block mb-1">Exam Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Mid Term Hindi"
              className="border w-full mt-1 p-2 rounded-md"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Subject</label>
            <input
              name="subject"
              type="text"
              placeholder="e.g. Hindi"
              className="border w-full mt-1 p-2 rounded-md"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Class</label>
            <input
              name="class"
              type="text"
              placeholder="e.g. 10"
              className="border w-full mt-1 p-2 rounded-md"
              value={form.class}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Section</label>
            <input
              name="section"
              type="text"
              placeholder="e.g. A"
              className="border w-full mt-1 p-2 rounded-md"
              value={form.section}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Duration (minutes)</label>
            <input
              name="duration"
              type="number"
              min="1"
              className="border w-full mt-1 p-2 rounded-md"
              value={form.duration}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Total Marks</label>
            <input
              name="totalMarks"
              type="number"
              min="1"
              className="border w-full mt-1 p-2 rounded-md"
              value={form.totalMarks}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="!bg-green-500 !text-white hover:!bg-green-600"
            >
              {loading ? "Creating..." : "Create & Add Questions"}
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/exam")}
              className="!bg-gray-500 !text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
