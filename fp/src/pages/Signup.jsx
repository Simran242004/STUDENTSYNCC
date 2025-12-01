import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    // 🔹 Validation
    if (!form.fullName || !form.email || !form.password) {
      return setErr("All fields are required");
    }

    try {
      setLoading(true);

      // ✅ Correct endpoint (matches your backend /auth/signup)
      console.log("Submitting signup form:", form);
const res = await API.post("/auth/signup", form);


      if (res.status === 201 || res.status === 200) {
        // Signup success → redirect to login
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Show backend message or fallback
      setErr(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {/* Show error message */}
      {err && <p style={{ color: "red", marginBottom: "1rem" }}>{err}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
