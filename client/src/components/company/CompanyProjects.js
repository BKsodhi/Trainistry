import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/companyDashboard.css";

function CompanyProjects({ companyId, refreshFlag }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!companyId) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/company/${companyId}/projects`
        );
        setProjects(res.data.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err.response || err);
      }
    };

    fetchProjects();
  }, [companyId, refreshFlag]); // ✅ refresh on toggle

  if (!projects.length) return <div>No projects found.</div>;

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <div key={project._id} className="project-card">
          <h3>{project.technology}</h3>
          <p>Location: {project.location || "N/A"}</p>
          <p>
            Start Date:{" "}
            {project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>Duration: {project.durationDays || "N/A"} days</p>
          <p>Payment: ₹{project.perDayPayment || "N/A"} / day</p>
          <span
            className={`status-badge status-${project.status?.toLowerCase() || "pending"}`}
          >
            {project.status || "Pending"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CompanyProjects;