import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminChat.css";

export default function AdminChat() {
  const [topQueries, setTopQueries] = useState([]);
  const [loadingQueries, setLoadingQueries] = useState(false);
  const [view, setView] = useState(""); // no default view selected

  // Fetch top queries JSON
  const fetchTopQueries = async () => {
    setLoadingQueries(true);
    try {
      const res = await axios.get("/api/chat/top-queries");
      setTopQueries(res.data);
    } catch (error) {
      console.error("Error fetching top queries:", error);
      alert("Failed to fetch top queries");
    }
    setLoadingQueries(false);
  };

  // Download chat history CSV from /export-history endpoint
  const downloadReport = async () => {
    try {
      const res = await axios.get("/api/chat/export-history", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "text/csv" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "chat_history.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report");
    }
  };

  useEffect(() => {
    if (view === "topQueries") {
      fetchTopQueries();
    }
  }, [view]);

  return (
    <div className="container">
      <h2>Admin Chatbot Management</h2>

      <label htmlFor="viewSelector" className="viewSelectorLabel">
        Select View:
      </label>
      <select
        id="viewSelector"
        value={view}
        onChange={(e) => setView(e.target.value)}
        className="viewSelector"
      >
        <option value="">-- Select an option --</option>
        <option value="topQueries">Top Queries</option>
        <option value="download">Chat History Download</option>
      </select>

      {view === "topQueries" && (
        <>
          <h3 >Top User Queries</h3>
          {loadingQueries ? (
            <p>Loading top queries...</p>
          ) : topQueries.length === 0 ? (
            <p>No queries found.</p>
          ) : (
            <table className="table" border="1" cellPadding="8" cellSpacing="0">
              <thead>
                <tr>
                  <th className="query" style={{ backgroundColor: '#2a3eb1', color: 'white' }}>Query</th>
                  <th className="count" style={{ backgroundColor: '#2a3eb1', color: 'white' }}>Count</th>
                </tr>
              </thead>
              <tbody>
                {topQueries.map((q, idx) => (
                  <tr key={idx}>
                    <td>{q.query}</td>
                    <td className="count">{q.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {view === "download" && (
        <>
          <h3>Download Chat History Report</h3>
          <button onClick={downloadReport} className="downloadButton">
            Download CSV Report
          </button>
        </>
      )}
    </div>
  );
}
