import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchByEmail() {
  const [email, setEmail] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const fetchStudent = async () => {
    if (!email.trim()) {
      setError("❌ Please enter an email");
      setStudent(null);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/admin/student/email/${email}`
      );
      setStudent(res.data.data);
      setError("");
    } catch (err) {
      setError("❌ Student not found or error occurred.");
      setStudent(null);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "30px 40px",
        }}
      >
        {/* Header */}
        <div
          style={{
            color: "#2a3eb1",
            textAlign: "center",
            marginBottom: "35px",
            fontWeight: "700",
            fontSize: "1.7rem",
          }}
        >
          🔍 Search Student by Email
          <p style={{ fontWeight: "400", fontSize: "1rem", marginTop: "5px" }}>
            Quickly find details and track applications
          </p>
        </div>

        {/* Search Input */}
        <div
          className="input-group"
          style={{ maxWidth: "600px", margin: "0 auto 40px auto" }}
        >
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Enter student email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: "50px 0 0 50px",
              border: `2px solid #2a3eb1`,
              fontSize: "1.1rem",
              padding: "14px 20px",
              color: "#2a3eb1",
              backgroundColor: "white",
            }}
          />
          <button
            onClick={fetchStudent}
            className="btn"
            style={{
              backgroundColor: "#2a3eb1",
              color: "white",
              fontWeight: "600",
              borderRadius: "0 50px 50px 0",
              padding: "14px 40px",
              fontSize: "1.1rem",
            }}
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="alert alert-danger text-center py-2 mb-4"
            style={{
              fontSize: "1rem",
              backgroundColor: "#f8d7da",
              color: "#842029",
              borderRadius: "8px",
            }}
          >
            {error}
          </div>
        )}

        {/* Student Info */}
        {student && (
          <>
            {/* Student Information Table */}
            <h4
              style={{
                color: "#2a3eb1",
                fontWeight: "600",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              🎓 Student Information
            </h4>

            <div style={{ overflowX: "auto", marginBottom: "40px" }}>
              <table
                border="1"
                cellPadding="8"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  backgroundColor: "white",
                  color: "#2a3eb1",
                  fontWeight: "500",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#2a3eb1", color: "white" }}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Tenth Marks</th>
                    <th>Inter Marks</th>
                    <th>Entrance Exam Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{student.sname}</td>
                    <td>{student.email}</td>
                    <td>{student.tenthMarks}</td>
                    <td>{student.interMarks}</td>
                    <td>{student.entranceExamScore ?? "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Applications Table */}
            <h4
              style={{
                color: "#2a3eb1",
                fontWeight: "600",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📄 Application Status
            </h4>

            <div style={{ overflowX: "auto" }}>
              <table
                border="1"
                cellPadding="8"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  backgroundColor: "white",
                  color: "#2a3eb1",
                  fontWeight: "500",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#2a3eb1", color: "white" }}>
                    <th>Application ID</th>
                    <th>Program</th>
                    <th>Department</th>
                    <th>Payment Done</th>
                    <th>Entrance Exam Score</th>
                    <th>Status</th>
                    <th>Rejection Reason</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {student.applications.map((app) => (
                    <tr key={app.applicationId}>
                      <td>{app.applicationId}</td>
                      <td>{app.program}</td>
                      <td>{app.department}</td>
                      <td>{app.paymentDone ? "✅ Yes" : "❌ No"}</td>
                      <td>{app.entranceExamScore}</td>
                      <td>
                        <span
                          style={{
                            backgroundColor:
                              app.status === "APPROVED"
                                ? "#198754"
                                : app.status === "REJECTED"
                                ? "#dc3545"
                                : "white",
                            color: app.status === "PENDING" ? "#2a3eb1" : "white",
                            padding: "4px 10px",
                            borderRadius: "15px",
                            fontSize: "0.85rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {app.status.toLowerCase()}
                        </span>
                      </td>
                      <td>{app.rejectionReason || "-"}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
