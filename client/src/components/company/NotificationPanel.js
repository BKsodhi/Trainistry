import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/companyDashboard.css";

function NotificationPanel({ companyId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!companyId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${companyId}`);
        setNotifications(res.data.data);
      } catch (err) {
        console.error("Error fetching notifications:", err.response || err);
      }
    };
    fetchNotifications();
  }, [companyId]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read:", err.response || err);
    }
  };

  if (!notifications.length) return <div>No notifications.</div>;

  return (
    <div>
      {notifications.map((note) => (
        <div
          key={note._id}
          className={`notification ${note.isRead ? "read" : "unread"}`}
          onClick={() => markAsRead(note._id)}
        >
          {note.message}
        </div>
      ))}
    </div>
  );
}

export default NotificationPanel;