import React, { useState } from "react";
import axios from "axios";
import { Button, Spinner, Alert } from "react-bootstrap";
import "./View.css"

export default function ViewByProgram() {
  const [program, setProgram] = useState("");
  const [department, setDepartment] = useState("");
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const programsList = ["B.Tech", "M.Tech", "MBA", "MCA"];

  const departmentsMap = {
    "B.Tech": ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT"],
    "M.Tech": ["CSE", "VLSI Design", "Structural Engg", "Thermal Engg"],
    "MBA": ["Finance", "Marketing", "HR", "Operations"],
    "MCA": ["Computer Applications", "Data Science"],
  };

  const fetchApplications = async () => {
    if (!program || !department) {
      setError("Please select both program and department");
      setApplications([]);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.get(
        `/api/admin/applications/program/${encodeURIComponent(program)}/department/${encodeURIComponent(department)}`
      );

      if (res.data.status === "success") {
        if (res.data.data.length === 0) {
          setApplications([]);
          setError(`No applications found for ${program} - ${department}`);
        } else {
          setApplications(res.data.data);
          setError("");
        }
      } else {
        setApplications([]);
        setError(res.data.message || "Failed to fetch applications");
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
      setError("Server error while fetching applications");
    }

    setLoading(false);
  };

  // Function to render rows for the applications table
  const renderApplicationRows = (apps) => {
    return apps.map((app) => (
      <tr key={app.applicationId}>
        <td>{app.applicationId}</td>
        <td>{app.email}</td>
        <td>{app.program}</td>
        <td>{app.department}</td>
        <td>{app.paymentDone ? "Yes" : "No"}</td>
        <td>{app.entranceExamScore}</td>
        <td>{app.status}</td>
        <td>{app.rejectionReason || "N/A"}</td>
       
      </tr>
    ));
  };

  return (
    <div>
      <h4>View Applications by Program and Department</h4>
<div className="form-center-wrapper">
  <div className="program-department-form">
    <select
      className="form-select"
      value={program}
      onChange={(e) => {
        setProgram(e.target.value);
        setDepartment("");
      }}
    >
      <option value="">Select Program</option>
      {programsList.map((prog) => (
        <option key={prog} value={prog}>
          {prog}
        </option>
      ))}
    </select>

    <select
      className="form-select"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
      disabled={!program}
    >
      <option value="">Select Department</option>
      {program &&
        departmentsMap[program].map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
    </select>

    <Button variant="primary" onClick={fetchApplications} disabled={loading}>
      {loading ? (
        <>
          <Spinner animation="border" size="sm" /> Loading...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  </div>
</div>


      {error && <Alert variant="danger">{error}</Alert>}

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Email</th>
                <th>Program</th>
                <th>Department</th>
                <th>Payment</th>
                <th>Exam Score</th>
                <th>Status</th>
                <th>Rejection Reason</th>
             
              </tr>
            </thead>
            <tbody>{renderApplicationRows(applications)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

