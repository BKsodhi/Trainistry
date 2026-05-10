// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [view, setView] = useState("stats"); // stats, users, trainings
//   const [users, setUsers] = useState([]);
//   const [trainings, setTrainings] = useState([]);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTrainers: 0,
//     totalCompanies: 0,
//     platformVolume: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {
//       setLoading(true);
//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };

//       const [sRes, uRes, tRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/admin/stats", config),
//         axios.get("http://localhost:5000/api/admin/users", config),
//         axios.get("http://localhost:5000/api/admin/trainings", config),
//       ]);

//       setStats(sRes.data.stats);
//       setUsers(uRes.data.users);
//       setTrainings(tRes.data.trainings);
//     } catch (err) {
//       console.error("Error fetching admin data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateStatus = async (id, action) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/${action}/${id}`, {}, config);
//       fetchAdminData(); // Refresh data after action
//     } catch (err) {
//       alert(`Failed to ${action} training.`);
//     }
//   };

//   if (loading) return <div className="loader">Loading Admin Console...</div>;

//   return (
//     <div className="admin-container">
//       {/* Sidebar / Navigation */}
//       <aside className="admin-sidebar glass">
//         <h2 className="brand-logo">Trainistry <span>Admin</span></h2>
//         <nav>
//           <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>📊 Dashboard Stats</button>
//           <button className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👥 User Directory</button>
//           <button className={view === "trainings" ? "active" : ""} onClick={() => setView("trainings")}>📜 Training Requests</button>
//         </nav>
//       </aside>

//       {/* Main Content Area */}
//       <main className="admin-main">
//         <header className="admin-top-bar glass">
//           <h1>System Overview</h1>
//           <div className="admin-profile">
//             <span>Administrator</span>
//           </div>
//         </header>

//         <section className="admin-content">
//           {/* VIEW: STATS */}
//           {view === "stats" && (
//             <div className="stats-grid">
//               <div className="stat-box glass">
//                 <h3>{stats.totalUsers}</h3>
//                 <p>Total Registered</p>
//               </div>
//               <div className="stat-box glass">
//                 <h3>{stats.totalTrainers}</h3>
//                 <p>Expert Trainers</p>
//               </div>
//               <div className="stat-box glass">
//                 <h3>{stats.totalCompanies}</h3>
//                 <p>Active Companies</p>
//               </div>
//               <div className="stat-box glass highlight">
//                 <h3>₹{stats.platformVolume.toLocaleString()}</h3>
//                 <p>Platform Volume</p>
//               </div>
//             </div>
//           )}

//           {/* VIEW: USERS */}
//           {view === "users" && (
//             <div className="table-container glass">
//               <h3>User Management</h3>
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Joined</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u) => (
//                     <tr key={u._id}>
//                       <td>{u.name}</td>
//                       <td>{u.email}</td>
//                       <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
//                       <td>{new Date(u.createdAt).toLocaleDateString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: TRAININGS */}
//           {view === "trainings" && (
//             <div className="training-grid">
//               {trainings.map((t) => (
//                 <div key={t._id} className="training-card glass">
//                   <div className="card-header">
//                     <h4>{t.title}</h4>
//                     <span className={`status-tag ${t.status}`}>{t.status}</span>
//                   </div>
//                   <div className="card-body">
//                     <p><strong>Trainer:</strong> {t.trainer?.name}</p>
//                     <p><strong>Company:</strong> {t.company?.name}</p>
//                     <p><strong>Price:</strong> ₹{t.price}</p>
//                   </div>
//                   {t.status === "pending" && (
//                     <div className="card-actions">
//                       <button className="approve-btn" onClick={() => handleUpdateStatus(t._id, "approve")}>Approve</button>
//                       <button className="reject-btn" onClick={() => handleUpdateStatus(t._id, "reject")}>Reject</button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [view, setView] = useState("stats"); // stats, users, trainings, payments
//   const [users, setUsers] = useState([]);
//   const [trainings, setTrainings] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, ongoing, completed
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTrainers: 0,
//     totalCompanies: 0,
//     platformVolume: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {
//       setLoading(true);
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const [sRes, uRes, tRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/admin/stats", config),
//         axios.get("http://localhost:5000/api/admin/users", config),
//         axios.get("http://localhost:5000/api/admin/trainings", config),
//       ]);

//       setStats(sRes.data.stats);
//       setUsers(uRes.data.users);
//       setTrainings(tRes.data.trainings);
//     } catch (err) {
//       console.error("Error fetching admin data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // NEW: Toggle Verification (Feature 1.8)
//   const handleToggleVerify = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/verify/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert("Verification update failed.");
//     }
//   };

//   // NEW: Toggle Blacklist (Feature 1.6 / 1.7)
//   const handleToggleBlacklist = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/blacklist/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert("Status update failed.");
//     }
//   };

//   const handleUpdateStatus = async (id, action) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/${action}/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert(`Failed to ${action} training.`);
//     }
//   };

//   // Filter logic for projects
//   const filteredTrainings = trainings.filter((t) => {
//     if (filter === "ongoing") return t.status === "approved" || t.status === "ongoing";
//     if (filter === "completed") return t.status === "completed";
//     return true;
//   });

//   if (loading) return <div className="loader">Loading Admin Console...</div>;

//   return (
//     <div className="admin-container">
//       <aside className="admin-sidebar glass">
//         <h2 className="brand-logo">Trainistry <span>Admin</span></h2>
//         <nav>
//           <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>📊 Dashboard Stats</button>
//           <button className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👥 User Directory</button>
//           <button className={view === "trainings" ? "active" : ""} onClick={() => setView("trainings")}>📜 Projects & Requests</button>
//           <button className={view === "payments" ? "active" : ""} onClick={() => setView("payments")}>💰 Payment Monitor</button>
//         </nav>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-top-bar glass">
//           <h1>{view.toUpperCase()}</h1>
//           <div className="admin-profile"><span>System Administrator</span></div>
//         </header>

//         <section className="admin-content">
//           {/* VIEW: STATS */}
//           {view === "stats" && (
//             <div className="stats-grid">
//               <div className="stat-box glass"><h3>{stats.totalUsers}</h3><p>Total Registered</p></div>
//               <div className="stat-box glass"><h3>{stats.totalTrainers}</h3><p>Expert Trainers</p></div>
//               <div className="stat-box glass"><h3>{stats.totalCompanies}</h3><p>Active Companies</p></div>
//               <div className="stat-box glass highlight"><h3>₹{stats.platformVolume.toLocaleString()}</h3><p>Platform Volume</p></div>
//             </div>
//           )}

//           {/* VIEW: USERS (Includes Verification & Blacklisting) */}
//           {view === "users" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                     <th>Verification</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u) => (
//                     <tr key={u._id}>
//                       <td>{u.name}<br/><small>{u.email}</small></td>
//                       <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
//                       <td><span className={`status-tag ${u.status}`}>{u.status}</span></td>
//                       <td>{u.isVerified ? "✅ Verified" : "❌ Unverified"}</td>
//                       <td>
//                         <button className="action-btn verify" onClick={() => handleToggleVerify(u._id)}>
//                           {u.isVerified ? "Revoke" : "Verify"}
//                         </button>
//                         <button className="action-btn blacklist" onClick={() => handleToggleBlacklist(u._id)}>
//                           {u.status === "active" ? "Blacklist" : "Activate"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: TRAININGS (Ongoing vs Completed) */}
//           {view === "trainings" && (
//             <>
//               <div className="filter-bar">
//                 <button className={filter === "all" ? "f-active" : ""} onClick={() => setFilter("all")}>All</button>
//                 <button className={filter === "ongoing" ? "f-active" : ""} onClick={() => setFilter("ongoing")}>Ongoing</button>
//                 <button className={filter === "completed" ? "f-active" : ""} onClick={() => setFilter("completed")}>Completed</button>
//               </div>
//               <div className="training-grid">
//                 {filteredTrainings.map((t) => (
//                   <div key={t._id} className="training-card glass">
//                     <div className="card-header">
//                       <h4>{t.title}</h4>
//                       <span className={`status-tag ${t.status}`}>{t.status}</span>
//                     </div>
//                     <p><strong>Trainer:</strong> {t.trainer?.name || "N/A"}</p>
//                     <p><strong>Company:</strong> {t.company?.name || "N/A"}</p>
//                     {t.status === "pending" && (
//                       <div className="card-actions">
//                         <button className="approve-btn" onClick={() => handleUpdateStatus(t._id, "approve")}>Approve</button>
//                         <button className="reject-btn" onClick={() => handleUpdateStatus(t._id, "reject")}>Reject</button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* VIEW: PAYMENTS (Feature 3) */}
//           {view === "payments" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Project</th>
//                     <th>Amount</th>
//                     <th>Payment Status</th>
//                     <th>Due Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {trainings.map((t) => (
//                     <tr key={t._id}>
//                       <td>{t.title}</td>
//                       <td>₹{t.price}</td>
//                       <td><span className={`payment-badge ${t.paymentStatus || 'pending'}`}>{t.paymentStatus || 'pending'}</span></td>
//                       <td>{t.paymentDeadline ? new Date(t.paymentDeadline).toLocaleDateString() : "No Date"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [view, setView] = useState("stats"); 
//   const [users, setUsers] = useState([]);
//   const [trainings, setTrainings] = useState([]);
//   const [filter, setFilter] = useState("all"); 
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTrainers: 0,
//     totalCompanies: 0,
//     platformVolume: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {
//       setLoading(true);
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const [sRes, uRes, tRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/admin/stats", config),
//         axios.get("http://localhost:5000/api/admin/users", config),
//         axios.get("http://localhost:5000/api/admin/trainings", config),
//       ]);

//       setStats(sRes.data.stats || { totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//       setUsers(uRes.data.users || []);
//       setTrainings(tRes.data.trainings || []);
//     } catch (err) {
//       console.error("Error fetching admin data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleVerify = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/verify/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert("Verification update failed.");
//     }
//   };

//   const handleToggleBlacklist = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/blacklist/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert("Status update failed.");
//     }
//   };

//   const handleUpdateStatus = async (id, action) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/${action}/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert(`Failed to ${action} project.`);
//     }
//   };

//   // Filter Logic: Handles the "Nothing is Visible" issue
//   const filteredTrainings = (trainings || []).filter((t) => {
//     if (filter === "ongoing") return t.status === "approved" || t.status === "ongoing" || t.status === "pending";
//     if (filter === "completed") return t.status === "completed";
//     return true; 
//   });

//   if (loading) return <div className="loader">Loading Admin Console...</div>;

//   return (
//     <div className="admin-container">
//       <aside className="admin-sidebar glass">
//         <h2 className="brand-logo">Trainistry <span>Admin</span></h2>
//         <nav>
//           <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>📊 Dashboard Stats</button>
//           <button className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👥 User Directory</button>
//           <button className={view === "trainings" ? "active" : ""} onClick={() => setView("trainings")}>📜 Projects & Requests</button>
//           <button className={view === "payments" ? "active" : ""} onClick={() => setView("payments")}>💰 Payment Monitor</button>
//         </nav>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-top-bar glass">
//           <h1>{view.toUpperCase()}</h1>
//           <div className="admin-profile"><span>System Administrator</span></div>
//         </header>

//         <section className="admin-content">
//           {/* VIEW: STATS */}
//           {view === "stats" && (
//             <div className="stats-grid">
//               <div className="stat-box glass"><h3>{stats.totalUsers}</h3><p>Total Registered</p></div>
//               <div className="stat-box glass"><h3>{stats.totalTrainers}</h3><p>Expert Trainers</p></div>
//               <div className="stat-box glass"><h3>{stats.totalCompanies}</h3><p>Active Companies</p></div>
//               <div className="stat-box glass highlight"><h3>₹{stats.platformVolume.toLocaleString()}</h3><p>Platform Volume</p></div>
//             </div>
//           )}

//           {/* VIEW: USERS */}
//           {view === "users" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>User</th>
//                     <th>Role</th>
//                     <th>Verification</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.length > 0 ? users.map((u) => (
//                     <tr key={u._id}>
//                       <td><strong>{u.name}</strong><br/>{u.email}</td>
//                       <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
//                       <td>{u.isVerified ? "✅ Verified" : "❌ Pending"}</td>
//                       <td className="admin-actions-cell">
//                         <button className={`action-btn ${u.isVerified ? 'rev' : 'ver'}`} onClick={() => handleToggleVerify(u._id)}>
//                           {u.isVerified ? "Revoke" : "Verify"}
//                         </button>
//                         <button className="action-btn blk" onClick={() => handleToggleBlacklist(u._id)}>
//                           {u.status === "active" ? "Blacklist" : "Activate"}
//                         </button>
//                       </td>
//                     </tr>
//                   )) : <tr><td colSpan="4" className="no-data">No users registered yet.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: TRAININGS */}
//           {view === "trainings" && (
//             <>
//               <div className="filter-bar glass">
//                 <button className={filter === "all" ? "f-active" : ""} onClick={() => setFilter("all")}>All ({trainings.length})</button>
//                 <button className={filter === "ongoing" ? "f-active" : ""} onClick={() => setFilter("ongoing")}>Ongoing/Pending</button>
//                 <button className={filter === "completed" ? "f-active" : ""} onClick={() => setFilter("completed")}>Completed</button>
//               </div>
//               <div className="training-grid">
//                 {filteredTrainings.length > 0 ? filteredTrainings.map((t) => (
//                   <div key={t._id} className="training-card glass">
//                     <div className="card-header">
//                       <h4>{t.title}</h4>
//                       <span className={`status-tag ${t.status}`}>{t.status}</span>
//                     </div>
//                     <div className="card-info">
//                       <p><strong>Trainer:</strong> {t.trainer?.name || "Unassigned"}</p>
//                       <p><strong>Company:</strong> {t.company?.name || "N/A"}</p>
//                       <p><strong>Budget:</strong> ₹{t.price}</p>
//                     </div>
//                     {t.status === "pending" && (
//                       <div className="card-actions">
//                         <button className="approve-btn" onClick={() => handleUpdateStatus(t._id, "approve")}>Approve</button>
//                         <button className="reject-btn" onClick={() => handleUpdateStatus(t._id, "reject")}>Reject</button>
//                       </div>
//                     )}
//                   </div>
//                 )) : <div className="no-data-msg">No projects match this filter.</div>}
//               </div>
//             </>
//           )}

//           {/* VIEW: PAYMENTS */}
//           {view === "payments" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Project Name</th>
//                     <th>Price</th>
//                     <th>Payment Status</th>
//                     <th>Due Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {trainings.length > 0 ? trainings.map((t) => (
//                     <tr key={t._id}>
//                       <td>{t.title}</td>
//                       <td>₹{t.price}</td>
//                       <td><span className={`pay-badge ${t.paymentStatus || 'pending'}`}>{t.paymentStatus || 'pending'}</span></td>
//                       <td>{t.paymentDeadline ? new Date(t.paymentDeadline).toLocaleDateString() : "Not Set"}</td>
//                     </tr>
//                   )) : <tr><td colSpan="4" className="no-data">No payment history found.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [view, setView] = useState("stats");
//   const [users, setUsers] = useState([]);
//   const [trainings, setTrainings] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [stats, setStats] = useState({ totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//   const [loading, setLoading] = useState(true);
  
//   // Modal State for Company Verification
//   const [selectedUser, setSelectedUser] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {
//       setLoading(true);
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [sRes, uRes, tRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/admin/stats", config),
//         axios.get("http://localhost:5000/api/admin/users", config),
//         axios.get("http://localhost:5000/api/admin/trainings", config),
//       ]);
//       setStats(sRes.data.stats || { totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//       setUsers(uRes.data.users || []);
//       setTrainings(tRes.data.trainings || []);
//     } catch (err) {
//       console.error("Error fetching admin data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleVerify = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/verify/${id}`, {}, config);
//       setSelectedUser(null); // Close modal on action
//       fetchAdminData();
//     } catch (err) {
//       alert("Verification update failed.");
//     }
//   };

//   const handleToggleBlacklist = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/blacklist/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert("Status update failed.");
//     }
//   };

//   const handleUpdateStatus = async (id, action) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`http://localhost:5000/api/admin/${action}/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert(`Failed to ${action} project.`);
//     }
//   };

//   const filteredTrainings = (trainings || []).filter((t) => {
//     if (filter === "ongoing") return ["approved", "ongoing", "pending"].includes(t.status);
//     if (filter === "completed") return t.status === "completed";
//     return true;
//   });

//   if (loading) return <div className="loader">Verifying Corporate Records...</div>;

//   return (
//     <div className="admin-container">
//       <aside className="admin-sidebar glass">
//         <h2 className="brand-logo">Trainistry <span>Admin</span></h2>
//         <nav>
//           <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>📊 Dashboard Stats</button>
//           <button className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👥 User Directory</button>
//           <button className={view === "trainings" ? "active" : ""} onClick={() => setView("trainings")}>📜 Projects & Requests</button>
//           <button className={view === "payments" ? "active" : ""} onClick={() => setView("payments")}>💰 Payment Monitor</button>
//         </nav>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-top-bar glass">
//           <h1>{view.toUpperCase()}</h1>
//           <div className="admin-profile"><span>System Administrator</span></div>
//         </header>

//         <section className="admin-content">
//           {/* VIEW: STATS */}
//           {view === "stats" && (
//             <div className="stats-grid">
//               <div className="stat-box glass"><h3>{stats.totalUsers}</h3><p>Total Registered</p></div>
//               <div className="stat-box glass"><h3>{stats.totalTrainers}</h3><p>Expert Trainers</p></div>
//               <div className="stat-box glass"><h3>{stats.totalCompanies}</h3><p>Active Companies</p></div>
//               <div className="stat-box glass highlight"><h3>₹{stats.platformVolume.toLocaleString()}</h3><p>Platform Volume</p></div>
//             </div>
//           )}

//           {/* VIEW: USERS (WITH COMPLIANCE VIEW) */}
//           {view === "users" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>User / Entity</th>
//                     <th>Role</th>
//                     <th>Compliance Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.length > 0 ? users.map((u) => (
//                     <tr key={u._id}>
//                       <td><strong>{u.name}</strong><br/>{u.email}</td>
//                       <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
//                       <td>
//                         <span className={u.isVerified ? "verified-txt" : "pending-txt"}>
//                           {u.isVerified ? "✅ Verified" : "⏳ KYC Pending"}
//                         </span>
//                       </td>
//                       <td className="admin-actions-cell">
//                         <button className="action-btn info" onClick={() => setSelectedUser(u)}>
//                           👁️ View Docs
//                         </button>
//                         <button className="action-btn blk" onClick={() => handleToggleBlacklist(u._id)}>
//                           {u.status === "active" ? "Blacklist" : "Activate"}
//                         </button>
//                       </td>
//                     </tr>
//                   )) : <tr><td colSpan="4" className="no-data">No users found.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* MODAL: COMPLIANCE VIEWER */}
//           {selectedUser && (
//             <div className="modal-overlay">
//               <div className="modal-content glass animate-in">
//                 <h2>Entity Verification: {selectedUser.name}</h2>
//                 <div className="compliance-grid">
//                   <div className="info-item">
//                     <label>GST Registration</label>
//                     <p>{selectedUser.gstNumber || "Not Provided"}</p>
//                   </div>
//                   <div className="info-item">
//                     <label>Registered Location</label>
//                     <p>{selectedUser.companyLocation?.address || "No address on file"}</p>
//                     {selectedUser.companyLocation?.coordinates && (
//                       <a 
//                         href={`https://www.google.com/maps?q=${selectedUser.companyLocation.coordinates.lat},${selectedUser.companyLocation.coordinates.lng}`} 
//                         target="_blank" rel="noreferrer" className="map-link"
//                       >
//                         📍 View Geolocation
//                       </a>
//                     )}
//                   </div>
//                   <div className="info-item full-width">
//                     <label>Legal Registration Papers</label>
//                     {selectedUser.registrationDoc ? (
//                       <div className="doc-box">
//                         <a href={selectedUser.registrationDoc} target="_blank" rel="noreferrer" className="doc-btn">
//                           📄 Open Registration PDF
//                         </a>
//                       </div>
//                     ) : (
//                       <p className="error-text">⚠️ No documents uploaded yet.</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button className="close-btn" onClick={() => setSelectedUser(null)}>Close</button>
//                   <button 
//                     className={selectedUser.isVerified ? "revoke-btn" : "verify-btn"} 
//                     onClick={() => handleToggleVerify(selectedUser._id)}
//                   >
//                     {selectedUser.isVerified ? "Revoke Verification" : "Verify Entity"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* VIEW: TRAININGS & PAYMENTS (Remains same as previous logic) */}
//           {view === "trainings" && (
//              <div className="training-grid">
//                {filteredTrainings.map(t => (
//                  <div key={t._id} className="training-card glass">
//                     <h4>{t.title}</h4>
//                     <p><strong>Company:</strong> {t.companyName}</p>
//                     <p><strong>Budget:</strong> ₹{t.price}</p>
//                     <span className={`status-tag ${t.status}`}>{t.status}</span>
//                  </div>
//                ))}
//              </div>
//           )}
          
//           {view === "payments" && (
//              <div className="table-container glass">
//                <table className="admin-table">
//                   <thead><tr><th>Project</th><th>Price</th><th>Status</th></tr></thead>
//                   <tbody>
//                     {trainings.map(t => (
//                       <tr key={t._id}><td>{t.title}</td><td>₹{t.price}</td><td>{t.paymentStatus}</td></tr>
//                     ))}
//                   </tbody>
//                </table>
//              </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [view, setView] = useState("stats");
//   const [users, setUsers] = useState([]);
//   const [trainings, setTrainings] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [stats, setStats] = useState({ totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//   const [loading, setLoading] = useState(true);
  
//   // Modal State for Company Verification
//   const [selectedUser, setSelectedUser] = useState(null);

//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {
//       setLoading(true);
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [sRes, uRes, tRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/admin/stats`, config),
//         axios.get(`${API_BASE_URL}/api/admin/users`, config),
//         axios.get(`${API_BASE_URL}/api/admin/trainings`, config),
//       ]);
//       setStats(sRes.data.stats || { totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//       setUsers(uRes.data.users || []);
//       setTrainings(tRes.data.trainings || []);
//     } catch (err) {
//       console.error("Error fetching admin data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleVerify = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       // This matches your adminController logic to flip the verification boolean
//       await axios.put(`${API_BASE_URL}/api/admin/verify/${id}`, {}, config);
//       setSelectedUser(null); 
//       fetchAdminData();
//     } catch (err) {
//       alert("Verification update failed.");
//     }
//   };

//   const handleToggleBlacklist = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       // This matches your adminController logic to flip between 'active' and 'blacklisted'
//       await axios.put(`${API_BASE_URL}/api/admin/blacklist/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert("Status update failed.");
//     }
//   };

//   const filteredTrainings = (trainings || []).filter((t) => {
//     if (filter === "ongoing") return ["approved", "ongoing", "pending"].includes(t.status);
//     if (filter === "completed") return t.status === "completed";
//     return true;
//   });

//   if (loading) return <div className="loader">Verifying Corporate Records...</div>;

//   return (
//     <div className="admin-container">
//       <aside className="admin-sidebar glass">
//         <h2 className="brand-logo">Trainistry <span>Admin</span></h2>
//         <nav>
//           <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>📊 Dashboard Stats</button>
//           <button className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👥 User Directory</button>
//           <button className={view === "trainings" ? "active" : ""} onClick={() => setView("trainings")}>📜 Projects & Requests</button>
//           <button className={view === "payments" ? "active" : ""} onClick={() => setView("payments")}>💰 Payment Monitor</button>
//         </nav>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-top-bar glass">
//           <h1>{view.toUpperCase()}</h1>
//           <div className="admin-profile"><span>System Administrator</span></div>
//         </header>

//         <section className="admin-content">
//           {/* VIEW: STATS */}
//           {view === "stats" && (
//             <div className="stats-grid">
//               <div className="stat-box glass"><h3>{stats.totalUsers}</h3><p>Total Registered</p></div>
//               <div className="stat-box glass"><h3>{stats.totalTrainers}</h3><p>Expert Trainers</p></div>
//               <div className="stat-box glass"><h3>{stats.totalCompanies}</h3><p>Active Companies</p></div>
//               <div className="stat-box glass highlight"><h3>₹{stats.platformVolume.toLocaleString()}</h3><p>Platform Volume</p></div>
//             </div>
//           )}

//           {/* VIEW: USERS */}
//           {view === "users" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>User / Entity</th>
//                     <th>Role</th>
//                     <th>Compliance Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.length > 0 ? users.map((u) => (
//                     <tr key={u._id}>
//                       <td><strong>{u.name}</strong><br/>{u.email}</td>
//                       <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
//                       <td>
//                         <span className={u.isVerified ? "verified-txt" : "pending-txt"}>
//                           {u.isVerified ? "✅ Verified" : "⏳ KYC Pending"}
//                         </span>
//                       </td>
//                       <td className="admin-actions-cell">
//                         <button className="action-btn info" onClick={() => setSelectedUser(u)}>
//                           👁️ View Docs
//                         </button>
//                         <button 
//                           className={`action-btn ${u.status === "active" ? "blk" : "verify-btn"}`} 
//                           onClick={() => handleToggleBlacklist(u._id)}
//                         >
//                           {u.status === "active" ? "Blacklist" : "Activate"}
//                         </button>
//                       </td>
//                     </tr>
//                   )) : <tr><td colSpan="4" className="no-data">No users found.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* MODAL: COMPLIANCE VIEWER */}
//           {selectedUser && (
//             <div className="modal-overlay">
//               <div className="modal-content glass animate-in">
//                 <h2>Entity Verification: {selectedUser.name}</h2>
//                 <div className="compliance-grid">
//                   <div className="info-item">
//                     <label>GST Registration</label>
//                     <p>{selectedUser.gstNumber || "Not Provided"}</p>
//                   </div>
//                   <div className="info-item">
//                     <label>Registered Location</label>
//                     <p>{selectedUser.location || "No address on file"}</p>
//                   </div>
//                   <div className="info-item full-width">
//                     <label>Legal Registration Papers</label>
//                     {selectedUser.registrationDoc ? (
//                       <div className="doc-box">
//                         <a 
//                           href={`${API_BASE_URL}${selectedUser.registrationDoc}`} 
//                           target="_blank" 
//                           rel="noreferrer" 
//                           className="doc-btn"
//                         >
//                           📄 Open Registration PDF
//                         </a>
//                       </div>
//                     ) : (
//                       <p className="error-text">⚠️ No documents uploaded yet.</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button className="close-btn" onClick={() => setSelectedUser(null)}>Close</button>
//                   <button 
//                     className={selectedUser.isVerified ? "revoke-btn" : "verify-btn"} 
//                     onClick={() => handleToggleVerify(selectedUser._id)}
//                   >
//                     {selectedUser.isVerified ? "Revoke Verification" : "Verify Entity"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* VIEW: TRAININGS */}
//           {view === "trainings" && (
//              <div className="table-container glass">
//                <div className="filter-bar">
//                  <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
//                  <button className={filter === "ongoing" ? "active" : ""} onClick={() => setFilter("ongoing")}>Ongoing</button>
//                  <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
//                </div>
//                <table className="admin-table">
//                   <thead>
//                     <tr>
//                       <th>Project Title</th>
//                       <th>Company</th>
//                       <th>Budget</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredTrainings.map(t => (
//                       <tr key={t._id}>
//                         <td>{t.title}</td>
//                         <td>{t.company?.name || "N/A"}</td>
//                         <td>₹{t.price}</td>
//                         <td><span className={`status-tag ${t.status}`}>{t.status}</span></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                </table>
//              </div>
//           )}
          
//           {/* VIEW: PAYMENTS */}
//           {view === "payments" && (
//              <div className="table-container glass">
//                <table className="admin-table">
//                   <thead>
//                     <tr>
//                       <th>Project</th>
//                       <th>Total Value</th>
//                       <th>Advance</th>
//                       <th>Payment Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {trainings.map(t => (
//                       <tr key={t._id}>
//                         <td>{t.title}</td>
//                         <td>₹{t.price}</td>
//                         <td>{t.advancePaymentStatus === 'paid' ? "✅ Received" : "❌ Pending"}</td>
//                         <td><span className={`status-tag ${t.paymentStatus}`}>{t.paymentStatus}</span></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                </table>
//              </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [view, setView] = useState("stats");
//   const [users, setUsers] = useState([]);
//   const [trainings, setTrainings] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [stats, setStats] = useState({ totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//   const [loading, setLoading] = useState(true);
  
//   const [selectedUser, setSelectedUser] = useState(null);

//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   // Clean local file paths for browser display
//   const getCleanUrl = (path) => {
//     if (!path) return null;
//     const cleanPath = path.replace(/\\/g, "/").replace(/^src[\\/]/, "");
//     return `${API_BASE_URL}/${cleanPath}`;
//   };

//   useEffect(() => {
//     fetchAdminData();
//   }, [view]);

//   const fetchAdminData = async () => {
//     try {
//       setLoading(true);
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [sRes, uRes, tRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/admin/stats`, config),
//         axios.get(`${API_BASE_URL}/api/admin/users`, config),
//         axios.get(`${API_BASE_URL}/api/admin/trainings`, config),
//       ]);
//       setStats(sRes.data.stats || { totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//       setUsers(uRes.data.users || []);
//       setTrainings(tRes.data.trainings || []);
//     } catch (err) {
//       console.error("Error fetching admin data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleVerify = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`${API_BASE_URL}/api/admin/verify/${id}`, {}, config);
//       setSelectedUser(null); 
//       fetchAdminData();
//     } catch (err) {
//       alert("Verification update failed.");
//     }
//   };

//   const handleToggleBlacklist = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`${API_BASE_URL}/api/admin/blacklist/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert("Status update failed.");
//     }
//   };

//   const filteredTrainings = (trainings || []).filter((t) => {
//     if (filter === "ongoing") return ["approved", "ongoing"].includes(t.status);
//     if (filter === "completed") return t.status === "completed";
//     return true;
//   });

//   if (loading) return <div className="loader">Initializing Admin Environment...</div>;

//   return (
//     <div className="admin-container">
//       <aside className="admin-sidebar glass">
//         <h2 className="brand-logo">Trainistry <span>Admin</span></h2>
//         <nav>
//           <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>📊 Dashboard Stats</button>
//           <button className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👥 User Directory</button>
//           <button className={view === "trainings" ? "active" : ""} onClick={() => setView("trainings")}>📜 Project Board</button>
//           <button className={view === "payments" ? "active" : ""} onClick={() => setView("payments")}>💰 Finance Monitor</button>
//         </nav>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-top-bar glass">
//           <h1>{view.toUpperCase()}</h1>
//           <div className="admin-profile"><span>System Administrator</span></div>
//         </header>

//         <section className="admin-content">
//           {/* VIEW: STATS */}
//           {view === "stats" && (
//             <div className="stats-grid">
//               <div className="stat-box glass"><h3>{stats.totalUsers}</h3><p>Total Registered</p></div>
//               <div className="stat-box glass"><h3>{stats.totalTrainers}</h3><p>Expert Trainers</p></div>
//               <div className="stat-box glass"><h3>{stats.totalCompanies}</h3><p>Active Companies</p></div>
//               <div className="stat-box glass highlight"><h3>₹{stats.platformVolume.toLocaleString()}</h3><p>Platform Volume</p></div>
//             </div>
//           )}

//           {/* VIEW: USERS */}
//           {view === "users" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>User / Entity</th>
//                     <th>Role</th>
//                     <th>Compliance</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u) => (
//                     <tr key={u._id}>
//                       <td><strong>{u.name}</strong><br/><small>{u.email}</small></td>
//                       <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
//                       <td>
//                         <span className={u.isVerified ? "status-tag completed" : "status-tag pending"}>
//                           {u.isVerified ? "Verified" : "KYC Pending"}
//                         </span>
//                       </td>
//                       <td className="admin-actions-cell">
//                         <button className="action-btn ver" onClick={() => setSelectedUser(u)}>👁️ Review</button>
//                         <button className="action-btn blk" onClick={() => handleToggleBlacklist(u._id)}>
//                           {u.status === "active" ? "Blacklist" : "Activate"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: TRAININGS */}
//           {view === "trainings" && (
//             <div className="table-container glass">
//               <div className="filter-bar">
//                 <button className={filter === "all" ? "f-active" : ""} onClick={() => setFilter("all")}>All Projects</button>
//                 <button className={filter === "ongoing" ? "f-active" : ""} onClick={() => setFilter("ongoing")}>Active</button>
//                 <button className={filter === "completed" ? "f-active" : ""} onClick={() => setFilter("completed")}>Finished</button>
//               </div>
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Project Title</th>
//                     <th>Entity</th>
//                     <th>Status</th>
//                     <th>Budget</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredTrainings.map((t) => (
//                     <tr key={t._id}>
//                       <td>{t.title}</td>
//                       <td>{t.company?.name || "N/A"}</td>
//                       <td><span className={`status-tag ${t.status}`}>{t.status}</span></td>
//                       <td>₹{t.price}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* KYC REVIEW MODAL */}
//           {selectedUser && (
//             <div className="modal-overlay">
//               <div className="modal-content glass" style={{ maxWidth: '500px', margin: '100px auto', padding: '30px' }}>
//                 <h2 style={{ marginBottom: '20px' }}>Compliance: {selectedUser.name}</h2>
//                 <div style={{ marginBottom: '15px' }}>
//                   <label style={{ display: 'block', color: 'var(--text-muted)' }}>Location:</label>
//                   <p>{selectedUser.location || "Not Provided"}</p>
//                 </div>
                
//                 <div style={{ marginBottom: '25px' }}>
//                   <label style={{ display: 'block', color: 'var(--text-muted)' }}>Legal Document:</label>
//                   {selectedUser.verificationDoc ? (
//                     <button 
//                       className="action-btn ver" 
//                       onClick={() => window.open(getCleanUrl(selectedUser.verificationDoc), "_blank")}
//                       style={{ marginTop: '10px', width: '100%' }}
//                     >
//                       📄 Open PDF / Image
//                     </button>
//                   ) : <p style={{ color: 'red' }}>No Document Uploaded</p>}
//                 </div>

//                 <div style={{ display: 'flex', gap: '10px' }}>
//                   <button className="action-btn blk" style={{ flex: 1 }} onClick={() => setSelectedUser(null)}>Cancel</button>
//                   <button 
//                     className="action-btn rev" 
//                     style={{ flex: 1, background: selectedUser.isVerified ? '#ef4444' : '#22c55e' }} 
//                     onClick={() => handleToggleVerify(selectedUser._id)}
//                   >
//                     {selectedUser.isVerified ? "Revoke Status" : "Verify User"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [view, setView] = useState("stats");
//   const [users, setUsers] = useState([]);
//   const [trainings, setTrainings] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [stats, setStats] = useState({ totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//   const [loading, setLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   const getCleanUrl = (path) => {
//     if (!path) return null;
//     const cleanPath = path.replace(/\\/g, "/").replace(/^src[\\/]/, "");
//     return `${API_BASE_URL}/${cleanPath}`;
//   };

//   useEffect(() => {
//     fetchAdminData();
//   }, [view]); // Refetch when switching views to keep data fresh

//   const fetchAdminData = async () => {
//     try {
//       setLoading(true);
//       const config = { headers: { Authorization: `Bearer ${token}` } };
      
//       const [sRes, uRes, tRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/admin/stats`, config),
//         axios.get(`${API_BASE_URL}/api/admin/users`, config),
//         axios.get(`${API_BASE_URL}/api/admin/trainings`, config),
//       ]);

//       // Robust check: matches the adminController logic we just updated
//       setStats(sRes.data.stats || { totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
//       setUsers(uRes.data.users || []);
//       setTrainings(tRes.data.trainings || []);
      
//     } catch (err) {
//       console.error("Dashboard Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleVerify = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`${API_BASE_URL}/api/admin/verify/${id}`, {}, config);
//       setSelectedUser(null); 
//       fetchAdminData();
//     } catch (err) {
//       alert("Verification update failed.");
//     }
//   };

//   const handleToggleBlacklist = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.put(`${API_BASE_URL}/api/admin/blacklist/${id}`, {}, config);
//       fetchAdminData();
//     } catch (err) {
//       alert("Status update failed.");
//     }
//   };

//   const filteredTrainings = (trainings || []).filter((t) => {
//     if (filter === "ongoing") return ["approved", "ongoing"].includes(t.status);
//     if (filter === "completed") return t.status === "completed";
//     return true;
//   });

//   if (loading) return (
//     <div className="loader-container">
//       <div className="loader"></div>
//       <p>Initializing Admin Environment...</p>
//     </div>
//   );

//   return (
//     <div className="admin-container">
//       {/* SIDEBAR */}
//       <aside className="admin-sidebar glass">
//         <h2 className="brand-logo">Trainistry <span>Admin</span></h2>
//         <nav>
//           <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>📊 Dashboard Stats</button>
//           <button className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👥 User Directory</button>
//           <button className={view === "trainings" ? "active" : ""} onClick={() => setView("trainings")}>📜 Project Board</button>
//           <button className={view === "payments" ? "active" : ""} onClick={() => setView("payments")}>💰 Payment Monitor</button>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="admin-main">
//         <header className="admin-top-bar glass">
//           <h1>{view.toUpperCase()}</h1>
//           <div className="admin-profile"><span>System Administrator</span></div>
//         </header>

//         <section className="admin-content">
//           {/* VIEW: STATS */}
//           {view === "stats" && (
//             <div className="stats-grid">
//               <div className="stat-box glass"><h3>{stats.totalUsers}</h3><p>Total Registered</p></div>
//               <div className="stat-box glass"><h3>{stats.totalTrainers}</h3><p>Expert Trainers</p></div>
//               <div className="stat-box glass"><h3>{stats.totalCompanies}</h3><p>Active Companies</p></div>
//               <div className="stat-box glass highlight"><h3>₹{stats.platformVolume.toLocaleString()}</h3><p>Platform Volume</p></div>
//             </div>
//           )}

//           {/* VIEW: USERS */}
//           {view === "users" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>User / Entity</th>
//                     <th>Role</th>
//                     <th>Compliance</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.length > 0 ? users.map((u) => (
//                     <tr key={u._id}>
//                       <td><strong>{u.name}</strong><br/><small>{u.email}</small></td>
//                       <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
//                       <td>
//                         <span className={u.isVerified ? "status-tag completed" : "status-tag pending"}>
//                           {u.isVerified ? "Verified" : "KYC Pending"}
//                         </span>
//                       </td>
//                       <td className="admin-actions-cell">
//                         <button className="action-btn ver" onClick={() => setSelectedUser(u)}>👁️ Review</button>
//                         <button className={`action-btn ${u.status === 'active' ? 'blk' : 'ver'}`} onClick={() => handleToggleBlacklist(u._id)}>
//                           {u.status === "active" ? "Blacklist" : "Activate"}
//                         </button>
//                       </td>
//                     </tr>
//                   )) : <tr><td colSpan="4" className="no-data">No users found.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: PAYMENTS (Previously Blank) */}
//           {view === "payments" && (
//             <div className="table-container glass">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Project</th>
//                     <th>Total Value</th>
//                     <th>Advance Status</th>
//                     <th>Payment Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {trainings.length > 0 ? trainings.map(t => (
//                     <tr key={t._id}>
//                       <td>{t.title}</td>
//                       <td>₹{t.price?.toLocaleString()}</td>
//                       <td>
//                          <span className={`pay-badge ${t.advancePaymentStatus === 'paid' ? 'paid' : 'pending'}`}>
//                            {t.advancePaymentStatus === 'paid' ? "Received" : "Unpaid"}
//                          </span>
//                       </td>
//                       <td><span className={`status-tag ${t.paymentStatus || 'pending'}`}>{t.paymentStatus || 'Awaiting'}</span></td>
//                     </tr>
//                   )) : <tr><td colSpan="4" className="no-data">No payment records found.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* VIEW: TRAININGS */}
//           {view === "trainings" && (
//              <div className="table-container glass">
//                 <div className="filter-bar">
//                     <button className={filter === "all" ? "f-active" : ""} onClick={() => setFilter("all")}>All</button>
//                     <button className={filter === "ongoing" ? "f-active" : ""} onClick={() => setFilter("ongoing")}>Ongoing</button>
//                     <button className={filter === "completed" ? "f-active" : ""} onClick={() => setFilter("completed")}>Completed</button>
//                 </div>
//                 <table className="admin-table">
//                     <thead>
//                         <tr><th>Title</th><th>Partner</th><th>Status</th><th>Value</th></tr>
//                     </thead>
//                     <tbody>
//                         {filteredTrainings.map(t => (
//                             <tr key={t._id}>
//                                 <td>{t.title}</td>
//                                 <td>{t.companyName}</td>
//                                 <td><span className={`status-tag ${t.status}`}>{t.status}</span></td>
//                                 <td>₹{t.price}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//              </div>
//           )}
//         </section>
//       </main>

//       {/* KYC REVIEW MODAL */}
//       {selectedUser && (
//         <div className="modal-overlay">
//           <div className="modal-content glass animate-in">
//             <h2>Compliance Review: {selectedUser.name}</h2>
//             <div className="compliance-grid">
//               <p><strong>Email:</strong> {selectedUser.email}</p>
//               <p><strong>Location:</strong> {selectedUser.location}</p>
//               <p><strong>Industry/Expertise:</strong> {selectedUser.industry || selectedUser.expertise?.join(', ')}</p>
//             </div>
            
//             <div className="document-box">
//               <label>Proof of Identity/Registration:</label>
//               {selectedUser.verificationDoc ? (
//                 <button className="action-btn ver full-w" onClick={() => window.open(getCleanUrl(selectedUser.verificationDoc), "_blank")}>
//                   📄 View Document (PDF/Image)
//                 </button>
//               ) : <p className="error-text">No document uploaded.</p>}
//             </div>

//             <div className="modal-footer">
//               <button className="action-btn blk" onClick={() => setSelectedUser(null)}>Cancel</button>
//               <button 
//                 className="action-btn rev" 
//                 style={{ background: selectedUser.isVerified ? '#ef4444' : '#22c55e' }} 
//                 onClick={() => handleToggleVerify(selectedUser._id)}
//               >
//                 {selectedUser.isVerified ? "Revoke Verification" : "Approve Verification"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [view, setView] = useState("stats");
  const [users, setUsers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({ totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:5000";

  const getCleanUrl = (path) => {
    if (!path) return null;
    const cleanPath = path.replace(/\\/g, "/").replace(/^src[\\/]/, "");
    return `${API_BASE_URL}/${cleanPath}`;
  };

  useEffect(() => {
    fetchAdminData();
  }, [view]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [sRes, uRes, tRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/stats`, config).catch(() => ({ data: {} })),
        axios.get(`${API_BASE_URL}/api/admin/users`, config).catch(() => ({ data: {} })),
        axios.get(`${API_BASE_URL}/api/admin/trainings`, config).catch(() => ({ data: {} })),
      ]);

      setStats(sRes.data.stats || { totalUsers: 0, totalTrainers: 0, totalCompanies: 0, platformVolume: 0 });
      setUsers(uRes.data.users || []);
      setTrainings(tRes.data.trainings || []);
      
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVerify = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`${API_BASE_URL}/api/admin/verify/${id}`, {}, config);
      setSelectedUser(null); 
      fetchAdminData();
    } catch (err) {
      alert("Verification update failed.");
    }
  };

  const handleToggleBlacklist = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`${API_BASE_URL}/api/admin/blacklist/${id}`, {}, config);
      fetchAdminData();
    } catch (err) {
      alert("Status update failed.");
    }
  };

  const filteredTrainings = (trainings || []).filter((t) => {
    if (filter === "ongoing") return ["approved", "ongoing", "assigned"].includes(t.status);
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Initializing Admin Environment...</p>
    </div>
  );

  return (
    <div className="admin-container">
      <aside className="admin-sidebar glass">
        <h2 className="brand-logo">Trainistry <span>Admin</span></h2>
        <nav>
          <button className={view === "stats" ? "active" : ""} onClick={() => setView("stats")}>📊 Dashboard Stats</button>
          <button className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👥 User Directory</button>
          <button className={view === "trainings" ? "active" : ""} onClick={() => setView("trainings")}>📜 Project Board</button>
          <button className={view === "payments" ? "active" : ""} onClick={() => setView("payments")}>💰 Payment Monitor</button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-top-bar glass">
          <h1>{view.toUpperCase()}</h1>
          <div className="admin-profile"><span>System Administrator</span></div>
        </header>

        <section className="admin-content">
          {view === "stats" && (
            <div className="stats-grid">
              <div className="stat-box glass"><h3>{stats.totalUsers}</h3><p>Total Registered</p></div>
              <div className="stat-box glass"><h3>{stats.totalTrainers}</h3><p>Expert Trainers</p></div>
              <div className="stat-box glass"><h3>{stats.totalCompanies}</h3><p>Active Companies</p></div>
              <div className="stat-box glass highlight"><h3>₹{(stats.platformVolume || 0).toLocaleString()}</h3><p>Platform Volume</p></div>
            </div>
          )}

          {view === "users" && (
            <div className="table-container glass">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User / Entity</th>
                    <th>Role</th>
                    <th>Compliance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? users.map((u) => (
                    <tr key={u._id}>
                      <td><strong>{u.name}</strong><br/><small>{u.email}</small></td>
                      <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                      <td>
                        <span className={u.isVerified ? "status-tag completed" : "status-tag pending"}>
                          {u.isVerified ? "Verified" : "KYC Pending"}
                        </span>
                      </td>
                      <td className="admin-actions-cell">
                        <button className="action-btn ver" onClick={() => setSelectedUser(u)}>👁️ Review</button>
                        <button className={`action-btn ${u.status === 'active' ? 'blk' : 'ver'}`} onClick={() => handleToggleBlacklist(u._id)}>
                          {u.status === "active" ? "Blacklist" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="4" className="no-data">No users found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {/* FIX: PAYMENT MONITOR VIEW */}
          {view === "payments" && (
            <div className="table-container glass">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Total Value</th>
                    <th>Advance</th>
                    <th>Full Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.length > 0 ? trainings.map(t => (
                    <tr key={t._id}>
                      <td><strong>{t.title}</strong><br/><small>{t.companyName || 'N/A'}</small></td>
                      <td>₹{(t.price || t.budget || 0).toLocaleString()}</td>
                      <td>
                         <span className={`pay-badge ${t.advanceStatus === 'paid' ? 'paid' : 'pending'}`}>
                           {t.advanceStatus === 'paid' ? "Received" : "Pending"}
                         </span>
                      </td>
                      <td>
                        <span className={`status-tag ${t.paymentStatus || 'pending'}`}>
                          {t.paymentStatus || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="4" className="no-data">No payment records found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {view === "trainings" && (
             <div className="table-container glass">
                <div className="filter-bar">
                    <button className={filter === "all" ? "f-active" : ""} onClick={() => setFilter("all")}>All</button>
                    <button className={filter === "ongoing" ? "f-active" : ""} onClick={() => setFilter("ongoing")}>Ongoing</button>
                    <button className={filter === "completed" ? "f-active" : ""} onClick={() => setFilter("completed")}>Completed</button>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr><th>Title</th><th>Partner</th><th>Status</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        {filteredTrainings.length > 0 ? filteredTrainings.map(t => (
                            <tr key={t._id}>
                                <td>{t.title}</td>
                                <td>{t.companyName || 'N/A'}</td>
                                <td><span className={`status-tag ${t.status}`}>{t.status}</span></td>
                                <td>₹{(t.price || t.budget || 0).toLocaleString()}</td>
                            </tr>
                        )) : <tr><td colSpan="4" className="no-data">No projects found.</td></tr>}
                    </tbody>
                </table>
             </div>
          )}
        </section>
      </main>

      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content glass animate-in">
            <h2>Compliance Review: {selectedUser.name}</h2>
            <div className="compliance-grid">
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Location:</strong> {selectedUser.location || "Not Provided"}</p>
              <p><strong>Expertise:</strong> {selectedUser.industry || selectedUser.expertise?.join(', ') || "N/A"}</p>
            </div>
            
            <div className="document-box info-item">
              <label><strong>Industrial Identity Proof:</strong></label>
              <div style={{ marginTop: '10px' }}>
                {selectedUser.registrationDoc || selectedUser.verificationDoc ? (
                    <a 
                      href={getCleanUrl(selectedUser.registrationDoc || selectedUser.verificationDoc)} 
                      target="_blank" 
                      rel="noreferrer"
                      className="action-btn ver full-w"
                      style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                    >
                      📄 View Uploaded Document
                    </a>
                ) : (
                    <span className="text-danger" style={{ color: '#ef4444', fontWeight: 'bold' }}>
                      ⚠️ No document uploaded.
                    </span>
                )}
              </div>
            </div>

            <div className="modal-footer" style={{ marginTop: '20px' }}>
              <button className="action-btn blk" onClick={() => setSelectedUser(null)}>Cancel</button>
              <button 
                className="action-btn rev" 
                style={{ background: selectedUser.isVerified ? '#ef4444' : '#22c55e', marginLeft: '10px' }} 
                onClick={() => handleToggleVerify(selectedUser._id)}
              >
                {selectedUser.isVerified ? "Revoke Verification" : "Approve Verification"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;