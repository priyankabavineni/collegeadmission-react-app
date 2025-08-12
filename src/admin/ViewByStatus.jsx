import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import "./View.css"
export default function ViewByStatus() {
  const [status, setStatus] = useState('');
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchApplicationsByStatus = async () => {
    if (!status) {
      setError("Please select a status");
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await axios.get(`/api/admin/applications/${status}`);
      if (res.data.status === 'success') {
        setApplications(res.data.data || []);
        if ((res.data.data || []).length === 0) {
          setError("No applications found for this status.");
        }
      } else {
        setError("Failed to fetch applications by status");
      }
    } catch (err) {
      console.error("Error fetching applications by status:", err);
      setError("Server error while fetching applications");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div   className="view-by-status-container">
      <h4>View Applications by Status</h4>

      <div className="form-center-wrapper">
  <Form className="mb-3 form-centered">
    <Form.Group>
      <Form.Label>Select Status</Form.Label>
      <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">-- Select Status --</option>
        <option value="APPROVED">APPROVED</option>
        <option value="REJECTED">REJECTED</option>
        <option value="Pending">PENDING</option>
      </Form.Select>
    </Form.Group>

    <div className="d-flex gap-2 mt-3 justify-content-center">
      <Button variant="primary" onClick={fetchApplicationsByStatus} disabled={loading}>
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            {' '}Loading...
          </>
        ) : (
          'Fetch Applications'
        )}
      </Button>
    </div>
  </Form>
</div>


      {error && <Alert variant="danger">{error}</Alert>}

      {!error && applications.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Email</th>
                <th>Program</th>
                <th>Department</th>
                <th>Payment</th>
                <th>Entrance Exam Score</th>
                <th>Status</th>
                <th>Rejection Reason</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.applicationId}>
                  <td>{app.applicationId}</td>
                  <td>{app.email}</td>
                  <td>{app.program}</td>
                  <td>{app.department}</td>
                  <td>{app.paymentDone ? 'Yes' : 'No'}</td>
                  <td>{app.entranceExamScore}</td>
                  <td>{app.status}</td>
                  <td>{app.rejectionReason || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}





















































