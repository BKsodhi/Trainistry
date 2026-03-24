// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import NotificationPanel from "../../components/company/NotificationPanel";
// import "../../styles/companyDashboard.css";

// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("projects");
//   const [refreshProjects, setRefreshProjects] = useState(false); // to refresh projects list
//   const companyId = localStorage.getItem("companyId");

//   const handleLogout = () => {
//     localStorage.removeItem("companyId");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev); // toggle to refresh projects
//   };

//   const renderContent = () => {
//     // Show loading if companyId is missing
//     if (!companyId && (activeTab === "projects" || activeTab === "notifications")) {
//       return <div>Loading company info...</div>;
//     }

//     switch (activeTab) {
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onSuccess={triggerRefresh} />;
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>

//         <button
//           className={activeTab === "projects" ? "active" : ""}
//           onClick={() => setActiveTab("projects")}
//         >
//           My Projects
//         </button>

//         <button
//           className={activeTab === "post" ? "active" : ""}
//           onClick={() => setActiveTab("post")}
//         >
//           Post Project
//         </button>

//         <button
//           className={activeTab === "notifications" ? "active" : ""}
//           onClick={() => setActiveTab("notifications")}
//         >
//           Notifications
//         </button>

//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>
//             {activeTab === "projects" && "My Projects"}
//             {activeTab === "post" && "Post a New Project"}
//             {activeTab === "notifications" && "Notifications"}
//           </h1>
//         </div>

//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default CompanyDashboard;

// import React, { useState } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import NotificationPanel from "../../components/company/NotificationPanel";

// import "../../styles/companyDashboard.css";

// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("projects");
//   const [refreshProjects, setRefreshProjects] = useState(false); // ✅ Trigger project refresh
//   const companyId = localStorage.getItem("companyId");

//   const handleLogout = () => {
//     localStorage.removeItem("companyId");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     window.location.href = "/";
//   };

//   // Trigger a refresh whenever a new project is posted
//   const triggerRefresh = () => setRefreshProjects((prev) => !prev);

//   const renderContent = () => {
//     if (!companyId && (activeTab === "projects" || activeTab === "notifications")) {
//       return <div>Loading company info...</div>;
//     }

//     switch (activeTab) {
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>

//         <button
//           className={activeTab === "projects" ? "active" : ""}
//           onClick={() => setActiveTab("projects")}
//         >
//           My Projects
//         </button>

//         <button
//           className={activeTab === "post" ? "active" : ""}
//           onClick={() => setActiveTab("post")}
//         >
//           Post Project
//         </button>

//         <button
//           className={activeTab === "notifications" ? "active" : ""}
//           onClick={() => setActiveTab("notifications")}
//         >
//           Notifications
//         </button>

//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>
//             {activeTab === "projects" && "My Projects"}
//             {activeTab === "post" && "Post a New Project"}
//             {activeTab === "notifications" && "Notifications"}
//           </h1>
//         </div>

//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// // export default CompanyDashboard;
// import React, { useState } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import NotificationPanel from "../../components/company/NotificationPanel";

// import "../../styles/companyDashboard.css";

// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("projects");
//   const [refreshProjects, setRefreshProjects] = useState(false); // ✅ Trigger project refresh
//   const companyId = localStorage.getItem("companyId");

//   const handleLogout = () => {
//     localStorage.removeItem("companyId");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     window.location.href = "/";
//   };

//   // Trigger a refresh whenever a new project is posted
//   const triggerRefresh = () => setRefreshProjects((prev) => !prev);

//   const renderContent = () => {
//     if (!companyId && (activeTab === "projects" || activeTab === "notifications")) {
//       return <div>Loading company info...</div>;
//     }

//     switch (activeTab) {
//       case "projects":
//         return (
//           <CompanyProjects
//             companyId={companyId}
//             refresh={refreshProjects}
//           />
//         );
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return (
//           <CompanyProjects
//             companyId={companyId}
//             refresh={refreshProjects}
//           />
//         );
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>

//         <button
//           className={activeTab === "projects" ? "active" : ""}
//           onClick={() => setActiveTab("projects")}
//         >
//           My Projects
//         </button>

//         <button
//           className={activeTab === "post" ? "active" : ""}
//           onClick={() => setActiveTab("post")}
//         >
//           Post Project
//         </button>

//         <button
//           className={activeTab === "notifications" ? "active" : ""}
//           onClick={() => setActiveTab("notifications")}
//         >
//           Notifications
//         </button>

//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>
//             {activeTab === "projects" && "My Projects"}
//             {activeTab === "post" && "Post a New Project"}
//             {activeTab === "notifications" && "Notifications"}
//           </h1>
//         </div>

//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// // export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== Updated NotificationPanel =====
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);

//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching notifications:", err.response || err);
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/notifications/read/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//       );
//     } catch (err) {
//       console.error("Error marking notification as read:", err.response || err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000); // auto-refresh
//     return () => clearInterval(interval);
//   }, [companyId]);

//   if (!notifications.length) return <div>No notifications.</div>;

//   return (
//     <div>
//       {notifications.map((note) => (
//         <div
//           key={note._id}
//           className={`notification ${note.isRead ? "read" : "unread"}`}
//           onClick={() => markAsRead(note._id)}
//         >
//           {note.message}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ================= CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("projects");
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");

//   const handleLogout = () => {
//     localStorage.removeItem("companyId");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => setRefreshProjects((prev) => !prev);

//   const renderContent = () => {
//     if (!companyId && (activeTab === "projects" || activeTab === "notifications")) {
//       return <div>Loading company info...</div>;
//     }

//     switch (activeTab) {
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <div className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>

//         <button
//           className={activeTab === "projects" ? "active" : ""}
//           onClick={() => setActiveTab("projects")}
//         >
//           My Projects
//         </button>

//         <button
//           className={activeTab === "post" ? "active" : ""}
//           onClick={() => setActiveTab("post")}
//         >
//           Post Project
//         </button>

//         <button
//           className={activeTab === "notifications" ? "active" : ""}
//           onClick={() => setActiveTab("notifications")}
//         >
//           Notifications
//         </button>

//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>
//             {activeTab === "projects" && "My Projects"}
//             {activeTab === "post" && "Post a New Project"}
//             {activeTab === "notifications" && "Notifications"}
//           </h1>
//         </div>

//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// // export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== New Component: DashboardHome (Figma Stats View) =====
// function DashboardHome({ stats }) {
//   return (
//     <div className="stats-grid">
//       <div className="dashboard-card glass">
//         <p>Total Postings</p>
//         <h3>{stats.totalPostings || 0}</h3>
//       </div>
//       <div className="dashboard-card glass">
//         <p>Active Projects</p>
//         <h3>{stats.activeProjects || 0}</h3>
//       </div>
//       <div className="dashboard-card glass">
//         <p>Shortlisted Trainers</p>
//         <h3>{stats.shortlistedTrainers || 0}</h3>
//       </div>
//       <div className="dashboard-card glass">
//         <p>Interviews Scheduled</p>
//         <h3>{stats.interviewsScheduled || 0}</h3>
//       </div>
//     </div>
//   );
// }

// // ====== NotificationPanel =====
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [companyId]);

//   return (
//     <div className="notifications-list">
//       {notifications.length > 0 ? (
//         notifications.map((note) => (
//           <div key={note._id} className={`notification glass ${note.isRead ? "read" : "unread"}`}>
//             {note.message}
//           </div>
//         ))
//       ) : (
//         <p>No notifications yet.</p>
//       )}
//     </div>
//   );
// }

// // ================= Main CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({});
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/company/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStats(res.data.data);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       }
//     };
//     if (token) fetchStats();
//   }, [token, refreshProjects]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev);
//     setActiveTab("projects");
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "home":
//         return <DashboardHome stats={stats} />;
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <DashboardHome stats={stats} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <div className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>
//         <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
//           Overview
//         </button>
//         <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
//           My Projects
//         </button>
//         <button className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>
//           Post Project
//         </button>
//         <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
//           Notifications
//         </button>

//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>
//             {activeTab === "home" && "Company Overview"}
//             {activeTab === "projects" && "My Project Postings"}
//             {activeTab === "post" && "Create New Requirement"}
//             {activeTab === "notifications" && "Recent Notifications"}
//           </h1>
//         </div>
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== New Component: DashboardHome (Figma Stats View) =====
// function DashboardHome({ stats }) {
//   return (
//     <div className="stats-grid">
//       <div className="dashboard-card glass">
//         <p>Total Postings</p>
//         <h3>{stats.totalPostings || 0}</h3>
//       </div>
//       <div className="dashboard-card glass">
//         <p>Active Projects</p>
//         <h3>{stats.activeProjects || 0}</h3>
//       </div>
//       <div className="dashboard-card glass">
//         <p>Shortlisted Trainers</p>
//         <h3>{stats.shortlistedTrainers || 0}</h3>
//       </div>
//       <div className="dashboard-card glass">
//         <p>Interviews Scheduled</p>
//         <h3>{stats.interviewsScheduled || 0}</h3>
//       </div>
//     </div>
//   );
// }

// // ====== NotificationPanel =====
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/notifications/company",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setNotifications(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   // 🔹 MARK AS READ FUNCTION
//   const markAsRead = async (id) => {
//     try {

//       // instant UI update
//       setNotifications((prev) =>
//         prev.map((note) =>
//           note._id === id ? { ...note, isRead: true } : note
//         )
//       );

//       await axios.put(
//         `http://localhost:5000/api/notifications/${id}/read`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//     } catch (err) {
//       console.error("Error marking notification read:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [companyId]);

//   return (
//     <div className="notifications-list">
//       {notifications.length > 0 ? (
//         notifications.map((note) => (
//           <div
//             key={note._id}
//             onClick={() => markAsRead(note._id)}
//             className={`notification glass ${note.isRead ? "read" : "unread"}`}
//           >
//             {note.message}
//           </div>
//         ))
//       ) : (
//         <p>No notifications yet.</p>
//       )}
//     </div>
//   );
// }

// // ================= Main CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({});
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/company/stats",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setStats(res.data.data);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       }
//     };
//     if (token) fetchStats();
//   }, [token, refreshProjects]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev);
//     setActiveTab("projects");
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "home":
//         return <DashboardHome stats={stats} />;
//       case "projects":
//         return (
//           <CompanyProjects
//             companyId={companyId}
//             refresh={refreshProjects}
//           />
//         );
//       case "post":
//         return (
//           <PostProjectForm
//             companyId={companyId}
//             onPost={triggerRefresh}
//           />
//         );
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <DashboardHome stats={stats} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <div className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>

//         <button
//           className={activeTab === "home" ? "active" : ""}
//           onClick={() => setActiveTab("home")}
//         >
//           Overview
//         </button>

//         <button
//           className={activeTab === "projects" ? "active" : ""}
//           onClick={() => setActiveTab("projects")}
//         >
//           My Projects
//         </button>

//         <button
//           className={activeTab === "post" ? "active" : ""}
//           onClick={() => setActiveTab("post")}
//         >
//           Post Project
//         </button>

//         <button
//           className={activeTab === "notifications" ? "active" : ""}
//           onClick={() => setActiveTab("notifications")}
//         >
//           Notifications
//         </button>

//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>
//             {activeTab === "home" && "Company Overview"}
//             {activeTab === "projects" && "My Project Postings"}
//             {activeTab === "post" && "Create New Requirement"}
//             {activeTab === "notifications" && "Recent Notifications"}
//           </h1>
//         </div>

//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== New Component: DashboardHome (Figma Stats View + Payment Tracking) =====
// function DashboardHome({ stats, projects }) {
  
//   // Helper to calculate days remaining for payment
//   const getPaymentDeadlineInfo = (project) => {
//     if (project.status !== 'completed' || !project.paymentDeadline) return null;
    
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return {
//       days: diffDays,
//       date: deadline.toLocaleDateString(),
//       isUrgent: diffDays <= 3
//     };
//   };

//   return (
//     <div className="dashboard-home-content">
//       <div className="stats-grid">
//         <div className="dashboard-card glass">
//           <p>Total Postings</p>
//           <h3>{stats.totalPostings || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Active Projects</p>
//           <h3>{stats.activeProjects || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Shortlisted Trainers</p>
//           <h3>{stats.shortlistedTrainers || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Interviews Scheduled</p>
//           <h3>{stats.interviewsScheduled || 0}</h3>
//         </div>
//       </div>

//       {/* NEW SECTION: Payment Deadlines (Sir's Requirement) */}
//       <div className="payment-tracking glass" style={{ marginTop: '20px', padding: '20px' }}>
//         <h3>Payment Tracking (15-Day Rule)</h3>
//         <div className="deadline-list">
//           {projects?.filter(p => p.status === 'completed').length > 0 ? (
//             projects.filter(p => p.status === 'completed').map(proj => {
//               const info = getPaymentDeadlineInfo(proj);
//               return (
//                 <div key={proj._id} className="payment-item" style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
//                   <span><strong>{proj.title}</strong></span>
//                   <span style={{ float: 'right', color: info?.isUrgent ? 'red' : '#f59e0b' }}>
//                     {info?.days > 0 ? `Due in ${info.days} days` : "Deadline reached"} ({info?.date})
//                   </span>
//                 </div>
//               );
//             })
//           ) : (
//             <p style={{ color: '#888' }}>No completed projects awaiting payment.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ====== NotificationPanel remains same =====
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) { console.error(err); }
//   };

//   const markAsRead = async (id) => {
//     try {
//       setNotifications((prev) => prev.map((note) => note._id === id ? { ...note, isRead: true } : note));
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [companyId]);

//   return (
//     <div className="notifications-list">
//       {notifications.length > 0 ? (
//         notifications.map((note) => (
//           <div key={note._id} onClick={() => markAsRead(note._id)} className={`notification glass ${note.isRead ? "read" : "unread"}`}>
//             {note.message}
//           </div>
//         ))
//       ) : ( <p>No notifications yet.</p> )}
//     </div>
//   );
// }

// // ================= Main CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({});
//   const [projects, setProjects] = useState([]); // Added to track payment deadlines
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");
//   const token = localStorage.getItem("token");
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const statsRes = await axios.get("http://localhost:5000/api/company/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStats(statsRes.data.data);

//         // Also fetch full projects to calculate deadlines
//         const projectsRes = await axios.get(`http://localhost:5000/api/company/${companyId}/projects`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProjects(projectsRes.data.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     if (token) fetchData();
//   }, [token, refreshProjects, companyId]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev);
//     setActiveTab("projects");
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "home":
//         return <DashboardHome stats={stats} projects={projects} />;
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <DashboardHome stats={stats} projects={projects} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <div className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>
//         <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>Overview</button>
//         <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>My Projects</button>
//         <button className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>Post Project</button>
//         <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>Notifications</button>
//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>
//             {activeTab === "home" && "Company Overview"}
//             {activeTab === "projects" && "My Project Postings"}
//             {activeTab === "post" && "Create New Requirement"}
//             {activeTab === "notifications" && "Recent Notifications"}
//           </h1>
//         </div>
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import CompanyNetwork from "./CompanyNetwork"; // Ensure you create this file next
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== New Component: DashboardHome (Figma Stats View + Payment Tracking) =====
// function DashboardHome({ stats, projects }) {
  
//   // Helper to calculate days remaining for payment
//   const getPaymentDeadlineInfo = (project) => {
//     if (project.status?.toLowerCase() !== 'completed' || !project.paymentDeadline) return null;
    
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return {
//       days: diffDays,
//       date: deadline.toLocaleDateString('en-IN'),
//       isUrgent: diffDays <= 3
//     };
//   };

//   return (
//     <div className="dashboard-home-content">
//       <div className="stats-grid">
//         <div className="dashboard-card glass">
//           <p>Total Postings</p>
//           <h3>{stats.totalPostings || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Active Projects</p>
//           <h3>{stats.activeProjects || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Shortlisted Trainers</p>
//           <h3>{stats.shortlistedTrainers || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Interviews Scheduled</p>
//           <h3>{stats.interviewsScheduled || 0}</h3>
//         </div>
//       </div>

//       {/* NEW SECTION: Payment Deadlines (Sir's Requirement) */}
//       <div className="payment-tracking glass" style={{ marginTop: '20px', padding: '20px' }}>
//         <h3 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>💳 Payment Tracking (15-Day Rule)</h3>
//         <div className="deadline-list">
//           {projects?.filter(p => p.status?.toLowerCase() === 'completed').length > 0 ? (
//             projects.filter(p => p.status?.toLowerCase() === 'completed').map(proj => {
//               const info = getPaymentDeadlineInfo(proj);
//               return (
//                 <div key={proj._id} className="payment-item" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-soft)', padding: '12px 0' }}>
//                   <span><strong>{proj.technology || proj.title}</strong></span>
//                   <span style={{ color: info?.isUrgent ? '#ef4444' : '#f59e0b', fontWeight: 'bold' }}>
//                     {info?.days > 0 ? `Due in ${info.days} days` : "Deadline Reached"} 
//                     <small style={{ color: '#666', marginLeft: '10px', fontWeight: 'normal' }}>({info?.date})</small>
//                   </span>
//                 </div>
//               );
//             })
//           ) : (
//             <p style={{ color: '#888', textAlign: 'center', padding: '10px' }}>No completed projects awaiting payment.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ====== NotificationPanel remains same =====
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) { console.error(err); }
//   };

//   const markAsRead = async (id) => {
//     try {
//       setNotifications((prev) => prev.map((note) => note._id === id ? { ...note, isRead: true } : note));
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [companyId]);

//   return (
//     <div className="notifications-list">
//       {notifications.length > 0 ? (
//         notifications.map((note) => (
//           <div key={note._id} onClick={() => markAsRead(note._id)} className={`notification glass ${note.isRead ? "read" : "unread"}`}>
//             {note.message}
//           </div>
//         ))
//       ) : ( <p>No notifications yet.</p> )}
//     </div>
//   );
// }

// // ================= Main CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({});
//   const [projects, setProjects] = useState([]); 
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");
//   const token = localStorage.getItem("token");
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const statsRes = await axios.get("http://localhost:5000/api/company/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStats(statsRes.data.data);

//         const projectsRes = await axios.get(`http://localhost:5000/api/company/${companyId}/projects`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProjects(projectsRes.data.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     if (token && companyId) fetchData();
//   }, [token, refreshProjects, companyId]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev);
//     setActiveTab("projects");
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "home":
//         return <DashboardHome stats={stats} projects={projects} />;
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "network":
//         return <CompanyNetwork />; 
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <DashboardHome stats={stats} projects={projects} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>
//         <nav className="nav-menu">
//           <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
//             Dashboard Overview
//           </button>
//           <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
//             My Project Postings
//           </button>
//           <button className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>
//             Create Requirement
//           </button>
//           <button className={activeTab === "network" ? "active" : ""} onClick={() => setActiveTab("network")}>
//             Industrial Network
//           </button>
//           <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
//             Notifications
//           </button>
//         </nav>
//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header">
//           <h1>
//             {activeTab === "home" && "Company Overview"}
//             {activeTab === "projects" && "Managed Projects"}
//             {activeTab === "post" && "Post New Requirement"}
//             {activeTab === "network" && "Industrial Talent Feed"}
//             {activeTab === "notifications" && "Recent Notifications"}
//           </h1>
//         </header>
//         <div className="content-area">
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import CompanyNetwork from "./CompanyNetwork"; 
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== Updated Component: DashboardHome (With Dispute & Trust Score) =====
// function DashboardHome({ stats, projects, trustScore }) {
  
//   const getPaymentDeadlineInfo = (project) => {
//     if (project.status?.toLowerCase() !== 'completed' || !project.paymentDeadline) return null;
    
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return {
//       days: diffDays,
//       date: deadline.toLocaleDateString('en-IN'),
//       isUrgent: diffDays <= 3,
//       isOverdue: diffDays <= 0
//     };
//   };

//   return (
//     <div className="dashboard-home-content">
//       <div className="stats-grid">
//         <div className="dashboard-card glass">
//           <p>Total Postings</p>
//           <h3>{stats.totalPostings || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Active Projects</p>
//           <h3>{stats.activeProjects || 0}</h3>
//         </div>
//         {/* Trust Score Card */}
//         <div className="dashboard-card glass" style={{ borderLeft: '4px solid #10b981' }}>
//           <p>Payment Trust Score</p>
//           <h3 style={{ color: trustScore < 80 ? '#ef4444' : '#10b981' }}>{trustScore || 100}%</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Interviews Scheduled</p>
//           <h3>{stats.interviewsScheduled || 0}</h3>
//         </div>
//       </div>

//       {/* Payment Tracking & Disputes */}
//       <div className="payment-tracking glass" style={{ marginTop: '20px', padding: '20px' }}>
//         <h3 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>💳 Payment Tracking (15-Day Rule)</h3>
//         <div className="deadline-list">
//           {projects?.filter(p => p.status?.toLowerCase() === 'completed').length > 0 ? (
//             projects.filter(p => p.status?.toLowerCase() === 'completed').map(proj => {
//               const info = getPaymentDeadlineInfo(proj);
//               return (
//                 <div key={proj._id} className="payment-item" style={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'center',
//                   borderBottom: '1px solid var(--border-soft)', 
//                   padding: '12px 0',
//                   backgroundColor: proj.isDisputed ? '#fef2f2' : 'transparent'
//                 }}>
//                   <div>
//                     <strong>{proj.technology || proj.title}</strong>
//                     {proj.isDisputed && <span style={{ marginLeft: '10px', color: '#dc2626', fontSize: '0.8rem', fontWeight: 'bold' }}>⚠️ DISPUTED</span>}
//                   </div>
                  
//                   <span style={{ color: proj.isDisputed || info?.isOverdue ? '#ef4444' : (info?.isUrgent ? '#f59e0b' : '#10b981'), fontWeight: 'bold' }}>
//                     {proj.paymentStatus === 'cleared' ? '✅ Paid' : (info?.isOverdue ? "Overdue" : `Due in ${info?.days} days`)}
//                     <small style={{ color: '#666', marginLeft: '10px', fontWeight: 'normal' }}>({info?.date})</small>
//                   </span>
//                 </div>
//               );
//             })
//           ) : (
//             <p style={{ color: '#888', textAlign: 'center', padding: '10px' }}>No completed projects awaiting payment.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ====== NotificationPanel ======
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) { console.error(err); }
//   };

//   const markAsRead = async (id) => {
//     try {
//       setNotifications((prev) => prev.map((note) => note._id === id ? { ...note, isRead: true } : note));
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [companyId]);

//   return (
//     <div className="notifications-list">
//       {notifications.length > 0 ? (
//         notifications.map((note) => (
//           <div key={note._id} onClick={() => markAsRead(note._id)} className={`notification glass ${note.isRead ? "read" : "unread"}`}>
//             {note.message}
//           </div>
//         ))
//       ) : ( <p>No notifications yet.</p> )}
//     </div>
//   );
// }

// // ================= Main CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({});
//   const [projects, setProjects] = useState([]); 
//   const [companyProfile, setCompanyProfile] = useState({});
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");
//   const token = localStorage.getItem("token");
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch Stats
//         const statsRes = await axios.get("http://localhost:5000/api/company/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStats(statsRes.data.data);

//         // Fetch Projects
//         const projectsRes = await axios.get(`http://localhost:5000/api/company/${companyId}/projects`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProjects(projectsRes.data.data);

//         // Fetch Profile for Trust Score
//         const profileRes = await axios.get(`http://localhost:5000/api/company/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCompanyProfile(profileRes.data.data);

//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     if (token && companyId) fetchData();
//   }, [token, refreshProjects, companyId]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev);
//     setActiveTab("projects");
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "home":
//         return <DashboardHome stats={stats} projects={projects} trustScore={companyProfile.trustScore} />;
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "network":
//         return <CompanyNetwork />; 
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <DashboardHome stats={stats} projects={projects} trustScore={companyProfile.trustScore} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>
//         <nav className="nav-menu">
//           <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
//             Dashboard Overview
//           </button>
//           <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
//             My Project Postings
//           </button>
//           <button className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>
//             Create Requirement
//           </button>
//           <button className={activeTab === "network" ? "active" : ""} onClick={() => setActiveTab("network")}>
//             Industrial Network
//           </button>
//           <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
//             Notifications
//           </button>
//         </nav>
//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header">
//           <h1>
//             {activeTab === "home" && "Company Overview"}
//             {activeTab === "projects" && "Managed Projects"}
//             {activeTab === "post" && "Post New Requirement"}
//             {activeTab === "network" && "Industrial Talent Feed"}
//             {activeTab === "notifications" && "Recent Notifications"}
//           </h1>
//         </header>
//         <div className="content-area">
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import CompanyNetwork from "./CompanyNetwork"; 
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== Updated Component: DashboardHome (With Dispute & Trust Score) =====
// function DashboardHome({ stats, projects, trustScore }) {
  
//   const getPaymentDeadlineInfo = (project) => {
//     if (project.status?.toLowerCase() !== 'completed' || !project.paymentDeadline) return null;
    
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return {
//       days: diffDays,
//       date: deadline.toLocaleDateString('en-IN'),
//       isUrgent: diffDays <= 3,
//       isOverdue: diffDays <= 0
//     };
//   };

//   return (
//     <div className="dashboard-home-content">
//       <div className="stats-grid">
//         <div className="dashboard-card glass">
//           <p>Total Postings</p>
//           <h3>{stats.totalPostings || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Active Projects</p>
//           <h3>{stats.activeProjects || 0}</h3>
//         </div>
        
//         {/* Trust Score Card - NOW DYNAMIC */}
//         <div className="dashboard-card glass" style={{ borderLeft: trustScore < 100 ? '4px solid #ef4444' : '4px solid #10b981' }}>
//           <p>Payment Trust Score</p>
//           <h3 style={{ color: trustScore < 100 ? '#ef4444' : '#10b981' }}>
//             {trustScore !== undefined ? trustScore : 100}%
//           </h3>
//         </div>

//         <div className="dashboard-card glass">
//           <p>Interviews Scheduled</p>
//           <h3>{stats.interviewsScheduled || 0}</h3>
//         </div>
//       </div>

//       {/* Payment Tracking & Disputes */}
//       <div className="payment-tracking glass" style={{ marginTop: '20px', padding: '20px' }}>
//         <h3 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>💳 Payment Tracking (15-Day Rule)</h3>
//         <div className="deadline-list">
//           {projects?.filter(p => p.status?.toLowerCase() === 'completed' || p.isDisputed).length > 0 ? (
//             projects.filter(p => p.status?.toLowerCase() === 'completed' || p.isDisputed).map(proj => {
//               const info = getPaymentDeadlineInfo(proj);
//               return (
//                 <div key={proj._id} className="payment-item" style={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'center',
//                   borderBottom: '1px solid var(--border-soft)', 
//                   padding: '12px 0',
//                   backgroundColor: proj.isDisputed ? '#fef2f2' : 'transparent',
//                   paddingLeft: '10px',
//                   borderRadius: '8px'
//                 }}>
//                   <div>
//                     <strong>{proj.technology || proj.title}</strong>
//                     {proj.isDisputed && (
//                       <span style={{ 
//                         marginLeft: '10px', 
//                         color: '#dc2626', 
//                         fontSize: '0.75rem', 
//                         fontWeight: 'bold', 
//                         backgroundColor: '#fee2e2', 
//                         padding: '2px 8px', 
//                         borderRadius: '4px',
//                         border: '1px solid #fecaca'
//                       }}>
//                         ⚠️ DISPUTE RAISED BY TRAINER
//                       </span>
//                     )}
//                   </div>
                  
//                   <span style={{ color: proj.isDisputed || info?.isOverdue ? '#ef4444' : (info?.isUrgent ? '#f59e0b' : '#10b981'), fontWeight: 'bold' }}>
//                     {proj.paymentStatus === 'cleared' ? '✅ Paid' : (proj.isDisputed ? "Under Dispute" : (info?.isOverdue ? "Overdue" : `Due in ${info?.days} days`))}
//                     {info && <small style={{ color: '#666', marginLeft: '10px', fontWeight: 'normal' }}>({info?.date})</small>}
//                   </span>
//                 </div>
//               );
//             })
//           ) : (
//             <p style={{ color: '#888', textAlign: 'center', padding: '10px' }}>No completed projects or active disputes.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ====== NotificationPanel ======
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) { console.error(err); }
//   };

//   const markAsRead = async (id) => {
//     try {
//       setNotifications((prev) => prev.map((note) => note._id === id ? { ...note, isRead: true } : note));
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [companyId]);

//   return (
//     <div className="notifications-list">
//       {notifications.length > 0 ? (
//         notifications.map((note) => (
//           <div key={note._id} onClick={() => markAsRead(note._id)} className={`notification glass ${note.isRead ? "read" : "unread"}`}>
//             {note.message}
//           </div>
//         ))
//       ) : ( <p>No notifications yet.</p> )}
//     </div>
//   );
// }

// // ================= Main CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({});
//   const [projects, setProjects] = useState([]); 
//   const [companyProfile, setCompanyProfile] = useState({});
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");
//   const token = localStorage.getItem("token");
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 1. Fetch Stats
//         const statsRes = await axios.get("http://localhost:5000/api/company/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
        
//         // 2. Fetch Projects
//         const projectsRes = await axios.get(`http://localhost:5000/api/company/${companyId}/projects`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // 3. Fetch Profile (This contains the latest Trust Score)
//         const profileRes = await axios.get(`http://localhost:5000/api/company/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Update states
//         setStats(statsRes.data.data);
//         setProjects(projectsRes.data.data);
//         setCompanyProfile(profileRes.data.data);

//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       }
//     };
//     if (token && companyId) fetchData();
//   }, [token, refreshProjects, companyId]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev);
//     setActiveTab("projects");
//   };

//   const renderContent = () => {
//     // Pass the trustScore explicitly from the profile to DashboardHome
//     const currentTrustScore = companyProfile?.trustScore !== undefined ? companyProfile.trustScore : 100;

//     switch (activeTab) {
//       case "home":
//         return <DashboardHome stats={stats} projects={projects} trustScore={currentTrustScore} />;
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "network":
//         return <CompanyNetwork />; 
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <DashboardHome stats={stats} projects={projects} trustScore={currentTrustScore} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>
//         <nav className="nav-menu">
//           <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
//             Dashboard Overview
//           </button>
//           <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
//             My Project Postings
//           </button>
//           <button className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>
//             Create Requirement
//           </button>
//           <button className={activeTab === "network" ? "active" : ""} onClick={() => setActiveTab("network")}>
//             Industrial Network
//           </button>
//           <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
//             Notifications
//           </button>
//         </nav>
//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header">
//           <h1>
//             {activeTab === "home" && "Company Overview"}
//             {activeTab === "projects" && "Managed Projects"}
//             {activeTab === "post" && "Post New Requirement"}
//             {activeTab === "network" && "Industrial Talent Feed"}
//             {activeTab === "notifications" && "Recent Notifications"}
//           </h1>
//         </header>
//         <div className="content-area">
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import CompanyNetwork from "./CompanyNetwork"; 
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== Updated Component: DashboardHome (With Resolve Dispute Logic) =====
// function DashboardHome({ stats, projects, trustScore, onRefresh }) {
//   const token = localStorage.getItem("token");

//   const getPaymentDeadlineInfo = (project) => {
//     if (project.status?.toLowerCase() !== 'completed' || !project.paymentDeadline) return null;
    
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return {
//       days: diffDays,
//       date: deadline.toLocaleDateString('en-IN'),
//       isUrgent: diffDays <= 3,
//       isOverdue: diffDays <= 0
//     };
//   };

//   // NEW: Logic for Company to resolve the dispute
//   // Inside DashboardHome component
// const handleResolveDispute = async (projectId, techName) => {
//   const transactionId = window.prompt(`Enter Transaction ID for ${techName}:`);
//   if (!transactionId) return;

//   try {
//     // We pass the project._id here
//     await axios.put(`http://localhost:5000/api/company/applications/${projectId}/resolve`, 
//       { transactionId }, 
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     alert("Dispute resolved! Trust Score restored.");
//     onRefresh(); 
//   } catch (err) {
//     alert(err.response?.data?.message || "Error resolving dispute");
//   }
// };
//   return (
//     <div className="dashboard-home-content">
//       <div className="stats-grid">
//         <div className="dashboard-card glass">
//           <p>Total Postings</p>
//           <h3>{stats.totalPostings || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Active Projects</p>
//           <h3>{stats.activeProjects || 0}</h3>
//         </div>
        
//         {/* Trust Score Card - NOW DYNAMIC */}
//         <div className="dashboard-card glass" style={{ borderLeft: trustScore < 100 ? '4px solid #ef4444' : '4px solid #10b981' }}>
//           <p>Payment Trust Score</p>
//           <h3 style={{ color: trustScore < 100 ? '#ef4444' : '#10b981' }}>
//             {trustScore !== undefined ? trustScore : 100}%
//           </h3>
//         </div>

//         <div className="dashboard-card glass">
//           <p>Interviews Scheduled</p>
//           <h3>{stats.interviewsScheduled || 0}</h3>
//         </div>
//       </div>

//       {/* Payment Tracking & Disputes */}
//       <div className="payment-tracking glass" style={{ marginTop: '20px', padding: '20px' }}>
//         <h3 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>💳 Payment Tracking (15-Day Rule)</h3>
//         <div className="deadline-list">
//           {projects?.filter(p => p.status?.toLowerCase() === 'completed' || p.isDisputed).length > 0 ? (
//             projects.filter(p => p.status?.toLowerCase() === 'completed' || p.isDisputed).map(proj => {
//               const info = getPaymentDeadlineInfo(proj);
//               return (
//                 <div key={proj._id} className="payment-item" style={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'center',
//                   borderBottom: '1px solid var(--border-soft)', 
//                   padding: '12px 0',
//                   backgroundColor: proj.isDisputed ? '#fef2f2' : 'transparent',
//                   paddingLeft: '10px',
//                   borderRadius: '8px'
//                 }}>
//                   <div style={{ display: 'flex', flexDirection: 'column' }}>
//                     <strong>{proj.technology || proj.title}</strong>
//                     {proj.isDisputed && (
//                       <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
//                         <span style={{ 
//                           color: '#dc2626', 
//                           fontSize: '0.7rem', 
//                           fontWeight: 'bold', 
//                           backgroundColor: '#fee2e2', 
//                           padding: '2px 8px', 
//                           borderRadius: '4px',
//                           border: '1px solid #fecaca'
//                         }}>
//                           ⚠️ DISPUTE RAISED BY TRAINER
//                         </span>
//                         {/* NEW: RESOLVE BUTTON */}
//                         <button 
//                           onClick={() => handleResolveDispute(proj._id, proj.technology)}
//                           style={{ 
//                             backgroundColor: '#4338ca', 
//                             color: 'white', 
//                             border: 'none', 
//                             padding: '3px 10px', 
//                             borderRadius: '4px', 
//                             fontSize: '0.7rem', 
//                             cursor: 'pointer' 
//                           }}
//                         >
//                           Resolve & Pay
//                         </button>
//                       </div>
//                     )}
//                   </div>
                  
//                   <span style={{ color: proj.isDisputed || info?.isOverdue ? '#ef4444' : (info?.isUrgent ? '#f59e0b' : '#10b981'), fontWeight: 'bold' }}>
//                     {proj.paymentStatus === 'cleared' ? '✅ Paid' : (proj.isDisputed ? "Under Dispute" : (info?.isOverdue ? "Overdue" : `Due in ${info?.days} days`))}
//                     {info && <small style={{ color: '#666', marginLeft: '10px', fontWeight: 'normal' }}>({info?.date})</small>}
//                   </span>
//                 </div>
//               );
//             })
//           ) : (
//             <p style={{ color: '#888', textAlign: 'center', padding: '10px' }}>No completed projects or active disputes.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ====== NotificationPanel ======
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) { console.error(err); }
//   };

//   const markAsRead = async (id) => {
//     try {
//       setNotifications((prev) => prev.map((note) => note._id === id ? { ...note, isRead: true } : note));
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [companyId]);

//   return (
//     <div className="notifications-list">
//       {notifications.length > 0 ? (
//         notifications.map((note) => (
//           <div key={note._id} onClick={() => markAsRead(note._id)} className={`notification glass ${note.isRead ? "read" : "unread"}`}>
//             {note.message}
//           </div>
//         ))
//       ) : ( <p>No notifications yet.</p> )}
//     </div>
//   );
// }

// // ================= Main CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({});
//   const [projects, setProjects] = useState([]); 
//   const [companyProfile, setCompanyProfile] = useState({});
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");
//   const token = localStorage.getItem("token");
  
//   const fetchData = async () => {
//     try {
//       const statsRes = await axios.get("http://localhost:5000/api/company/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       const projectsRes = await axios.get(`http://localhost:5000/api/company/${companyId}/projects`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const profileRes = await axios.get(`http://localhost:5000/api/company/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setStats(statsRes.data.data);
//       setProjects(projectsRes.data.data);
//       setCompanyProfile(profileRes.data.data);

//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//     }
//   };

//   useEffect(() => {
//     if (token && companyId) fetchData();
//   }, [token, refreshProjects, companyId]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev);
//     setActiveTab("projects");
//   };

//   const renderContent = () => {
//     const currentTrustScore = companyProfile?.trustScore !== undefined ? companyProfile.trustScore : 100;

//     switch (activeTab) {
//       case "home":
//         return <DashboardHome stats={stats} projects={projects} trustScore={currentTrustScore} onRefresh={fetchData} />;
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "network":
//         return <CompanyNetwork />; 
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <DashboardHome stats={stats} projects={projects} trustScore={currentTrustScore} onRefresh={fetchData} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>
//         <nav className="nav-menu">
//           <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
//             Dashboard Overview
//           </button>
//           <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
//             My Project Postings
//           </button>
//           <button className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>
//             Create Requirement
//           </button>
//           <button className={activeTab === "network" ? "active" : ""} onClick={() => setActiveTab("network")}>
//             Industrial Network
//           </button>
//           <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
//             Notifications
//           </button>
//         </nav>
//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header">
//           <h1>
//             {activeTab === "home" && "Company Overview"}
//             {activeTab === "projects" && "Managed Projects"}
//             {activeTab === "post" && "Post New Requirement"}
//             {activeTab === "network" && "Industrial Talent Feed"}
//             {activeTab === "notifications" && "Recent Notifications"}
//           </h1>
//         </header>
//         <div className="content-area">
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// import PostProjectForm from "../../components/company/PostProjectForm";
// import CompanyProjects from "../../components/company/CompanyProjects";
// import CompanyNetwork from "./CompanyNetwork"; 
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// // ====== Updated Component: DashboardHome (With Resolve Dispute Logic) =====
// function DashboardHome({ stats, projects, trustScore, onRefresh }) {
//   const token = localStorage.getItem("token");

//   const getPaymentDeadlineInfo = (project) => {
//     if (project.status?.toLowerCase() !== 'completed' || !project.paymentDeadline) return null;
    
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return {
//       days: diffDays,
//       date: deadline.toLocaleDateString('en-IN'),
//       isUrgent: diffDays <= 3,
//       isOverdue: diffDays <= 0
//     };
//   };

//   // NEW: Logic for Company to resolve the dispute
//   const handleResolveDispute = async (projectId, techName) => {
//     const transactionId = window.prompt(`Enter Transaction ID for ${techName}:`);
//     if (!transactionId) return;

//     try {
//       await axios.put(`http://localhost:5000/api/company/applications/${projectId}/resolve`, 
//         { transactionId }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Dispute resolved! Trust Score restored.");
//       onRefresh(); 
//     } catch (err) {
//       alert(err.response?.data?.message || "Error resolving dispute");
//     }
//   };

//   return (
//     <div className="dashboard-home-content">
//       <div className="stats-grid">
//         <div className="dashboard-card glass">
//           <p>Total Postings</p>
//           <h3>{stats.totalPostings || 0}</h3>
//         </div>
//         <div className="dashboard-card glass">
//           <p>Active Projects</p>
//           <h3>{stats.activeProjects || 0}</h3>
//         </div>
        
//         {/* Trust Score Card - NOW DYNAMIC */}
//         <div className="dashboard-card glass" style={{ borderLeft: trustScore < 100 ? '4px solid #ef4444' : '4px solid #10b981' }}>
//           <p>Payment Trust Score</p>
//           <h3 style={{ color: trustScore < 100 ? '#ef4444' : '#10b981' }}>
//             {trustScore !== undefined ? trustScore : 100}%
//           </h3>
//         </div>

//         <div className="dashboard-card glass">
//           <p>Interviews Scheduled</p>
//           <h3>{stats.interviewsScheduled || 0}</h3>
//         </div>
//       </div>

//       {/* Payment Tracking & Disputes */}
//       <div className="payment-tracking glass" style={{ marginTop: '20px', padding: '20px' }}>
//         <h3 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>💳 Payment Tracking (15-Day Rule)</h3>
//         <div className="deadline-list">
//           {projects?.filter(p => p.status?.toLowerCase() === 'completed' || p.isDisputed).length > 0 ? (
//             projects.filter(p => p.status?.toLowerCase() === 'completed' || p.isDisputed).map(proj => {
//               const info = getPaymentDeadlineInfo(proj);
//               return (
//                 <div key={proj._id} className="payment-item" style={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'center',
//                   borderBottom: '1px solid var(--border-soft)', 
//                   padding: '12px 0',
//                   backgroundColor: proj.isDisputed && proj.paymentStatus !== 'cleared' ? '#fef2f2' : 'transparent',
//                   paddingLeft: '10px',
//                   borderRadius: '8px'
//                 }}>
//                   <div style={{ display: 'flex', flexDirection: 'column' }}>
//                     <strong>{proj.technology || proj.title}</strong>
//                     {/* BUTTON DISAPPEARS IF PAYMENT IS CLEARED */}
//                     {proj.isDisputed && proj.paymentStatus !== 'cleared' && (
//                       <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
//                         <span style={{ 
//                           color: '#dc2626', 
//                           fontSize: '0.7rem', 
//                           fontWeight: 'bold', 
//                           backgroundColor: '#fee2e2', 
//                           padding: '2px 8px', 
//                           borderRadius: '4px',
//                           border: '1px solid #fecaca'
//                         }}>
//                           ⚠️ DISPUTE RAISED BY TRAINER
//                         </span>
//                         <button 
//                           onClick={() => handleResolveDispute(proj._id, proj.technology)}
//                           style={{ 
//                             backgroundColor: '#4338ca', 
//                             color: 'white', 
//                             border: 'none', 
//                             padding: '3px 10px', 
//                             borderRadius: '4px', 
//                             fontSize: '0.7rem', 
//                             cursor: 'pointer' 
//                           }}
//                         >
//                           Resolve & Pay
//                         </button>
//                       </div>
//                     )}
//                   </div>
                  
//                   <span style={{ 
//                     color: (proj.isDisputed && proj.paymentStatus !== 'cleared') || info?.isOverdue ? '#ef4444' : (info?.isUrgent ? '#f59e0b' : '#10b981'), 
//                     fontWeight: 'bold',
//                     textAlign: 'right'
//                   }}>
//                     {proj.paymentStatus === 'cleared' ? (
//                       <div style={{ display: 'flex', flexDirection: 'column' }}>
//                         <span>✅ Paid</span>
//                         {proj.transactionId && <small style={{ fontSize: '0.65rem', color: '#666' }}>ID: {proj.transactionId}</small>}
//                       </div>
//                     ) : (
//                       <>
//                         {proj.isDisputed ? "Under Dispute" : (info?.isOverdue ? "Overdue" : `Due in ${info?.days} days`)}
//                         {info && <small style={{ color: '#666', marginLeft: '10px', fontWeight: 'normal' }}>({info?.date})</small>}
//                       </>
//                     )}
//                   </span>
//                 </div>
//               );
//             })
//           ) : (
//             <p style={{ color: '#888', textAlign: 'center', padding: '10px' }}>No completed projects or active disputes.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ====== NotificationPanel ======
// function NotificationPanel({ companyId }) {
//   const [notifications, setNotifications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchNotifications = async () => {
//     if (!companyId) return;
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) { console.error(err); }
//   };

//   const markAsRead = async (id) => {
//     try {
//       setNotifications((prev) => prev.map((note) => note._id === id ? { ...note, isRead: true } : note));
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, [companyId]);

//   return (
//     <div className="notifications-list">
//       {notifications.length > 0 ? (
//         notifications.map((note) => (
//           <div key={note._id} onClick={() => markAsRead(note._id)} className={`notification glass ${note.isRead ? "read" : "unread"}`}>
//             {note.message}
//           </div>
//         ))
//       ) : ( <p>No notifications yet.</p> )}
//     </div>
//   );
// }

// // ================= Main CompanyDashboard =================
// function CompanyDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [stats, setStats] = useState({});
//   const [projects, setProjects] = useState([]); 
//   const [companyProfile, setCompanyProfile] = useState({});
//   const [refreshProjects, setRefreshProjects] = useState(false);
//   const companyId = localStorage.getItem("companyId");
//   const token = localStorage.getItem("token");
  
//   const fetchData = async () => {
//     try {
//       const statsRes = await axios.get("http://localhost:5000/api/company/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       const projectsRes = await axios.get(`http://localhost:5000/api/company/${companyId}/projects`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const profileRes = await axios.get(`http://localhost:5000/api/company/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setStats(statsRes.data.data);
//       setProjects(projectsRes.data.data);
//       setCompanyProfile(profileRes.data.data);

//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//     }
//   };

//   useEffect(() => {
//     if (token && companyId) fetchData();
//   }, [token, refreshProjects, companyId]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const triggerRefresh = () => {
//     setRefreshProjects((prev) => !prev);
//     setActiveTab("projects");
//   };

//   const renderContent = () => {
//     const currentTrustScore = companyProfile?.trustScore !== undefined ? companyProfile.trustScore : 100;

//     switch (activeTab) {
//       case "home":
//         return <DashboardHome stats={stats} projects={projects} trustScore={currentTrustScore} onRefresh={fetchData} />;
//       case "projects":
//         return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
//       case "post":
//         return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
//       case "network":
//         return <CompanyNetwork />; 
//       case "notifications":
//         return <NotificationPanel companyId={companyId} />;
//       default:
//         return <DashboardHome stats={stats} projects={projects} trustScore={currentTrustScore} onRefresh={fetchData} />;
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">Trainistry</h2>
//         <nav className="nav-menu">
//           <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
//             Dashboard Overview
//           </button>
//           <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
//             My Project Postings
//           </button>
//           <button className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>
//             Create Requirement
//           </button>
//           <button className={activeTab === "network" ? "active" : ""} onClick={() => setActiveTab("network")}>
//             Industrial Network
//           </button>
//           <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
//             Notifications
//           </button>
//         </nav>
//         <div className="sidebar-bottom">
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </aside>

//       <main className="main-content">
//         <header className="dashboard-header">
//           <h1>
//             {activeTab === "home" && "Company Overview"}
//             {activeTab === "projects" && "Managed Projects"}
//             {activeTab === "post" && "Post New Requirement"}
//             {activeTab === "network" && "Industrial Talent Feed"}
//             {activeTab === "notifications" && "Recent Notifications"}
//           </h1>
//         </header>
//         <div className="content-area">
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CompanyDashboard;

import React, { useState, useEffect } from "react";
import PostProjectForm from "../../components/company/PostProjectForm";
import CompanyProjects from "../../components/company/CompanyProjects";
import CompanyNetwork from "./CompanyNetwork"; 
import CompanyProfile from "./CompanyProfile"; // Import the profile page we just built
import axios from "axios";
import "../../styles/companyDashboard.css";

// ====== Component: DashboardHome (With Payment tracking & Trust Score) =====
function DashboardHome({ stats, projects, trustScore, onRefresh }) {
  const token = localStorage.getItem("token");

  const getPaymentDeadlineInfo = (project) => {
    if (project.status?.toLowerCase() !== 'completed' || !project.paymentDeadline) return null;
    
    const deadline = new Date(project.paymentDeadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      days: diffDays,
      date: deadline.toLocaleDateString('en-IN'),
      isUrgent: diffDays <= 3,
      isOverdue: diffDays <= 0
    };
  };

  const handleResolveDispute = async (projectId, techName) => {
    const transactionId = window.prompt(`Enter Transaction ID for ${techName}:`);
    if (!transactionId) return;

    try {
      await axios.put(`http://localhost:5000/api/company/applications/${projectId}/resolve`, 
        { transactionId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Dispute resolved! Trust Score restored.");
      onRefresh(); 
    } catch (err) {
      alert(err.response?.data?.message || "Error resolving dispute");
    }
  };

  return (
    <div className="dashboard-home-content">
      <div className="stats-grid">
        <div className="dashboard-card glass">
          <p>Total Postings</p>
          <h3>{stats.totalPostings || 0}</h3>
        </div>
        <div className="dashboard-card glass">
          <p>Active Projects</p>
          <h3>{stats.activeProjects || 0}</h3>
        </div>
        
        <div className="dashboard-card glass" style={{ borderLeft: trustScore < 100 ? '4px solid #ef4444' : '4px solid #10b981' }}>
          <p>Payment Trust Score</p>
          <h3 style={{ color: trustScore < 100 ? '#ef4444' : '#10b981' }}>
            {trustScore !== undefined ? trustScore : 100}%
          </h3>
        </div>

        <div className="dashboard-card glass">
          <p>Interviews Scheduled</p>
          <h3>{stats.interviewsScheduled || 0}</h3>
        </div>
      </div>

      <div className="payment-tracking glass" style={{ marginTop: '20px', padding: '20px' }}>
        <h3 style={{ marginBottom: '15px', color: '#4338ca' }}>💳 Payment Tracking (15-Day Rule)</h3>
        <div className="deadline-list">
          {projects?.filter(p => p.status?.toLowerCase() === 'completed' || p.isDisputed).length > 0 ? (
            projects.filter(p => p.status?.toLowerCase() === 'completed' || p.isDisputed).map(proj => {
              const info = getPaymentDeadlineInfo(proj);
              return (
                <div key={proj._id} className="payment-item" style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '12px 10px',
                  backgroundColor: proj.isDisputed && proj.paymentStatus !== 'cleared' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong>{proj.technology || proj.title}</strong>
                    {proj.isDisputed && proj.paymentStatus !== 'cleared' && (
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                        <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: 'rgba(239, 68, 68, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                          ⚠️ DISPUTE RAISED
                        </span>
                        <button onClick={() => handleResolveDispute(proj._id, proj.technology)} style={{ backgroundColor: '#4338ca', color: 'white', border: 'none', padding: '3px 10px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>
                          Resolve & Pay
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <span style={{ 
                    color: (proj.isDisputed && proj.paymentStatus !== 'cleared') || info?.isOverdue ? '#ef4444' : (info?.isUrgent ? '#f59e0b' : '#10b981'), 
                    fontWeight: 'bold', textAlign: 'right'
                  }}>
                    {proj.paymentStatus === 'cleared' ? (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>✅ Paid</span>
                        {proj.transactionId && <small style={{ fontSize: '0.65rem', color: '#64748b' }}>ID: {proj.transactionId}</small>}
                      </div>
                    ) : (
                      <>
                        {proj.isDisputed ? "Under Dispute" : (info?.isOverdue ? "Overdue" : `Due in ${info?.days} days`)}
                        {info && <small style={{ color: '#64748b', marginLeft: '10px', fontWeight: 'normal' }}>({info?.date})</small>}
                      </>
                    )}
                  </span>
                </div>
              );
            })
          ) : (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '10px' }}>No pending payments or active disputes.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ====== Component: NotificationPanel ======
function NotificationPanel({ companyId }) {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications/company", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  const markAsRead = async (id) => {
    try {
      setNotifications((prev) => prev.map((note) => note._id === id ? { ...note, isRead: true } : note));
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notifications-list">
      {notifications.length > 0 ? (
        notifications.map((note) => (
          <div key={note._id} onClick={() => markAsRead(note._id)} className={`notification glass ${note.isRead ? "read" : "unread"}`}>
            {note.message}
          </div>
        ))
      ) : ( <p style={{ textAlign: 'center', color: '#64748b' }}>No notifications yet.</p> )}
    </div>
  );
}

// ================= Main CompanyDashboard =================
function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [stats, setStats] = useState({});
  const [projects, setProjects] = useState([]); 
  const [companyProfile, setCompanyProfile] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  
  const companyId = localStorage.getItem("companyId");
  const token = localStorage.getItem("token");
  
  const fetchData = async () => {
    try {
      const [statsRes, projectsRes, profileRes] = await Promise.all([
        axios.get("http://localhost:5000/api/company/stats", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`http://localhost:5000/api/company/${companyId}/projects`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`http://localhost:5000/api/company/me`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setStats(statsRes.data.data);
      setProjects(projectsRes.data.data);
      setCompanyProfile(profileRes.data.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    if (token && companyId) fetchData();
  }, [token, refreshTrigger, companyId, activeTab]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const onProjectPost = () => {
    setRefreshTrigger(!refreshTrigger);
    setActiveTab("projects");
  };
  
  const renderContent = () => {
    const currentTrustScore = companyProfile?.trustScore ?? 100;

    switch (activeTab) {
      case "home":
        return <DashboardHome stats={stats} projects={projects} trustScore={currentTrustScore} onRefresh={fetchData} />;
      case "projects":
        return <CompanyProjects companyId={companyId} refresh={refreshTrigger} />;
      case "post":
        return <PostProjectForm companyId={companyId} onPost={onProjectPost} />;
      case "network":
        return <CompanyNetwork />; 
      case "profile":
        return <CompanyProfile />; // The new profile component we built
      case "notifications":
        return <NotificationPanel companyId={companyId} />;
      default:
        return <DashboardHome stats={stats} projects={projects} trustScore={currentTrustScore} onRefresh={fetchData} />;
    }
  };

  return (
    <div className="company-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-logo">Trainistry</h2>
        <nav className="nav-menu">
          <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>Dashboard Overview</button>
          <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>My Project Postings</button>
          <button className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>Create Requirement</button>
          <button className={activeTab === "network" ? "active" : ""} onClick={() => setActiveTab("network")}>Industrial Network</button>
          <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>My Profile</button>
          <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
            Notifications {stats.unreadNotifications > 0 && <span className="badge">{stats.unreadNotifications}</span>}
          </button>
        </nav>
        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>
            {activeTab === "home" && "Corporate Insights"}
            {activeTab === "projects" && "Project Management"}
            {activeTab === "post" && "New Requirement"}
            {activeTab === "network" && "Talent Marketplace"}
            {activeTab === "profile" && "Company Identity"}
            {activeTab === "notifications" && "Recent Updates"}
          </h1>
        </header>
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default CompanyDashboard;