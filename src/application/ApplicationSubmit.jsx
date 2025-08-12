import React, { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

export default function ApplicationSubmit() {
  const [application, setApplication] = useState({
    sid: 0,
    program: "",
    department: "",
    entranceExam: "",
    entranceExamScore: "",
    paymentDone: false,
  });

  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const programs = ["B.Tech", "M.Tech", "MBA", "MCA"];

  const departmentsMap = {
    "B.Tech": ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT"],
    "M.Tech": ["CSE", "VLSI Design", "Structural Engg", "Thermal Engg"],
    MBA: ["Finance", "Marketing", "HR", "Operations"],
    MCA: ["Computer Applications", "Data Science"],
  };

  useEffect(() => {
    const storedSid = localStorage.getItem("sid");
    if (storedSid) {
      setApplication((prev) => ({
        ...prev,
        sid: parseInt(storedSid, 10),
      }));
    } else {
      alert("Student not logged in. Redirecting to login...");
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApplication((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProgramChange = (e) => {
    const selectedProgram = e.target.value;
    setApplication((prev) => ({
      ...prev,
      program: selectedProgram,
      department: "",
    }));
    setAvailableDepartments(departmentsMap[selectedProgram] || []);
  };

  const handleSubmit = async () => {
    if (!application.program || !application.department) {
      alert("Please fill in all required fields");
      return;
    }

    if (
      application.entranceExam === "YES" &&
      (application.entranceExamScore === "" || application.entranceExamScore < 0)
    ) {
      alert("Please enter a valid entrance exam score");
      return;
    }

    if (!application.paymentDone) {
      alert("Please confirm payment before submitting");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/applications/apply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      }
    );

    if (response.ok) {
      setSubmissionSuccess(true);
    } else {
      const error = await response.json();
      alert(error.message || "Failed to submit application");
    }
  };

  return (
    <div
      style={{
        background: "#dcdcdc",
        minHeight: "100vh",
        paddingTop: "40px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <Container
        style={{
          maxWidth: "600px",
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
          📝 Application Form
        </h2>

        {submissionSuccess && (
          <Alert
            variant="success"
            className="text-center fw-bold"
            style={{ backgroundColor: "#198754", color: "white", border: "none" }}
          >
            ✅ Application submitted successfully!
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" style={{ color: "white" }}>
              Program
            </Form.Label>
            <Form.Select
              name="program"
              value={application.program}
              onChange={handleProgramChange}
              style={{ borderRadius: "10px", backgroundColor: "white", color: "#003333" }}
            >
              <option value="">Select Program</option>
              {programs.map((p) => (
                <option key={p} value={p} style={{ color: "#003333" }}>
                  {p}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" style={{ color: "white" }}>
              Department
            </Form.Label>
            <Form.Select
              name="department"
              value={application.department}
              onChange={handleChange}
              disabled={!availableDepartments.length}
              style={{ borderRadius: "10px", backgroundColor: "white", color: "#003333" }}
            >
              <option value="">Select Department</option>
              {availableDepartments.map((dep) => (
                <option key={dep} value={dep} style={{ color: "#003333" }}>
                  {dep}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" style={{ color: "white" }}>
              Entrance Exam
            </Form.Label>
            <Form.Select
              name="entranceExam"
              value={application.entranceExam}
              onChange={handleChange}
              style={{ borderRadius: "10px", backgroundColor: "white", color: "#003333" }}
            >
              <option value="">Select</option>
              <option value="YES" style={{ color: "#003333" }}>
                YES
              </option>
              <option value="NO" style={{ color: "#003333" }}>
                NO
              </option>
            </Form.Select>
          </Form.Group>

          {application.entranceExam === "YES" && (
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" style={{ color: "white" }}>
                Entrance Exam Score
              </Form.Label>
              <Form.Control
                type="number"
                name="entranceExamScore"
                value={application.entranceExamScore}
                onChange={handleChange}
                placeholder="Enter Score"
                style={{ borderRadius: "10px", backgroundColor: "white", color: "#003333" }}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              name="paymentDone"
              label={<span style={{ color: "white", fontWeight: "600" }}>Payment Done</span>}
              checked={application.paymentDone}
              onChange={handleChange}
              className="fw-semibold"
            />
          </Form.Group>

          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#FFB703",
              border: "none",
              color: "#003333",
              fontWeight: "bold",
              padding: "0.8rem",
              width: "100%",
              borderRadius: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e6a600")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FFB703")}
          >
            Submit Application
          </Button>
        </Form>
      </Container>
    </div>
  );
}
