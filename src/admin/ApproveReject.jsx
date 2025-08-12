import React, { useState } from "react";
import axios from "axios";
import "./View.css"; // CSS provided below

export default function ApproveReject({ show, onClose, application, action, onActionComplete }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async () => {
    if (action === "reject" && !reason.trim()) {
      setError("Please enter a reason for rejection.");
      return;
    }

    if (application.status.toLowerCase() !== "pending") {
      setError("Action not allowed. Application is not pending.");
      return;
    }

    setLoading(true);
    setError("");
try {
  const res = await axios.post("/api/admin/action", {
    applicationId: application.applicationId,
    action,
    rejectionReason: action === "reject" ? reason.trim() : "",
    adminId: 101,
  });
  
  console.log("API response:", res.data); // <-- Add this line to debug

  if (res.data.status === "success") {
    // Success logic here
  } else {
    setError(res.data.message || "Failed to update application.");
  }
} catch (err) {
  console.error(err);
  setError("Server error while processing request.");
}

    setLoading(false);
  };

  return (
    <div className="glass-modal-overlay">
      <div className="glass-modal">
        <div className="glass-header">
          <h2>{action === "approve" ? "Approve" : "Reject"} Application</h2>
          <button className="glass-close" onClick={onClose}>&times;</button>
        </div>
        <div className="glass-body">
          {action === "reject" ? (
            <>
              <label htmlFor="reason">Reason for Rejection:</label>
              <textarea
                id="reason"
                className="glass-textarea"
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={loading}
              />
            </>
          ) : (
            <p>Are you sure you want to approve this application?</p>
          )}
          {error && <div className="glass-error">{error}</div>}
        </div>
        <div className="glass-footer">
          <button className="glass-btn cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="glass-btn submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
