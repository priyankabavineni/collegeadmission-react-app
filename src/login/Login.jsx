import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/student/login?email=${email}&password=${password}`
      );
      const student = res.data;
      localStorage.setItem("sid", student.sid);

      // Redirect to status page after successful login
      navigate("/status");
    } catch (err) {
      setErrorMsg("Invalid credentials or server error");
    }
  };

  return (
    <div
      style={{
        background: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#2a3eb1",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          color: "white",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "white" }}
        >
          🔑 Student Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              className="form-label"
              style={{ fontWeight: "500", color: "white" }}
              htmlFor="email"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                backgroundColor: "white",
                color: "#003333",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div className="mb-3">
            <label
              className="form-label"
              style={{ fontWeight: "500", color: "white" }}
              htmlFor="password"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                backgroundColor: "white",
                color: "#003333",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {errorMsg && (
            <div
              className="alert alert-danger text-center"
              style={{ marginBottom: "15px" }}
            >
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#FFB703",
              border: "none",
              color: "#003333",
              fontWeight: "bold",
              padding: "0.8rem",
              width: "100%",
              borderRadius: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#2a3eb1";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.color = "#003333";
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
