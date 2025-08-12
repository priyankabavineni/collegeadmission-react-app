import React, { useState } from "react";
import ViewAllApplications from "./ViewAllApplications";
import ViewByProgram from "./ViewByProgram";
import ViewByStatus from "./ViewByStatus";
import ViewByEmail from "./ViewByEmail";
import AdminChat from "./AdminChat"; // Import AdminChat
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [mainView, setMainView] = useState(null);
  const [applicationView, setApplicationView] = useState("viewAll"); // default filter

  const renderApplicationContent = () => {
    switch (applicationView) {
      case "viewAll":
        return <ViewAllApplications />;
      case "viewByProgram":
        return <ViewByProgram />;
      case "viewByStatus":
        return <ViewByStatus />;
      case "viewByEmail":
        return <ViewByEmail />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h2 className="dashboard-title">NDP Management Dashboard</h2>

        {!mainView && (
          <div className="button-grid">
            <button
              className="dashboard-button"
              onClick={() => {
                setMainView("applications");
                setApplicationView("viewAll");
              }}
            >
              Applications
            </button>
            <button
              className="dashboard-button"
              onClick={() => setMainView("chatbot")}
            >
              Chatbot
            </button>
          </div>
        )}

        {mainView === "applications" && (
          <>
            <div className="back-button-container">
              <button className="back-button" onClick={() => setMainView(null)}>
                ← Back to Dashboard
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="filterType" style={{ marginRight: "10px" }}>
                Select Filter:
              </label>
              <select
                id="filterType"
                value={applicationView}
                onChange={(e) => setApplicationView(e.target.value)}
              >
                <option value="viewAll">View All Applications</option>
                <option value="viewByEmail">Search by Email</option>
                <option value="viewByStatus">Filter by Status</option>
                <option value="viewByProgram">Filter by Program/Department</option>
              </select>
            </div>

            <div className="application-content">{renderApplicationContent()}</div>
          </>
        )}

        {mainView === "chatbot" && (
          <>
            <div className="back-button-container" style={{ marginBottom: 20 }}>
              <button className="back-button" onClick={() => setMainView(null)}>
                ← Back to Dashboard
              </button>
            </div>
            <AdminChat />
          </>
        )}
      </div>
    </div>
  );
}
