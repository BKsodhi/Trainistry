// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// function Shortlisted() {
//   const [shortlistedApps, setShortlistedApps] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [schedulingId, setSchedulingId] = useState(null); // Tracks which card has the scheduler open
//   const [interviewForm, setInterviewForm] = useState({ date: "", time: "", link: "" });
  
//   const token = localStorage.getItem("token");

//   const fetchShortlisted = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/company/applications/shortlisted",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setShortlistedApps(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching shortlisted candidates:", err);
//     }
//   };

//   useEffect(() => {
//     fetchShortlisted();
//   }, []);

//   const handleInputChange = (e) => {
//     setInterviewForm({ ...interviewForm, [e.target.name]: e.target.value });
//   };

//   const submitInterviewSchedule = async (e, applicationId) => {
//     e.preventDefault();
//     if (!interviewForm.date || !interviewForm.time || !interviewForm.link) {
//       alert("Please fill out all meeting configuration parameters.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/company/applications/${applicationId}/status`,
//         {
//           status: "interview_scheduled",
//           date: interviewForm.date,
//           time: interviewForm.time,
//           link: interviewForm.link
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(res.data.message || "Interview successfully logged and email dispatched!");
//       setSchedulingId(null);
//       setInterviewForm({ date: "", time: "", link: "" });
//       await fetchShortlisted(); // Refresh layout state
//     } catch (err) {
//       console.error("Error scheduling interview:", err);
//       alert(err.response?.data?.message || "Failed to finalize interview schedule.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!shortlistedApps.length) {
//     return <div className="glass p-4" style={{ color: "white" }}>No trainers currently occupy the shortlisted state.</div>;
//   }

//   return (
//     <div className="applications-container">
//       <h2 className="dashboard-title" style={{ color: "white", marginBottom: "20px" }}>Shortlisted Candidates Pipeline</h2>
//       {loading && <div className="loading-spinner">Processing Status Lifecycle Update...</div>}

//       {shortlistedApps.map((app) => (
//         <div key={app._id} className="application-card glass shortlisted" style={{ marginBottom: "20px" }}>
//           <div style={{ display: "flex", justifyContent: "between", alignItems: "start", flexWrap: "wrap" }}>
//             <div>
//               <h4>{app.trainer?.user?.name || "Trainer Profile"}</h4>
//               <p><strong>Target Project Requirement:</strong> {app.project?.title}</p>
//               <p><strong>Contact Email:</strong> {app.trainer?.user?.email}</p>
//               <p><strong>Contact Phone:</strong> {app.trainer?.user?.phone || "N/A"}</p>
//             </div>
//             <span className="status-badge shortlisted" style={{ marginLeft: "auto" }}>Shortlisted</span>
//           </div>

//           {schedulingId !== app._id ? (
//             <button
//               className="btn-shortlist"
//               style={{ marginTop: "15px", backgroundColor: "#f59e0b", color: "white" }}
//               onClick={() => setSchedulingId(app._id)}
//               disabled={loading}
//             >
//               🗓️ Configure Meeting Schedule
//             </button>
//           ) : (
//             <form onSubmit={(e) => submitInterviewSchedule(e, app._id)} className="glass-form-panel" style={{ marginTop: "20px", padding: "15px", borderRadius: "8px", background: "rgba(255,255,255,0.05)" }}>
//               <h5 style={{ color: "white", marginBottom: "10px" }}>Setup Virtual Interview Matrix</h5>
//               <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
//                 <input
//                   type="date"
//                   name="date"
//                   value={interviewForm.date}
//                   onChange={handleInputChange}
//                   className="form-input text-area-glass"
//                   required
//                 />
//                 <input
//                   type="time"
//                   name="time"
//                   value={interviewForm.time}
//                   onChange={handleInputChange}
//                   className="form-input text-area-glass"
//                   required
//                 />
//               </div>
//               <input
//                 type="url"
//                 name="link"
//                 placeholder="Paste Meeting Link Here (e.g. Google Meet, Zoom URL)"
//                 value={interviewForm.link}
//                 onChange={handleInputChange}
//                 className="form-input text-area-glass"
//                 style={{ width: "100%", marginBottom: "10px" }}
//                 required
//               />
//               <div style={{ display: "flex", gap: "10px" }}>
//                 <button type="submit" disabled={loading} className="btn-select" style={{ backgroundColor: "#10b981", color: "white" }}>
//                   Confirm & Dispatch Invite
//                 </button>
//                 <button type="button" className="btn-reject" style={{ backgroundColor: "#ef4444", color: "white" }} onClick={() => setSchedulingId(null)}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Shortlisted;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/companyDashboard.css";

function Shortlisted() {
  const [shortlistedApps, setShortlistedApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schedulingId, setSchedulingId] = useState(null);
  const [interviewForm, setInterviewForm] = useState({ date: "", time: "", link: "" });
  
  const token = localStorage.getItem("token");

  const fetchShortlisted = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/company/applications/shortlisted",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShortlistedApps(res.data.data || []);
    } catch (err) {
      console.error("Error fetching shortlisted candidates:", err);
    }
  };

  useEffect(() => {
    fetchShortlisted();
  }, []);

  const handleInputChange = (e) => {
    setInterviewForm({ ...interviewForm, [e.target.name]: e.target.value });
  };

  const submitInterviewSchedule = async (e, applicationId) => {
    e.preventDefault();
    if (!interviewForm.date || !interviewForm.time || !interviewForm.link) {
      alert("Please fill out all meeting configuration parameters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/company/applications/${applicationId}/status`,
        {
          status: "interview_scheduled",
          date: interviewForm.date,
          time: interviewForm.time,
          link: interviewForm.link
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Interview successfully logged and email dispatched!");
      setSchedulingId(null);
      setInterviewForm({ date: "", time: "", link: "" });
      await fetchShortlisted();
    } catch (err) {
      console.error("Error scheduling interview:", err);
      alert(err.response?.data?.message || "Failed to finalize interview schedule.");
    } finally {
      setLoading(false);
    }
  };

  if (!shortlistedApps.length) {
    return <div className="empty-state-card">No trainers currently occupy the shortlisted state.</div>;
  }

  return (
    <div className="applications-container">
      {/* <h2 className="dashboard-title">Shortlisted Candidates Pipeline</h2> */}
      {loading && <div className="loading-spinner">Processing Status Lifecycle Update...</div>}

      {shortlistedApps.map((app) => (
        <div key={app._id} className="application-card glass shortlisted">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap" }}>
            <div>
              <h4>{app.trainer?.user?.name || "Trainer Profile"}</h4>
              <p><strong>Target Project Requirement:</strong> {app.project?.title}</p>
              <p><strong>Contact Email:</strong> {app.trainer?.user?.email}</p>
              <p><strong>Contact Phone:</strong> {app.trainer?.user?.phone || "N/A"}</p>
            </div>
            <span className="status-badge shortlisted">Shortlisted</span>
          </div>

          {schedulingId !== app._id ? (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button
                className="btn-shortlist"
                style={{ marginTop: "15px" }}
                onClick={() => setSchedulingId(app._id)}
                disabled={loading}
              >
                🗓️ Configure Meeting Schedule
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => submitInterviewSchedule(e, app._id)} className="glass-form-panel">
              <h5>Setup Virtual Interview Matrix</h5>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "15px" }}>
                <div style={{ flex: 1, minWidth: "150px" }}>
                  <input
                    type="date"
                    name="date"
                    value={interviewForm.date}
                    onChange={handleInputChange}
                    className="form-input text-area-glass"
                    required
                  />
                </div>
                <div style={{ flex: 1, minWidth: "150px" }}>
                  <input
                    type="time"
                    name="time"
                    value={interviewForm.time}
                    onChange={handleInputChange}
                    className="form-input text-area-glass"
                    required
                  />
                </div>
              </div>
              <input
                type="url"
                name="link"
                placeholder="Paste Meeting Link Here (e.g. Google Meet, Zoom URL)"
                value={interviewForm.link}
                onChange={handleInputChange}
                className="form-input text-area-glass"
                style={{ marginBottom: "15px" }}
                required
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" disabled={loading} className="btn-select">
                  Confirm & Dispatch Invite
                </button>
                <button type="button" className="btn-reject" onClick={() => setSchedulingId(null)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}

export default Shortlisted;