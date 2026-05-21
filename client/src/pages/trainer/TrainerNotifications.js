// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/companyDashboard.css"; // Utilizing your existing dashboard design constraints

// function TrainerNotifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   // ================= FETCH TRAINER NOTIFICATIONS =================
//   const fetchTrainerNotifications = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/notifications/trainer",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNotifications(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching trainer alerts:", err.response || err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchTrainerNotifications();
      
//       // Auto-polling interval hook to catch real-time pipeline shifts
//       const interval = setInterval(fetchTrainerNotifications, 10000);
//       return () => clearInterval(interval);
//     }
//   }, [token]);

//   // ================= OPTIMISTIC MARK AS READ =================
//   const markAsRead = async (id, isRead) => {
//     if (isRead) return;

//     // Optimistic UI change
//     setNotifications((prev) =>
//       prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//     );

//     try {
//       await axios.put(
//         `http://localhost:5000/api/notifications/${id}/read`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error("Sync failed, rolling back UI state:", err);
//       // Fallback rollback state on network failure
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: false } : n))
//       );
//     }
//   };

//   if (loading) return <div className="loading-text" style={{ color: "white", padding: "20px" }}>Syncing incoming pipeline alerts...</div>;

//   if (!notifications.length) {
//     return (
//       <div className="empty-state glass" style={{ margin: "20px", padding: "30px", color: "white" }}>
//         <h3>All Quiet on the Feed!</h3>
//         <p>No status changes, scheduling updates, or payment tracking updates have hit your account yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="notifications-container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
//       <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//         <h2 className="form-title" style={{ color: "white", textAlign: "left", margin: 0 }}>
//           Your Activity Log
//         </h2>
//         <span className="notif-count" style={{ background: "rgba(67, 56, 202, 0.4)", padding: "5px 12px", borderRadius: "20px", color: "white", fontSize: "0.9rem" }}>
//           {notifications.filter((n) => !n.isRead).length} Unread Updates
//         </span>
//       </div>

//       <div className="notifications-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//         {notifications.map((note) => (
//           <div
//             key={note._id}
//             className={`notification glass ${note.isRead ? "read" : "unread"}`}
//             onClick={() => markAsRead(note._id, note.isRead)}
//             style={{
//               cursor: note.isRead ? "default" : "pointer",
//               borderLeft: note.isRead ? "4px solid rgba(255,255,255,0.2)" : "4px solid #4338ca",
//               padding: "15px",
//               borderRadius: "8px",
//               transition: "transform 0.2s ease"
//             }}
//           >
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
//               <span className="notification-time">
//                 📅 {new Date(note.createdAt).toLocaleDateString()} • {new Date(note.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//               </span>
//               {!note.isRead && <span style={{ color: "#818cf8", fontWeight: "bold" }}>● New</span>}
//             </div>

//             <p className="notification-message" style={{ color: "white", margin: 0, fontSize: "1rem", lineHeight: "1.4" }}>
//               {note.message}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TrainerNotifications;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/companyDashboard.css"; // Reuse your existing glass styling

function TrainerNotifications({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainerNotifications = async () => {
      try {
        // Points to trainer-specific route
        const res = await axios.get("http://localhost:5000/api/notifications/trainer", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data.data || []);
      } catch (err) {
        console.error("Error fetching trainer notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTrainerNotifications();
      const interval = setInterval(fetchTrainerNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const markAsRead = async (id, isRead) => {
    if (isRead) return;
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: false } : n)));
    }
  };

  if (loading) return <div className="loading-text">Syncing updates...</div>;

  return (
    <div className="notifications-container">
      <div className="panel-header">
        <h2 className="form-title" style={{ textAlign: "left", margin: 0 }}>Recent Updates</h2>
        <span className="notif-count">{notifications.filter((n) => !n.isRead).length} Unread</span>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="empty-state">No new notifications.</p>
        ) : (
          notifications.map((note) => (
            <div key={note._id} className={`notification glass ${note.isRead ? "read" : "unread"}`} onClick={() => markAsRead(note._id, note.isRead)}>
              <span className="notification-time">
                {new Date(note.createdAt).toLocaleDateString()} • {new Date(note.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              <p className="notification-message">{note.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TrainerNotifications;