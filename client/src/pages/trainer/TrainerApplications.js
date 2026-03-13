import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TrainerDashboard.css";

function TrainerApplications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/trainer/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setApplications(res.data.data || []);

    } catch (error) {

      console.error("Error fetching applications:", error);

    } finally {

      setLoading(false);

    }

  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading) {
    return <h2 className="loading">Loading Applications...</h2>;
  }

  return (

    <div className="trainer-dashboard">

      {/* Sidebar */}

      <div className="sidebar">

        <h2 className="logo">Trainistry</h2>

        <button
          className="sidebar-btn"
          onClick={() => window.location.href="/trainer-dashboard"}
        >
          Available Projects
        </button>

        <button
          className="sidebar-btn active"
        >
          My Applications
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>


      {/* Main */}

      <div className="main-content">

        <h1>My Applications</h1>

        {applications.length === 0 ? (

          <p>You have not applied to any projects yet.</p>

        ) : (

          <div className="projects-container">

            {applications.map((app) => {

              const project = app.project;

              const budget =
                project.perDayPayment && project.durationDays
                  ? project.perDayPayment * project.durationDays
                  : "N/A";

              return (

                <div
                  key={app._id}
                  className="project-card"
                >

                  <h3>{project.title}</h3>

                  <p>
                    <b>Company:</b> {project.company?.name}
                  </p>

                  <p>
                    <b>Technology:</b> {project.technology}
                  </p>

                  <p>
                    <b>Budget:</b> ₹{budget}
                  </p>

                  <p>
                    <b>Duration:</b> {project.durationDays} days
                  </p>

                  <p>
                    <b>Expected Rate:</b> ₹{app.expectedRate}
                  </p>

                  <p>
                    <b>Status:</b>
                    <span className={`status ${app.status}`}>
                      {app.status}
                    </span>
                  </p>

                  {app.interviewDate && (

                    <p>
                      <b>Interview:</b>{" "}
                      {new Date(app.interviewDate).toLocaleDateString()}
                    </p>

                  )}

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

}

export default TrainerApplications;