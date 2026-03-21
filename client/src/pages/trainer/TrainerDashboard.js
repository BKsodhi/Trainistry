// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "../../styles/TrainerDashboard.css";

// // function TrainerDashboard() {

// //   const [projects, setProjects] = useState([]);
// //   const [appliedProjects, setAppliedProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchProjects();
// //     fetchMyApplications();
// //   }, []);

// //   const token = localStorage.getItem("token");

// //   const fetchProjects = async () => {
// //     try {

// //       const res = await axios.get(
// //         "http://localhost:5000/api/projects",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       setProjects(res.data.data || []);

// //     } catch (error) {
// //       console.error("Error fetching projects:", error);
// //     }
// //   };

// //   const fetchMyApplications = async () => {
// //     try {

// //       const res = await axios.get(
// //         "http://localhost:5000/api/trainer/my-applications",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       const applied = res.data.data.map(
// //         (app) => app.project._id
// //       );

// //       setAppliedProjects(applied);

// //     } catch (error) {
// //       console.error("Error fetching applications:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const applyProject = async (projectId) => {

// //     try {

// //       await axios.post(
// //         `http://localhost:5000/api/projects/${projectId}/apply`,
// //         {
// //           proposalMessage: "Interested in this project",
// //           expectedRate: 1500
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       alert("Application sent successfully!");

// //       fetchMyApplications();

// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to apply");
// //     }

// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     window.location.href = "/";
// //   };

// //   if (loading) {
// //     return <h2 className="loading">Loading Projects...</h2>;
// //   }

// //   return (

// //     <div className="trainer-dashboard">

// //       {/* SIDEBAR */}

// //       <div className="sidebar">

// //         <h2 className="logo">Trainistry</h2>

// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href="/trainer-dashboard"}
// //         >
// //           Available Projects
// //         </button>

// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href="/trainer/applications"}
// //         >
// //           My Applications
// //         </button>

// //         <button
// //           className="logout-btn"
// //           onClick={logout}
// //         >
// //           Logout
// //         </button>

// //       </div>


// //       {/* MAIN CONTENT */}

// //       <div className="main-content">

// //         <h1>Available Projects</h1>

// //         {projects.length === 0 ? (
// //           <p>No projects available yet.</p>
// //         ) : (

// //           <div className="projects-container">

// //             {projects.map((project) => (

// //               <div
// //                 key={project._id}
// //                 className="project-card"
// //               >

// //                 <h3>{project.title}</h3>

// //                 <p>{project.description}</p>

// //                 <p>
// //                   <b>Budget:</b> ₹{project.budget}
// //                 </p>

// //                 <p>
// //                   <b>Duration:</b> {project.duration}
// //                 </p>

// //                 <p>
// //                   <b>Company:</b> {project.company?.name}
// //                 </p>

// //                 {appliedProjects.includes(project._id) ? (

// //                   <button
// //                     className="applied-btn"
// //                     disabled
// //                   >
// //                     Applied ✔
// //                   </button>

// //                 ) : (

// //                   <button
// //                     className="apply-btn"
// //                     onClick={() => applyProject(project._id)}
// //                   >
// //                     Apply
// //                   </button>

// //                 )}

// //               </div>

// //             ))}

// //           </div>

// //         )}

// //       </div>

// //     </div>

// //   );

// // }

// // export default TrainerDashboard;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "../../styles/TrainerDashboard.css";

// // function TrainerDashboard() {

// //   const [projects, setProjects] = useState([]);
// //   const [appliedProjects, setAppliedProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     fetchProjects();
// //     fetchMyApplications();
// //   }, []);

// //   const fetchProjects = async () => {
// //     try {

// //       const res = await axios.get(
// //         "http://localhost:5000/api/projects",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       setProjects(res.data.data || []);

// //     } catch (error) {
// //       console.error("Error fetching projects:", error);
// //     }
// //   };

// //   const fetchMyApplications = async () => {
// //     try {

// //       const res = await axios.get(
// //         "http://localhost:5000/api/trainer/my-applications",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       const applied = res.data.data.map((app) => app.project._id);
// //       setAppliedProjects(applied);

// //     } catch (error) {
// //       console.error("Error fetching applications:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const applyProject = async (projectId) => {

// //   try {

// //     await axios.post(
// //       `http://localhost:5000/api/projects/${projectId}/apply`,
// //       {
// //         proposalMessage: "Interested in this project",
// //         expectedRate: 1500,
// //         resumeUrl: "https://resume-link.com/resume.pdf"
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       }
// //     );

// //     alert("Application sent successfully!");
// //     fetchMyApplications();

// //   } catch (error) {

// //     console.log("APPLY ERROR:", error.response?.data);

// //     alert(error.response?.data?.message || "Failed to apply");

// //   }

// // };
// //   const logout = () => {
// //     localStorage.clear();
// //     window.location.href = "/";
// //   };

// //   if (loading) {
// //     return <h2 className="loading">Loading Projects...</h2>;
// //   }

// //   return (

// //     <div className="trainer-dashboard">

// //       {/* SIDEBAR */}

// //       <div className="sidebar">

// //         <h2 className="logo">Trainistry</h2>

// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href="/trainer-dashboard"}
// //         >
// //           Available Projects
// //         </button>

// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href="/trainer/applications"}
// //         >
// //           My Applications
// //         </button>

// //         <button
// //           className="logout-btn"
// //           onClick={logout}
// //         >
// //           Logout
// //         </button>

// //       </div>

// //       {/* MAIN CONTENT */}

// //       <div className="main-content">

// //         <h1>Available Projects</h1>

// //         {projects.length === 0 ? (
// //           <p>No projects available yet.</p>
// //         ) : (

// //           <div className="projects-container">

// //             {projects.map((project) => {

// //               const budget =
// //                 project.perDayPayment && project.durationDays
// //                   ? project.perDayPayment * project.durationDays
// //                   : "N/A";

// //               return (

// //                 <div
// //                   key={project._id}
// //                   className="project-card"
// //                 >

// //                   <h3>{project.title}</h3>

// //                   {project.description && <p>{project.description}</p>}

// //                   <p>
// //                     <b>Budget:</b> ₹{budget}
// //                   </p>

// //                   <p>
// //                     <b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}
// //                   </p>

// //                   <p>
// //                     <b>Company:</b> {project.company?.name || "N/A"}
// //                   </p>

// //                   {appliedProjects.includes(project._id) ? (

// //                     <button
// //                       className="applied-btn"
// //                       disabled
// //                     >
// //                       Applied ✔
// //                     </button>

// //                   ) : (

// //                     <button
// //                       className="apply-btn"
// //                       onClick={() => applyProject(project._id)}
// //                     >
// //                       Apply
// //                     </button>

// //                   )}

// //                 </div>

// //               );

// //             })}

// //           </div>

// //         )}

// //       </div>

// //     </div>

// //   );

// // }

// // export default TrainerDashboard;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "../../styles/TrainerDashboard.css";

// // function TrainerDashboard() {

// //   const [projects, setProjects] = useState([]);
// //   const [appliedProjects, setAppliedProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     fetchProjects();
// //     fetchMyApplications();
// //   }, []);

// //   // ================= FETCH PROJECTS =================

// //   const fetchProjects = async () => {
// //     try {

// //       const res = await axios.get(
// //         "http://localhost:5000/api/trainer/projects",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       setProjects(res.data.data || []);

// //     } catch (error) {
// //       console.error("Error fetching projects:", error);
// //     }
// //   };

// //   // ================= FETCH APPLICATIONS =================

// //   const fetchMyApplications = async () => {
// //     try {

// //       const res = await axios.get(
// //         "http://localhost:5000/api/trainer/applications",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       const applied = res.data.data.map((app) => app.project._id);

// //       setAppliedProjects(applied);

// //     } catch (error) {

// //       console.error("Error fetching applications:", error);

// //     } finally {

// //       setLoading(false);

// //     }
// //   };

// //   // ================= APPLY PROJECT =================

// //   // const applyProject = async (projectId) => {

// //   //   try {

// //   //     await axios.post(
// //   //       `http://localhost:5000/api/trainer/projects/${projectId}/apply`,
// //   //       {
// //   //         proposalMessage: "Interested in this project",
// //   //         expectedRate: 1500,
// //   //         resumeUrl: "https://resume-link.com/resume.pdf"
// //   //       },
// //   //       {
// //   //         headers: {
// //   //           Authorization: `Bearer ${token}`
// //   //         }
// //   //       }
// //   //     );

// //   //     alert("Application sent successfully!");

// //   //     fetchMyApplications();
// //   //     fetchProjects();

// //   //   } catch (error) {

// //   //     console.log("APPLY ERROR:", error.response?.data);

// //   //     alert(error.response?.data?.message || "Failed to apply");

// //   //   }

// //   // };

// //   // ================= LOGOUT =================

// //   const logout = () => {

// //     localStorage.clear();
// //     window.location.href = "/";

// //   };

// //   // ================= LOADING =================

// //   if (loading) {
// //     return <h2 className="loading">Loading Projects...</h2>;
// //   }

// //   // ================= UI =================

// //   return (

// //     <div className="trainer-dashboard">

// //       {/* SIDEBAR */}

// //       <div className="sidebar">

// //         <h2 className="logo">Trainistry</h2>

// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href = "/trainer-dashboard"}
// //         >
// //           Available Projects
// //         </button>

// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href = "/trainer/applications"}
// //         >
// //           My Applications
// //         </button>

// //         <button
// //           className="logout-btn"
// //           onClick={logout}
// //         >
// //           Logout
// //         </button>

// //       </div>


// //       {/* MAIN CONTENT */}

// //       <div className="main-content">

// //         <h1>Available Projects</h1>

// //         {projects.length === 0 ? (

// //           <p>No projects available yet.</p>

// //         ) : (

// //           <div className="projects-container">

// //             {projects.map((project) => {

// //               const budget =
// //                 project.perDayPayment && project.durationDays
// //                   ? project.perDayPayment * project.durationDays
// //                   : "N/A";

// //               return (

// //                 <div
// //                   key={project._id}
// //                   className="project-card"
// //                 >

// //                   <h3>{project.title}</h3>

// //                   {project.description && <p>{project.description}</p>}

// //                   <p>
// //                     <b>Technology:</b> {project.technology || "N/A"}
// //                   </p>

// //                   <p>
// //                     <b>Budget:</b> ₹{budget}
// //                   </p>

// //                   <p>
// //                     <b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}
// //                   </p>

// //                   <p>
// //                     <b>Location:</b> {project.location || "Remote"}
// //                   </p>

// //                   <p>
// //                     <b>Company:</b> {project.company?.name || "N/A"}
// //                   </p>

// //                   {appliedProjects.includes(project._id) ? (

// //                     <button
// //                       className="applied-btn"
// //                       disabled
// //                     >
// //                       Applied ✔
// //                     </button>

// //                   ) : (

// //                     <button
// //                       className="apply-btn"
// //                       onClick={() => window.location.href = `/trainer/apply/${project._id}`}
// //                     >
// //                       Apply
// //                     </button>

// //                   )}

// //                 </div>

// //               );

// //             })}

// //           </div>

// //         )}

// //       </div>

// //     </div>

// //   );

// // }

// // export default TrainerDashboard;

// // src/pages/TrainerDashboard.js
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "../../styles/TrainerDashboard.css";

// // // Notification Component
// // const Notifications = ({ token }) => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [open, setOpen] = useState(false);

// //   // Fetch notifications
// //   const fetchNotifications = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/notifications/trainer", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setNotifications(res.data.data || []);
// //     } catch (err) {
// //       console.error("Error fetching notifications:", err);
// //     }
// //   };

// //   // Mark as read
// //   const markAsRead = async (id) => {
// //     try {
// //       await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setNotifications((prev) =>
// //         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
// //       );
// //     } catch (err) {
// //       console.error("Error marking notification as read:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchNotifications();
// //     const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
// //     return () => clearInterval(interval);
// //   }, []);

// //   const unreadCount = notifications.filter((n) => !n.isRead).length;

// //   return (
// //     <div className="notifications-wrapper">
// //       <button className="notification-bell" onClick={() => setOpen(!open)}>
// //         🔔
// //         {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
// //       </button>

// //       {open && (
// //         <div className="notification-dropdown">
// //           {notifications.length === 0 ? (
// //             <div className="notification-empty">No notifications</div>
// //           ) : (
// //             notifications.map((n) => (
// //               <div
// //                 key={n._id}
// //                 className={`notification-item ${!n.isRead ? "unread" : ""}`}
// //                 onClick={() => markAsRead(n._id)}
// //               >
// //                 <div>{n.message}</div>
// //                 <div className="notification-time">
// //                   {new Date(n.createdAt).toLocaleString()}
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // ===================
// // // TrainerDashboard
// // // ===================
// // function TrainerDashboard() {
// //   const [projects, setProjects] = useState([]);
// //   const [appliedProjects, setAppliedProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     fetchProjects();
// //     fetchMyApplications();
// //   }, []);

// //   const fetchProjects = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/trainer/projects", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setProjects(res.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching projects:", error);
// //     }
// //   };

// //   const fetchMyApplications = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const applied = res.data.data.map((app) => app.project._id);
// //       setAppliedProjects(applied);
// //     } catch (error) {
// //       console.error("Error fetching applications:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     window.location.href = "/";
// //   };

// //   if (loading) {
// //     return <h2 className="loading">Loading Projects...</h2>;
// //   }

// //   return (
// //     <div className="trainer-dashboard">
// //       {/* SIDEBAR */}
// //       <div className="sidebar">
// //         <h2 className="logo">Trainistry</h2>
// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href = "/trainer-dashboard"}
// //         >
// //           Available Projects
// //         </button>
// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href = "/trainer/applications"}
// //         >
// //           My Applications
// //         </button>
// //         <button className="logout-btn" onClick={logout}>Logout</button>
// //       </div>

// //       {/* MAIN CONTENT */}
// //       <div className="main-content">
// //         <div className="dashboard-header">
// //           <h1>Available Projects</h1>
// //           <Notifications token={token} />
// //         </div>

// //         {projects.length === 0 ? (
// //           <p>No projects available yet.</p>
// //         ) : (
// //           <div className="projects-container">
// //             {projects.map((project) => {
// //               const budget =
// //                 project.perDayPayment && project.durationDays
// //                   ? project.perDayPayment * project.durationDays
// //                   : "N/A";

// //               return (
// //                 <div key={project._id} className="project-card">
// //                   <h3>{project.title}</h3>
// //                   {project.description && <p>{project.description}</p>}
// //                   <p><b>Technology:</b> {project.technology || "N/A"}</p>
// //                   <p><b>Budget:</b> ₹{budget}</p>
// //                   <p><b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}</p>
// //                   <p><b>Location:</b> {project.location || "Remote"}</p>
// //                   <p><b>Company:</b> {project.company?.name || "N/A"}</p>

// //                   {appliedProjects.includes(project._id) ? (
// //                     <button className="applied-btn" disabled>Applied ✔</button>
// //                   ) : (
// //                     <button
// //                       className="apply-btn"
// //                       onClick={() => window.location.href = `/trainer/apply/${project._id}`}
// //                     >
// //                       Apply
// //                     </button>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default TrainerDashboard;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "../../styles/TrainerDashboard.css";
// // import Notifications from "../../components/Notifications";

// // function TrainerDashboard() {
// //   const [projects, setProjects] = useState([]);
// //   const [appliedProjects, setAppliedProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     fetchProjects();
// //     fetchMyApplications();
// //   }, []);

// //   const fetchProjects = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/projects", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setProjects(res.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching projects:", error);
// //     }
// //   };

// //   const fetchMyApplications = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const applied = res.data.data.map((app) => app.project._id);
// //       setAppliedProjects(applied);
// //     } catch (error) {
// //       console.error("Error fetching applications:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     window.location.href = "/";
// //   };

// //   if (loading) {
// //     return <h2 className="loading">Loading Projects...</h2>;
// //   }

// //   return (
// //     <div className="trainer-dashboard">
// //       {/* SIDEBAR */}
// //       <div className="sidebar">
// //         <h2 className="logo">Trainistry</h2>
// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href = "/trainer-dashboard"}
// //         >
// //           Available Projects
// //         </button>
// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href = "/trainer/applications"}
// //         >
// //           My Applications
// //         </button>
// //         <button className="logout-btn" onClick={logout}>Logout</button>
// //       </div>

// //       {/* MAIN CONTENT */}
// //       <div className="main-content">
// //         <div className="dashboard-header">
// //           <h1>Available Projects</h1>
// //           <Notifications token={token} />
// //         </div>

// //         {projects.length === 0 ? (
// //           <p>No projects available yet.</p>
// //         ) : (
// //           <div className="projects-container">
// //             {projects.map((project) => {
// //               const budget =
// //                 project.perDayPayment && project.durationDays
// //                   ? project.perDayPayment * project.durationDays
// //                   : "N/A";

// //               return (
// //                 <div key={project._id} className="project-card">
// //                   <h3>{project.title}</h3>
// //                   {project.description && <p>{project.description}</p>}
// //                   <p><b>Technology:</b> {project.technology || "N/A"}</p>
// //                   <p><b>Budget:</b> ₹{budget}</p>
// //                   <p><b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}</p>
// //                   <p><b>Location:</b> {project.location || "Remote"}</p>
// //                   <p><b>Company:</b> {project.company?.name || "N/A"}</p>

// //                   {appliedProjects.includes(project._id) ? (
// //                     <button className="applied-btn" disabled>Applied ✔</button>
// //                   ) : (
// //                     <button
// //                       className="apply-btn"
// //                       onClick={() => window.location.href = `/trainer/apply/${project._id}`}
// //                     >
// //                       Apply
// //                     </button>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // export default TrainerDashboard;

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom"; // For routing to Project Details
// // import axios from "axios";
// // import "../../styles/TrainerDashboard.css";
// // import Notifications from "../../components/Notifications";

// // function TrainerDashboard() {
// //   const [projects, setProjects] = useState([]);
// //   const [appliedProjects, setAppliedProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("token");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchProjects();
// //     fetchMyApplications();
// //   }, []);

// //   // Fetch all available projects
// //   const fetchProjects = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/projects", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setProjects(res.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching projects:", error);
// //     }
// //   };

// //   // Fetch trainer's applied projects
// //   const fetchMyApplications = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/trainer/applications", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const applied = res.data.data.map((app) => app.project._id);
// //       setAppliedProjects(applied);
// //     } catch (error) {
// //       console.error("Error fetching applications:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Logout function
// //   const logout = () => {
// //     localStorage.clear();
// //     window.location.href = "/";
// //   };

// //   // ================= APPLY TO PROJECT =================
// //   const handleApply = async (projectId) => {
// //     try {
// //       // Navigate to Apply page
// //       navigate(`/trainer/apply/${projectId}`);

// //       // Optionally, we could mark it as applied instantly (UI feedback)
// //       setAppliedProjects((prev) => [...prev, projectId]);
// //     } catch (error) {
// //       console.error("Error navigating to apply page:", error);
// //     }
// //   };

// //   if (loading) {
// //     return <h2 className="loading">Loading Projects...</h2>;
// //   }

// //   return (
// //     <div className="trainer-dashboard">
// //       {/* SIDEBAR */}
// //       <div className="sidebar">
// //         <h2 className="logo">Trainistry</h2>
// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href = "/trainer-dashboard"}
// //         >
// //           Available Projects
// //         </button>
// //         <button
// //           className="sidebar-btn"
// //           onClick={() => window.location.href = "/trainer/applications"}
// //         >
// //           My Applications
// //         </button>
// //         <button className="logout-btn" onClick={logout}>Logout</button>
// //       </div>

// //       {/* MAIN CONTENT */}
// //       <div className="main-content">
// //         <div className="dashboard-header">
// //           <h1>Available Projects</h1>
// //           <Notifications token={token} />
// //         </div>

// //         {projects.length === 0 ? (
// //           <p>No projects available yet.</p>
// //         ) : (
// //           <div className="projects-container">
// //             {projects.map((project) => {
// //               const budget =
// //                 project.perDayPayment && project.durationDays
// //                   ? project.perDayPayment * project.durationDays
// //                   : "N/A";

// //               return (
// //                 <div key={project._id} className="project-card">
// //                   <h3>{project.title}</h3>
// //                   {project.description && <p>{project.description}</p>}
// //                   <p><b>Technology:</b> {project.technology || "N/A"}</p>
// //                   <p><b>Budget:</b> ₹{budget}</p>
// //                   <p><b>Duration:</b> {project.durationDays ? `${project.durationDays} days` : "N/A"}</p>
// //                   <p><b>Location:</b> {project.location || "Remote"}</p>
// //                   <p><b>Company:</b> {project.company?.name || "N/A"}</p>

// //                   <div className="project-card-buttons">
// //                     {/* View Details Button */}
// //                     <button
// //                       className="details-btn"
// //                       onClick={() => navigate(`/trainer/project/${project._id}`)}
// //                     >
// //                       View Details
// //                     </button>

// //                     {/* Apply Button */}
// //                     {appliedProjects.includes(project._id) ? (
// //                       <button className="applied-btn" disabled>Applied ✔</button>
// //                     ) : (
// //                       <button
// //                         className="apply-btn"
// //                         onClick={() => handleApply(project._id)}
// //                       >
// //                         Apply
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default TrainerDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // For routing to Project Details
// import axios from "axios";
// import "../../styles/TrainerDashboard.css";

// // ====== Updated Notifications component =====
// function Notifications({ token }) {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);

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

//   const markAsRead = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/notifications/read/${id}`, {}, {
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
//     const interval = setInterval(fetchNotifications, 10000); // refresh every 10s
//     return () => clearInterval(interval);
//   }, []);

//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   const handleClick = (n) => {
//     markAsRead(n._id);
//     if (n.relatedApplication) {
//       window.location.href = `/trainer/applications`;
//     } else {
//       window.location.reload(); // fallback
//     }
//   };

//   return (
//     <div className="relative">
//       <button onClick={() => setOpen(!open)} className="relative focus:outline-none">
//         🔔
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-50">
//           {notifications.length === 0 ? (
//             <div className="p-4 text-gray-500">No notifications</div>
//           ) : (
//             notifications.map((n) => (
//               <div
//                 key={n._id}
//                 className={`p-3 border-b cursor-pointer ${!n.isRead ? "bg-gray-100 font-medium" : ""}`}
//                 onClick={() => handleClick(n)}
//               >
//                 <div>{n.message}</div>
//                 <div className="text-xs text-gray-400">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ================= TrainerDashboard =================
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

//   const handleApply = async (projectId) => {
//     try {
//       navigate(`/trainer/apply/${projectId}`);
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
//       <div className="sidebar">
//         <h2 className="logo">Trainistry</h2>
//         <button
//           className="sidebar-btn"
//           onClick={() => (window.location.href = "/trainer-dashboard")}
//         >
//           Available Projects
//         </button>
//         <button
//           className="sidebar-btn"
//           onClick={() => (window.location.href = "/trainer/applications")}
//         >
//           My Applications
//         </button>
//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </div>

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
//                   <p>
//                     <b>Technology:</b> {project.technology || "N/A"}
//                   </p>
//                   <p>
//                     <b>Budget:</b> ₹{budget}
//                   </p>
//                   <p>
//                     <b>Duration:</b>{" "}
//                     {project.durationDays ? `${project.durationDays} days` : "N/A"}
//                   </p>
//                   <p>
//                     <b>Location:</b> {project.location || "Remote"}
//                   </p>
//                   <p>
//                     <b>Company:</b> {project.company?.name || "N/A"}
//                   </p>

//                   <div className="project-card-buttons">
//                     <button
//                       className="details-btn"
//                       onClick={() => navigate(`/trainer/project/${project._id}`)}
//                     >
//                       View Details
//                     </button>

//                     {appliedProjects.includes(project._id) ? (
//                       <button className="applied-btn" disabled>
//                         Applied ✔
//                       </button>
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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 

// function TrainerDashboard() {
//   const [data, setData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     // Redirect if no token is found
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAll = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
        
//         // Note: Ensure backend has /api/trainer/dashboard and /api/trainer/projects 
//         // OR /api/projects as per your server.js setup
//         const [dashRes, projRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/trainer/dashboard", config),
//           axios.get("http://localhost:5000/api/trainer/projects", config)
//         ]);

//         setData(dashRes.data.data);
//         setProjects(projRes.data.data || []);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err.response?.data || err.message);
//         // If 401 Unauthorized, token might be expired
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       } finally {
//         // This ensures the loader disappears even if the request fails
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [token, navigate]);

//   const handleToggle = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/trainer/toggle-status", 
//         {}, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // Update state locally to reflect the change immediately
//       setData(prev => ({ 
//         ...prev, 
//         profile: { ...prev.profile, availability: res.data.availability } 
//       }));
//     } catch (err) {
//       console.error("Toggle error", err);
//     }
//   };

//   if (loading) return <div className="loader">Loading Trainistry...</div>;

//   // Basic error state if data failed to load
//   if (!data) return (
//     <div className="error-container">
//       <p>Could not load dashboard data. Please try again later.</p>
//       <button onClick={() => window.location.reload()}>Retry</button>
//     </div>
//   );

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn active">Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
//           <div className="status-toggle-wrapper" onClick={handleToggle}>
//             <span className={`status-indicator ${data.profile?.availability}`}></span>
//             <span>{data.profile?.availability === 'available' ? 'Available' : 'Busy'}</span>
//           </div>
//         </header>

//         <div className="stats-grid">
//           <div className="stat-card glass">
//             <h4>Total Applied</h4>
//             <span className="value">{data.stats?.totalApplications || 0}</span>
//           </div>
//           <div className="stat-card glass">
//             <h4>Interviews</h4>
//             <span className="value">{data.stats?.interviews || 0}</span>
//           </div>
//           <div className="stat-card glass">
//             <h4>Accepted</h4>
//             <span className="value">{data.stats?.accepted || 0}</span>
//           </div>
//         </div>

//         <section className="section-title">
//           <h2>Latest Projects</h2>
//         </section>

//         <div className="projects-container">
//           {projects.length > 0 ? (
//             projects.map(proj => (
//               <div key={proj._id} className="project-card">
//                 <span className="company-badge">{proj.company?.name || 'Partner Company'}</span>
//                 <h3>{proj.title}</h3>
//                 <p>{proj.description?.substring(0, 100)}...</p>
//                 <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
//                   <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No open projects found at the moment.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 

// function TrainerDashboard() {
//   const [data, setData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filtering & Sorting States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: "",
//     startDate: "",
//     sortBy: "newest" // newest, highest_pay
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAll = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const [dashRes, projRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/trainer/dashboard", config),
//           axios.get("http://localhost:5000/api/trainer/projects", config)
//         ]);
//         setData(dashRes.data.data);
//         setProjects(projRes.data.data || []);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err.response?.data || err.message);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, [token, navigate]);

//   const handleToggle = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/trainer/toggle-status", 
//         {}, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData(prev => ({ 
//         ...prev, 
//         profile: { ...prev.profile, availability: res.data.availability } 
//       }));
//     } catch (err) {
//       console.error("Toggle error", err);
//     }
//   };

//   // UPDATED FILTER LOGIC
//   const filteredProjects = projects
//     .filter((proj) => {
//       // Search term covers Title, Tech, and Company
//       const searchMatch = (
//         proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       // Location Filter
//       const locationMatch = filters.location === "" || 
//         proj.location?.toLowerCase().includes(filters.location.toLowerCase());

//       // Start Date Filter (on or after)
//       const dateMatch = filters.startDate === "" || 
//         new Date(proj.startDate) >= new Date(filters.startDate);
      
//       return searchMatch && locationMatch && dateMatch;
//     })
//     .sort((a, b) => {
//       if (filters.sortBy === "highest_pay") {
//         return b.perDayPayment - a.perDayPayment;
//       }
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   if (loading) return <div className="loader">Loading Trainistry...</div>;
//   if (!data) return <div className="error-container"><button onClick={() => window.location.reload()}>Retry</button></div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn active">Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
//           <div className="status-toggle-wrapper" onClick={handleToggle}>
//             <span className={`status-indicator ${data.profile?.availability}`}></span>
//             <span>{data.profile?.availability === 'available' ? 'Available' : 'Busy'}</span>
//           </div>
//         </header>

//         <div className="stats-grid">
//           <div className="stat-card glass"><h4>Total Applied</h4><span className="value">{data.stats?.totalApplications || 0}</span></div>
//           <div className="stat-card glass"><h4>Interviews</h4><span className="value">{data.stats?.interviews || 0}</span></div>
//           <div className="stat-card glass"><h4>Accepted</h4><span className="value">{data.stats?.accepted || 0}</span></div>
//         </div>

//         <section className="section-title search-header">
//           <h2>Latest Projects</h2>
//           <div className="search-controls">
//             <div className="search-wrapper">
//               <input 
//                 type="text" 
//                 className="search-input"
//                 placeholder="Search tech, title, or company..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="filter-container">
//               <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
//                 <span className="filter-icon">⚙️</span> Filters
//               </button>
              
//               {showFilters && (
//                 <div className="filter-dropdown glass">
//                   <div className="filter-group">
//                     <label>Location</label>
//                     <input 
//                       type="text" 
//                       placeholder="e.g. Remote, Delhi"
//                       className="filter-input"
//                       value={filters.location}
//                       onChange={(e) => setFilters({...filters, location: e.target.value})}
//                     />
//                   </div>

//                   <div className="filter-group">
//                     <label>Starting After</label>
//                     <input 
//                       type="date" 
//                       className="filter-input"
//                       value={filters.startDate}
//                       onChange={(e) => setFilters({...filters, startDate: e.target.value})}
//                     />
//                   </div>

//                   <div className="filter-group">
//                     <label>Sort By</label>
//                     <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
//                       <option value="newest">Newest First</option>
//                       <option value="highest_pay">Highest Pay (₹)</option>
//                     </select>
//                   </div>

//                   <button className="clear-filters" onClick={() => setFilters({location: "", startDate: "", sortBy: "newest"})}>Reset Filters</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         <div className="projects-container">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map(proj => (
//               <div key={proj._id} className="project-card">
//                 <span className="company-badge">{proj.company?.name || 'Partner Company'}</span>
//                 <h3>{proj.title}</h3>
//                 <p>{proj.description?.substring(0, 100)}...</p>
//                 <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
//                   <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>View Details</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-results-msg">
//               <p>No projects match your search or filters.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 

// function TrainerDashboard() {
//   const [data, setData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filtering & Sorting States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: "",
//     startDate: "",
//     sortBy: "newest" 
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAll = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const [dashRes, projRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/trainer/dashboard", config),
//           axios.get("http://localhost:5000/api/trainer/projects", config)
//         ]);
//         setData(dashRes.data.data);
//         setProjects(projRes.data.data || []);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err.response?.data || err.message);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, [token, navigate]);

//   // COMPLETE TOGGLE LOGIC
//   const handleToggle = async () => {
//     const currentStatus = data.profile?.availability;
//     const newStatus = currentStatus === 'available' ? 'busy' : 'available';
    
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/trainer/toggle-status", 
//         { availability: newStatus }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       setData(prev => ({ 
//         ...prev, 
//         profile: { ...prev.profile, availability: res.data.availability || newStatus } 
//       }));
//     } catch (err) {
//       console.error("Toggle error", err);
//       alert("Could not update status. Please check your connection.");
//     }
//   };

//   // FILTER LOGIC
//   const filteredProjects = projects
//     .filter((proj) => {
//       const searchMatch = (
//         proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       const locationMatch = filters.location === "" || 
//         proj.location?.toLowerCase().includes(filters.location.toLowerCase());

//       const dateMatch = filters.startDate === "" || 
//         new Date(proj.startDate) >= new Date(filters.startDate);
      
//       return searchMatch && locationMatch && dateMatch;
//     })
//     .sort((a, b) => {
//       if (filters.sortBy === "highest_pay") {
//         return b.perDayPayment - a.perDayPayment;
//       }
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   if (loading) return <div className="loader">Loading Trainistry...</div>;
//   if (!data) return <div className="error-container"><button onClick={() => window.location.reload()}>Retry</button></div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn active">Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
          
//           {/* INTERACTIVE TOGGLE */}
//           <div className="availability-control">
//             <span className="status-label">Status:</span>
//             <div 
//               className={`status-toggle-wrapper ${data.profile?.availability}`} 
//               onClick={handleToggle}
//             >
//               <div className="toggle-slider">
//                 <span className={`status-indicator ${data.profile?.availability}`}></span>
//               </div>
//               <span className="status-text">
//                 {data.profile?.availability === 'available' ? 'Available' : 'Busy'}
//               </span>
//             </div>
//           </div>
//         </header>

//         <div className="stats-grid">
//           <div className="stat-card glass"><h4>Total Applied</h4><span className="value">{data.stats?.totalApplications || 0}</span></div>
//           <div className="stat-card glass"><h4>Interviews</h4><span className="value">{data.stats?.interviews || 0}</span></div>
//           <div className="stat-card glass"><h4>Accepted</h4><span className="value">{data.stats?.accepted || 0}</span></div>
//         </div>

//         <section className="section-title search-header">
//           <h2>Latest Projects</h2>
//           <div className="search-controls">
//             <div className="search-wrapper">
//               <input 
//                 type="text" 
//                 className="search-input"
//                 placeholder="Search tech, title, or company..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="filter-container">
//               <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
//                 <span className="filter-icon">⚙️</span> Filters
//               </button>
              
//               {showFilters && (
//                 <div className="filter-dropdown glass">
//                   <div className="filter-group">
//                     <label>Location</label>
//                     <input 
//                       type="text" 
//                       placeholder="e.g. Remote, Delhi"
//                       className="filter-input"
//                       value={filters.location}
//                       onChange={(e) => setFilters({...filters, location: e.target.value})}
//                     />
//                   </div>

//                   <div className="filter-group">
//                     <label>Starting After</label>
//                     <input 
//                       type="date" 
//                       className="filter-input"
//                       value={filters.startDate}
//                       onChange={(e) => setFilters({...filters, startDate: e.target.value})}
//                     />
//                   </div>

//                   <div className="filter-group">
//                     <label>Sort By</label>
//                     <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
//                       <option value="newest">Newest First</option>
//                       <option value="highest_pay">Highest Pay (₹)</option>
//                     </select>
//                   </div>

//                   <button className="clear-filters" onClick={() => setFilters({location: "", startDate: "", sortBy: "newest"})}>Reset Filters</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         <div className="projects-container">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map(proj => (
//               <div key={proj._id} className="project-card">
//                 <span className="company-badge">{proj.company?.name || 'Partner Company'}</span>
//                 <h3>{proj.title}</h3>
//                 <p>{proj.description?.substring(0, 100)}...</p>
//                 <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
//                   <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>View Details</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-results-msg">
//               <p>No projects match your search or filters.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 

// function TrainerDashboard() {
//   const [data, setData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filtering & Sorting States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: "",
//     startDate: "",
//     sortBy: "newest" 
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAll = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const [dashRes, projRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/trainer/dashboard", config),
//           axios.get("http://localhost:5000/api/trainer/projects", config)
//         ]);
//         setData(dashRes.data.data);
//         setProjects(projRes.data.data || []);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err.response?.data || err.message);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, [token, navigate]);

//   // COMPLETE TOGGLE LOGIC
//   const handleToggle = async () => {
//     const currentStatus = data.profile?.availability;
//     const newStatus = currentStatus === 'available' ? 'busy' : 'available';
    
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/trainer/toggle-status", 
//         { availability: newStatus }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       setData(prev => ({ 
//         ...prev, 
//         profile: { ...prev.profile, availability: res.data.availability || newStatus } 
//       }));
//     } catch (err) {
//       console.error("Toggle error", err);
//       alert("Could not update status. Please check your connection.");
//     }
//   };

//   // FILTER LOGIC
//   const filteredProjects = projects
//     .filter((proj) => {
//       const searchMatch = (
//         proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       const locationMatch = filters.location === "" || 
//         proj.location?.toLowerCase().includes(filters.location.toLowerCase());

//       const dateMatch = filters.startDate === "" || 
//         new Date(proj.startDate) >= new Date(filters.startDate);
      
//       return searchMatch && locationMatch && dateMatch;
//     })
//     .sort((a, b) => {
//       if (filters.sortBy === "highest_pay") {
//         return b.perDayPayment - a.perDayPayment;
//       }
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   if (loading) return <div className="loader">Loading Trainistry...</div>;
//   if (!data) return <div className="error-container"><button onClick={() => window.location.reload()}>Retry</button></div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn active">Find Projects</button>
//           {/* ADDED NETWORK FEED BUTTON */}
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>
//             Network Feed
//           </button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>
//             Applications
//           </button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>
//             My Profile
//           </button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
          
//           {/* INTERACTIVE TOGGLE */}
//           <div className="availability-control">
//             <span className="status-label">Status:</span>
//             <div 
//               className={`status-toggle-wrapper ${data.profile?.availability}`} 
//               onClick={handleToggle}
//             >
//               <div className="toggle-slider">
//                 <span className={`status-indicator ${data.profile?.availability}`}></span>
//               </div>
//               <span className="status-text">
//                 {data.profile?.availability === 'available' ? 'Available' : 'Busy'}
//               </span>
//             </div>
//           </div>
//         </header>

//         <div className="stats-grid">
//           <div className="stat-card glass"><h4>Total Applied</h4><span className="value">{data.stats?.totalApplications || 0}</span></div>
//           <div className="stat-card glass"><h4>Interviews</h4><span className="value">{data.stats?.interviews || 0}</span></div>
//           <div className="stat-card glass"><h4>Accepted</h4><span className="value">{data.stats?.accepted || 0}</span></div>
//         </div>

//         <section className="section-title search-header">
//           <h2>Latest Projects</h2>
//           <div className="search-controls">
//             <div className="search-wrapper">
//               <input 
//                 type="text" 
//                 className="search-input"
//                 placeholder="Search tech, title, or company..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="filter-container">
//               <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
//                 <span className="filter-icon">⚙️</span> Filters
//               </button>
              
//               {showFilters && (
//                 <div className="filter-dropdown glass">
//                   <div className="filter-group">
//                     <label>Location</label>
//                     <input 
//                       type="text" 
//                       placeholder="e.g. Remote, Delhi"
//                       className="filter-input"
//                       value={filters.location}
//                       onChange={(e) => setFilters({...filters, location: e.target.value})}
//                     />
//                   </div>

//                   <div className="filter-group">
//                     <label>Starting After</label>
//                     <input 
//                       type="date" 
//                       className="filter-input"
//                       value={filters.startDate}
//                       onChange={(e) => setFilters({...filters, startDate: e.target.value})}
//                     />
//                   </div>

//                   <div className="filter-group">
//                     <label>Sort By</label>
//                     <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
//                       <option value="newest">Newest First</option>
//                       <option value="highest_pay">Highest Pay (₹)</option>
//                     </select>
//                   </div>

//                   <button className="clear-filters" onClick={() => setFilters({location: "", startDate: "", sortBy: "newest"})}>Reset Filters</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         <div className="projects-container">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map(proj => (
//               <div key={proj._id} className="project-card">
//                 <span className="company-badge">{proj.company?.name || 'Partner Company'}</span>
//                 <h3>{proj.title}</h3>
//                 <p>{proj.description?.substring(0, 100)}...</p>
//                 <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
//                   <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>View Details</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-results-msg">
//               <p>No projects match your search or filters.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerDashboard;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 

// function TrainerDashboard() {
//   const [data, setData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: "",
//     startDate: "",
//     sortBy: "newest" 
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAll = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const [dashRes, projRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/trainer/dashboard", config),
//           axios.get("http://localhost:5000/api/trainer/projects", config)
//         ]);
//         setData(dashRes.data.data);
//         setProjects(projRes.data.data || []);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, [token, navigate]);

//   const handleToggle = async () => {
//     const currentStatus = data.profile?.availability;
//     const newStatus = currentStatus === 'available' ? 'busy' : 'available';
    
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/trainer/toggle-status", 
//         { availability: newStatus }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       setData(prev => ({ 
//         ...prev, 
//         profile: { ...prev.profile, availability: res.data.availability || newStatus } 
//       }));
//     } catch (err) {
//       alert("Could not update status.");
//     }
//   };

//   const filteredProjects = projects
//     .filter((proj) => {
//       const searchMatch = (
//         proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       const locationMatch = filters.location === "" || 
//         proj.location?.toLowerCase().includes(filters.location.toLowerCase());

//       const dateMatch = filters.startDate === "" || 
//         new Date(proj.startDate) >= new Date(filters.startDate);
      
//       return searchMatch && locationMatch && dateMatch;
//     })
//     .sort((a, b) => {
//       if (filters.sortBy === "highest_pay") {
//         return b.perDayPayment - a.perDayPayment;
//       }
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   if (loading) return <div className="loader">Loading Trainistry...</div>;
//   if (!data) return <div className="error-container"><button onClick={() => window.location.reload()}>Retry</button></div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn active">Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
//           <div className="availability-control">
//             <span className="status-label">Status:</span>
//             <div className={`status-toggle-wrapper ${data.profile?.availability}`} onClick={handleToggle}>
//               <div className="toggle-slider">
//                 <span className={`status-indicator ${data.profile?.availability}`}></span>
//               </div>
//               <span className="status-text">{data.profile?.availability === 'available' ? 'Available' : 'Busy'}</span>
//             </div>
//           </div>
//         </header>

//         <div className="stats-grid">
//           <div className="stat-card glass"><h4>Total Applied</h4><span className="value">{data.stats?.totalApplications || 0}</span></div>
//           <div className="stat-card glass"><h4>Interviews</h4><span className="value">{data.stats?.interviews || 0}</span></div>
//           <div className="stat-card glass"><h4>Accepted</h4><span className="value">{data.stats?.accepted || 0}</span></div>
//         </div>

//         <section className="section-title search-header">
//           <h2>Latest Projects</h2>
//           {/* <div className="search-controls">
//             <input 
//               type="text" 
//               className="search-input"
//               placeholder="Search tech, title, or company..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>⚙️ Filters</button>
//           </div> */}
//           <div className="search-controls">
//   <div className="search-input-wrapper">
//     <span className="search-icon">🔍</span>
//     <input 
//       type="text" 
//       className="search-input"
//       placeholder="Search tech, title, or company..." 
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//   </div>
//   <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
//     ⚙️ Filters
//   </button>
// </div>
//         </section>

//         {showFilters && (
//           <div className="filter-dropdown glass" style={{marginBottom: '20px', padding: '20px', borderRadius: '12px'}}>
//             <div style={{display: 'flex', gap: '15px'}}>
//               <input type="text" placeholder="Location" value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})} />
//               <input type="date" value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
//               <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
//                 <option value="newest">Newest First</option>
//                 <option value="highest_pay">Highest Pay</option>
//               </select>
//             </div>
//           </div>
//         )}

//         <div className="projects-container">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map(proj => (
//               <div key={proj._id} className="project-card">
//                 <span className="company-badge">{proj.company?.name || 'Partner Company'}</span>
//                 <h3>{proj.title}</h3>
//                 <p>{proj.description?.substring(0, 100)}...</p>
//                 <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
//                   <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>View Details</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No projects match your search.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 

// function TrainerDashboard() {
//   const [data, setData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filtering & Sorting States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: "",
//     startDate: "",
//     sortBy: "newest" 
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAll = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const [dashRes, projRes, appRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/trainer/dashboard", config),
//           axios.get("http://localhost:5000/api/trainer/projects", config),
//           axios.get("http://localhost:5000/api/trainer/applications", config)
//         ]);
        
//         setData({
//           ...dashRes.data.data,
//           myApplications: appRes.data.data || []
//         });
//         setProjects(projRes.data.data || []);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err.response?.data || err.message);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, [token, navigate]);

//   // Payment Deadline Logic
//   const getDeadlineInfo = (app) => {
//     const project = app.project;
//     if (project?.status?.toLowerCase() !== 'completed' || !project?.paymentDeadline) return null;
    
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

//   const handleToggle = async () => {
//     const currentStatus = data.profile?.availability;
//     const newStatus = currentStatus === 'available' ? 'busy' : 'available';
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/trainer/toggle-status", 
//         { availability: newStatus }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData(prev => ({ 
//         ...prev, 
//         profile: { ...prev.profile, availability: res.data.availability || newStatus } 
//       }));
//     } catch (err) {
//       console.error("Toggle error", err);
//     }
//   };

//   // Filter Logic
//   const filteredProjects = projects
//     .filter((proj) => {
//       const searchMatch = (
//         proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       const locationMatch = filters.location === "" || proj.location?.toLowerCase().includes(filters.location.toLowerCase());
//       const dateMatch = filters.startDate === "" || new Date(proj.startDate) >= new Date(filters.startDate);
//       return searchMatch && locationMatch && dateMatch;
//     })
//     .sort((a, b) => {
//       if (filters.sortBy === "highest_pay") return b.perDayPayment - a.perDayPayment;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   if (loading) return <div className="loader">Loading Trainistry...</div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn active">Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>Industrial Network</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>My Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
//           <div className="availability-control">
//             <span className="status-label">Status:</span>
//             <div className={`status-toggle-wrapper ${data.profile?.availability}`} onClick={handleToggle}>
//               <div className="toggle-slider">
//                 <span className={`status-indicator ${data.profile?.availability}`}></span>
//               </div>
//               <span className="status-text">{data.profile?.availability === 'available' ? 'Available' : 'Busy'}</span>
//             </div>
//           </div>
//         </header>

//         {/* Payment Countdown Box */}
//         {data.myApplications?.some(app => getDeadlineInfo(app)) && (
//           <div className="payment-alert-box glass" style={{ marginBottom: '25px', padding: '20px', borderLeft: '5px solid #f59e0b' }}>
//             <h3 style={{ margin: '0 0 10px 0', color: '#b45309' }}>⏳ Incoming Payments (15-Day Rule)</h3>
//             {data.myApplications.map(app => {
//               const info = getDeadlineInfo(app);
//               if (!info) return null;
//               return (
//                 <div key={app._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
//                   <span><strong>{app.project.title}</strong></span>
//                   <span style={{ color: info.isUrgent ? '#ef4444' : '#f59e0b', fontWeight: 'bold' }}>
//                     {info.days > 0 ? `Payment in ${info.days} days` : "Due Today"} 
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <div className="stats-grid">
//           <div className="stat-card glass"><h4>Applied</h4><span className="value">{data.stats?.totalApplications || 0}</span></div>
//           <div className="stat-card glass"><h4>Interviews</h4><span className="value">{data.stats?.interviews || 0}</span></div>
//           <div className="stat-card glass"><h4>Accepted</h4><span className="value">{data.stats?.accepted || 0}</span></div>
//         </div>

//         {/* SEARCH AND FILTER SECTION - RESTORED UI */}
//         <section className="section-title search-header">
//           <h2>Latest Industrial Requirements</h2>
//           <div className="search-controls">
//             <div className="search-wrapper">
//               <input 
//                 type="text" className="search-input" placeholder="Search tech, title, or company..." 
//                 value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
            
//             <div className="filter-container">
//               <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
//                 <span className="filter-icon">⚙️</span> Filters
//               </button>
              
//               {showFilters && (
//                 <div className="filter-dropdown glass">
//                   <div className="filter-group">
//                     <label>Location</label>
//                     <input 
//                       type="text" placeholder="e.g. Remote" className="filter-input"
//                       value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})}
//                     />
//                   </div>
//                   <div className="filter-group">
//                     <label>Starting After</label>
//                     <input 
//                       type="date" className="filter-input"
//                       value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})}
//                     />
//                   </div>
//                   <div className="filter-group">
//                     <label>Sort By</label>
//                     <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
//                       <option value="newest">Newest First</option>
//                       <option value="highest_pay">Highest Pay (₹)</option>
//                     </select>
//                   </div>
//                   <button className="clear-filters" onClick={() => setFilters({location: "", startDate: "", sortBy: "newest"})}>Reset</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         <div className="projects-container">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map(proj => (
//               <div key={proj._id} className="project-card">
//                 <span className="company-badge">{proj.company?.name || 'Partner'}</span>
//                 <h3>{proj.title}</h3>
//                 <p><strong>Tech:</strong> {proj.technology}</p>
//                 <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
//                   <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>View Details</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="no-results-msg">No projects match your current filters.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import "../../styles/TrainerDashboard.css"; 

// function TrainerDashboard() {
//   const [data, setData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filtering & Sorting States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: "",
//     startDate: "",
//     sortBy: "newest" 
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Re-usable fetch function to keep data fresh
//   const fetchAll = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [dashRes, projRes, appRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/trainer/dashboard", config),
//         axios.get("http://localhost:5000/api/trainer/projects", config),
//         axios.get("http://localhost:5000/api/trainer/applications", config)
//       ]);
      
//       setData({
//         ...dashRes.data.data,
//         myApplications: appRes.data.data || []
//       });
//       setProjects(projRes.data.data || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err.response?.data || err.message);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchAll();
//   }, [token, navigate]);

//   // ACTION: Raise Dispute
//   const handleRaiseDispute = async (projectId) => {
//     if (!window.confirm("Are you sure you want to raise a formal dispute for non-payment?")) return;
//     try {
//       await axios.put(
//         `http://localhost:5000/api/trainer/projects/${projectId}/dispute`,
//         { reason: "Payment overdue beyond 15-day industrial window." },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Dispute raised. Trainistry Admin has been notified.");
//       fetchAll(); 
//     } catch (err) {
//       alert(err.response?.data?.message || "Error raising dispute");
//     }
//   };

//   // ACTION: Download Invoice
//   const downloadInvoice = (app) => {
//     const doc = new jsPDF();
//     const proj = app.project;
    
//     doc.setFontSize(22);
//     doc.setTextColor(67, 56, 202); // Trainistry Indigo
//     doc.text("TRAINISTRY INVOICE", 14, 20);
    
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Invoice Date: ${new Date().toLocaleDateString('en-IN')}`, 14, 30);
//     doc.text(`Trainer: ${data.profile?.user?.name}`, 14, 35);
//     doc.text(`Client: ${proj.company?.name || 'Partner Company'}`, 14, 40);

//     const tableData = [[
//       proj.title,
//       proj.technology,
//       `₹${proj.perDayPayment}`,
//       "Completed"
//     ]];

//     doc.autoTable({
//       startY: 50,
//       head: [['Project Title', 'Technology', 'Payout/Day', 'Status']],
//       body: tableData,
//       theme: 'grid',
//       headStyles: { fillColor: [67, 56, 202] }
//     });

//     doc.text("Notes: This is a system-generated invoice for industrial training services.", 14, doc.lastAutoTable.finalY + 10);
//     doc.save(`Invoice_${proj.title.replace(/\s+/g, '_')}.pdf`);
//   };

//   // Payment Deadline Logic
//   const getDeadlineInfo = (app) => {
//     const project = app.project;
//     if (project?.status?.toLowerCase() !== 'completed' || !project?.paymentDeadline) return null;
    
//     const deadline = new Date(project.paymentDeadline);
//     const today = new Date();
//     const diffTime = deadline - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return {
//       id: project._id,
//       days: diffDays,
//       date: deadline.toLocaleDateString('en-IN'),
//       isUrgent: diffDays <= 3,
//       isOverdue: diffDays <= 0,
//       isDisputed: project.isDisputed
//     };
//   };

//   const handleToggle = async () => {
//     const currentStatus = data.profile?.availability;
//     const newStatus = currentStatus === 'available' ? 'busy' : 'available';
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/trainer/toggle-status", 
//         { availability: newStatus }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData(prev => ({ 
//         ...prev, 
//         profile: { ...prev.profile, availability: res.data.availability || newStatus } 
//       }));
//     } catch (err) {
//       console.error("Toggle error", err);
//     }
//   };

//   // Filter Logic
//   const filteredProjects = projects
//     .filter((proj) => {
//       const searchMatch = (
//         proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       const locationMatch = filters.location === "" || proj.location?.toLowerCase().includes(filters.location.toLowerCase());
//       const dateMatch = filters.startDate === "" || new Date(proj.startDate) >= new Date(filters.startDate);
//       return searchMatch && locationMatch && dateMatch;
//     })
//     .sort((a, b) => {
//       if (filters.sortBy === "highest_pay") return b.perDayPayment - a.perDayPayment;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   if (loading) return <div className="loader">Loading Trainistry...</div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn active">Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>Industrial Network</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>My Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
//           <div className="availability-control">
//             <span className="status-label">Status:</span>
//             <div className={`status-toggle-wrapper ${data.profile?.availability}`} onClick={handleToggle}>
//               <div className="toggle-slider">
//                 <span className={`status-indicator ${data.profile?.availability}`}></span>
//               </div>
//               <span className="status-text">{data.profile?.availability === 'available' ? 'Available' : 'Busy'}</span>
//             </div>
//           </div>
//         </header>

//         {/* Payment Countdown Box with Logic for Dispute Button */}
//         {data.myApplications?.some(app => getDeadlineInfo(app)) && (
//           <div className="payment-alert-box glass" style={{ marginBottom: '25px', padding: '20px', borderLeft: '5px solid #f59e0b' }}>
//             <h3 style={{ margin: '0 0 10px 0', color: '#b45309' }}>⏳ Incoming Payments (15-Day Rule)</h3>
//             {data.myApplications.map(app => {
//               const info = getDeadlineInfo(app);
//               if (!info) return null;
//               return (
//                 <div key={app._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
//                   <div>
//                     <strong>{app.project.title}</strong>
//                     <div style={{ fontSize: '0.8rem', color: '#666' }}>Deadline: {info.date}</div>
//                   </div>
                  
//                   <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                     <button 
//                       onClick={() => downloadInvoice(app)}
//                       style={{ padding: '5px 10px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
//                     >
//                       📄 Invoice
//                     </button>

//                     {info.isDisputed ? (
//                       <span style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Under Dispute</span>
//                     ) : info.isOverdue ? (
//                       <button 
//                         onClick={() => handleRaiseDispute(info.id)}
//                         style={{ padding: '5px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//                       >
//                         Raise Dispute
//                       </button>
//                     ) : (
//                       <span style={{ color: info.isUrgent ? '#ef4444' : '#f59e0b', fontWeight: 'bold' }}>
//                         {info.days > 0 ? `Payment in ${info.days} days` : "Due Today"} 
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <div className="stats-grid">
//           <div className="stat-card glass"><h4>Applied</h4><span className="value">{data.stats?.totalApplications || 0}</span></div>
//           <div className="stat-card glass"><h4>Interviews</h4><span className="value">{data.stats?.interviews || 0}</span></div>
//           <div className="stat-card glass"><h4>Accepted</h4><span className="value">{data.stats?.accepted || 0}</span></div>
//         </div>

//         <section className="section-title search-header">
//           <h2>Latest Industrial Requirements</h2>
//           <div className="search-controls">
//             <div className="search-wrapper">
//               <input 
//                 type="text" className="search-input" placeholder="Search tech, title, or company..." 
//                 value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
            
//             <div className="filter-container">
//               <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
//                 <span className="filter-icon">⚙️</span> Filters
//               </button>
              
//               {showFilters && (
//                 <div className="filter-dropdown glass">
//                   <div className="filter-group">
//                     <label>Location</label>
//                     <input 
//                       type="text" placeholder="e.g. Remote" className="filter-input"
//                       value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})}
//                     />
//                   </div>
//                   <div className="filter-group">
//                     <label>Starting After</label>
//                     <input 
//                       type="date" className="filter-input"
//                       value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})}
//                     />
//                   </div>
//                   <div className="filter-group">
//                     <label>Sort By</label>
//                     <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
//                       <option value="newest">Newest First</option>
//                       <option value="highest_pay">Highest Pay (₹)</option>
//                     </select>
//                   </div>
//                   <button className="clear-filters" onClick={() => setFilters({location: "", startDate: "", sortBy: "newest"})}>Reset</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         <div className="projects-container">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map(proj => (
//               <div key={proj._id} className="project-card">
//                 <span className="company-badge">{proj.company?.name || 'Partner'}</span>
//                 <h3>{proj.title}</h3>
//                 <p><strong>Tech:</strong> {proj.technology}</p>
//                 <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
//                   <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>View Details</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="no-results-msg">No projects match your current filters.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable"; // Changed to standalone import
// import "../../styles/TrainerDashboard.css"; 

// function TrainerDashboard() {
//   const [data, setData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filtering & Sorting States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: "",
//     startDate: "",
//     sortBy: "newest" 
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Re-usable fetch function to keep data fresh
//   const fetchAll = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [dashRes, projRes, appRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/trainer/dashboard", config),
//         axios.get("http://localhost:5000/api/trainer/projects", config),
//         axios.get("http://localhost:5000/api/trainer/applications", config)
//       ]);
      
//       setData({
//         ...dashRes.data.data,
//         myApplications: appRes.data.data || []
//       });
//       setProjects(projRes.data.data || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err.response?.data || err.message);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchAll();
//   }, [token, navigate]);

//   // ACTION: Raise Dispute
//   const handleRaiseDispute = async (appId) => {
//   if (!window.confirm("Raise formal dispute? Trust Score will drop by 10%.")) return;
  
//   try {
//     const config = { headers: { Authorization: `Bearer ${token}` } };
    
//     // UPDATED URL: Using /applications/ instead of /projects/
//     // This matches: router.put('/applications/:id/dispute', protect, markAsDisputed);
//     await axios.put(
//       `http://localhost:5000/api/trainer/applications/${appId}/dispute`, 
//       {}, 
//       config
//     );

//     alert("Dispute raised. Company score penalized.");
//     fetchAll(); // Refresh the dashboard data to show the "Under Dispute" status
//   } catch (err) {
//     console.error("Dispute Error:", err.response?.data);
//     alert(err.response?.data?.message || "Error raising dispute");
//   }
// };

//   const downloadInvoice = (app) => {
//     const doc = new jsPDF();
//     const proj = app.project;
    
//     // Use the values directly from your project object
//     const duration = proj.duration || 15; 
//     const totalAmount = proj.totalBudget || (proj.perDayPayment * duration);

//     doc.setFontSize(22);
//     doc.setTextColor(67, 56, 202); 
//     doc.text("TRAINISTRY INVOICE", 14, 20);
    
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Invoice Date: ${new Date().toLocaleDateString('en-IN')}`, 14, 30);
//     doc.text(`Trainer: ${data.profile?.user?.name || 'Trainer'}`, 14, 35);
//     doc.text(`Client: ${proj.company?.name || 'Partner Company'}`, 14, 40);

//     const tableData = [[
//       proj.title,
//       `${duration} Days`,
//       `Rs. ${proj.perDayPayment}`,
//       `Rs. ${totalAmount}`,
//       "Completed"
//     ]];

//     autoTable(doc, {
//       startY: 50,
//       head: [['Project Title', 'Duration', 'Rate/Day', 'Total Amount', 'Status']],
//       body: tableData,
//       theme: 'grid',
//       headStyles: { fillColor: [67, 56, 202] },
//       columnStyles: {
//         3: { fontStyle: 'bold' } 
//       }
//     });

//     const finalY = doc.lastAutoTable.finalY || 70;

//     doc.setFontSize(10);
//     doc.text("Notes: This is a system-generated invoice for industrial training services.", 14, finalY + 10);

//     doc.setFontSize(11);
//     doc.text("Authorized Signature:", 14, finalY + 30);
//     doc.line(14, finalY + 32, 70, finalY + 32); 

//     doc.save(`Invoice_${proj.title.replace(/\s+/g, '_')}.pdf`);
//   };
//   // Payment Deadline Logic
//   const getDeadlineInfo = (app) => {
//   const project = app.project;
//   if (project?.status?.toLowerCase() !== 'completed' || !project?.paymentDeadline) return null;
  
//   const deadline = new Date(project.paymentDeadline);
//   const today = new Date();
//   const diffTime = deadline - today;
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
//   return {
//     id: app._id, // <--- CHANGE THIS from project._id to app._id
//     days: diffDays,
//     date: deadline.toLocaleDateString('en-IN'),
//     isUrgent: diffDays <= 3,
//     isOverdue: diffDays <= 0,
//     isDisputed: app.isDisputed // Use the dispute status from the application
//   };
// };

//   const handleToggle = async () => {
//     const currentStatus = data.profile?.availability;
//     const newStatus = currentStatus === 'available' ? 'busy' : 'available';
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/trainer/toggle-status", 
//         { availability: newStatus }, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData(prev => ({ 
//         ...prev, 
//         profile: { ...prev.profile, availability: res.data.availability || newStatus } 
//       }));
//     } catch (err) {
//       console.error("Toggle error", err);
//     }
//   };
//   const handleWarnNetwork = async (app) => {
//   const confirm = window.confirm("This will post a public warning about this company's payment delay. Proceed?");
//   if (!confirm) return;

//   try {
//     await axios.post("http://localhost:5000/api/posts", {
//       content: `⚠️ UNPAID PROJECT ALERT: ${app.project.company.name} has exceeded the 15-day payment window for "${app.project.title}". Trainers, please proceed with caution.`,
//       postType: "warning",
//       relatedCompany: app.project.company._id
//     }, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     alert("Warning shared with the Industrial Network.");
//   } catch (err) {
//     alert("Action failed. Try again.");
//   }
// };

//   // Filter Logic
//   const filteredProjects = projects
//     .filter((proj) => {
//       const searchMatch = (
//         proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         proj.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       const locationMatch = filters.location === "" || proj.location?.toLowerCase().includes(filters.location.toLowerCase());
//       const dateMatch = filters.startDate === "" || new Date(proj.startDate) >= new Date(filters.startDate);
//       return searchMatch && locationMatch && dateMatch;
//     })
//     .sort((a, b) => {
//       if (filters.sortBy === "highest_pay") return b.perDayPayment - a.perDayPayment;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   if (loading) return <div className="loader">Loading Trainistry...</div>;

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn active">Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>Industrial Network</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>My Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
//           <div className="availability-control">
//             <span className="status-label">Status:</span>
//             <div className={`status-toggle-wrapper ${data.profile?.availability}`} onClick={handleToggle}>
//               <div className="toggle-slider">
//                 <span className={`status-indicator ${data.profile?.availability}`}></span>
//               </div>
//               <span className="status-text">{data.profile?.availability === 'available' ? 'Available' : 'Busy'}</span>
//             </div>
//           </div>
//         </header>

//         {/* Payment Countdown Box */}
//         {data.myApplications?.some(app => getDeadlineInfo(app)) && (
//           <div className="payment-alert-box glass" style={{ marginBottom: '25px', padding: '20px', borderLeft: '5px solid #f59e0b' }}>
//             <h3 style={{ margin: '0 0 10px 0', color: '#b45309' }}>⏳ Incoming Payments (15-Day Rule)</h3>
//             {data.myApplications.map(app => {
//               const info = getDeadlineInfo(app);
//               if (!info) return null;
//               return (
//                 <div key={app._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
//                   <div>
//                     <strong>{app.project.title}</strong>
//                     <div style={{ fontSize: '0.8rem', color: '#666' }}>Deadline: {info.date}</div>
//                   </div>
                  
//                   <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                     <button 
//                       onClick={() => downloadInvoice(app)}
//                       style={{ padding: '5px 10px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
//                     >
//                       📄 Invoice
//                     </button>
                    
//                     {info.isDisputed ? (
//                       <span style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Under Dispute</span>
//                     ) : info.isOverdue ? (
//                       <button 
//                         onClick={() => handleRaiseDispute(info.id)}
//                         style={{ padding: '5px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//                       >
//                         Raise Dispute
//                       </button>
//                     ) : (
//                       <span style={{ color: info.isUrgent ? '#ef4444' : '#f59e0b', fontWeight: 'bold' }}>
//                         {info.days > 0 ? `Payment in ${info.days} days` : "Due Today"} 
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <div className="stats-grid">
//           <div className="stat-card glass"><h4>Applied</h4><span className="value">{data.stats?.totalApplications || 0}</span></div>
//           <div className="stat-card glass"><h4>Interviews</h4><span className="value">{data.stats?.interviews || 0}</span></div>
//           <div className="stat-card glass"><h4>Accepted</h4><span className="value">{data.stats?.accepted || 0}</span></div>
//         </div>

//         <section className="section-title search-header">
//           <h2>Latest Industrial Requirements</h2>
//           <div className="search-controls">
//             <div className="search-wrapper">
//               <input 
//                 type="text" className="search-input" placeholder="Search tech, title, or company..." 
//                 value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
//               />
//             </div>
            
//             <div className="filter-container">
//               <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
//                 <span className="filter-icon">⚙️</span> Filters
//               </button>
              
//               {showFilters && (
//                 <div className="filter-dropdown glass">
//                   <div className="filter-group">
//                     <label>Location</label>
//                     <input 
//                       type="text" placeholder="e.g. Remote" className="filter-input"
//                       value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})}
//                     />
//                   </div>
//                   <div className="filter-group">
//                     <label>Starting After</label>
//                     <input 
//                       type="date" className="filter-input"
//                       value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})}
//                     />
//                   </div>
//                   <div className="filter-group">
//                     <label>Sort By</label>
//                     <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
//                       <option value="newest">Newest First</option>
//                       <option value="highest_pay">Highest Pay (₹)</option>
//                     </select>
//                   </div>
//                   <button className="clear-filters" onClick={() => setFilters({location: "", startDate: "", sortBy: "newest"})}>Reset</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         <div className="projects-container">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map(proj => (
//               <div key={proj._id} className="project-card">
//                 <span className="company-badge">{proj.company?.name || 'Partner'}</span>
//                 <h3>{proj.title}</h3>
//                 <p><strong>Tech:</strong> {proj.technology}</p>
//                 <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
//                   <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>View Details</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="no-results-msg">No projects match your current filters.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TrainerDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import "../../styles/TrainerDashboard.css"; 

function TrainerDashboard() {
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    startDate: "",
    sortBy: "newest" 
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchAll = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [dashRes, projRes, appRes] = await Promise.all([
        axios.get("http://localhost:5000/api/trainer/dashboard", config),
        axios.get("http://localhost:5000/api/trainer/projects", config),
        axios.get("http://localhost:5000/api/trainer/applications", config)
      ]);
      
      setData({
        ...dashRes.data.data,
        myApplications: appRes.data.data || []
      });
      setProjects(projRes.data.data || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchAll();
  }, [token, navigate]);

  const handleRaiseDispute = async (appId) => {
    if (!window.confirm("Raise formal dispute? Trust Score will drop by 10%.")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `http://localhost:5000/api/trainer/applications/${appId}/dispute`, 
        {}, 
        config
      );
      alert("Dispute raised. Company score penalized.");
      fetchAll(); 
    } catch (err) {
      console.error("Dispute Error:", err.response?.data);
      alert(err.response?.data?.message || "Error raising dispute");
    }
  };

  const downloadInvoice = (app) => {
    const doc = new jsPDF();
    const proj = app.project;
    const duration = proj.duration || 15; 
    const totalAmount = proj.totalBudget || (proj.perDayPayment * duration);

    doc.setFontSize(22);
    doc.setTextColor(67, 56, 202); 
    doc.text("TRAINISTRY INVOICE", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString('en-IN')}`, 14, 30);
    doc.text(`Trainer: ${data.profile?.user?.name || 'Trainer'}`, 14, 35);
    doc.text(`Client: ${proj.company?.name || 'Partner Company'}`, 14, 40);

    const tableData = [[
      proj.title,
      `${duration} Days`,
      `Rs. ${proj.perDayPayment}`,
      `Rs. ${totalAmount}`,
      app.paymentStatus === 'cleared' ? "PAID" : "Completed"
    ]];

    autoTable(doc, {
      startY: 50,
      head: [['Project Title', 'Duration', 'Rate/Day', 'Total Amount', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [67, 56, 202] },
      columnStyles: { 3: { fontStyle: 'bold' } }
    });

    const finalY = doc.lastAutoTable.finalY || 70;
    doc.setFontSize(10);
    doc.text("Notes: This is a system-generated invoice for industrial training services.", 14, finalY + 10);
    doc.text(`Payment Ref: ${app.transactionId || 'Pending'}`, 14, finalY + 15);
    doc.setFontSize(11);
    doc.text("Authorized Signature:", 14, finalY + 30);
    doc.line(14, finalY + 32, 70, finalY + 32); 

    doc.save(`Invoice_${proj.title.replace(/\s+/g, '_')}.pdf`);
  };

  // UPDATED DEADLINE LOGIC: To handle the 'cleared' state
  const getDeadlineInfo = (app) => {
    const project = app.project;
    if (project?.status?.toLowerCase() !== 'completed' || !project?.paymentDeadline) return null;
    
    const deadline = new Date(project.paymentDeadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      id: app._id,
      days: diffDays,
      date: deadline.toLocaleDateString('en-IN'),
      isUrgent: diffDays <= 3,
      isOverdue: diffDays <= 0,
      isDisputed: app.isDisputed,
      paymentStatus: app.paymentStatus, // NEW: track payment status
      transactionId: app.transactionId  // NEW: track transaction ID
    };
  };

  const handleToggle = async () => {
    const currentStatus = data.profile?.availability;
    const newStatus = currentStatus === 'available' ? 'busy' : 'available';
    try {
      const res = await axios.put(
        "http://localhost:5000/api/trainer/toggle-status", 
        { availability: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(prev => ({ 
        ...prev, 
        profile: { ...prev.profile, availability: res.data.availability || newStatus } 
      }));
    } catch (err) {
      console.error("Toggle error", err);
    }
  };

  const handleWarnNetwork = async (app) => {
    const confirm = window.confirm("This will post a public warning about this company's payment delay. Proceed?");
    if (!confirm) return;

    try {
      await axios.post("http://localhost:5000/api/posts", {
        content: `⚠️ UNPAID PROJECT ALERT: ${app.project.company.name} has exceeded the 15-day payment window for "${app.project.title}". Trainers, please proceed with caution.`,
        postType: "warning",
        relatedCompany: app.project.company._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Warning shared with the Industrial Network.");
    } catch (err) {
      alert("Action failed. Try again.");
    }
  };

  const filteredProjects = projects
    .filter((proj) => {
      const searchMatch = (
        proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const locationMatch = filters.location === "" || proj.location?.toLowerCase().includes(filters.location.toLowerCase());
      const dateMatch = filters.startDate === "" || new Date(proj.startDate) >= new Date(filters.startDate);
      return searchMatch && locationMatch && dateMatch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "highest_pay") return b.perDayPayment - a.perDayPayment;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading) return <div className="loader">Loading Trainistry...</div>;

  return (
    <div className="trainer-dashboard">
      <aside className="sidebar">
        <div className="logo">Trainistry</div>
        <nav>
          <button className="sidebar-btn active">Find Projects</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/network")}>Industrial Network</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>My Applications</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
        </nav>
        <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
      </aside>

      <main className="main-content">
        <header className="header-section">
          <h1>Welcome, {data.profile?.user?.name || 'Trainer'}</h1>
          <div className="availability-control">
            <span className="status-label">Status:</span>
            <div className={`status-toggle-wrapper ${data.profile?.availability}`} onClick={handleToggle}>
              <div className="toggle-slider">
                <span className={`status-indicator ${data.profile?.availability}`}></span>
              </div>
              <span className="status-text">{data.profile?.availability === 'available' ? 'Available' : 'Busy'}</span>
            </div>
          </div>
        </header>

        {/* UPDATED Payment Countdown Box */}
        {data.myApplications?.some(app => getDeadlineInfo(app)) && (
          <div className="payment-alert-box glass" style={{ marginBottom: '25px', padding: '20px', borderLeft: '5px solid #4338ca' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#4338ca' }}>💳 Payment Tracking</h3>
            {data.myApplications.map(app => {
              const info = getDeadlineInfo(app);
              if (!info) return null;
              return (
                <div key={app._id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px 0', 
                    borderBottom: '1px solid #eee',
                    opacity: info.paymentStatus === 'cleared' ? 0.8 : 1 // Dim paid projects slightly
                }}>
                  <div>
                    <strong>{app.project.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {info.paymentStatus === 'cleared' ? `Paid on: ${new Date().toLocaleDateString('en-IN')}` : `Deadline: ${info.date}`}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                      onClick={() => downloadInvoice(app)}
                      style={{ padding: '5px 10px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
                    >
                      📄 Invoice
                    </button>
                    
                    {/* NEW LOGIC: Show Paid status if cleared */}
                    {info.paymentStatus === 'cleared' ? (
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Paid</span>
                        <div style={{ fontSize: '0.7rem', color: '#666' }}>ID: {info.transactionId}</div>
                      </div>
                    ) : info.isDisputed ? (
                      <span style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Under Dispute</span>
                    ) : info.isOverdue ? (
                      <button 
                        onClick={() => handleRaiseDispute(info.id)}
                        style={{ padding: '5px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Raise Dispute
                      </button>
                    ) : (
                      <span style={{ color: info.isUrgent ? '#ef4444' : '#f59e0b', fontWeight: 'bold' }}>
                        {info.days > 0 ? `Payment in ${info.days} days` : "Due Today"} 
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card glass"><h4>Applied</h4><span className="value">{data.stats?.totalApplications || 0}</span></div>
          <div className="stat-card glass"><h4>Interviews</h4><span className="value">{data.stats?.interviews || 0}</span></div>
          <div className="stat-card glass"><h4>Accepted</h4><span className="value">{data.stats?.accepted || 0}</span></div>
        </div>

        <section className="section-title search-header">
          <h2>Latest Industrial Requirements</h2>
          <div className="search-controls">
            <div className="search-wrapper">
              <input 
                type="text" className="search-input" placeholder="Search tech, title, or company..." 
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <div className="filter-container">
              <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
                <span className="filter-icon">⚙️</span> Filters
              </button>
              
              {showFilters && (
                <div className="filter-dropdown glass">
                  <div className="filter-group">
                    <label>Location</label>
                    <input 
                      type="text" placeholder="e.g. Remote" className="filter-input"
                      value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                  </div>
                  <div className="filter-group">
                    <label>Starting After</label>
                    <input 
                      type="date" className="filter-input"
                      value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                    />
                  </div>
                  <div className="filter-group">
                    <label>Sort By</label>
                    <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
                      <option value="newest">Newest First</option>
                      <option value="highest_pay">Highest Pay (₹)</option>
                    </select>
                  </div>
                  <button className="clear-filters" onClick={() => setFilters({location: "", startDate: "", sortBy: "newest"})}>Reset</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="projects-container">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(proj => (
              <div key={proj._id} className="project-card">
                <span className="company-badge">{proj.company?.name || 'Partner'}</span>
                <h3>{proj.title}</h3>
                <p><strong>Tech:</strong> {proj.technology}</p>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="status-pill pending">₹{proj.perDayPayment}/day</span>
                  <button className="apply-btn" onClick={() => navigate(`/trainer/project/${proj._id}`)}>View Details</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results-msg">No projects match your current filters.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default TrainerDashboard;