// TrainerNotificationPanel.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TrainerDashboard.css"; 

function TrainerNotificationPanel({ token }) {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Pointing to your trainer-specific endpoint
        const res = await axios.get("http://localhost:5000/api/notifications/trainer", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data.data || []);
      } catch (err) { console.error(err); }
    };
    fetchNotifications();
  }, [token]);

  return (
    <div className="notifications-container">
      {/* Use the exact same structure as your Company NotificationPanel
          so the styling matches your existing dashboard theme. 
      */}
      <div className="panel-header">
        <h2>Recent Updates</h2>
      </div>
      <div className="notifications-list">
        {notifications.map((note) => (
          <div key={note._id} className="notification glass">
             <p>{note.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TrainerNotificationPanel;