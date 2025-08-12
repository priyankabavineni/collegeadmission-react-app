// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ChatPopup from './chatbot/ChatPopup';
import Main from './main/Main';
import Login from './Login/Login';
import ApplicationSubmit from './application/ApplicationSubmit';
import StudentRegistration from './student/StudentRegistration';
import StudentStatus from './status/StudentStatus';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin'; // Admin login component

import './App.css';

function App() {
  const isAdminAuthenticated = localStorage.getItem("adminLoggedIn") === "true";

  return (
    <Router>
      <ChatPopup />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/application" element={<ApplicationSubmit />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/status" element={<StudentStatus />} />

        {/* Admin login and protected admin dashboard */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        />

        {/* Fallback to main if no route matches */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
