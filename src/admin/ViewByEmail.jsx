

import React, { useState } from "react";
import ApproveReject from "./ApproveReject"; // Adjust the path if needed
import "./View.css"

export default function ViewByEmail() {
  const [email, setEmail] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchStudent = async () => {
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    setStudentData(null);

    try {
      const response = await fetch(`/api/admin/student/email/${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.status === "success") {
        setStudentData(data.data);
      } else {
        setError(data.message || "Failed to fetch student data");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (application, action) => {
    setSelectedApplication(application);
    setModalAction(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
    setModalAction(null);
  };

  const handleActionComplete = (updatedApp) => {
    setStudentData((prev) => ({
      ...prev,
      applications: prev.applications.map((app) =>
        app.applicationId === updatedApp.applicationId ? updatedApp : app
      ),
    }));
    closeModal();
  };

  return (
    <div>
      <h5>Search by Email</h5>
      <input
        type="email"
        value={email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={fetchStudent} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {studentData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Student Details</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>10th Marks</th>
                <th>Inter Marks</th>
                <th>Entrance Exam Taken</th>
                <th>Entrance Exam Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{studentData.sid}</td>
                <td>{studentData.sname}</td>
                <td>{studentData.email}</td>
                <td>{studentData.tenthMarks}</td>
                <td>{studentData.interMarks}</td>
                <td>{studentData.entranceExam ? "Yes" : "No"}</td>
                <td>{studentData.entranceExamScore ?? "N/A"}</td>
              </tr>
            </tbody>
          </table>

          <h4>Applications</h4>
          {studentData.applications?.length > 0 ? (
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Program</th>
                  <th>Department</th>
                  <th>Payment Done</th>
                  <th>Entrance Exam Score</th>
                  <th>Status</th>
                  <th>Rejection Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentData.applications.map((app) => (
                  <tr key={app.applicationId}>
                    <td>{app.applicationId}</td>
                    <td>{app.program}</td>
                    <td>{app.department}</td>
                    <td>{app.paymentDone ? "Yes" : "No"}</td>
                    <td>{app.entranceExamScore}</td>
                    <td>{app.status}</td>
                    <td>{app.rejectionReason || "-"}</td>
                    <td>
                      {app.status?.toLowerCase() === "pending" ? (
                        <>
                          <button onClick={() => openModal(app, "approve")} style={{ marginRight: "5px" }}>
                            Approve
                          </button>
                          <button onClick={() => openModal(app, "reject")}>
                            Reject
                          </button>
                        </>
                      ) : (
                        <em>Action done</em>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      )}

      <ApproveReject
        show={showModal}
        onClose={closeModal}
        application={selectedApplication}
        action={modalAction}
        onActionComplete={handleActionComplete}
      />
    </div>
  );
}
