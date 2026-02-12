import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    rollNo: "",
    class: "",
    section: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.fatherName || !form.rollNo || !form.class || !form.section) {
      setError("Name, Father Name, Roll No, Class and Section are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/student/login", {
        name: form.name,
        fatherName: form.fatherName,
        rollNo: form.rollNo,
        class: form.class,
        section: form.section,
      });
      if (res.data.token) {
        localStorage.setItem("studentToken", res.data.token);
        localStorage.setItem("studentUser", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center">Student Login</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.name}
            onChange={handleInput}
            required
          />
          <input
            name="fatherName"
            placeholder="Father Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.fatherName}
            onChange={handleInput}
            required
          />
          <input
            name="rollNo"
            placeholder="Roll No"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.rollNo}
            onChange={handleInput}
            required
          />
          <input
            name="class"
            placeholder="Class"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.class}
            onChange={handleInput}
            required
          />
          <input
            name="section"
            placeholder="Section"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.section}
            onChange={handleInput}
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mt-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">© New Era School</p>
      </div>
    </div>
  );
};

export default Login;
