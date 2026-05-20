// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// function ScheduleInterview() {
//   const [scheduledInterviews, setScheduledInterviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   const fetchScheduled = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/company/applications/scheduled-interviews",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setScheduledInterviews(res.data.data || []);
//     } catch (err) {
//       console.error("Error drawing interview timeline components:", err);
//     }
//   };

//   useEffect(() => {
//     fetchScheduled();
//   }, []);

//   const handleFinalDecision = async (applicationId, status) => {
//     const confirmationPrompt = `Are you sure you want to change the status to ${status}? This will notify the trainer.`;
//     if (!window.confirm(confirmationPrompt)) return;

//     setLoading(true);
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert(res.data.message || `Status updated successfully to ${status}`);
//       await fetchScheduled();
//     } catch (err) {
//       console.error("Error setting final status:", err);
//       alert(err.response?.data?.message || "Failed to update status.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!scheduledInterviews.length) {
//     return <div className="glass p-4" style={{ color: "white" }}>No active interviews logged on your scheduling timeline.</div>;
//   }

//   return (
//     <div className="applications-container">
//       <h2 className="dashboard-title" style={{ color: "white", marginBottom: "20px" }}>Active Meeting & Interview Board</h2>
//       {loading && <div className="loading-spinner">Processing Status Updates...</div>}

//       {scheduledInterviews.map((app) => (
//         <div key={app._id} className="application-card glass interview_scheduled" style={{ marginBottom: "20px" }}>
//           <h4>{app.trainer?.user?.name || "Candidate"}</h4>
//           <p><strong>Assigned Training Track:</strong> {app.project?.title}</p>
          
//           <div className="interview-info glass" style={{ margin: "15px 0", padding: "12px", background: "rgba(245,158,11,0.1)" }}>
//             <p style={{ margin: 0 }}>📅 <strong>Scheduled Date:</strong> {app.interviewDate ? new Date(app.interviewDate).toLocaleDateString() : "Pending"}</p>
//             <p style={{ margin: "5px 0" }}>⏰ <strong>Time Block:</strong> {app.interviewTime}</p>
//             <p style={{ margin: 0 }}>
//               🔗 <strong>Room Access:</strong>{" "}
//               <a href={app.meetingLink} target="_blank" rel="noreferrer" style={{ color: "#4338ca", fontWeight: "bold", textDecoration: "underline" }}>
//                 Launch Live Meeting Portal
//               </a>
//             </p>
//           </div>

//           <div className="action-buttons" style={{ display: "flex", gap: "10px" }}>
//             <button
//               onClick={() => handleFinalDecision(app._id, "selected")}
//               disabled={loading}
//               className="btn-select"
//               style={{ backgroundColor: "#10b981", color: "white" }}
//             >
//               🎉 Select & Hire Candidate
//             </button>
//             <button
//               onClick={() => handleFinalDecision(app._id, "rejected")}
//               disabled={loading}
//               className="btn-reject"
//               style={{ backgroundColor: "#ef4444", color: "white" }}
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ScheduleInterview;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/companyDashboard.css";

function ScheduleInterview() {
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchScheduled = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/company/applications/scheduled-interviews",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScheduledInterviews(res.data.data || []);
    } catch (err) {
      console.error("Error drawing interview timeline components:", err);
    }
  };

  useEffect(() => {
    fetchScheduled();
  }, []);

  const handleFinalDecision = async (applicationId, status) => {
    const confirmationPrompt = `Are you sure you want to change the status to ${status}? This will notify the trainer.`;
    if (!window.confirm(confirmationPrompt)) return;

    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/company/applications/${applicationId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || `Status updated successfully to ${status}`);
      await fetchScheduled();
    } catch (err) {
      console.error("Error setting final status:", err);
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  if (!scheduledInterviews.length) {
    return <div className="empty-state-card">No active interviews logged on your scheduling timeline.</div>;
  }

  return (
    <div className="applications-container">
      {/* <h2 className="dashboard-title">Active Meeting & Interview Board</h2> */}
      {loading && <div className="loading-spinner">Processing Status Updates...</div>}

      {scheduledInterviews.map((app) => (
        <div key={app._id} className="application-card glass interview_scheduled">
          <h4>{app.trainer?.user?.name || "Candidate"}</h4>
          <p><strong>Assigned Training Track:</strong> {app.project?.title}</p>
          
          <div className="interview-info glass">
            <p style={{ margin: 0 }}>📅 <strong>Scheduled Date:</strong> {app.interviewDate ? new Date(app.interviewDate).toLocaleDateString() : "Pending"}</p>
            <p style={{ margin: "6px 0" }}>⏰ <strong>Time Block:</strong> {app.interviewTime}</p>
            <p style={{ margin: 0 }}>
              🔗 <strong>Room Access:</strong>{" "}
              <a href={app.meetingLink} target="_blank" rel="noreferrer">
                Launch Live Meeting Portal
              </a>
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "5px" }}>
            <button
              onClick={() => handleFinalDecision(app._id, "selected")}
              disabled={loading}
              className="btn-select"
            >
              🎉 Select & Hire Candidate
            </button>
            <button
              onClick={() => handleFinalDecision(app._id, "rejected")}
              disabled={loading}
              className="btn-reject"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScheduleInterview;