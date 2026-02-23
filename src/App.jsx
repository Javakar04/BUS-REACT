import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import InchargeDashboard from './pages/InchargeDashboard';
import StudentPortal from './pages/StudentPortal';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><RoleSelection /></>} />
        <Route path="/login/:role" element={<><Header /><Login /></>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/incharge/dashboard" element={<InchargeDashboard />} />
        <Route path="/student/dashboard" element={<StudentPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
