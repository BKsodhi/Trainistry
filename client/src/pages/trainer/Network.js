// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; // Reusing your main dashboard CSS
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [newPost, setNewPost] = useState({
//     title: "",
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//     location: ""
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const fetchAchievements = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/achievements");
//       setAchievements(res.data.data);
//     } catch (err) {
//       console.error("Error fetching network feed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchAchievements();
//   }, [token, navigate]);

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/achievements", newPost, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setShowPostModal(false);
//       setNewPost({ title: "", description: "", category: "Project Completion", companyName: "", location: "" });
//       fetchAchievements();
//     } catch (err) {
//       alert("Failed to post achievement");
//     }
//   };

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <div>
//             <h1>Professional Network</h1>
//             <p style={{color: 'rgba(255,255,255,0.7)'}}>Connect with other trainers and share milestones.</p>
//           </div>
//           <button className="apply-btn" style={{width: 'auto'}} onClick={() => setShowPostModal(true)}>+ Share Achievement</button>
//         </header>

//         <div className="feed-layout" style={{marginTop: '20px'}}>
//           {loading ? (
//             <div className="loader">Loading Feed...</div>
//           ) : achievements.length > 0 ? (
//             achievements.map((post) => (
//               <div key={post._id} className="stat-card glass achievement-card">
//                 <div className="card-top">
//                   <div className="profile-avatar-circle" style={{width: '40px', height: '40px', fontSize: '14px'}}>
//                     {post.trainer?.name?.charAt(0)}
//                   </div>
//                   <div className="post-meta">
//                     <h4 style={{margin: 0}}>{post.trainer?.name}</h4>
//                     <span className="skill-badge" style={{fontSize: '10px'}}>{post.category}</span>
//                   </div>
//                 </div>
//                 <div className="card-body" style={{marginTop: '15px'}}>
//                   <h3 style={{fontSize: '18px', color: '#6366f1'}}>{post.title}</h3>
//                   <p style={{fontSize: '14px', lineHeight: '1.6'}}>{post.description}</p>
//                   <div className="post-details" style={{display: 'flex', gap: '15px', marginTop: '10px', fontSize: '12px', opacity: 0.8}}>
//                     {post.companyName && <span>🏢 {post.companyName}</span>}
//                     {post.location && <span>📍 {post.location}</span>}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="glass" style={{padding: '40px', textAlign: 'center', borderRadius: '12px'}}>
//               <p>No achievements shared yet. Be the first!</p>
//             </div>
//           )}
//         </div>
//       </main>

//       {showPostModal && (
//         <div className="modal-overlay">
//           <div className="modal-content glass">
//             <h3>Share Milestone</h3>
//             <form onSubmit={handlePostSubmit}>
//               <div className="form-group">
//                 <label>Achievement Title</label>
//                 <input type="text" required placeholder="e.g. Completed Advanced Java Workshop" 
//                   onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
//               </div>
//               <div className="form-group">
//                 <label>Category</label>
//                 <select onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option>
//                   <option>Certification</option>
//                   <option>Workshop</option>
//                   <option>Award</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea rows="3" required placeholder="Tell the network about it..."
//                   onChange={(e) => setNewPost({...newPost, description: e.target.value})} />
//               </div>
//               <div className="modal-actions">
//                 <button type="button" className="logout-btn" style={{marginTop: 0}} onClick={() => setShowPostModal(false)}>Cancel</button>
//                 <button type="submit" className="apply-btn">Post to Feed</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Network;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/TrainerDashboard.css"; 
import "../../styles/Network.css";

function Network() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [newPost, setNewPost] = useState({
    description: "",
    category: "Project Completion",
    companyName: "",
    location: ""
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const fetchAchievements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/achievements");
      setAchievements(res.data.data);
    } catch (err) {
      console.error("Error fetching network feed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(payload);
    } catch (e) {
      console.error("Auth error", e);
    }
    fetchAchievements();
  }, [token, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    // IMPORTANT: If your backend doesn't have Multer yet, 
    // using FormData will cause the "Failed to post" error.
    const formData = new FormData();
    formData.append("description", newPost.description);
    formData.append("category", newPost.category);
    formData.append("companyName", newPost.companyName);
    if (selectedFile) formData.append("postImage", selectedFile);

    try {
      await axios.post("http://localhost:5000/api/achievements", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      });
      setShowPostModal(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setNewPost({ description: "", category: "Project Completion", companyName: "" });
      fetchAchievements();
    } catch (err) {
      alert("Backend Connection Error: Make sure your server is running and Multer is configured.");
    }
  };

  return (
    <div className="trainistry-network-container">
      <aside className="sidebar">
        <div className="logo">Trainistry</div>
        <nav className="nav-menu">
          <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
          <button className="sidebar-btn active">Network Feed</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
        </nav>
        <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
      </aside>

      <main className="network-content">
        <div className="feed-header">
          <h2>Professional Network</h2>
          <p>Showcase your milestones to the industry</p>
        </div>

        {/* Start Post Trigger */}
        <div className="post-trigger-box">
          <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
          <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
        </div>

        <div className="main-feed">
          {loading ? (
            <div className="network-loader">Loading milestones...</div>
          ) : achievements.map((post) => (
            <div key={post._id} className="pro-post-card">
              <div className="post-header">
                <div className="author-img-circle">{post.trainer?.name?.charAt(0)}</div>
                <div className="author-details">
                  <div className="author-name-row">
                    <strong>{post.trainer?.name}</strong>
                    {post.trainer?._id !== currentUser?.id && <span className="connect-blue">• Connect</span>}
                  </div>
                  <span className="post-meta-sub">{post.category} at {post.companyName || "Chitkara University"}</span>
                </div>
              </div>

              <div className="post-text">
                <p>{post.description}</p>
              </div>

              {post.imageUrl && (
                <div className="post-media">
                  {/* <img src={`http://localhost:5000/${post.imageUrl}`} alt="Achievement" /> */}
                  <img src={`http://localhost:5000/${post.imageUrl}`} alt="Achievement" />
                </div>
              )}

              <div className="post-interact">
                <button className="interact-btn">👍 Like</button>
                <button className="interact-btn">💬 Comment</button>
                <button className="interact-btn">🔄 Repost</button>
                <button className="interact-btn">✈️ Send</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modern Modal */}
      {showPostModal && (
        <div className="modern-modal-overlay">
          <div className="modern-modal">
            <div className="modal-head">
              <h3>Share Achievement</h3>
              <button className="close-x" onClick={() => setShowPostModal(false)}>&times;</button>
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="modal-body">
                <select className="modal-select" onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
                  <option>Project Completion</option>
                  <option>Certification</option>
                  <option>Workshop</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Company/University name" 
                  className="modal-input"
                  onChange={(e) => setNewPost({...newPost, companyName: e.target.value})}
                />
                <textarea 
                  placeholder="Describe your milestone..." 
                  className="modal-textarea"
                  onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                  required
                />

                {previewUrl && (
                  <div className="modal-preview">
                    <img src={previewUrl} alt="Preview" />
                    <button type="button" onClick={() => {setSelectedFile(null); setPreviewUrl(null);}}>Remove</button>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="photo-add-btn" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
                <button type="submit" className="post-submit-btn">Post to Network</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Network;