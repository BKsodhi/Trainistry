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

//   // ================= FETCH PROJECTS =================

//   const fetchProjects = async () => {
//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/trainer/projects",
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

//   // ================= FETCH APPLICATIONS =================

//   const fetchMyApplications = async () => {
//     try {

//       const res = await axios.get(
//         "http://localhost:5000/api/trainer/applications",
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

//   // ================= APPLY PROJECT =================

//   // const applyProject = async (projectId) => {

//   //   try {

//   //     await axios.post(
//   //       `http://localhost:5000/api/trainer/projects/${projectId}/apply`,
//   //       {
//   //         proposalMessage: "Interested in this project",
//   //         expectedRate: 1500,
//   //         resumeUrl: "https://resume-link.com/resume.pdf"
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`
//   //         }
//   //       }
//   //     );

//   //     alert("Application sent successfully!");

//   //     fetchMyApplications();
//   //     fetchProjects();

//   //   } catch (error) {

//   //     console.log("APPLY ERROR:", error.response?.data);

//   //     alert(error.response?.data?.message || "Failed to apply");

//   //   }

//   // };

//   // ================= LOGOUT =================

//   const logout = () => {

//     localStorage.clear();
//     window.location.href = "/";

//   };

//   // ================= LOADING =================

//   if (loading) {
//     return <h2 className="loading">Loading Projects...</h2>;
//   }

//   // ================= UI =================

//   return (

//     <div className="trainer-dashboard">

//       {/* SIDEBAR */}

//       <div className="sidebar">

//         <h2 className="logo">Trainistry</h2>

//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href = "/trainer-dashboard"}
//         >
//           Available Projects
//         </button>

//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href = "/trainer/applications"}
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
//                     <b>Technology:</b> {project.technology || "N/A"}
//                   </p>

//                   <p>
//                     <b>Budget:</b> ₹{budget}
//                   </p>

//                   <p>
//                     <b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}
//                   </p>

//                   <p>
//                     <b>Location:</b> {project.location || "Remote"}
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
//                       onClick={() => window.location.href = `/trainer/apply/${project._id}`}
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

// src/pages/TrainerDashboard.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// // Notification Component
// const Notifications = ({ token }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/trainer", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   // Mark as read
//   const markAsRead = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//       );
//     } catch (err) {
//       console.error("Error marking notification as read:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   return (
//     <div className="notifications-wrapper">
//       <button className="notification-bell" onClick={() => setOpen(!open)}>
//         🔔
//         {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
//       </button>

//       {open && (
//         <div className="notification-dropdown">
//           {notifications.length === 0 ? (
//             <div className="notification-empty">No notifications</div>
//           ) : (
//             notifications.map((n) => (
//               <div
//                 key={n._id}
//                 className={`notification-item ${!n.isRead ? "unread" : ""}`}
//                 onClick={() => markAsRead(n._id)}
//               >
//                 <div>{n.message}</div>
//                 <div className="notification-time">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // ===================
// // TrainerDashboard
// // ===================
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
//       const res = await axios.get("http://localhost:5000/api/trainer/projects", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const fetchMyApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const applied = res.data.data.map((app) => app.project._id);
//       setAppliedProjects(applied);
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
//     return <h2 className="loading">Loading Projects...</h2>;
//   }

//   return (
//     <div className="trainer-dashboard">
//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <h2 className="logo">Trainistry</h2>
//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href = "/trainer-dashboard"}
//         >
//           Available Projects
//         </button>
//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href = "/trainer/applications"}
//         >
//           My Applications
//         </button>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>Available Projects</h1>
//           <Notifications token={token} />
//         </div>

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
//                 <div key={project._id} className="project-card">
//                   <h3>{project.title}</h3>
//                   {project.description && <p>{project.description}</p>}
//                   <p><b>Technology:</b> {project.technology || "N/A"}</p>
//                   <p><b>Budget:</b> ₹{budget}</p>
//                   <p><b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}</p>
//                   <p><b>Location:</b> {project.location || "Remote"}</p>
//                   <p><b>Company:</b> {project.company?.name || "N/A"}</p>

//                   {appliedProjects.includes(project._id) ? (
//                     <button className="applied-btn" disabled>Applied ✔</button>
//                   ) : (
//                     <button
//                       className="apply-btn"
//                       onClick={() => window.location.href = `/trainer/apply/${project._id}`}
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


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";
// import Notifications from "../../components/Notifications";

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
//       const res = await axios.get("http://localhost:5000/api/projects", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const fetchMyApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const applied = res.data.data.map((app) => app.project._id);
//       setAppliedProjects(applied);
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
//     return <h2 className="loading">Loading Projects...</h2>;
//   }

//   return (
//     <div className="trainer-dashboard">
//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <h2 className="logo">Trainistry</h2>
//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href = "/trainer-dashboard"}
//         >
//           Available Projects
//         </button>
//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href = "/trainer/applications"}
//         >
//           My Applications
//         </button>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>Available Projects</h1>
//           <Notifications token={token} />
//         </div>

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
//                 <div key={project._id} className="project-card">
//                   <h3>{project.title}</h3>
//                   {project.description && <p>{project.description}</p>}
//                   <p><b>Technology:</b> {project.technology || "N/A"}</p>
//                   <p><b>Budget:</b> ₹{budget}</p>
//                   <p><b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}</p>
//                   <p><b>Location:</b> {project.location || "Remote"}</p>
//                   <p><b>Company:</b> {project.company?.name || "N/A"}</p>

//                   {appliedProjects.includes(project._id) ? (
//                     <button className="applied-btn" disabled>Applied ✔</button>
//                   ) : (
//                     <button
//                       className="apply-btn"
//                       onClick={() => window.location.href = `/trainer/apply/${project._id}`}
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

// // export default TrainerDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // For routing to Project Details
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";
// import Notifications from "../../components/Notifications";

// function TrainerDashboard() {
//   const [projects, setProjects] = useState([]);
//   const [appliedProjects, setAppliedProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProjects();
//     fetchMyApplications();
//   }, []);

//   // Fetch all available projects
//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/projects", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   // Fetch trainer's applied projects
//   const fetchMyApplications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const applied = res.data.data.map((app) => app.project._id);
//       setAppliedProjects(applied);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   // ================= APPLY TO PROJECT =================
//   const handleApply = async (projectId) => {
//     try {
//       // Navigate to Apply page
//       navigate(`/trainer/apply/${projectId}`);

//       // Optionally, we could mark it as applied instantly (UI feedback)
//       setAppliedProjects((prev) => [...prev, projectId]);
//     } catch (error) {
//       console.error("Error navigating to apply page:", error);
//     }
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
//           onClick={() => window.location.href = "/trainer-dashboard"}
//         >
//           Available Projects
//         </button>
//         <button
//           className="sidebar-btn"
//           onClick={() => window.location.href = "/trainer/applications"}
//         >
//           My Applications
//         </button>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>Available Projects</h1>
//           <Notifications token={token} />
//         </div>

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
//                 <div key={project._id} className="project-card">
//                   <h3>{project.title}</h3>
//                   {project.description && <p>{project.description}</p>}
//                   <p><b>Technology:</b> {project.technology || "N/A"}</p>
//                   <p><b>Budget:</b> ₹{budget}</p>
//                   <p><b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}</p>
//                   <p><b>Location:</b> {project.location || "Remote"}</p>
//                   <p><b>Company:</b> {project.company?.name || "N/A"}</p>

//                   <div className="project-card-buttons">
//                     {/* View Details Button */}
//                     <button
//                       className="details-btn"
//                       onClick={() => navigate(`/trainer/project/${project._id}`)}
//                     >
//                       View Details
//                     </button>

//                     {/* Apply Button */}
//                     {appliedProjects.includes(project._id) ? (
//                       <button className="applied-btn" disabled>Applied ✔</button>
//                     ) : (
//                       <button
//                         className="apply-btn"
//                         onClick={() => handleApply(project._id)}
//                       >
//                         Apply
//                       </button>
//                     )}
//                   </div>
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
import { useNavigate } from "react-router-dom"; // For routing to Project Details
import axios from "axios";
import "../../styles/TrainerDashboard.css";

// ====== Updated Notifications component =====
function Notifications({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications/trainer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/read/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleClick = (n) => {
    markAsRead(n._id);
    if (n.relatedApplication) {
      window.location.href = `/trainer/applications`;
    } else {
      window.location.reload(); // fallback
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative focus:outline-none">
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-50">
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-3 border-b cursor-pointer ${!n.isRead ? "bg-gray-100 font-medium" : ""}`}
                onClick={() => handleClick(n)}
              >
                <div>{n.message}</div>
                <div className="text-xs text-gray-400">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ================= TrainerDashboard =================
function TrainerDashboard() {
  const [projects, setProjects] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchMyApplications();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trainer/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const applied = res.data.data.map((app) => app.project._id);
      setAppliedProjects(applied);
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

  const handleApply = async (projectId) => {
    try {
      navigate(`/trainer/apply/${projectId}`);
      setAppliedProjects((prev) => [...prev, projectId]);
    } catch (error) {
      console.error("Error navigating to apply page:", error);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading Projects...</h2>;
  }

  return (
    <div className="trainer-dashboard">
      <div className="sidebar">
        <h2 className="logo">Trainistry</h2>
        <button
          className="sidebar-btn"
          onClick={() => (window.location.href = "/trainer-dashboard")}
        >
          Available Projects
        </button>
        <button
          className="sidebar-btn"
          onClick={() => (window.location.href = "/trainer/applications")}
        >
          My Applications
        </button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <h1>Available Projects</h1>
          <Notifications token={token} />
        </div>

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
                <div key={project._id} className="project-card">
                  <h3>{project.title}</h3>
                  {project.description && <p>{project.description}</p>}
                  <p>
                    <b>Technology:</b> {project.technology || "N/A"}
                  </p>
                  <p>
                    <b>Budget:</b> ₹{budget}
                  </p>
                  <p>
                    <b>Duration:</b>{" "}
                    {project.durationDays ? `${project.durationDays} days` : "N/A"}
                  </p>
                  <p>
                    <b>Location:</b> {project.location || "Remote"}
                  </p>
                  <p>
                    <b>Company:</b> {project.company?.name || "N/A"}
                  </p>

                  <div className="project-card-buttons">
                    <button
                      className="details-btn"
                      onClick={() => navigate(`/trainer/project/${project._id}`)}
                    >
                      View Details
                    </button>

                    {appliedProjects.includes(project._id) ? (
                      <button className="applied-btn" disabled>
                        Applied ✔
                      </button>
                    ) : (
                      <button
                        className="apply-btn"
                        onClick={() => handleApply(project._id)}
                      >
                        Apply
                      </button>
                    )}
                  </div>
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