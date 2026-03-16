// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/companyDashboard.css";
// import { useParams } from "react-router-dom";

// function ProjectApplications() {

//   const { projectId } = useParams();

//   const [applications, setApplications] = useState([]);

//   const token = localStorage.getItem("token");
//   const companyId = localStorage.getItem("companyId");

//   useEffect(() => {

//     const fetchApplications = async () => {

//       try {

//         const res = await axios.get(
//           `http://localhost:5000/api/company/${companyId}/projects/${projectId}/applications`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         setApplications(res.data.data || []);

//       } catch (err) {

//         console.error("Error fetching applications:", err);

//       }

//     };

//     fetchApplications();

//   }, [projectId, companyId, token]);



//   const updateStatus = async (applicationId, status) => {

//     try {

//       await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert("Application updated");

//       setApplications((prev) =>
//         prev.map((app) =>
//           app._id === applicationId ? { ...app, status } : app
//         )
//       );

//     } catch (err) {

//       console.error(err);

//     }

//   };


//   return (

//     <div className="company-dashboard">

//       {/* MAIN CONTENT */}

//       <div className="main-content">

//         <div className="dashboard-header">
//           <h1>Trainer Applications</h1>
//         </div>

//         <div className="applications-container">

//           {applications.length === 0 ? (
//             <div className="dashboard-card">
//               No applications yet.
//             </div>
//           ) : (

//             applications.map((app) => (

//               <div key={app._id} className="application-card">

//                 <h3>{app.trainer?.user?.name}</h3>

//                 <p>Email: {app.trainer?.user?.email}</p>

//                 <p>Proposal: {app.proposalMessage}</p>

//                 <p>Expected Rate: ₹{app.expectedRate}</p>

//                 <p>Status: {app.status}</p>

//                 <a
//                   href={`http://localhost:5000${app.resumeUrl}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="resume-link"
//                 >
//                   View Resume
//                 </a>

//                 <div className="action-buttons">

//                   <button
//                     className="shortlist-btn"
//                     onClick={() => updateStatus(app._id, "shortlisted")}
//                   >
//                     Shortlist
//                   </button>

//                   <button
//                     className="reject-btn"
//                     onClick={() => updateStatus(app._id, "rejected")}
//                   >
//                     Reject
//                   </button>

//                 </div>

//               </div>

//             ))

//           )}

//         </div>

//       </div>

//     </div>

//   );
// }

// export default ProjectApplications;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/companyDashboard.css";
// import { useParams } from "react-router-dom";

// function ProjectApplications() {
//   const { projectId } = useParams();
//   const [applications, setApplications] = useState([]);
//   const token = localStorage.getItem("token");
//   const companyId = localStorage.getItem("companyId");

//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!companyId || !projectId) return;

//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/company/${companyId}/projects/${projectId}/applications`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setApplications(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching applications:", err.response || err);
//       }
//     };

//     fetchApplications();
//   }, [projectId, companyId, token]);

//   // Update application status (shortlist/reject)
//   const updateStatus = async (applicationId, status) => {
//     if (!window.confirm(`Are you sure you want to mark this application as ${status}?`)) return;

//     try {
//       await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Update local state
//       setApplications((prev) =>
//         prev.map((app) => (app._id === applicationId ? { ...app, status } : app))
//       );

//       alert(`Application ${status} successfully!`);
//     } catch (err) {
//       console.error("Error updating application status:", err.response || err);
//       alert("Failed to update status. Try again.");
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>Trainer Applications</h1>
//         </div>

//         <div className="applications-container">
//           {applications.length === 0 ? (
//             <div className="dashboard-card">No applications yet.</div>
//           ) : (
//             applications.map((app) => (
//               <div key={app._id} className="application-card">
//                 <h3>{app.trainer?.user?.name || "Unnamed Trainer"}</h3>
//                 <p>Email: {app.trainer?.user?.email || "N/A"}</p>
//                 <p>Proposal: {app.proposalMessage || "N/A"}</p>
//                 <p>Expected Rate: ₹{app.expectedRate || "N/A"}</p>
//                 <p>Status: {app.status || "Applied"}</p>

//                 {app.resumeUrl && (
//                   <a
//                     href={`http://localhost:5000${app.resumeUrl}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="resume-link"
//                   >
//                     View Resume
//                   </a>
//                 )}

//                 <div className="action-buttons">
//                   <button
//                     className="shortlist-btn"
//                     onClick={() => updateStatus(app._id, "shortlisted")}
//                     disabled={app.status === "shortlisted"}
//                   >
//                     Shortlist
//                   </button>

//                   <button
//                     className="reject-btn"
//                     onClick={() => updateStatus(app._id, "rejected")}
//                     disabled={app.status === "rejected"}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectApplications;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/companyDashboard.css";
// import { useParams } from "react-router-dom";

// function ProjectApplications() {
//   const { projectId } = useParams();
//   const [applications, setApplications] = useState([]);
//   const token = localStorage.getItem("token");
//   const companyId = localStorage.getItem("companyId");

//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!companyId || !projectId) return;

//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/company/${companyId}/projects/${projectId}/applications`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         // Ensure data is an array
//         setApplications(Array.isArray(res.data.data) ? res.data.data : []);
//       } catch (err) {
//         console.error("Error fetching applications:", err.response || err);
//       }
//     };

//     fetchApplications();
//   }, [projectId, companyId, token]);

//   // Update application status (shortlist/reject)
//   const updateStatus = async (applicationId, status) => {
//     if (!window.confirm(`Are you sure you want to mark this application as ${status}?`)) return;

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Update local state with returned data
//       const updatedApplication = res.data.data;
//       setApplications((prev) =>
//         prev.map((app) => (app._id === applicationId ? updatedApplication : app))
//       );

//       alert(`Application ${status} successfully!`);
//     } catch (err) {
//       console.error("Error updating application status:", err.response || err);
//       alert("Failed to update status. Try again.");
//     }
//   };

//   return (
//     <div className="company-dashboard">
//       <div className="main-content">
//         <div className="dashboard-header">
//           <h1>Trainer Applications</h1>
//         </div>

//         <div className="applications-container">
//           {applications.length === 0 ? (
//             <div className="dashboard-card">No applications yet.</div>
//           ) : (
//             applications.map((app) => (
//               <div key={app._id} className="application-card">
//                 <h3>{app.trainer?.user?.name || "Unnamed Trainer"}</h3>
//                 <p>Email: {app.trainer?.user?.email || "N/A"}</p>
//                 <p>Proposal: {app.proposalMessage || "N/A"}</p>
//                 <p>Expected Rate: ₹{app.expectedRate || "N/A"}</p>
//                 <p>Status: {app.status || "Applied"}</p>

//                 {app.resumeUrl && (
//                   <a
//                     href={`http://localhost:5000${app.resumeUrl}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="resume-link"
//                   >
//                     View Resume
//                   </a>
//                 )}

//                 <div className="action-buttons">
//                   <button
//                     className="shortlist-btn"
//                     onClick={() => updateStatus(app._id, "shortlisted")}
//                     disabled={app.status === "shortlisted"}
//                   >
//                     Shortlist
//                   </button>

//                   <button
//                     className="reject-btn"
//                     onClick={() => updateStatus(app._id, "rejected")}
//                     disabled={app.status === "rejected"}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectApplications;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import "../../styles/companyDashboard.css";

// function ProjectApplications() {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const token = localStorage.getItem("token");
//   const companyId = localStorage.getItem("companyId");

//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!companyId || !projectId) return;

//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/company/${companyId}/projects/${projectId}/applications`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setApplications(Array.isArray(res.data.data) ? res.data.data : []);
//       } catch (err) {
//         console.error("Error fetching applications:", err.response || err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [projectId, companyId, token]);

//   const updateStatus = async (applicationId, status) => {
//     if (!window.confirm(`Are you sure you want to mark this application as ${status}?`)) return;

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setApplications((prev) =>
//         prev.map((app) => (app._id === applicationId ? res.data.data : app))
//       );
//       alert(`Application ${status} successfully!`);
//     } catch (err) {
//       console.error("Error updating application status:", err.response || err);
//       alert("Failed to update status. Try again.");
//     }
//   };

//   if (loading) return <div className="loading-text">Loading applications...</div>;

//   return (
//     <div className="company-dashboard">
//       <div className="main-content" style={{ marginLeft: "0", padding: "40px" }}>
//         <div className="dashboard-header">
//           <button className="back-link" onClick={() => navigate(-1)}>
//             ← Back to Projects
//           </button>
//           <h1 style={{ marginTop: "15px" }}>Trainer Applications</h1>
//           <p className="form-subtitle">Review and manage trainers who have applied to your project.</p>
//         </div>

//         <div className="applications-grid">
//           {applications.length === 0 ? (
//             <div className="dashboard-card glass full-width">
//               <p>No applications received for this project yet.</p>
//             </div>
//           ) : (
//             applications.map((app) => (
//               <div key={app._id} className="application-card glass">
//                 <div className="app-card-header">
//                   <div className="trainer-avatar">
//                     {app.trainer?.user?.name?.charAt(0) || "T"}
//                   </div>
//                   <span className={`status-badge status-${app.status?.toLowerCase() || "applied"}`}>
//                     {app.status || "Applied"}
//                   </span>
//                 </div>

//                 <div className="trainer-info">
//                   <h3>{app.trainer?.user?.name || "Unnamed Trainer"}</h3>
//                   <p className="trainer-email">{app.trainer?.user?.email || "N/A"}</p>
//                 </div>

//                 <div className="proposal-box">
//                   <label>Trainer Proposal</label>
//                   <p>{app.proposalMessage || "No proposal message provided."}</p>
//                 </div>

//                 <div className="app-stats">
//                   <div className="stat">
//                     <span>Expected Rate</span>
//                     <strong>₹{app.expectedRate || "N/A"} / day</strong>
//                   </div>
//                 </div>

//                 <div className="app-footer-actions">
//                   {app.resumeUrl && (
//                     <a
//                       href={`http://localhost:5000${app.resumeUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="resume-link-btn"
//                     >
//                       📄 View Resume
//                     </a>
//                   )}

//                   {/* Renamed class to prevent overlap and apply new styles */}
//                   <div className="application-action-btns">
//                     <button
//                       className="shortlist-btn"
//                       onClick={() => updateStatus(app._id, "shortlisted")}
//                       disabled={app.status === "shortlisted"}
//                     >
//                       Shortlist
//                     </button>
//                     <button
//                       className="reject-btn"
//                       onClick={() => updateStatus(app._id, "rejected")}
//                       disabled={app.status === "rejected"}
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectApplications;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import "../../styles/companyDashboard.css";

// function ProjectApplications() {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // States for Schedule Interview Modal
//   const [showModal, setShowModal] = useState(false);
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [interviewData, setInterviewData] = useState({ date: "", time: "", link: "" });

//   const token = localStorage.getItem("token");
//   const companyId = localStorage.getItem("companyId");

//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!companyId || !projectId) return;
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/company/${companyId}/projects/${projectId}/applications`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setApplications(Array.isArray(res.data.data) ? res.data.data : []);
//       } catch (err) {
//         console.error("Error fetching applications:", err.response || err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchApplications();
//   }, [projectId, companyId, token]);

//   const updateStatus = async (applicationId, status) => {
//     if (!window.confirm(`Are you sure you want to mark this application as ${status}?`)) return;
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setApplications((prev) =>
//         prev.map((app) => (app._id === applicationId ? res.data.data : app))
//       );
//       alert(`Application ${status} successfully!`);
//     } catch (err) {
//       console.error("Error updating application status:", err.response || err);
//     }
//   };

//   const handleScheduleInterview = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `http://localhost:5000/api/company/applications/${selectedApp._id}/schedule`,
//         interviewData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       // Update local status to "interview_scheduled"
//       setApplications((prev) =>
//         prev.map((app) => 
//           app._id === selectedApp._id ? { ...app, status: "interview_scheduled" } : app
//         )
//       );

//       alert("Interview scheduled and trainer notified!");
//       setShowModal(false);
//       setInterviewData({ date: "", time: "", link: "" });
//     } catch (err) {
//       console.error("Schedule error:", err);
//       alert("Failed to schedule interview.");
//     }
//   };

//   if (loading) return <div className="loading-text">Loading applications...</div>;

//   return (
//     <div className="company-dashboard">
//       <div className="main-content" style={{ marginLeft: "0", padding: "40px" }}>
//         <div className="dashboard-header">
//           <button className="back-link" onClick={() => navigate(-1)}>
//             ← Back to Projects
//           </button>
//           <h1 style={{ marginTop: "15px" }}>Trainer Applications</h1>
//           <p className="form-subtitle">Review and manage trainers who have applied to your project.</p>
//         </div>

//         <div className="applications-grid">
//           {applications.length === 0 ? (
//             <div className="dashboard-card glass full-width">
//               <p>No applications received for this project yet.</p>
//             </div>
//           ) : (
//             applications.map((app) => (
//               <div key={app._id} className="application-card glass">
//                 <div className="app-card-header">
//                   <div className="trainer-avatar">
//                     {app.trainer?.user?.name?.charAt(0) || "T"}
//                   </div>
//                   <span className={`status-badge status-${app.status?.toLowerCase() || "applied"}`}>
//                     {app.status?.replace('_', ' ') || "Applied"}
//                   </span>
//                 </div>

//                 <div className="trainer-info">
//                   <h3>{app.trainer?.user?.name || "Unnamed Trainer"}</h3>
//                   <p className="trainer-email">{app.trainer?.user?.email || "N/A"}</p>
//                 </div>

//                 <div className="proposal-box">
//                   <label>Trainer Proposal</label>
//                   <p>{app.proposalMessage || "No proposal message provided."}</p>
//                 </div>

//                 <div className="app-stats">
//                   <div className="stat">
//                     <span>Expected Rate</span>
//                     <strong>₹{app.expectedRate || "N/A"} / day</strong>
//                   </div>
//                 </div>

//                 <div className="app-footer-actions">
//                   {app.resumeUrl && (
//                     <a
//                       href={`http://localhost:5000${app.resumeUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="resume-link-btn"
//                     >
//                       📄 View Resume
//                     </a>
//                   )}

//                   <div className="application-action-btns">
//                     {app.status === "shortlisted" ? (
//                       <button 
//                         className="btn-primary" 
//                         style={{ width: '100%', padding: '12px' }}
//                         onClick={() => { setSelectedApp(app); setShowModal(true); }}
//                       >
//                         📅 Schedule Interview
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           className="shortlist-btn"
//                           onClick={() => updateStatus(app._id, "shortlisted")}
//                           disabled={app.status === "shortlisted" || app.status === "interview_scheduled"}
//                         >
//                           Shortlist
//                         </button>
//                         <button
//                           className="reject-btn"
//                           onClick={() => updateStatus(app._id, "rejected")}
//                           disabled={app.status === "rejected"}
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Schedule Interview Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content glass">
//             <div className="form-header-section">
//               <h2 className="form-title">Schedule Interview</h2>
//               <p className="form-subtitle">with {selectedApp?.trainer?.user?.name}</p>
//             </div>
//             <form onSubmit={handleScheduleInterview}>
//               <div className="form-group">
//                 <label>Date</label>
//                 <input 
//                   type="date" className="form-input" required 
//                   onChange={(e) => setInterviewData({...interviewData, date: e.target.value})}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Time</label>
//                 <input 
//                   type="time" className="form-input" required 
//                   onChange={(e) => setInterviewData({...interviewData, time: e.target.value})}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Meeting Link (GMeet/Zoom)</label>
//                 <input 
//                   type="url" className="form-input" placeholder="https://meet.google.com/..." required 
//                   onChange={(e) => setInterviewData({...interviewData, link: e.target.value})}
//                 />
//               </div>
//               <div className="modal-actions">
//                 <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
//                 <button type="submit" className="btn-primary">Confirm Schedule</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProjectApplications;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/companyDashboard.css";

function ProjectApplications() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for Schedule Interview Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [interviewData, setInterviewData] = useState({ date: "", time: "", link: "" });

  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");
  const API_BASE_URL = "http://localhost:5000";

  // HELPER: Fixes the 'about:blank#blocked' by cleaning path and ensuring protocol
  // const handleViewResume = (e, resumePath) => {
  //   e.preventDefault();
  //   if (!resumePath) return alert("No resume found.");

  //   // Convert Windows backslashes to forward slashes
  //   const cleanPath = resumePath.replace(/\\/g, "/");
    
  //   // Ensure the path starts with a slash if it doesn't have one
  //   const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    
  //   const fullUrl = `${API_BASE_URL}${formattedPath}`;
    
  //   // Open in new tab securely
  //   window.open(fullUrl, '_blank', 'noopener,noreferrer');
  // };

  const handleViewResume = (e, resumePath) => {
  e.preventDefault();
  if (!resumePath) return alert("No resume found.");

  let finalUrl = "";

  // 1. If it already starts with http, use it directly
  if (resumePath.startsWith("http")) {
    finalUrl = resumePath;
  } else {
    // 2. Otherwise, clean the Windows slashes and add the base
    const cleanPath = resumePath.replace(/\\/g, "/");
    const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    finalUrl = `${API_BASE_URL}${formattedPath}`;
  }

  console.log("Opening Resume URL:", finalUrl); // Debug this in your console!
  window.open(finalUrl, '_blank', 'noopener,noreferrer');
};

  useEffect(() => {
    const fetchApplications = async () => {
      if (!companyId || !projectId) return;
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/company/${companyId}/projects/${projectId}/applications`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplications(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error fetching applications:", err.response || err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [projectId, companyId, token]);

  const updateStatus = async (applicationId, status) => {
    if (!window.confirm(`Are you sure you want to mark this application as ${status}?`)) return;
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/company/applications/${applicationId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications((prev) =>
        prev.map((app) => (app._id === applicationId ? res.data.data : app))
      );
      alert(`Application ${status} successfully!`);
    } catch (err) {
      console.error("Error updating application status:", err.response || err);
    }
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/api/company/applications/${selectedApp._id}/schedule`,
        interviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setApplications((prev) =>
        prev.map((app) => 
          app._id === selectedApp._id ? { ...app, status: "interview_scheduled" } : app
        )
      );

      alert("Interview scheduled and trainer notified!");
      setShowModal(false);
      setInterviewData({ date: "", time: "", link: "" });
    } catch (err) {
      console.error("Schedule error:", err);
      alert("Failed to schedule interview.");
    }
  };

  if (loading) return <div className="loading-text">Loading applications...</div>;

  return (
    <div className="company-dashboard">
      <div className="main-content" style={{ marginLeft: "0", padding: "40px" }}>
        <div className="dashboard-header">
          <button className="back-link" onClick={() => navigate(-1)}>
            ← Back to Projects
          </button>
          <h1 style={{ marginTop: "15px" }}>Trainer Applications</h1>
          <p className="form-subtitle">Review and manage trainers who have applied to your project.</p>
        </div>

        <div className="applications-grid">
          {applications.length === 0 ? (
            <div className="dashboard-card glass full-width">
              <p>No applications received for this project yet.</p>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app._id} className="application-card glass">
                <div className="app-card-header">
                  <div className="trainer-avatar">
                    {app.trainer?.user?.name?.charAt(0) || "T"}
                  </div>
                  <span className={`status-badge status-${app.status?.toLowerCase() || "applied"}`}>
                    {app.status?.replace('_', ' ') || "Applied"}
                  </span>
                </div>

                <div className="trainer-info">
                  <h3>{app.trainer?.user?.name || "Unnamed Trainer"}</h3>
                  <p className="trainer-email">{app.trainer?.user?.email || "N/A"}</p>
                </div>

                <div className="proposal-box">
                  <label>Trainer Proposal</label>
                  <p>{app.proposalMessage || "No proposal message provided."}</p>
                </div>

                <div className="app-stats">
                  <div className="stat">
                    <span>Expected Rate</span>
                    <strong>₹{app.expectedRate || "N/A"} / day</strong>
                  </div>
                </div>

                <div className="app-footer-actions">
                  {app.resumeUrl && (
                    <button
                      onClick={(e) => handleViewResume(e, app.resumeUrl)}
                      className="resume-link-btn"
                      style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                      📄 View Resume
                    </button>
                  )}

                  <div className="application-action-btns">
                    {app.status === "shortlisted" || app.status === "interview_scheduled" ? (
                      <button 
                        className="btn-primary" 
                        style={{ width: '100%', padding: '12px' }}
                        onClick={() => { setSelectedApp(app); setShowModal(true); }}
                      >
                        📅 {app.status === "interview_scheduled" ? "Reschedule Interview" : "Schedule Interview"}
                      </button>
                    ) : (
                      <>
                        <button
                          className="shortlist-btn"
                          onClick={() => updateStatus(app._id, "shortlisted")}
                          disabled={app.status === "rejected"}
                        >
                          Shortlist
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => updateStatus(app._id, "rejected")}
                          disabled={app.status === "rejected"}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <div className="form-header-section">
              <h2 className="form-title">Schedule Interview</h2>
              <p className="form-subtitle">with {selectedApp?.trainer?.user?.name}</p>
            </div>
            <form onSubmit={handleScheduleInterview}>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" className="form-input" required 
                  onChange={(e) => setInterviewData({...interviewData, date: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input 
                  type="time" className="form-input" required 
                  onChange={(e) => setInterviewData({...interviewData, time: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Meeting Link (GMeet/Zoom)</label>
                <input 
                  type="url" className="form-input" placeholder="https://meet.google.com/..." required 
                  onChange={(e) => setInterviewData({...interviewData, link: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Confirm Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectApplications;