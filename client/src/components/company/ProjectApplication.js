// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "../../styles/companyDashboard.css";

// function ProjectApplications() {
//   const { projectId } = useParams();
//   const [applications, setApplications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/company/projects/${projectId}/applications`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setApplications(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching applications:", err.response || err);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [projectId]);

//   const updateApplicationStatus = async (applicationId, status) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // Refresh applications list
//       fetchApplications();
//     } catch (err) {
//       console.error("Error updating status:", err.response || err);
//       alert("Failed to update status");
//     }
//   };

//   if (!applications.length) return <div>No applications found.</div>;

//   return (
//     <div className="applications-container">
//       {applications.map((app) => (
//         <div key={app._id} className="application-card">
//           <h4>{app.trainerName}</h4>
//           <p>Email: {app.trainerEmail}</p>
//           <p>Proposal: {app.proposal}</p>
//           <p>Status: {app.status}</p>
//           <button
//             onClick={() => updateApplicationStatus(app._id, "shortlisted")}
//             disabled={app.status !== "applied"}
//           >
//             Shortlist
//           </button>
//           <button
//             onClick={() => updateApplicationStatus(app._id, "rejected")}
//             disabled={app.status !== "applied"}
//           >
//             Reject
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProjectApplications;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "../../styles/companyDashboard.css";

// function ProjectApplications() {
//   const { projectId } = useParams();
//   const [applications, setApplications] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/company/projects/${projectId}/applications`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setApplications(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching applications:", err.response || err);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [projectId]);

//   const updateApplicationStatus = async (applicationId, status) => {
//     const confirmMsg = status === 'selected' 
//       ? "Are you sure? This will send a selection confirmation email to the trainer." 
//       : `Confirm ${status}?`;

//     if (!window.confirm(confirmMsg)) return;

//     try {
//       await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert(`Status updated to ${status} and email sent!`);
//       fetchApplications();
//     } catch (err) {
//       console.error("Error updating status:", err.response || err);
//       alert("Failed to update status");
//     }
//   };

//   if (!applications.length) return <div className="glass p-4">No applications found for this project.</div>;

//   return (
//     <div className="applications-container">
//       {applications.map((app) => (
//         <div key={app._id} className={`application-card glass ${app.status}`}>
//           <h4>{app.trainer?.user?.name || "Trainer"}</h4>
//           <p><strong>Email:</strong> {app.trainer?.user?.email}</p>
//           <p><strong>Status:</strong> <span className={`status-badge ${app.status}`}>{app.status.replace('_', ' ')}</span></p>
          
//           <div className="action-buttons" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
//             {/* Shortlist Button */}
//             <button
//               className="btn-shortlist"
//               onClick={() => updateApplicationStatus(app._id, "shortlisted")}
//               disabled={app.status !== "applied"}
//             >
//               Shortlist
//             </button>

//             {/* NEW: Select Button (Triggers Hired Email) */}
//             <button
//               className="btn-select"
//               style={{ backgroundColor: '#10b981', color: 'white' }}
//               onClick={() => updateApplicationStatus(app._id, "selected")}
//               disabled={app.status === "selected" || app.status === "rejected"}
//             >
//               Confirm Selection
//             </button>

//             {/* Reject Button (Always available until selected/rejected) */}
//             <button
//               className="btn-reject"
//               style={{ backgroundColor: '#ef4444', color: 'white' }}
//               onClick={() => updateApplicationStatus(app._id, "rejected")}
//               disabled={app.status === "selected" || app.status === "rejected"}
//             >
//               Reject
//             </button>
//           </div>

//           {app.status === 'interview_scheduled' && (
//             <div className="interview-info glass" style={{ marginTop: '10px', fontSize: '0.9rem', padding: '10px' }}>
//               <p>📅 {new Date(app.interviewDate).toLocaleDateString()} at {app.interviewTime}</p>
//               <a href={app.meetingLink} target="_blank" rel="noreferrer">Join Meeting</a>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProjectApplications;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/companyDashboard.css";

function ProjectApplications() {
  const { projectId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false); // New: Prevent double clicks
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
    // 1. Dynamic Confirmation Message
    let confirmMsg = `Confirm changing status to ${status}?`;
    if (status === 'selected' || status === 'shortlisted') {
      confirmMsg = `Are you sure? This will send a SELECTION confirmation email to the trainer.`;
    }

    if (!window.confirm(confirmMsg)) return;

    setLoading(true); // Start loading

    try {
      const res = await axios.put(
        `http://localhost:5000/api/company/applications/${applicationId}/status`,
        { status }, // Backend now handles 'shortlisted' or 'selected'
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || `Status updated to ${status}`);
      await fetchApplications(); // Refresh list
    } catch (err) {
      console.error("Error updating status:", err.response || err);
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!applications.length) return <div className="glass p-4">No applications found for this project.</div>;

  return (
    <div className="applications-container">
      {/* Loading Overlay (Optional UI Polish) */}
      {loading && <div className="loading-spinner">Sending Notification Email...</div>}

      {applications.map((app) => (
        <div key={app._id} className={`application-card glass ${app.status}`}>
          <h4>{app.trainer?.user?.name || "Trainer"}</h4>
          <p><strong>Email:</strong> {app.trainer?.user?.email}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`status-badge ${app.status}`}>
              {app.status ? app.status.replace('_', ' ') : 'applied'}
            </span>
          </p>
          
          <div className="action-buttons" style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            
            {/* Shortlist Button - Now triggers email in updated backend */}
            <button
              className="btn-shortlist"
              onClick={() => updateApplicationStatus(app._id, "shortlisted")}
              disabled={loading || app.status === "shortlisted" || app.status === "selected"}
              style={{ opacity: (app.status === "shortlisted" || app.status === "selected") ? 0.5 : 1 }}
            >
              {app.status === "shortlisted" ? "Shortlisted" : "Shortlist"}
            </button>

            {/* Select Button */}
            <button
              className="btn-select"
              style={{ 
                backgroundColor: '#10b981', 
                color: 'white',
                opacity: (app.status === "selected" || app.status === "rejected") ? 0.5 : 1 
              }}
              onClick={() => updateApplicationStatus(app._id, "selected")}
              disabled={loading || app.status === "selected" || app.status === "rejected"}
            >
              Confirm Selection
            </button>

            {/* Reject Button */}
            <button
              className="btn-reject"
              style={{ 
                backgroundColor: '#ef4444', 
                color: 'white',
                opacity: (app.status === "selected" || app.status === "rejected") ? 0.5 : 1 
              }}
              onClick={() => updateApplicationStatus(app._id, "rejected")}
              disabled={loading || app.status === "selected" || app.status === "rejected"}
            >
              Reject
            </button>
          </div>

          {app.status === 'interview_scheduled' && (
            <div className="interview-info glass" style={{ marginTop: '10px', fontSize: '0.9rem', padding: '10px' }}>
              <p>📅 {new Date(app.interviewDate).toLocaleDateString()} at {app.interviewTime}</p>
              <a href={app.meetingLink} target="_blank" rel="noreferrer" style={{ color: '#4338ca', fontWeight: 'bold' }}>
                Join Meeting Link
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectApplications;