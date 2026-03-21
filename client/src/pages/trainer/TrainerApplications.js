// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerApplications() {

//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = async () => {

//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/trainer/applications",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setApplications(res.data.data || []);

//     } catch (error) {

//       console.error("Error fetching applications:", error);

//     } finally {

//       setLoading(false);

//     }

//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   if (loading) {
//     return <h2 className="loading">Loading Applications...</h2>;
//   }

//   return (

//     <div className="trainer-dashboard">

//       {/* Sidebar */}

//       <div className="sidebar">

//         <h2 className="logo">Trainistry</h2>

//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href="/trainer-dashboard"}
//         >
//           Available Projects
//         </button>

//         <button
//           className="sidebar-btn active"
//         >
//           My Applications
//         </button>

//         <button
//           className="logout-btn"
//           onClick={logout}
//         >
//           Logout
//         </button>

//       </div>


//       {/* Main */}

//       <div className="main-content">

//         <h1>My Applications</h1>

//         {applications.length === 0 ? (

//           <p>You have not applied to any projects yet.</p>

//         ) : (

//           <div className="projects-container">

//             {applications.map((app) => {

//               const project = app.project;

//               const budget =
//                 project.perDayPayment && project.durationDays
//                   ? project.perDayPayment * project.durationDays
//                   : "N/A";

//               return (

//                 <div
//                   key={app._id}
//                   className="project-card"
//                 >

//                   <h3>{project.title}</h3>

//                   <p>
//                     <b>Company:</b> {project.company?.name}
//                   </p>

//                   <p>
//                     <b>Technology:</b> {project.technology}
//                   </p>

//                   <p>
//                     <b>Budget:</b> ₹{budget}
//                   </p>

//                   <p>
//                     <b>Duration:</b> {project.durationDays} days
//                   </p>

//                   <p>
//                     <b>Expected Rate:</b> ₹{app.expectedRate}
//                   </p>

//                   <p>
//                     <b>Status:</b>
//                     <span className={`status ${app.status}`}>
//                       {app.status}
//                     </span>
//                   </p>

//                   {app.interviewDate && (

//                     <p>
//                       <b>Interview:</b>{" "}
//                       {new Date(app.interviewDate).toLocaleDateString()}
//                     </p>

//                   )}

//                 </div>

//               );

//             })}

//           </div>

//         )}

//       </div>

//     </div>

//   );

// }

// export default TrainerApplications;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchApplications();
//   }, [token, navigate]);

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   if (loading) {
//     return <div className="loader">Loading Trainistry...</div>;
//   }

//   return (
//     <div className="trainer-dashboard">
//       {/* 1. SIDEBAR */}
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>
//             Find Projects
//           </button>
//           <button className="sidebar-btn active">
//             My Applications
//           </button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>
//             My Profile
//           </button>
//         </nav>
//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </aside>

//       {/* 2. MAIN CONTENT */}
//       <main className="main-content">
//         <header className="header-section">
//           <h1>My Applications</h1>
//         </header>

//         {applications.length === 0 ? (
//           <div className="stat-card glass" style={{ textAlign: "center", padding: "40px" }}>
//             <p>You have not applied to any projects yet.</p>
//             <button className="apply-btn" onClick={() => navigate("/trainer-dashboard")}>
//               Browse Projects
//             </button>
//           </div>
//         ) : (
//           <div className="applications-grid">
//             {applications.map((app) => {
//               const project = app.project || {};
//               const budget = project.perDayPayment && project.durationDays
//                 ? project.perDayPayment * project.durationDays
//                 : "N/A";

//               return (
//                 <div key={app._id} className="application-card glass">
//                   {/* Card Top: Title and Status Badge */}
//                   <div className="app-card-header">
//                     <h3>{project.title || "Untitled Project"}</h3>
//                     <span className={`status-badge status-${app.status?.toLowerCase()}`}>
//                       {app.status?.replace("_", " ")}
//                     </span>
//                   </div>

//                   {/* Card Body: Structured Grid */}
//                   <div className="project-details">
//                     <div className="detail-item">
//                       <span className="detail-label">Company</span>
//                       <span className="detail-value">{project.company?.name || "N/A"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Technology</span>
//                       <span className="detail-value">{project.technology || "N/A"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Budget</span>
//                       <span className="detail-value">₹{budget}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Duration</span>
//                       <span className="detail-value">{project.durationDays} Days</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">My Bid</span>
//                       <span className="detail-value">₹{app.expectedRate}/day</span>
//                     </div>
//                   </div>

//                   {/* Card Bottom: Important Date Highlight */}
//                   {app.interviewDate && (
//                     <div className="interview-highlight">
//                       <span className="detail-label">Interview Scheduled</span>
//                       <span className="detail-value">
//                         {new Date(app.interviewDate).toLocaleDateString('en-IN', {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default TrainerApplications;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchApplications();
//   }, [token, navigate]);

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   if (loading) {
//     return <div className="loader">Loading Trainistry...</div>;
//   }

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>
//             Find Projects
//           </button>
//           {/* ADDED NETWORK FEED BUTTON */}
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>
//             Network Feed
//           </button>
//           <button className="sidebar-btn active">
//             My Applications
//           </button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>
//             My Profile
//           </button>
//         </nav>
//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>My Applications</h1>
//         </header>

//         {applications.length === 0 ? (
//           <div className="stat-card glass" style={{ textAlign: "center", padding: "40px" }}>
//             <p>You have not applied to any projects yet.</p>
//             <button className="apply-btn" onClick={() => navigate("/trainer-dashboard")}>
//               Browse Projects
//             </button>
//           </div>
//         ) : (
//           <div className="applications-grid">
//             {applications.map((app) => {
//               const project = app.project || {};
//               const budget = project.perDayPayment && project.durationDays
//                 ? project.perDayPayment * project.durationDays
//                 : "N/A";

//               return (
//                 <div key={app._id} className="application-card glass">
//                   <div className="app-card-header">
//                     <h3>{project.title || "Untitled Project"}</h3>
//                     <span className={`status-badge status-${app.status?.toLowerCase()}`}>
//                       {app.status?.replace("_", " ")}
//                     </span>
//                   </div>

//                   <div className="project-details">
//                     <div className="detail-item">
//                       <span className="detail-label">Company</span>
//                       <span className="detail-value">{project.company?.name || "N/A"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Technology</span>
//                       <span className="detail-value">{project.technology || "N/A"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Budget</span>
//                       <span className="detail-value">₹{budget}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Duration</span>
//                       <span className="detail-value">{project.durationDays} Days</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">My Bid</span>
//                       <span className="detail-value">₹{app.expectedRate}/day</span>
//                     </div>
//                   </div>

//                   {app.interviewDate && (
//                     <div className="interview-highlight">
//                       <span className="detail-label">Interview Scheduled</span>
//                       <span className="detail-value">
//                         {new Date(app.interviewDate).toLocaleDateString('en-IN', {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default TrainerApplications;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchApplications();
//   }, [token, navigate]);

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWithdraw = async (applicationId) => {
//     if (!window.confirm("Are you sure you want to withdraw this application? This action cannot be undone.")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/trainer/applications/${applicationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(applications.filter(app => app._id !== applicationId));
//       alert("Application withdrawn successfully.");
//     } catch (error) {
//       console.error("Error withdrawing:", error);
//       alert(error.response?.data?.message || "Failed to withdraw application.");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/"); // Redirect to landing page
//   };

//   if (loading) {
//     return <div className="loader">Loading Trainistry...</div>;
//   }

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="sidebar-logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>
//             Find Projects
//           </button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>
//             Network Feed
//           </button>
//           <button className="sidebar-btn active">
//             My Applications
//           </button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>
//             My Profile
//           </button>
//         </nav>
//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header">
//           <h1>My Applications</h1>
//         </header>

//         {applications.length === 0 ? (
//           <div className="dashboard-card glass" style={{ textAlign: "center", padding: "60px" }}>
//             <p>You have not applied to any projects yet.</p>
//             <button className="btn-primary" style={{ marginTop: '20px', width: 'auto' }} onClick={() => navigate("/trainer-dashboard")}>
//               Browse Projects
//             </button>
//           </div>
//         ) : (
//           <div className="applications-grid">
//             {applications.map((app) => {
//               const project = app.project || {};
//               const budget = project.perDayPayment && project.durationDays
//                 ? project.perDayPayment * project.durationDays
//                 : "N/A";

//               return (
//                 <div key={app._id} className="application-card glass">
//                   <div className="app-card-header">
//                     <h3>{project.title || "Untitled Project"}</h3>
//                     <span className={`status-badge status-${app.status?.toLowerCase()}`}>
//                       {app.status?.replace("_", " ")}
//                     </span>
//                   </div>

//                   <div className="project-details">
//                     <div className="detail-item">
//                       <span className="detail-label">Company</span>
//                       <span className="detail-value">{project.company?.name || "N/A"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Technology</span>
//                       <span className="detail-value">{project.technology || "N/A"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Total Budget</span>
//                       <span className="detail-value">₹{budget}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Duration</span>
//                       <span className="detail-value">{project.durationDays} Days</span>
//                     </div>
//                   </div>

//                   {app.interviewDate && (
//                     <div className="info-tag" style={{ margin: '15px 0' }}>
//                       📅 Interview: {new Date(app.interviewDate).toLocaleDateString('en-IN')}
//                     </div>
//                   )}

//                   {/* WITHDRAW BUTTON AT THE BOTTOM */}
//                   <div className="card-footer" style={{ marginTop: "auto", paddingTop: "15px", borderTop: "1px solid var(--border-soft)" }}>
//                     <button 
//                       className="withdraw-btn" 
//                       onClick={() => handleWithdraw(app._id)}
//                       disabled={app.status === 'accepted'}
//                     >
//                       {app.status === 'accepted' ? "Accepted - Contact Company" : "Withdraw Application"}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default TrainerApplications;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchApplications();
//   }, [token, navigate]);

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper to calculate payment deadline (15-day rule)
//   const getPaymentInfo = (project) => {
//     if (project.status !== 'completed' || !project.paymentDeadline) return null;
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return { days: diffDays, date: deadline.toLocaleDateString('en-IN') };
//   };

//   const handleWithdraw = async (applicationId) => {
//     if (!window.confirm("Are you sure you want to withdraw this application? This action cannot be undone.")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/trainer/applications/${applicationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(applications.filter(app => app._id !== applicationId));
//       alert("Application withdrawn successfully.");
//     } catch (error) {
//       console.error("Error withdrawing:", error);
//       alert(error.response?.data?.message || "Failed to withdraw application.");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   if (loading) {
//     return <div className="loader">Loading Trainistry...</div>;
//   }

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="sidebar-logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>
//             Find Projects
//           </button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>
//             Industrial Network
//           </button>
//           <button className="sidebar-btn active">
//             My Applications
//           </button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>
//             My Profile
//           </button>
//         </nav>
//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header">
//           <h1>My Applications</h1>
//         </header>

//         {applications.length === 0 ? (
//           <div className="dashboard-card glass" style={{ textAlign: "center", padding: "60px" }}>
//             <p>You have not applied to any projects yet.</p>
//             <button className="btn-primary" style={{ marginTop: '20px', width: 'auto' }} onClick={() => navigate("/trainer-dashboard")}>
//               Browse Projects
//             </button>
//           </div>
//         ) : (
//           <div className="applications-grid">
//             {applications.map((app) => {
//               const project = app.project || {};
//               const budget = project.perDayPayment && project.durationDays
//                 ? project.perDayPayment * project.durationDays
//                 : "N/A";
              
//               const payInfo = getPaymentInfo(project);

//               return (
//                 <div key={app._id} className={`application-card glass ${app.status === 'selected' ? 'border-success' : ''}`}>
//                   {/* CONGRATULATIONS BANNER FOR SELECTED TRAINERS */}
//                   {app.status === 'selected' && (
//                     <div className="selection-banner" style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>
//                       🎉 Congratulations! You are Selected
//                     </div>
//                   )}

//                   <div className="app-card-header">
//                     <h3>{project.title || "Untitled Project"}</h3>
//                     <span className={`status-badge status-${app.status?.toLowerCase()}`}>
//                       {app.status?.replace("_", " ")}
//                     </span>
//                   </div>

//                   <div className="project-details">
//                     <div className="detail-item">
//                       <span className="detail-label">Company</span>
//                       <span className="detail-value">{project.company?.name || "N/A"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Technology</span>
//                       <span className="detail-value">{project.technology || "N/A"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Total Budget</span>
//                       <span className="detail-value">₹{budget}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Duration</span>
//                       <span className="detail-value">{project.durationDays} Days</span>
//                     </div>
//                   </div>

//                   {/* INTERVIEW INFO */}
//                   {app.status === 'interview_scheduled' && app.interviewDate && (
//                     <div className="info-tag" style={{ margin: '15px 0', backgroundColor: '#eff6ff', color: '#1e40af', padding: '10px', borderRadius: '5px' }}>
//                       📅 Interview: {new Date(app.interviewDate).toLocaleDateString('en-IN')} at {app.interviewTime}
//                     </div>
//                   )}

//                   {/* SIR'S REQUIREMENT: PAYMENT DEADLINE INFO */}
//                   {payInfo && (
//                     <div className="payment-tag" style={{ margin: '15px 0', padding: '10px', borderRadius: '5px', backgroundColor: payInfo.days <= 3 ? '#fee2e2' : '#fef3c7' }}>
//                       💰 Payment Expected: <strong>{payInfo.date}</strong>
//                       <br/>
//                       <small>{payInfo.days > 0 ? `(${payInfo.days} days remaining)` : '(Deadline reached)'}</small>
//                     </div>
//                   )}

//                   <div className="card-footer" style={{ marginTop: "auto", paddingTop: "15px", borderTop: "1px solid var(--border-soft)" }}>
//                     <button 
//                       className="withdraw-btn" 
//                       onClick={() => handleWithdraw(app._id)}
//                       disabled={app.status === 'selected' || app.status === 'rejected'}
//                     >
//                       {app.status === 'selected' ? "Selection Confirmed" : "Withdraw Application"}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default TrainerApplications;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchApplications();
//   }, [token, navigate]);

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getPaymentInfo = (project) => {
//     if (project.status !== 'completed' || !project.paymentDeadline) return null;
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return { days: diffDays, date: deadline.toLocaleDateString('en-IN') };
//   };

//   const handleWithdraw = async (applicationId) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/trainer/applications/${applicationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(applications.filter(app => app._id !== applicationId));
//     } catch (error) {
//       alert("Failed to withdraw.");
//     }
//   };

//   // ======= UPDATED DISPUTE LOGIC =======
//   const handleMarkDisputed = async (applicationId) => {
//     if (!window.confirm("Mark this project as disputed? This notifies the company.")) return;
//     try {
//       // Points to the specific application ID
//       await axios.put(`http://localhost:5000/api/trainer/applications/${applicationId}/dispute`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Project marked as Disputed.");
//       fetchApplications();
//     } catch (error) {
//       alert("Failed to mark dispute. Check your backend routes.");
//     }
//   };

//   const handlePostWarning = async (app) => {
//     const confirmWarning = window.confirm("This will post a PUBLIC warning and drop the Trust Score. Proceed?");
//     if (!confirmWarning) return;

//     try {
//       await axios.post("http://localhost:5000/api/posts", {
//         title: `⚠️ Payment Warning: ${app.project.title}`,
//         description: `Payment overdue for project completed on ${new Date(app.projectEndDate).toLocaleDateString()}.`,
//         postType: 'warning',
//         relatedCompany: app.project.company._id || app.project.company,
//         authorRole: 'trainer'
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert("Warning posted! Trust Score updated.");
//       fetchApplications();
//     } catch (err) {
//       alert("Error posting warning.");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   if (loading) return <div className="loader">Loading...</div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="sidebar-logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>Industrial Network</button>
//           <button className="sidebar-btn active">My Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header"><h1>My Applications</h1></header>
//         <div className="applications-grid">
//           {applications.map((app) => {
//             const project = app.project || {};
//             const budget = project.perDayPayment * project.durationDays || "N/A";
//             const payInfo = getPaymentInfo(project);

//             return (
//               <div key={app._id} className={`application-card glass ${app.status === 'selected' ? 'border-success' : ''}`}>
//                 <div className="app-card-header">
//                   <h3>{project.title}</h3>
//                   <div style={{ display: 'flex', gap: '5px' }}>
//                     {/* THIS BADGE ONLY SHOWS IF ISDISPUTED IS TRUE IN DB */}
//                     {app.isDisputed && <span className="status-badge" style={{ backgroundColor: '#ef4444' }}>DISPUTED</span>}
//                     <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status}</span>
//                   </div>
//                 </div>

//                 <div className="project-details">
//                    <div className="detail-item"><span className="detail-label">Company</span><span className="detail-value">{project.company?.name}</span></div>
//                    <div className="detail-item"><span className="detail-label">Total Budget</span><span className="detail-value">₹{budget}</span></div>
//                 </div>

//                 {payInfo && (
//                   <div className="payment-tag" style={{ margin: '15px 0', padding: '10px', borderRadius: '5px', backgroundColor: '#fef3c7' }}>
//                     💰 Payment Expected: <strong>{payInfo.date}</strong>
//                   </div>
//                 )}

//                 <div className="card-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
//                   {/* BUTTON 1: Mark Disputed (Shows if completed and not yet disputed) */}
//                   {app.status === 'completed' && !app.isDisputed && (
//                     <button className="btn-outline-danger" onClick={() => handleMarkDisputed(app._id)}>
//                       ⚠️ Mark Disputed
//                     </button>
//                   )}

//                   {/* BUTTON 2: Warn Network (ONLY SHOWS IF ISDISPUTED IS TRUE) */}
//                   {app.isDisputed && (
//                     <button className="btn-danger" style={{ backgroundColor: '#b91c1c', color: 'white' }} onClick={() => handlePostWarning(app)}>
//                       📢 Warn Network (Drop Trust Score)
//                     </button>
//                   )}

//                   <button className="withdraw-btn" disabled={app.status === 'completed'}>
//                     {app.status === 'completed' ? "Project Finished" : "Withdraw"}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerApplications;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchApplications();
//   }, [token, navigate]);

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getPaymentInfo = (project) => {
//     if (project.status !== 'completed' || !project.paymentDeadline) return null;
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return { days: diffDays, date: deadline.toLocaleDateString('en-IN') };
//   };

//   const handleWithdraw = async (applicationId) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/trainer/applications/${applicationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(applications.filter(app => app._id !== applicationId));
//     } catch (error) {
//       alert("Failed to withdraw.");
//     }
//   };

//   const handleMarkDisputed = async (applicationId) => {
//     if (!window.confirm("Mark this project as disputed? This notifies the company.")) return;
//     try {
//       await axios.put(`http://localhost:5000/api/trainer/applications/${applicationId}/dispute`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Project marked as Disputed.");
//       fetchApplications();
//     } catch (error) {
//       alert("Failed to mark dispute. Check your backend routes.");
//     }
//   };

//   const handlePostWarning = async (app) => {
//     const confirmWarning = window.confirm("This will post a PUBLIC warning and drop the Trust Score. Proceed?");
//     if (!confirmWarning) return;

//     try {
//       // SYNCHRONIZED WITH BACKEND: Sending 'content' as expected by your route
//       await axios.post("http://localhost:5000/api/posts", {
//         title: `⚠️ Payment Warning: ${app.project.title}`,
//         content: `Payment is overdue for the project "${app.project.title}". Industrial window exceeded.`,
//         postType: 'warning',
//         relatedCompany: app.project.company._id || app.project.company,
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert("Warning posted! Trust Score updated.");
//       fetchApplications();
//     } catch (err) {
//       console.error("Post Error:", err.response?.data);
//       alert(err.response?.data?.message || "Error posting warning.");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   if (loading) return <div className="loader">Loading...</div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="sidebar-logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>Industrial Network</button>
//           <button className="sidebar-btn active">My Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header"><h1>My Applications</h1></header>
//         <div className="applications-grid">
//           {applications.map((app) => {
//             const project = app.project || {};
//             const budget = project.perDayPayment * project.durationDays || "N/A";
//             const payInfo = getPaymentInfo(project);

//             return (
//               <div key={app._id} className={`application-card glass ${app.status === 'selected' ? 'border-success' : ''}`}>
//                 <div className="app-card-header">
//                   <h3>{project.title}</h3>
//                   <div style={{ display: 'flex', gap: '5px' }}>
//                     {app.isDisputed && <span className="status-badge" style={{ backgroundColor: '#ef4444' }}>DISPUTED</span>}
//                     <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status}</span>
//                   </div>
//                 </div>

//                 <div className="project-details">
//                    <div className="detail-item"><span className="detail-label">Company</span><span className="detail-value">{project.company?.name}</span></div>
//                    <div className="detail-item"><span className="detail-label">Total Budget</span><span className="detail-value">₹{budget}</span></div>
//                 </div>

//                 {payInfo && (
//                   <div className="payment-tag" style={{ margin: '15px 0', padding: '10px', borderRadius: '5px', backgroundColor: '#fef3c7' }}>
//                     💰 Payment Expected: <strong>{payInfo.date}</strong>
//                   </div>
//                 )}

//                 <div className="card-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
//                   {app.status === 'completed' && !app.isDisputed && (
//                     <button className="btn-outline-danger" onClick={() => handleMarkDisputed(app._id)}>
//                       ⚠️ Mark Disputed
//                     </button>
//                   )}

//                   {app.isDisputed && (
//                     <button className="btn-danger" style={{ backgroundColor: '#b91c1c', color: 'white' }} onClick={() => handlePostWarning(app)}>
//                       📢 Warn Network (Drop Trust Score)
//                     </button>
//                   )}

//                   <button className="withdraw-btn" disabled={app.status === 'completed'}>
//                     {app.status === 'completed' ? "Project Finished" : "Withdraw"}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerApplications;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/TrainerDashboard.css";

function TrainerApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchApplications();
  }, [token, navigate]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trainer/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data.data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const getPaymentInfo = (project, app) => {
    // If already paid, return a cleared status
    if (app.paymentStatus === 'cleared') return { isPaid: true, transactionId: app.transactionId };
    
    if (project.status !== 'completed' || !project.paymentDeadline) return null;
    const deadline = new Date(project.paymentDeadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { isPaid: false, days: diffDays, date: deadline.toLocaleDateString('en-IN') };
  };

  const handleWithdraw = async (applicationId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/trainer/applications/${applicationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(applications.filter(app => app._id !== applicationId));
    } catch (error) {
      alert("Failed to withdraw.");
    }
  };

  const handleMarkDisputed = async (applicationId) => {
    if (!window.confirm("Mark this project as disputed? This notifies the company.")) return;
    try {
      await axios.put(`http://localhost:5000/api/trainer/applications/${applicationId}/dispute`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Project marked as Disputed.");
      fetchApplications();
    } catch (error) {
      alert("Failed to mark dispute. Check your backend routes.");
    }
  };

  const handlePostWarning = async (app) => {
    const confirmWarning = window.confirm("This will post a PUBLIC warning and drop the Trust Score. Proceed?");
    if (!confirmWarning) return;

    try {
      await axios.post("http://localhost:5000/api/posts", {
        title: `⚠️ Payment Warning: ${app.project.title}`,
        content: `Payment is overdue for the project "${app.project.title}". Industrial window exceeded.`,
        postType: 'warning',
        relatedCompany: app.project.company._id || app.project.company,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Warning posted! Trust Score updated.");
      fetchApplications();
    } catch (err) {
      console.error("Post Error:", err.response?.data);
      alert(err.response?.data?.message || "Error posting warning.");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="trainer-dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">Trainistry</div>
        <nav className="nav-menu">
          <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>Industrial Network</button>
          <button className="sidebar-btn active">My Applications</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
        </nav>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="main-content">
        <header className="dashboard-header"><h1>My Applications</h1></header>
        <div className="applications-grid">
          {applications.map((app) => {
            const project = app.project || {};
            const budget = project.perDayPayment * project.durationDays || "N/A";
            const payInfo = getPaymentInfo(project, app);

            return (
              <div key={app._id} className={`application-card glass ${app.status === 'selected' ? 'border-success' : ''}`}>
                <div className="app-card-header">
                  <h3>{project.title}</h3>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {app.paymentStatus === 'cleared' && <span className="status-badge" style={{ backgroundColor: '#10b981' }}>PAID</span>}
                    {app.isDisputed && app.paymentStatus !== 'cleared' && <span className="status-badge" style={{ backgroundColor: '#ef4444' }}>DISPUTED</span>}
                    <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status}</span>
                  </div>
                </div>

                <div className="project-details">
                   <div className="detail-item"><span className="detail-label">Company</span><span className="detail-value">{project.company?.name}</span></div>
                   <div className="detail-item"><span className="detail-label">Total Budget</span><span className="detail-value">₹{budget}</span></div>
                </div>

                {payInfo && (
                  <div className="payment-tag" style={{ 
                    margin: '15px 0', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    backgroundColor: payInfo.isPaid ? '#d1fae5' : '#fef3c7',
                    color: payInfo.isPaid ? '#065f46' : '#92400e',
                    border: payInfo.isPaid ? '1px solid #10b981' : 'none'
                  }}>
                    {payInfo.isPaid ? (
                        <>✅ Payment Received (Ref: <strong>{payInfo.transactionId}</strong>)</>
                    ) : (
                        <>💰 Payment Expected: <strong>{payInfo.date}</strong></>
                    )}
                  </div>
                )}

                <div className="card-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                  {/* Hide dispute buttons if payment is cleared */}
                  {app.status === 'completed' && !app.isDisputed && app.paymentStatus !== 'cleared' && (
                    <button className="btn-outline-danger" onClick={() => handleMarkDisputed(app._id)}>
                      ⚠️ Mark Disputed
                    </button>
                  )}

                  {app.isDisputed && app.paymentStatus !== 'cleared' && (
                    <button className="btn-danger" style={{ backgroundColor: '#b91c1c', color: 'white' }} onClick={() => handlePostWarning(app)}>
                      📢 Warn Network (Drop Trust Score)
                    </button>
                  )}

                  <button className="withdraw-btn" disabled={app.status === 'completed' || app.paymentStatus === 'cleared'}>
                    {app.paymentStatus === 'cleared' ? "Payment Settled" : app.status === 'completed' ? "Project Finished" : "Withdraw"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default TrainerApplications;