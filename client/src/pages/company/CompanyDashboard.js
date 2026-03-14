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

import React, { useState, useEffect } from "react";
import PostProjectForm from "../../components/company/PostProjectForm";
import CompanyProjects from "../../components/company/CompanyProjects";
import axios from "axios";
import "../../styles/companyDashboard.css";

// ====== New Component: DashboardHome (Figma Stats View) =====
function DashboardHome({ stats }) {
  return (
    <div className="stats-grid">
      <div className="dashboard-card glass">
        <p>Total Postings</p>
        <h3>{stats.totalPostings || 0}</h3>
      </div>
      <div className="dashboard-card glass">
        <p>Active Projects</p>
        <h3>{stats.activeProjects || 0}</h3>
      </div>
      <div className="dashboard-card glass">
        <p>Shortlisted Trainers</p>
        <h3>{stats.shortlistedTrainers || 0}</h3>
      </div>
      <div className="dashboard-card glass">
        <p>Interviews Scheduled</p>
        <h3>{stats.interviewsScheduled || 0}</h3>
      </div>
    </div>
  );
}

// ====== NotificationPanel =====
function NotificationPanel({ companyId }) {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    if (!companyId) return;
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notifications/company",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // 🔹 MARK AS READ FUNCTION
  const markAsRead = async (id) => {
    try {

      // instant UI update
      setNotifications((prev) =>
        prev.map((note) =>
          note._id === id ? { ...note, isRead: true } : note
        )
      );

      await axios.put(
        `http://localhost:5000/api/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [companyId]);

  return (
    <div className="notifications-list">
      {notifications.length > 0 ? (
        notifications.map((note) => (
          <div
            key={note._id}
            onClick={() => markAsRead(note._id)}
            className={`notification glass ${note.isRead ? "read" : "unread"}`}
          >
            {note.message}
          </div>
        ))
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
}

// ================= Main CompanyDashboard =================
function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [stats, setStats] = useState({});
  const [refreshProjects, setRefreshProjects] = useState(false);
  const companyId = localStorage.getItem("companyId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/company/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(res.data.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    if (token) fetchStats();
  }, [token, refreshProjects]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const triggerRefresh = () => {
    setRefreshProjects((prev) => !prev);
    setActiveTab("projects");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome stats={stats} />;
      case "projects":
        return (
          <CompanyProjects
            companyId={companyId}
            refresh={refreshProjects}
          />
        );
      case "post":
        return (
          <PostProjectForm
            companyId={companyId}
            onPost={triggerRefresh}
          />
        );
      case "notifications":
        return <NotificationPanel companyId={companyId} />;
      default:
        return <DashboardHome stats={stats} />;
    }
  };

  return (
    <div className="company-dashboard">
      <div className="sidebar">
        <h2 className="sidebar-logo">Trainistry</h2>

        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => setActiveTab("home")}
        >
          Overview
        </button>

        <button
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          My Projects
        </button>

        <button
          className={activeTab === "post" ? "active" : ""}
          onClick={() => setActiveTab("post")}
        >
          Post Project
        </button>

        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <h1>
            {activeTab === "home" && "Company Overview"}
            {activeTab === "projects" && "My Project Postings"}
            {activeTab === "post" && "Create New Requirement"}
            {activeTab === "notifications" && "Recent Notifications"}
          </h1>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default CompanyDashboard;