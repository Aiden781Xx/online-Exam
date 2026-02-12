import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import api from "../../api/axios";

const AddQuestions = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("teacherToken")) {
      navigate("/teacher-login");
      return;
    }
    if (!examId) return;
    Promise.all([
      api.get(`/exams/${examId}`),
      api.get(`/questions/exam/${examId}`),
    ])
      .then(([exRes, qRes]) => {
        setExam(exRes.data.exam);
        setQuestions(qRes.data.questions || []);
      })
      .catch(() => navigate("/exam"))
      .finally(() => setLoading(false));
  }, [examId, navigate]);

  const addNewQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        marks: 1,
      },
    ]);
  };

  const updateQuestion = (qIndex, field, value) => {
    setQuestions((prev) => {
      const next = [...prev];
      if (field === "questionText" || field === "marks") {
        next[qIndex] = { ...next[qIndex], [field]: value };
      } else if (field === "options") {
        next[qIndex].options = value;
      }
      return next;
    });
  };

  const saveQuestion = async (q, qIndex) => {
    if (q._id) return;
    if (!q.questionText || !q.options?.length) {
      alert("Enter question text and at least one option");
      return;
    }
    try {
      const res = await api.post("/questions", {
        examId,
        questionText: q.questionText,
        options: q.options.map((o) => ({ text: o.text, isCorrect: !!o.isCorrect })),
        marks: q.marks || 1,
      });
      setQuestions((prev) => {
        const next = [...prev];
        next[qIndex] = res.data.question;
        return next;
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add question");
    }
  };

  const addOption = (qIndex) => {
    const q = questions[qIndex];
    updateQuestion(qIndex, "options", [...(q.options || []), { text: "", isCorrect: false }]);
  };

  const removeOption = (qIndex, optIndex) => {
    const q = questions[qIndex];
    if (q.options.length <= 2) return;
    updateQuestion(
      qIndex,
      "options",
      q.options.filter((_, i) => i !== optIndex)
    );
  };

  if (loading || !exam) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Questions: {exam.title}</h1>
          <div className="flex gap-2">
            <Button className="!bg-blue-500 !text-white" onClick={addNewQuestion}>
              + Add Question
            </Button>
            <Button className="!bg-gray-500 !text-white" onClick={() => navigate("/exam")}>
              Back to Exams
            </Button>
          </div>
        </div>
        {questions.map((q, qIndex) => (
          <div key={q._id || qIndex} className="border rounded-lg p-4 mb-4 bg-white">
            <input
              placeholder="Question text"
              className="border w-full p-2 rounded mb-2"
              value={q.questionText || ""}
              onChange={(e) => updateQuestion(qIndex, "questionText", e.target.value)}
            />
            {(q.options || []).map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Option ${oi + 1}`}
                  className="border flex-1 p-2 rounded"
                  value={opt.text || ""}
                  onChange={(e) => {
                    const opts = [...q.options];
                    opts[oi] = { ...opts[oi], text: e.target.value };
                    updateQuestion(qIndex, "options", opts);
                  }}
                />
                <label className="flex items-center gap-1 whitespace-nowrap">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={!!opt.isCorrect}
                    onChange={() => {
                      const opts = q.options.map((o, i) => ({ ...o, isCorrect: i === oi }));
                      updateQuestion(qIndex, "options", opts);
                    }}
                  />
                  Correct
                </label>
                <Button size="small" onClick={() => removeOption(qIndex, oi)}>−</Button>
              </div>
            ))}
            <Button size="small" onClick={() => addOption(qIndex)} className="!mb-2">+ Option</Button>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                min="1"
                placeholder="Marks"
                className="border w-20 p-1 rounded"
                value={q.marks ?? 1}
                onChange={(e) => updateQuestion(qIndex, "marks", Number(e.target.value))}
              />
              {!q._id && (
                <Button size="small" className="!bg-green-500 !text-white" onClick={() => saveQuestion(q, qIndex)}>
                  Save Question
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddQuestions;
