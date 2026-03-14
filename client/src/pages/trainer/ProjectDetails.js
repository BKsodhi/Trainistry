import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/TrainerDashboard.css";
import Notifications from "../../components/Notifications";

function ProjectDetails() {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");

  const [project, setProject] = useState(null);
  const [appliedProjects, setAppliedProjects] = useState([]); // Track applied projects
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project details
        const projectRes = await axios.get(`http://localhost:5000/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(projectRes.data.data);

        // Fetch trainer's applied projects
        const appliedRes = await axios.get("http://localhost:5000/api/trainer/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const appliedIds = appliedRes.data.data.map((app) => app.project._id);
        setAppliedProjects(appliedIds);

      } catch (err) {
        console.error("Error fetching project or applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, token]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading) return <h2 className="loading">Loading Project Details...</h2>;
  if (!project) return <p>Project not found.</p>;

  const budget = project.perDayPayment && project.durationDays
    ? project.perDayPayment * project.durationDays
    : "N/A";

  const hasApplied = appliedProjects.includes(project._id); // Check if already applied

  return (
    <div className="trainer-dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">Trainistry</h2>
        <button className="sidebar-btn" onClick={() => window.location.href = "/trainer-dashboard"}>
          Available Projects
        </button>
        <button className="sidebar-btn" onClick={() => window.location.href = "/trainer/applications"}>
          My Applications
        </button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Project Details</h1>
          <Notifications token={token} />
        </div>

        <div className="project-card">
          <h2>{project.title || "N/A"}</h2>
          {project.description && <p>{project.description}</p>}

          <p><b>Technology:</b> {project.technology || "N/A"}</p>
          <p><b>Budget:</b> ₹{budget}</p>
          <p><b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}</p>
          <p><b>Location:</b> {project.location || "Remote"}</p>
          <p><b>Company:</b> {project.company?.name || "N/A"}</p>
          <p><b>Start Date:</b> {project.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"}</p>
          <p><b>Payment Terms:</b> {project.paymentTerms || "N/A"}</p>
          <p><b>TFA Provided:</b> {project.tfaProvided ? "Yes" : "No"}</p>
          <p><b>TOC Provided:</b> {project.tocProvided ? "Yes" : "No"}</p>
          <p><b>Status:</b> {project.status || "N/A"}</p>
          <p><b>Applications Count:</b> {project.applicationCount || 0}</p>

          <button
            className={hasApplied ? "applied-btn" : "apply-btn"}
            disabled={hasApplied}
            onClick={() => window.location.href = `/trainer/apply/${project._id}`}
          >
            {hasApplied ? "Applied ✔" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;