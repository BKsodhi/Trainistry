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

import React, { useState } from "react";
import PostProjectForm from "../../components/company/PostProjectForm";
import CompanyProjects from "../../components/company/CompanyProjects";
import NotificationPanel from "../../components/company/NotificationPanel";

import "../../styles/companyDashboard.css";

function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [refreshProjects, setRefreshProjects] = useState(false); // ✅ Trigger project refresh
  const companyId = localStorage.getItem("companyId");

  const handleLogout = () => {
    localStorage.removeItem("companyId");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  // Trigger a refresh whenever a new project is posted
  const triggerRefresh = () => setRefreshProjects((prev) => !prev);

  const renderContent = () => {
    if (!companyId && (activeTab === "projects" || activeTab === "notifications")) {
      return <div>Loading company info...</div>;
    }

    switch (activeTab) {
      case "projects":
        return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
      case "post":
        return <PostProjectForm companyId={companyId} onPost={triggerRefresh} />;
      case "notifications":
        return <NotificationPanel companyId={companyId} />;
      default:
        return <CompanyProjects companyId={companyId} refresh={refreshProjects} />;
    }
  };

  return (
    <div className="company-dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="sidebar-logo">Trainistry</h2>

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

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>
            {activeTab === "projects" && "My Projects"}
            {activeTab === "post" && "Post a New Project"}
            {activeTab === "notifications" && "Notifications"}
          </h1>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default CompanyDashboard;