// // // src/components/Notifications.js
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const Notifications = ({ token }) => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [open, setOpen] = useState(false);

// //   // Fetch notifications
// //   const fetchNotifications = async () => {
// //     try {
// //       const res = await axios.get("/api/notifications/trainer", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setNotifications(res.data.data);
// //     } catch (err) {
// //       console.error("Error fetching notifications:", err);
// //     }
// //   };

// //   // Mark as read
// //   const markAsRead = async (id) => {
// //     try {
// //       await axios.put(`/api/notifications/${id}/read`, {}, {
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
// //     // Optional: refresh every 30 seconds
// //     const interval = setInterval(fetchNotifications, 30000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   // Unread count
// //   const unreadCount = notifications.filter((n) => !n.isRead).length;

// //   return (
// //     <div className="relative">
// //       {/* Bell Icon */}
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className="relative focus:outline-none"
// //       >
// //         🔔
// //         {unreadCount > 0 && (
// //           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
// //             {unreadCount}
// //           </span>
// //         )}
// //       </button>

// //       {/* Dropdown */}
// //       {open && (
// //         <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-50">
// //           {notifications.length === 0 ? (
// //             <div className="p-4 text-gray-500">No notifications</div>
// //           ) : (
// //             notifications.map((n) => (
// //               <div
// //                 key={n._id}
// //                 className={`p-3 border-b cursor-pointer ${
// //                   !n.isRead ? "bg-gray-100 font-medium" : ""
// //                 }`}
// //                 onClick={() => markAsRead(n._id)}
// //               >
// //                 <div>{n.message}</div>
// //                 <div className="text-xs text-gray-400">
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

// // export default Notifications;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Notifications = ({ token }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications", {
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
//       await axios.patch(`http://localhost:5000/api/notifications/${id}/read`, {}, {
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

//   // Navigate on click
//   const handleClick = (n) => {
//     markAsRead(n._id);
//     // If notification is for interview, go to project page
//     if (n.type === "Interview") {
//       window.location.href = `/trainer/project/${n.projectId}`;
//     } else if (n.type === "ApplicationStatus") {
//       window.location.href = `/trainer/applications`;
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Bell Icon */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="relative focus:outline-none"
//       >
//         🔔
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-50">
//           {notifications.length === 0 ? (
//             <div className="p-4 text-gray-500">No notifications</div>
//           ) : (
//             notifications.map((n) => (
//               <div
//                 key={n._id}
//                 className={`p-3 border-b cursor-pointer ${
//                   !n.isRead ? "bg-gray-100 font-medium" : ""
//                 }`}
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
// };

// export default Notifications;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Notifications = ({ token }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/notifications/${id}/read`, {}, {
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
//     const interval = setInterval(fetchNotifications, 10000); // refresh every 10s for near real-time
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
// };

// export default Notifications;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/companyDashboard.css"; 

// const Notifications = ({ token }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/notifications/company", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data.data || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchNotifications();
//   }, [token]);

//   const handleNotifClick = async (n) => {
//     // 1. INSTANT UI UPDATE (Optimistic Update)
//     if (!n.isRead) {
//       setNotifications((prev) =>
//         prev.map((item) => 
//           // Force both to strings to ensure comparison works
//           String(item._id) === String(n._id) ? { ...item, isRead: true } : item
//         )
//       );

//       try {
//         // 2. BACKEND SYNC
//         await axios.put(
//           `http://localhost:5000/api/notifications/${n._id}/read`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (err) {
//         console.error("Backend sync failed:", err);
//         // Rollback state if server fails
//         // setNotifications((prev) =>
//         //   prev.map((item) => String(item._id) === String(n._id) ? { ...item, isRead: false } : item)
//         // );
//         setNotifications((prev) =>
//   prev.map((item) => {
//     if (item._id === n._id) {
//       return { ...item, isRead: true };
//     }
//     return item;
//   })
// );
//       }
//     }

//     // 3. NAVIGATION
//   //   if (n.applicationId) {
//   //     window.location.href = `/trainer/applications`;
//   //   }
//   // };
//   if (n.applicationId) {
//   setTimeout(() => {
//     window.location.href = `/trainer/applications`;
//   }, 300);
// }
//   };
//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   return (
//     <div className="notifications-wrapper">
//       <button onClick={() => setOpen(!open)} className="notif-bell-btn">
//         🔔 {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
//       </button>

//       {open && (
//         <div className="notifications-container">
//           <div className="panel-header">
//             <h3>Notifications</h3>
//           </div>
//           <div className="notifications-list">
//             {notifications.length === 0 ? (
//               <div className="no-notifs">No notifications</div>
//             ) : (
//               // notifications.map((n) => (
//               //   <div
//               //     key={n._id}
//               //     // Standardized classes for CSS targeting
//               //     className={`notification ${n.isRead ? "read" : "unread"}`}
//               //     onClick={() => handleNotifClick(n)}
//               //   >
//               //     <span className="notification-time">
//               //       {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               //     </span>
//               //     <p className="notification-message">{n.message}</p>
//               //   </div>
//               // ))
//               notifications.map((n) => (
//   <div
//     key={String(n._id)}
//     // ADDED "glass" here to match your CSS base styles
//     className={`notification glass ${n.isRead ? "read" : "unread"}`}
//     onClick={() => handleNotifClick(n)}
//   >
//     <span className="notification-time">
//       {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//     </span>
//     <p className="notification-message">{n.message}</p>
//   </div>
// ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/companyDashboard.css";

const Notifications = ({ token }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notifications/company",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (token) fetchNotifications();
  }, [token]);

  const handleNotifClick = async (n) => {

    // INSTANT UI UPDATE
    if (!n.isRead) {
      setNotifications((prev) =>
        prev.map((item) =>
          String(item._id) === String(n._id)
            ? { ...item, isRead: true }
            : item
        )
      );

      try {
        await axios.put(
          `http://localhost:5000/api/notifications/${n._id}/read`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Backend sync failed:", err);

        // ROLLBACK IF SERVER FAILS
        setNotifications((prev) =>
          prev.map((item) =>
            String(item._id) === String(n._id)
              ? { ...item, isRead: false }
              : item
          )
        );
      }
    }

    // NAVIGATION (DELAYED FOR ANIMATION)
    if (n.relatedApplication) {
      setTimeout(() => {
        window.location.href = "/trainer/applications";
      }, 300);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="notifications-wrapper">
      <button onClick={() => setOpen(!open)} className="notif-bell-btn">
        🔔 {unreadCount > 0 && (
          <span className="bell-badge">{unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notifications-container">
          <div className="panel-header">
            <h3>Notifications</h3>
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifs">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={String(n._id)}
                  className={`notification glass ${
                    n.isRead ? "read" : "unread"
                  }`}
                  onClick={() => handleNotifClick(n)}
                >
                  <span className="notification-time">
                    {new Date(n.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <p className="notification-message">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;