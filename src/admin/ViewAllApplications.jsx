
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import ViewByProgram from "./ViewByProgram";
import ViewByStatus from "./ViewByStatus";
import ViewByEmail from "./ViewByEmail";  // Import your new component
import ApproveReject from "./ApproveReject"; // assuming this is renamed properly
import "./View.css"
export default function ViewAllApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalAction, setModalAction] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState("all"); // all, program, status, email

  useEffect(() => {
    if (activeTab === "all") {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/applications");
      if (res.data.status === "success") {
        setApplications(res.data.data || []);
        setError("");
      } else {
        setApplications([]);
        setError("Failed to fetch applications");
      }
    } catch (err) {
      setApplications([]);
      setError("Server error while fetching applications");
    }
    setLoading(false);
  };

  const openModal = (application, action) => {
    setSelectedApplication(application);
    setModalAction(action);
    setShowModal(true);
    setError("");
  };

  const handleActionComplete = (updatedApplication) => {
    // Update the applications list with updatedApplication status
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.applicationId === updatedApplication.applicationId ? updatedApplication : app
      )
    );
    setShowModal(false);
  };

  const renderApplicationRows = (apps) =>
    apps.map((app) => {
      const status = app.status ? app.status.trim().toLowerCase() : "";
      const isPending = status === "pending";

      return (
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
      );
    });

  return (
    <div style={{ padding: "20px" }}>
      <h4 className="mb-4">Applications</h4>

      {/* Tabs */}
     
      {/* Content by tab */}
      {activeTab === "all" && (
        <>
          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <p>Loading applications...</p>
          ) : applications.length === 0 ? (
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
        </>
      )}

      {activeTab === "program" && <ViewByProgram />}

      {activeTab === "status" && <ViewByStatus />}

      {activeTab === "email" && <ViewByEmail />}  {/* New tab content */}

      {/* Approve/Reject Modal */}
      {showModal && selectedApplication && (
        <ApproveReject
          show={showModal}
          onClose={() => setShowModal(false)}
          application={selectedApplication}
          action={modalAction}
          onActionComplete={handleActionComplete}
        />
      )}
    </div>
  );
}
