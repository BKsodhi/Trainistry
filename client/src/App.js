// import React from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import LandingPage from "./pages/LandingPage";
// import AccountType from "./pages/auth/AccountType";
// import TrainerRegister from "./pages/auth/TrainerRegister";
// import CompanyRegister from "./pages/auth/CompanyRegister";
// import Login from "./pages/auth/Login";
// import CompanyDashboard from "./pages/company/CompanyDashboard";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/select-account" element={<AccountType />} />
//         <Route path="/register-trainer" element={<TrainerRegister />} />
//         <Route path="/register-company" element={<CompanyRegister />} />
//         <Route path="/login" element={<Login />} />

//         {/* ✅ ADD THIS ROUTE */}
//         <Route path="/company-dashboard" element={<CompanyDashboard />} />
//       </Routes>
//     </Router>
//   );
// }
// // ✅ Set default Authorization header if token exists on app load
// const token = localStorage.getItem("token");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

// export default App;

// import React from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import LandingPage from "./pages/LandingPage";
// import AccountType from "./pages/auth/AccountType";
// import TrainerRegister from "./pages/auth/TrainerRegister";
// import CompanyRegister from "./pages/auth/CompanyRegister";
// import Login from "./pages/auth/Login";
// import CompanyDashboard from "./pages/company/CompanyDashboard";
// import TrainerDashboard from "./pages/trainer/TrainerDashboard"; 
// import TrainerApplications from "./pages/trainer/TrainerApplications";
// import ApplyForProject from "./pages/trainer/ApplyForProject";
// import ProjectApplications from "./pages/company/ProjectApplications";
// import TrainerNotifications from "./pages/trainer/TrainerNotifications";
// import ProjectDetails from "./pages/trainer/ProjectDetails";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/select-account" element={<AccountType />} />
//         <Route path="/register-trainer" element={<TrainerRegister />} />
//         <Route path="/register-company" element={<CompanyRegister />} />
//         <Route path="/login" element={<Login />} />

//         {/* ✅ Company dashboard */}
//         <Route path="/company-dashboard" element={<CompanyDashboard />} />

//         {/* ✅ Trainer dashboard */}
//         <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
//         <Route path="/trainer/applications" element={<TrainerApplications />} />
//         <Route path="/trainer/apply/:projectId" element={<ApplyForProject />} />
//         <Route path="/trainer/notifications" element={<TrainerNotifications />} />
//         <Route
//   path="/company/project/:projectId/applications"
//   element={<ProjectApplications />}
// />
// <Route path="/trainer/project/:projectId" element={<ProjectDetails />} />
//       </Routes>
//     </Router>
//   );
// }

// // ✅ Set default Authorization header if token exists on app load
// const token = localStorage.getItem("token");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

// export default App;

// import React from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import LandingPage from "./pages/LandingPage";
// import AccountType from "./pages/auth/AccountType";
// import TrainerRegister from "./pages/auth/TrainerRegister";
// import CompanyRegister from "./pages/auth/CompanyRegister";
// import Login from "./pages/auth/Login";

// // Company Imports
// import CompanyDashboard from "./pages/company/CompanyDashboard";
// import ProjectApplications from "./pages/company/ProjectApplications";

// // Trainer Imports
// import TrainerDashboard from "./pages/trainer/TrainerDashboard"; 
// import TrainerApplications from "./pages/trainer/TrainerApplications";
// import ApplyForProject from "./pages/trainer/ApplyForProject";
// import TrainerNotifications from "./pages/trainer/TrainerNotifications";
// import ProjectDetails from "./pages/trainer/ProjectDetails";
// import Profile from "./pages/trainer/Profile"; 
// import Network from "./pages/trainer/Network";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Auth Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/select-account" element={<AccountType />} />
//         <Route path="/register-trainer" element={<TrainerRegister />} />
//         <Route path="/register-company" element={<CompanyRegister />} />
//         <Route path="/login" element={<Login />} />

//         {/* Company Routes */}
//         <Route path="/company-dashboard" element={<CompanyDashboard />} />
//         <Route path="/company/project/:projectId/applications" element={<ProjectApplications />} />

//         {/* Trainer Routes */}
//         <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
//         <Route path="/trainer/applications" element={<TrainerApplications />} />
//         <Route path="/trainer/apply/:projectId" element={<ApplyForProject />} />
//         <Route path="/trainer/notifications" element={<TrainerNotifications />} />
//         <Route path="/trainer/project/:projectId" element={<ProjectDetails />} />
//         <Route path="/trainer/profile" element={<Profile />} /> {/* ✅ ADDED PROFILE ROUTE */}
//         <Route path="/trainer/network" element={<Network />} />
//       </Routes>
//     </Router>
//   );
// }

// // ✅ Set default Authorization header if token exists on app load
// const token = localStorage.getItem("token");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

// export default App;

// import React from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import LandingPage from "./pages/LandingPage";
// import AccountType from "./pages/auth/AccountType";
// import TrainerRegister from "./pages/auth/TrainerRegister";
// import CompanyRegister from "./pages/auth/CompanyRegister";
// import Login from "./pages/auth/Login";

// // Company Imports
// import CompanyDashboard from "./pages/company/CompanyDashboard";
// import ProjectApplications from "./pages/company/ProjectApplications";

// // Trainer Imports
// import TrainerDashboard from "./pages/trainer/TrainerDashboard"; 
// import TrainerApplications from "./pages/trainer/TrainerApplications";
// import ApplyForProject from "./pages/trainer/ApplyForProject";
// import TrainerNotifications from "./pages/trainer/TrainerNotifications";
// import ProjectDetails from "./pages/trainer/ProjectDetails";
// import Profile from "./pages/trainer/Profile"; 
// import Network from "./pages/trainer/Network";

// // Admin Import ✅
// import AdminDashboard from "./pages/admin/AdminDashboard";

// // Simple Protected Route Component
// const ProtectedRoute = ({ children, allowedRole }) => {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role"); // Ensure you save 'role' in localStorage during Login

//   if (!token) return <Navigate to="/login" />;
//   if (allowedRole && userRole !== allowedRole) return <Navigate to="/" />;
  
//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Auth Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/select-account" element={<AccountType />} />
//         <Route path="/register-trainer" element={<TrainerRegister />} />
//         <Route path="/register-company" element={<CompanyRegister />} />
//         <Route path="/login" element={<Login />} />

//         {/* Admin Routes ✅ */}
//         <Route 
//           path="/admin-dashboard" 
//           element={
//             <ProtectedRoute allowedRole="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           } 
//         />

//         {/* Company Routes */}
//         <Route path="/company-dashboard" element={<CompanyDashboard />} />
//         <Route path="/company/project/:projectId/applications" element={<ProjectApplications />} />

//         {/* Trainer Routes */}
//         <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
//         <Route path="/trainer/applications" element={<TrainerApplications />} />
//         <Route path="/trainer/apply/:projectId" element={<ApplyForProject />} />
//         <Route path="/trainer/notifications" element={<TrainerNotifications />} />
//         <Route path="/trainer/project/:projectId" element={<ProjectDetails />} />
//         <Route path="/trainer/profile" element={<Profile />} />
//         <Route path="/trainer/network" element={<Network />} />
//       </Routes>
//     </Router>
//   );
// }

// // ✅ Set default Authorization header if token exists on app load
// const token = localStorage.getItem("token");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

// export default App;

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AccountType from "./pages/auth/AccountType";
import TrainerRegister from "./pages/auth/TrainerRegister";
import CompanyRegister from "./pages/auth/CompanyRegister";
import Login from "./pages/auth/Login";

// Company Imports
import CompanyDashboard from "./pages/company/CompanyDashboard";
import ProjectApplications from "./pages/company/ProjectApplications";
// ⭐ NEW ADDITIONS FOR VERIFIED SIDEBAR DASHBOARD NAVIGATION ITEMS
import Shortlisted from "./pages/company/Shortlisted";
import ScheduleInterview from "./pages/company/ScheduleInterview";

// Trainer Imports
import TrainerDashboard from "./pages/trainer/TrainerDashboard"; 
import TrainerApplications from "./pages/trainer/TrainerApplications";
import ApplyForProject from "./pages/trainer/ApplyForProject";
import TrainerNotifications from "./pages/trainer/TrainerNotifications";
import ProjectDetails from "./pages/trainer/ProjectDetails";
import Profile from "./pages/trainer/Profile"; 
import Network from "./pages/trainer/Network";

// Admin Import ✅
import AdminDashboard from "./pages/admin/AdminDashboard";

// Simple Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Ensure you save 'role' in localStorage during Login

  if (!token) return <Navigate to="/login" />;
  if (allowedRole && userRole !== allowedRole) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-account" element={<AccountType />} />
        <Route path="/register-trainer" element={<TrainerRegister />} />
        <Route path="/register-company" element={<CompanyRegister />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes ✅ */}
        <Route 
          path="/admin-dashboard" 
          element = {
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Company Routes */}
        <Route 
          path="/company-dashboard" 
          element = {
            <ProtectedRoute allowedRole="company">
              <CompanyDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/company/project/:projectId/applications" 
          element = {
            <ProtectedRoute allowedRole="company">
              <ProjectApplications />
            </ProtectedRoute>
          } 
        />
        {/* ⭐ NEW PROTECTION ROUTES LINKED DIRECTLY TO YOUR SIDEBAR PANEL VIEW CLICKS */}
        <Route 
          path="/company/shortlisted" 
          element = {
            <ProtectedRoute allowedRole="company">
              <Shortlisted />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/company/schedule-interview" 
          element = {
            <ProtectedRoute allowedRole="company">
              <ScheduleInterview />
            </ProtectedRoute>
          } 
        />

        {/* Trainer Routes */}
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/trainer/applications" element={<TrainerApplications />} />
        <Route path="/trainer/apply/:projectId" element={<ApplyForProject />} />
        <Route path="/trainer/notifications" element={<TrainerNotifications />} />
        <Route path="/trainer/project/:projectId" element={<ProjectDetails />} />
        <Route path="/trainer/profile" element={<Profile />} />
        <Route path="/trainer/network" element={<Network />} />
      </Routes>
    </Router>
  );
}

// ✅ Set default Authorization header if token exists on app load
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default App;