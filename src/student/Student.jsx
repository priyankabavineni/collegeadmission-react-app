import React, { useEffect, useState } from 'react';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    let request = await fetch('/api/student/all');
    let response = await request.json();

    console.log("Response: ", response);

    // If your API returns a list directly (not wrapped in { status, data }), use this:
    if (Array.isArray(response)) {
      setStudents(response);
    } else {
      setErrorMsg('No student data found');
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Student List</h2>

      {errorMsg ? (
        <div className="alert alert-warning text-center">{errorMsg}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>10th Marks</th>
                <th>Inter Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.sid}</td>
                  <td>{student.sname}</td>
                  <td>{student.email}</td>
                  <td>{student.role}</td>
                  <td>{student.tenthMarks}</td>
                  <td>{student.interMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
