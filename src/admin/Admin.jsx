import React, { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const fetchAllApplications = async () => {
    try {
      const res = await axios.get("/api/admin/applications");
      if (res.data.status === "success") {
        setApplications(res.data.data);
        setError("");
      } else {
        setError("Failed to fetch applications");
      }
    } catch (err) {
      console.error("Server error while fetching applications:", err);
      setError("Server error while fetching applications");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={fetchAllApplications}>All Applications</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {applications.length > 0 && (
        <>
          <h3>All Applications</h3>
          <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student ID</th>
                <th>Program</th>
                <th>Department</th>
                <th>Payment Done</th>
                <th>Exam Score</th>
                <th>Status</th>
                <th>Rejection Reason</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.applicationId}>
                  <td>{app.applicationId}</td>
                  <td>{app.sid}</td>
                  <td>{app.program}</td>
                  <td>{app.department}</td>
                  <td>{app.paymentDone ? "Yes" : "No"}</td>
                  <td>{app.entranceExamScore}</td>
                  <td>{app.status}</td>
                  <td>{app.rejectionReason || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
