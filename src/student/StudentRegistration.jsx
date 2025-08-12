import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentRegistration() {
  const [student, setStudent] = useState({
    sname: "",
    email: "",
    password: "",
    tenthMarks: "",
    interMarks: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!student.sname.trim()) {
      errors.sname = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(student.sname)) {
      errors.sname = "Name should only contain letters and spaces";
    }

    if (!student.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      errors.email = "Invalid email format";
    }

    if (!student.password) {
      errors.password = "Password is required";
    } else if (student.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!student.tenthMarks) {
      errors.tenthMarks = "10th % is required";
    } else if (student.tenthMarks < 0 || student.tenthMarks > 100) {
      errors.tenthMarks = "Must be between 0 and 100";
    }

    if (!student.interMarks) {
      errors.interMarks = "Inter % is required";
    } else if (student.interMarks < 0 || student.interMarks > 100) {
      errors.interMarks = "Must be between 0 and 100";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const register = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:8080/api/student/register", student);

      setSuccessMsg("✅ Registered successfully! Redirecting...");
      setErrorMsg("");

      const loginRes = await axios.post(
        `http://localhost:8080/api/student/login?email=${student.email}&password=${student.password}`
      );
      const user = loginRes.data;
      localStorage.setItem("sid", user.sid);

      setTimeout(() => {
        navigate("/application");
      }, 1500);
    } catch (err) {
      setSuccessMsg("");
      setErrorMsg(err.response?.data?.message || "Registration or login failed");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "white", // page background light gray
        minHeight: "100vh",
        padding: "60px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        style={{
          maxWidth: "520px",
        }}
      >
        <div
          className="p-5"
          style={{
            borderRadius: "20px",
            background: "#2a3eb1", // form background blue
            color: "#fff", // white text for contrast on blue
            textAlign: "center",
            boxShadow: "none",
            border: "none",
          }}
        >
          <h2 className="fw-bold mb-4" style={{ letterSpacing: "1.5px", color: "#fff" }}>
            🎓 <span>Student Registration</span>
          </h2>

          {errorMsg && (
            <Alert variant="danger" style={{ fontWeight: "600" }}>
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert variant="success" style={{ fontWeight: "600" }}>
              {successMsg}
            </Alert>
          )}

          <Form onSubmit={register} style={{ textAlign: "left" }}>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Full Name"
                name="sname"
                value={student.sname}
                onChange={handleChange}
                isInvalid={!!fieldErrors.sname}
                style={{
                  borderRadius: "30px",
                  border: "2px solid #2a3eb1",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  boxShadow: "none",
                  backgroundColor: "white",
                  color: "#000",
                }}
                className="text-dark"
              />
              <Form.Control.Feedback type="invalid" style={{ color: "#ffb3b3" }}>
                {fieldErrors.sname}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={student.email}
                onChange={handleChange}
                isInvalid={!!fieldErrors.email}
                style={{
                  borderRadius: "30px",
                  border: "2px solid #2a3eb1",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  boxShadow: "none",
                  backgroundColor: "white",
                  color: "#000",
                }}
                className="text-dark"
              />
              <Form.Control.Feedback type="invalid" style={{ color: "#ffb3b3" }}>
                {fieldErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={student.password}
                onChange={handleChange}
                isInvalid={!!fieldErrors.password}
                style={{
                  borderRadius: "30px",
                  border: "2px solid #2a3eb1",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  boxShadow: "none",
                  backgroundColor: "white",
                  color: "#000",
                }}
                className="text-dark"
              />
              <Form.Control.Feedback type="invalid" style={{ color: "#ffb3b3" }}>
                {fieldErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="10th Percentage"
                name="tenthMarks"
                value={student.tenthMarks}
                onChange={handleChange}
                isInvalid={!!fieldErrors.tenthMarks}
                min="0"
                max="100"
                step="0.01"
                style={{
                  borderRadius: "30px",
                  border: "2px solid #2a3eb1",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  boxShadow: "none",
                  backgroundColor: "white",
                  color: "#000",
                }}
                className="text-dark"
              />
              <Form.Control.Feedback type="invalid" style={{ color: "#ffb3b3" }}>
                {fieldErrors.tenthMarks}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="number"
                placeholder="Inter Percentage"
                name="interMarks"
                value={student.interMarks}
                onChange={handleChange}
                isInvalid={!!fieldErrors.interMarks}
                min="0"
                max="100"
                step="0.01"
                style={{
                  borderRadius: "30px",
                  border: "2px solid #2a3eb1",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  boxShadow: "none",
                  backgroundColor: "white",
                  color: "#000",
                }}
                className="text-dark"
              />
              <Form.Control.Feedback type="invalid" style={{ color: "#ffb3b3" }}>
                {fieldErrors.interMarks}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              className="glass-btn submit w-100 fw-bold"
              style={{
                background: "white", // button background matching page bg
                color: "#2a3eb1", // blue text on button for contrast
                boxShadow: "none",
                border: "2px solid #2a3eb1",
                borderRadius: "30px",
                padding: "0.9rem 0",
                fontSize: "1.25rem",
                letterSpacing: "1.2px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "600",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2a3eb1";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#2a3eb1";
              }}
            >
              Register
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}
