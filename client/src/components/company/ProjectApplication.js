import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/companyDashboard.css";

function ProjectApplications() {
  const { projectId } = useParams();
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/company/projects/${projectId}/applications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data.data || []);
    } catch (err) {
      console.error("Error fetching applications:", err.response || err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [projectId]);

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/company/applications/${applicationId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh applications list
      fetchApplications();
    } catch (err) {
      console.error("Error updating status:", err.response || err);
      alert("Failed to update status");
    }
  };

  if (!applications.length) return <div>No applications found.</div>;

  return (
    <div className="applications-container">
      {applications.map((app) => (
        <div key={app._id} className="application-card">
          <h4>{app.trainerName}</h4>
          <p>Email: {app.trainerEmail}</p>
          <p>Proposal: {app.proposal}</p>
          <p>Status: {app.status}</p>
          <button
            onClick={() => updateApplicationStatus(app._id, "shortlisted")}
            disabled={app.status !== "applied"}
          >
            Shortlist
          </button>
          <button
            onClick={() => updateApplicationStatus(app._id, "rejected")}
            disabled={app.status !== "applied"}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProjectApplications;