import React, { useState } from "react";
import PostProjectForm from "../../components/company/PostProjectForm";
import CompanyProjects from "../../components/company/CompanyProjects";
import NotificationPanel from "../../components/company/NotificationPanel";

import "../../styles/companyDashboard.css";

function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const companyId = localStorage.getItem("companyId");

  const handleLogout = () => {
    localStorage.removeItem("companyId");
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <CompanyProjects companyId={companyId} />;
      case "post":
        return <PostProjectForm companyId={companyId} />;
      case "notifications":
        return <NotificationPanel companyId={companyId} />;
      default:
        return <CompanyProjects companyId={companyId} />;
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

        {/* TOP HEADER */}
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