
import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin() {
  const adminId = 101;
  const [applications, setApplications] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [view, setView] = useState(""); // "", "all", "student", "status"
  const [showStudentIdInput, setShowStudentIdInput] = useState(false); // controls input visibility
  const [modalAppId, setModalAppId] = useState(null);
  const [modalAction, setModalAction] = useState("");
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);

  // NEW state for View Status functionality
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");  // "applied", "approved", "rejected"
  const [filteredApplications, setFilteredApplications] = useState([]);

  const fetchAllApplications = async () => {
    try {
      const res = await axios.get("/api/admin/applications");
      if (res.data.status === "success") {
        setApplications(res.data.data);
        setStudentData(null);
        setError("");
        setView("all");
      } else {
        setError("Failed to fetch applications");
      }
    } catch (err) {
      console.error("Server error while fetching applications:", err);
      setError("Server error while fetching applications");
    }
  };

  const fetchStudentApplications = async () => {
    if (!studentId) {
      setError("Please enter a student ID");
      return;
    }

    try {
      const res = await axios.get(`/api/admin/student/${studentId}`);
      if (res.data.status === "success") {
        setStudentData(res.data.data);
        setApplications([]);
        setError("");
        setView("student");
      } else {
        setError("Student not found");
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Server error while fetching student data");
    }
  };

 const fetchApplicationsByStatus = async (status) => {
  if (!status) {
    setError("Please select a status");
    return;
  }
  try {
    const res = await axios.get(`/api/admin/applications/${status.toUpperCase()}`);
    if (res.data.status === "success") {
      setFilteredApplications(res.data.data);
      setError("");
      setView("status");
      setShowStatusFilter(false);
      setApplications([]);
      setStudentData(null);
    } else {
      setError("Failed to fetch applications by status");
    }
  } catch (err) {
    console.error("Error fetching applications by status:", err);
    setError("Server error while fetching applications by status");
  }
};

  const handleBack = () => {
    setView("");
    setApplications([]);
    setStudentData(null);
    setError("");
    setStudentId("");
    setShowStudentIdInput(false);
    setShowStatusFilter(false);
    setStatusFilter("");
    setFilteredApplications([]);
  };

  const handleActionClick = (appId, action) => {
    setModalAppId(appId);
    setModalAction(action);
    setReason("");
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    if (!reason.trim()) {
      setError("Please enter a reason");
      return;
    }
    setError("");

    try {
      const res = await axios.post("/api/admin/action", {
        applicationId: modalAppId,
        action: modalAction,
        rejectionReason: reason.trim(), // your backend expects rejectionReason
        adminId: adminId,               // <-- add adminId here
      });

      if (res.data.status === "success") {
        // Update frontend state for the specific application with new status and reason
        if (view === "student" && studentData) {
          const updatedApplications = studentData.applications.map((app) => {
            if (app.applicationId === modalAppId) {
              return {
                ...app,
                status: modalAction === "approve" ? "APPROVED" : "REJECTED",
                rejectionReason: modalAction === "reject" ? reason.trim() : "",
              };
            }
            return app;
          });
          setStudentData({
            ...studentData,
            applications: updatedApplications,
          });
        } else if (view === "all") {
          const updatedApplications = applications.map((app) => {
            if (app.applicationId === modalAppId) {
              return {
                ...app,
                status: modalAction === "approve" ? "APPROVED" : "REJECTED",
                rejectionReason: modalAction === "reject" ? reason.trim() : "",
              };
            }
            return app;
          });
          setApplications(updatedApplications);
        } else if (view === "status") {
          // Update filteredApplications similarly
          const updatedApplications = filteredApplications.map((app) => {
            if (app.applicationId === modalAppId) {
              return {
                ...app,
                status: modalAction === "approve" ? "APPROVED" : "REJECTED",
                rejectionReason: modalAction === "reject" ? reason.trim() : "",
              };
            }
            return app;
          });
          setFilteredApplications(updatedApplications);
        }
        setShowModal(false);
      } else {
        setError("Failed to update application");
      }
    } catch (err) {
      console.error("Error updating application:", err);
      setError("Server error while updating application");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Panel</h2>

      {view === "" && (
        <div className="mb-4">
          {!showStudentIdInput && !showStatusFilter && (
            <>
              <button className="btn btn-primary me-2" onClick={fetchAllApplications}>
                All Applications
              </button>

              <button className="btn btn-primary me-2" onClick={() => {
                setShowStudentIdInput(true);
                setShowStatusFilter(false);
                setError("");
              }}>
                View by Student ID
              </button>

              <button className="btn btn-primary" onClick={() => {
                setShowStatusFilter(true);
                setShowStudentIdInput(false);
                setError("");
              }}>
                View Status
              </button>
            </>
          )}

          {/* Student ID input */}
          {showStudentIdInput && (
            <div className="mt-3 d-flex align-items-center gap-2">
              <input
                type="number"
                className="form-control w-auto"
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <button className="btn btn-primary" onClick={fetchStudentApplications}>
                Submit
              </button>
            </div>
          )}

          {/* Status filter dropdown */}
          {showStatusFilter && (
            <div className="mt-3 d-flex align-items-center gap-2">
              <select
                className="form-select w-auto"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="applied">Applied</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button className="btn btn-primary" onClick={() => fetchApplicationsByStatus(statusFilter)}>
                Submit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowStatusFilter(false);
                  setStatusFilter("");
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* All Applications View */}
      {view === "all" && applications.length > 0 && (
        <>
          <button className="btn btn-secondary mb-3" onClick={handleBack}>← Back</button>
          <h4>All Applications</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-hover mt-3">
              <thead className="table-light">
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
          </div>
        </>
      )}

      {/* Student Details View */}
      {view === "student" && studentData && (
        <>
          <button className="btn btn-secondary mb-3" onClick={handleBack}>← Back</button>
          <h4>Student Details</h4>
          <table className="table table-bordered w-100 mt-3">
            <tbody>
              <tr><th>ID</th><td>{studentData.sid}</td></tr>
              <tr><th>Name</th><td>{studentData.sname}</td></tr>
              <tr><th>Email</th><td>{studentData.email}</td></tr>
              <tr><th>10th Marks</th><td>{studentData.tenthMarks}</td></tr>
              <tr><th>Inter Marks</th><td>{studentData.interMarks}</td></tr>
              <tr><th>Entrance Exam</th><td>{studentData.entranceExam ? "Yes" : "No"}</td></tr>
              <tr><th>Entrance Exam Score</th><td>{studentData.entranceExamScore ?? "N/A"}</td></tr>
            </tbody>
          </table>

          {studentData.applications.length > 0 ? (
            <>
              <h5 className="mt-4">Applications</h5>
              <div className="table-responsive">
                <table className="table table-bordered table-hover mt-2">
                  <thead className="table-light">
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
                        <td>{app.rejectionReason || "N/A"}</td>
                        <td>
                          <button className="btn btn-success btn-sm me-1" onClick={() => handleActionClick(app.applicationId, "approve")}>Approve</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleActionClick(app.applicationId, "reject")}>Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="alert alert-info mt-3">No applications found for this student.</div>
          )}
        </>
      )}

      {view === "status" && (
  <>
    <button className="btn btn-secondary mb-3" onClick={handleBack}>← Back</button>
    <h4>Applications with Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</h4>

    {filteredApplications.length > 0 ? (
      <div className="table-responsive">
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-light">
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
            {filteredApplications.map((app) => (
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
      </div>
    ) : (
      <div className="alert alert-info mt-3">
        No applications found with this status.
      </div>
    )}
  </>
)}


      {/* Modal for Approve/Reject */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalAction === "approve" ? "Approve" : "Reject"} Application</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleModalSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

