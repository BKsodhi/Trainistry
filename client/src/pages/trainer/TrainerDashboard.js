// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerDashboard() {

//   const [projects, setProjects] = useState([]);
//   const [appliedProjects, setAppliedProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProjects();
//     fetchMyApplications();
//   }, []);

//   const token = localStorage.getItem("token");

//   const fetchProjects = async () => {
//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/projects",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setProjects(res.data.data || []);

//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const fetchMyApplications = async () => {
//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/trainer/my-applications",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       const applied = res.data.data.map(
//         (app) => app.project._id
//       );

//       setAppliedProjects(applied);

//     } catch (error) {
//       console.error("Error fetching applications:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyProject = async (projectId) => {

//     try {

//       await axios.post(
//         `http://localhost:5000/api/projects/${projectId}/apply`,
//         {
//           proposalMessage: "Interested in this project",
//           expectedRate: 1500
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert("Application sent successfully!");

//       fetchMyApplications();

//     } catch (error) {
//       console.error(error);
//       alert("Failed to apply");
//     }

//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   if (loading) {
//     return <h2 className="loading">Loading Projects...</h2>;
//   }

//   return (

//     <div className="trainer-dashboard">

//       {/* SIDEBAR */}

//       <div className="sidebar">

//         <h2 className="logo">Trainistry</h2>

//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href="/trainer-dashboard"}
//         >
//           Available Projects
//         </button>

//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href="/trainer/applications"}
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


//       {/* MAIN CONTENT */}

//       <div className="main-content">

//         <h1>Available Projects</h1>

//         {projects.length === 0 ? (
//           <p>No projects available yet.</p>
//         ) : (

//           <div className="projects-container">

//             {projects.map((project) => (

//               <div
//                 key={project._id}
//                 className="project-card"
//               >

//                 <h3>{project.title}</h3>

//                 <p>{project.description}</p>

//                 <p>
//                   <b>Budget:</b> ₹{project.budget}
//                 </p>

//                 <p>
//                   <b>Duration:</b> {project.duration}
//                 </p>

//                 <p>
//                   <b>Company:</b> {project.company?.name}
//                 </p>

//                 {appliedProjects.includes(project._id) ? (

//                   <button
//                     className="applied-btn"
//                     disabled
//                   >
//                     Applied ✔
//                   </button>

//                 ) : (

//                   <button
//                     className="apply-btn"
//                     onClick={() => applyProject(project._id)}
//                   >
//                     Apply
//                   </button>

//                 )}

//               </div>

//             ))}

//           </div>

//         )}

//       </div>

//     </div>

//   );

// }

// export default TrainerDashboard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// function TrainerDashboard() {

//   const [projects, setProjects] = useState([]);
//   const [appliedProjects, setAppliedProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchProjects();
//     fetchMyApplications();
//   }, []);

//   const fetchProjects = async () => {
//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/projects",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setProjects(res.data.data || []);

//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const fetchMyApplications = async () => {
//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/trainer/my-applications",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       const applied = res.data.data.map((app) => app.project._id);
//       setAppliedProjects(applied);

//     } catch (error) {
//       console.error("Error fetching applications:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyProject = async (projectId) => {

//   try {

//     await axios.post(
//       `http://localhost:5000/api/projects/${projectId}/apply`,
//       {
//         proposalMessage: "Interested in this project",
//         expectedRate: 1500,
//         resumeUrl: "https://resume-link.com/resume.pdf"
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     alert("Application sent successfully!");
//     fetchMyApplications();

//   } catch (error) {

//     console.log("APPLY ERROR:", error.response?.data);

//     alert(error.response?.data?.message || "Failed to apply");

//   }

// };
//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   if (loading) {
//     return <h2 className="loading">Loading Projects...</h2>;
//   }

//   return (

//     <div className="trainer-dashboard">

//       {/* SIDEBAR */}

//       <div className="sidebar">

//         <h2 className="logo">Trainistry</h2>

//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href="/trainer-dashboard"}
//         >
//           Available Projects
//         </button>

//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href="/trainer/applications"}
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

//       {/* MAIN CONTENT */}

//       <div className="main-content">

//         <h1>Available Projects</h1>

//         {projects.length === 0 ? (
//           <p>No projects available yet.</p>
//         ) : (

//           <div className="projects-container">

//             {projects.map((project) => {

//               const budget =
//                 project.perDayPayment && project.durationDays
//                   ? project.perDayPayment * project.durationDays
//                   : "N/A";

//               return (

//                 <div
//                   key={project._id}
//                   className="project-card"
//                 >

//                   <h3>{project.title}</h3>

//                   {project.description && <p>{project.description}</p>}

//                   <p>
//                     <b>Budget:</b> ₹{budget}
//                   </p>

//                   <p>
//                     <b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}
//                   </p>

//                   <p>
//                     <b>Company:</b> {project.company?.name || "N/A"}
//                   </p>

//                   {appliedProjects.includes(project._id) ? (

//                     <button
//                       className="applied-btn"
//                       disabled
//                     >
//                       Applied ✔
//                     </button>

//                   ) : (

//                     <button
//                       className="apply-btn"
//                       onClick={() => applyProject(project._id)}
//                     >
//                       Apply
//                     </button>

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

// export default TrainerDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TrainerDashboard.css";

function TrainerDashboard() {

  const [projects, setProjects] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
    fetchMyApplications();
  }, []);

  // ================= FETCH PROJECTS =================

  const fetchProjects = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/trainer/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProjects(res.data.data || []);

    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // ================= FETCH APPLICATIONS =================

  const fetchMyApplications = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/trainer/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const applied = res.data.data.map((app) => app.project._id);

      setAppliedProjects(applied);

    } catch (error) {

      console.error("Error fetching applications:", error);

    } finally {

      setLoading(false);

    }
  };

  // ================= APPLY PROJECT =================

  const applyProject = async (projectId) => {

    try {

      await axios.post(
        `http://localhost:5000/api/trainer/projects/${projectId}/apply`,
        {
          proposalMessage: "Interested in this project",
          expectedRate: 1500,
          resumeUrl: "https://resume-link.com/resume.pdf"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Application sent successfully!");

      fetchMyApplications();
      fetchProjects();

    } catch (error) {

      console.log("APPLY ERROR:", error.response?.data);

      alert(error.response?.data?.message || "Failed to apply");

    }

  };

  // ================= LOGOUT =================

  const logout = () => {

    localStorage.clear();
    window.location.href = "/";

  };

  // ================= LOADING =================

  if (loading) {
    return <h2 className="loading">Loading Projects...</h2>;
  }

  // ================= UI =================

  return (

    <div className="trainer-dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2 className="logo">Trainistry</h2>

        <button
          className="sidebar-btn"
          onClick={() => window.location.href = "/trainer-dashboard"}
        >
          Available Projects
        </button>

        <button
          className="sidebar-btn"
          onClick={() => window.location.href = "/trainer/applications"}
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


      {/* MAIN CONTENT */}

      <div className="main-content">

        <h1>Available Projects</h1>

        {projects.length === 0 ? (

          <p>No projects available yet.</p>

        ) : (

          <div className="projects-container">

            {projects.map((project) => {

              const budget =
                project.perDayPayment && project.durationDays
                  ? project.perDayPayment * project.durationDays
                  : "N/A";

              return (

                <div
                  key={project._id}
                  className="project-card"
                >

                  <h3>{project.title}</h3>

                  {project.description && <p>{project.description}</p>}

                  <p>
                    <b>Technology:</b> {project.technology || "N/A"}
                  </p>

                  <p>
                    <b>Budget:</b> ₹{budget}
                  </p>

                  <p>
                    <b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}
                  </p>

                  <p>
                    <b>Location:</b> {project.location || "Remote"}
                  </p>

                  <p>
                    <b>Company:</b> {project.company?.name || "N/A"}
                  </p>

                  {appliedProjects.includes(project._id) ? (

                    <button
                      className="applied-btn"
                      disabled
                    >
                      Applied ✔
                    </button>

                  ) : (

                    <button
                      className="apply-btn"
                      onClick={() => applyProject(project._id)}
                    >
                      Apply
                    </button>

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

export default TrainerDashboard;