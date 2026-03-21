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

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
  
//   const [newPost, setNewPost] = useState({
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//     location: ""
//   });

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
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
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUser(payload);
//     } catch (e) {
//       console.error("Auth error", e);
//     }
//     fetchAchievements();
//   }, [token, navigate]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
    
//     // IMPORTANT: If your backend doesn't have Multer yet, 
//     // using FormData will cause the "Failed to post" error.
//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     formData.append("category", newPost.category);
//     formData.append("companyName", newPost.companyName);
//     if (selectedFile) formData.append("postImage", selectedFile);

//     try {
//       await axios.post("http://localhost:5000/api/achievements", formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data" 
//         }
//       });
//       setShowPostModal(false);
//       setSelectedFile(null);
//       setPreviewUrl(null);
//       setNewPost({ description: "", category: "Project Completion", companyName: "" });
//       fetchAchievements();
//     } catch (err) {
//       alert("Backend Connection Error: Make sure your server is running and Multer is configured.");
//     }
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         <div className="feed-header">
//           <h2>Professional Network</h2>
//           <p>Showcase your milestones to the industry</p>
//         </div>

//         {/* Start Post Trigger */}
//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? (
//             <div className="network-loader">Loading milestones...</div>
//           ) : achievements.map((post) => (
//             <div key={post._id} className="pro-post-card">
//               <div className="post-header">
//                 <div className="author-img-circle">{post.trainer?.name?.charAt(0)}</div>
//                 <div className="author-details">
//                   <div className="author-name-row">
//                     <strong>{post.trainer?.name}</strong>
//                     {post.trainer?._id !== currentUser?.id && <span className="connect-blue">• Connect</span>}
//                   </div>
//                   <span className="post-meta-sub">{post.category} at {post.companyName || "Chitkara University"}</span>
//                 </div>
//               </div>

//               <div className="post-text">
//                 <p>{post.description}</p>
//               </div>

//               {post.imageUrl && (
//                 <div className="post-media">
//                   {/* <img src={`http://localhost:5000/${post.imageUrl}`} alt="Achievement" /> */}
//                   <img src={`http://localhost:5000/${post.imageUrl}`} alt="Achievement" />
//                 </div>
//               )}

//               <div className="post-interact">
//                 <button className="interact-btn">👍 Like</button>
//                 <button className="interact-btn">💬 Comment</button>
//                 <button className="interact-btn">🔄 Repost</button>
//                 <button className="interact-btn">✈️ Send</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Modern Modal */}
//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head">
//               <h3>Share Achievement</h3>
//               <button className="close-x" onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option>
//                   <option>Certification</option>
//                   <option>Workshop</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Company/University name" 
//                   className="modal-input"
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})}
//                 />
//                 <textarea 
//                   placeholder="Describe your milestone..." 
//                   className="modal-textarea"
//                   onChange={(e) => setNewPost({...newPost, description: e.target.value})}
//                   required
//                 />

//                 {previewUrl && (
//                   <div className="modal-preview">
//                     <img src={previewUrl} alt="Preview" />
//                     <button type="button" onClick={() => {setSelectedFile(null); setPreviewUrl(null);}}>Remove</button>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="photo-add-btn" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
//                 <button type="submit" className="post-submit-btn">Post to Network</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Network;


// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
  
//   const [newPost, setNewPost] = useState({
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//     location: ""
//   });

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem("token");

//   const fetchAchievements = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/achievements");
//       setAchievements(res.data.data);
//     } catch (err) { console.error(err); } finally { setLoading(false); }
//   };

//   useEffect(() => {
//     if (!token) { navigate("/login"); return; }
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUser(payload);
//     } catch (e) { console.error(e); }
//     fetchAchievements();
//   }, [token, navigate]);

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/achievements/${id}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, likes: res.data.likes } : a));
//     } catch (err) { console.error(err); }
//   };

//   const handleCommentSubmit = async (id) => {
//     if (!commentText.trim()) return;
//     try {
//       const res = await axios.post(`http://localhost:5000/api/achievements/${id}/comment`, { text: commentText }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, comments: res.data.data } : a));
//       setCommentText("");
//     } catch (err) { console.error(err); }
//   };

//   const handleRepost = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/api/achievements/${id}/repost`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchAchievements();
//       alert("Post Shared to your feed!");
//     } catch (err) { console.error(err); }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     formData.append("category", newPost.category);
//     formData.append("companyName", newPost.companyName);
//     if (selectedFile) formData.append("postImage", selectedFile);

//     try {
//       await axios.post("http://localhost:5000/api/achievements", formData, {
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
//       });
//       setShowPostModal(false);
//       setSelectedFile(null); setPreviewUrl(null);
//       setNewPost({ description: "", category: "Project Completion", companyName: "" });
//       fetchAchievements();
//     } catch (err) { alert("Error posting milestone"); }
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn">Applications</button>
//           <button className="sidebar-btn">My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? <div className="network-loader">Loading...</div> : achievements.map((post) => (
//             <div key={post._id} className="pro-post-card">
//               <div className="post-header">
//                 <div className="author-img-circle">{post.trainer?.name?.charAt(0)}</div>
//                 <div className="author-details">
//                   <strong>{post.trainer?.name}</strong>
//                   <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                 </div>
//               </div>
//               <div className="post-text"><p>{post.description}</p></div>
//               {post.imageUrl && <div className="post-media"><img src={`http://localhost:5000/${post.imageUrl}`} alt="Post" /></div>}
              
//               <div className="post-stats">
//                 <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//               </div>

//               <div className="post-interact">
//                 <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                   {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                 </button>
//                 <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                 <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                 <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(`Check out this post: ${post.description}`); alert("Link Copied!"); }}>✈️ Send</button>
//               </div>

//               {activeCommentId === post._id && (
//                 <div className="comment-box">
//                   <div className="comment-input">
//                     <input type="text" placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
//                     <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                   </div>
//                   {post.comments.map((c, i) => (
//                     <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>

//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head"><h3>Share Achievement</h3><button onClick={() => setShowPostModal(false)}>&times;</button></div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option><option>Certification</option><option>Workshop</option>
//                 </select>
//                 <input type="text" placeholder="Company/University name" className="modal-input" onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} />
//                 <textarea placeholder="Describe your milestone..." className="modal-textarea" onChange={(e) => setNewPost({...newPost, description: e.target.value})} required />
//                 {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => { setSelectedFile(e.target.files[0]); setPreviewUrl(URL.createObjectURL(e.target.files[0])); }} />
//                 <button type="submit" className="post-submit-btn">Post to Network</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Network;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
  
//   const [newPost, setNewPost] = useState({
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//     location: ""
//   });

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem("token");

//   const fetchAchievements = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/achievements");
//       setAchievements(res.data.data);
//     } catch (err) { console.error(err); } finally { setLoading(false); }
//   };

//   useEffect(() => {
//     if (!token) { navigate("/login"); return; }
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUser(payload);
//     } catch (e) { console.error(e); }
//     fetchAchievements();
//   }, [token, navigate]);

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/achievements/${id}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, likes: res.data.likes } : a));
//     } catch (err) { console.error(err); }
//   };

//   const handleCommentSubmit = async (id) => {
//     if (!commentText.trim()) return;
//     try {
//       const res = await axios.post(`http://localhost:5000/api/achievements/${id}/comment`, { text: commentText }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, comments: res.data.data } : a));
//       setCommentText("");
//     } catch (err) { console.error(err); }
//   };

//   const handleRepost = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/api/achievements/${id}/repost`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchAchievements();
//       alert("Post Shared to your feed!");
//     } catch (err) { console.error(err); }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     formData.append("category", newPost.category);
//     formData.append("companyName", newPost.companyName);
//     if (selectedFile) formData.append("postImage", selectedFile);

//     try {
//       await axios.post("http://localhost:5000/api/achievements", formData, {
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
//       });
//       setShowPostModal(false);
//       setSelectedFile(null); setPreviewUrl(null);
//       setNewPost({ description: "", category: "Project Completion", companyName: "" });
//       fetchAchievements();
//     } catch (err) { alert("Error posting milestone"); }
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? <div className="network-loader">Loading...</div> : achievements.map((post) => (
//             <div key={post._id} className="pro-post-card">
//               <div className="post-header">
//                 <div className="author-img-circle">{post.trainer?.name?.charAt(0)}</div>
//                 <div className="author-details">
//                   <strong>{post.trainer?.name}</strong>
//                   <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                 </div>
//               </div>
//               <div className="post-text"><p>{post.description}</p></div>
//               {post.imageUrl && <div className="post-media"><img src={`http://localhost:5000/${post.imageUrl}`} alt="Post" /></div>}
              
//               <div className="post-stats">
//                 <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//               </div>

//               <div className="post-interact">
//                 <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                   {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                 </button>
//                 <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                 <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                 <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(`Check out this post: ${post.description}`); alert("Link Copied!"); }}>✈️ Send</button>
//               </div>

//               {activeCommentId === post._id && (
//                 <div className="comment-box">
//                   <div className="comment-input">
//                     <input type="text" placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
//                     <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                   </div>
//                   {post.comments.map((c, i) => (
//                     <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>

//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head"><h3>Share Achievement</h3><button onClick={() => setShowPostModal(false)}>&times;</button></div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option><option>Certification</option><option>Workshop</option>
//                 </select>
//                 <input type="text" placeholder="Company/University name" className="modal-input" onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} />
//                 <textarea placeholder="Describe your milestone..." className="modal-textarea" onChange={(e) => setNewPost({...newPost, description: e.target.value})} required />
//                 {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => { setSelectedFile(e.target.files[0]); setPreviewUrl(URL.createObjectURL(e.target.files[0])); }} />
//                 <button type="submit" className="post-submit-btn">Post to Network</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Network;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [followingList, setFollowingList] = useState([]); 
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
  
//   const [newPost, setNewPost] = useState({
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//   });

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   const fetchData = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [postRes, userRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/achievements`),
//         axios.get(`${API_BASE_URL}/api/trainer/me`, config)
//       ]);
      
//       setAchievements(postRes.data.data || []);
//       // Silently handle if following list is missing from user object
//       setFollowingList(userRes.data?.data?.user?.following || []);
//     } catch (err) { 
//       console.error("Error fetching network data", err); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (!token) { 
//       navigate("/login"); 
//       return; 
//     }
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUser(payload);
//     } catch (e) { 
//       console.error("Token decoding failed", e); 
//     }
//     fetchData();
//   }, [token, navigate]);

//   const handleFollow = async (targetUserId) => {
//     if (!targetUserId) return alert("User ID not found.");
    
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/trainer/follow/${targetUserId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (res.data.isFollowing) {
//         setFollowingList(prev => [...prev, targetUserId]);
//       } else {
//         setFollowingList(prev => prev.filter(id => id !== targetUserId));
//       }
//       alert(res.data.message);
//     } catch (err) {
//       console.error(err);
//       alert("Could not update connection.");
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/achievements/${id}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, likes: res.data.likes } : a));
//     } catch (err) { console.error(err); }
//   };

//   const handleCommentSubmit = async (id) => {
//     if (!commentText.trim()) return;
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/achievements/${id}/comment`, { text: commentText }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, comments: res.data.data } : a));
//       setCommentText("");
//     } catch (err) { console.error(err); }
//   };

//   const handleRepost = async (id) => {
//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements/${id}/repost`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchData();
//       alert("Post Shared to your feed!");
//     } catch (err) { console.error(err); }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     formData.append("category", newPost.category);
//     formData.append("companyName", newPost.companyName);
//     if (selectedFile) formData.append("postImage", selectedFile);

//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements`, formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`, 
//           "Content-Type": "multipart/form-data" 
//         }
//       });
//       setShowPostModal(false);
//       setSelectedFile(null); 
//       setPreviewUrl(null);
//       setNewPost({ description: "", category: "Project Completion", companyName: "" });
//       fetchData();
//     } catch (err) { 
//       alert("Error posting milestone. Check if backend is handling multipart/form-data."); 
//     }
//   };

//   // Helper to fix Windows-style backslashes in image paths
//   const getImageUrl = (path) => {
//     if (!path) return null;
//     return `${API_BASE_URL}/${path.replace(/\\/g, "/")}`;
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? (
//             <div className="network-loader">Loading...</div>
//           ) : achievements.length === 0 ? (
//             <div className="no-posts">No posts yet. Start the conversation!</div>
//           ) : achievements.map((post) => (
//             <div key={post._id} className="pro-post-card">
//               <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <div className="author-img-circle">{post.trainer?.name?.charAt(0) || "U"}</div>
//                   <div className="author-details">
//                     <strong>{post.trainer?.name || "Unknown Trainer"}</strong>
//                     <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                   </div>
//                 </div>

//                 {/* Connection Button Logic */}
//                 {post.trainer?.user && post.trainer.user !== currentUser?.id && (
//                   <button 
//                     className={`follow-btn-small ${followingList.includes(post.trainer.user) ? 'following' : ''}`}
//                     onClick={() => handleFollow(post.trainer.user)}
//                     style={{
//                       padding: '6px 14px',
//                       borderRadius: '20px',
//                       border: '1px solid #3b82f6',
//                       background: followingList.includes(post.trainer.user) ? '#3b82f6' : 'transparent',
//                       color: followingList.includes(post.trainer.user) ? 'white' : '#3b82f6',
//                       cursor: 'pointer',
//                       fontSize: '12px',
//                       fontWeight: '600',
//                       transition: 'all 0.2s'
//                     }}
//                   >
//                     {followingList.includes(post.trainer.user) ? '✓ Connected' : '+ Connect'}
//                   </button>
//                 )}
//               </div>

//               <div className="post-text"><p>{post.description}</p></div>
              
//               {/* FIXED IMAGE RENDERING */}
//               {post.imageUrl && (
//                 <div className="post-media">
//                   <img src={getImageUrl(post.imageUrl)} alt="Post Milestone" />
//                 </div>
//               )}
              
//               <div className="post-stats">
//                 <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//               </div>

//               <div className="post-interact">
//                 <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                   {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                 </button>
//                 <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                 <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                 <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>✈️ Copy</button>
//               </div>

//               {activeCommentId === post._id && (
//                 <div className="comment-box">
//                   <div className="comment-input">
//                     <input 
//                       type="text" 
//                       placeholder="Write a comment..." 
//                       value={commentText} 
//                       onChange={(e) => setCommentText(e.target.value)} 
//                     />
//                     <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                   </div>
//                   {post.comments?.map((c, i) => (
//                     <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Post Modal */}
//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head">
//               <h3>Share Achievement</h3>
//               <button onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option>
//                   <option>Certification</option>
//                   <option>Workshop</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Company/University name" 
//                   className="modal-input" 
//                   value={newPost.companyName}
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
//                 />
//                 <textarea 
//                   placeholder="Describe your milestone..." 
//                   className="modal-textarea" 
//                   value={newPost.description}
//                   onChange={(e) => setNewPost({...newPost, description: e.target.value})} 
//                   required 
//                 />
//                 {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input 
//                   type="file" 
//                   ref={fileInputRef} 
//                   hidden 
//                   accept="image/*" 
//                   onChange={(e) => { 
//                     const file = e.target.files[0];
//                     if (file) {
//                       setSelectedFile(file); 
//                       setPreviewUrl(URL.createObjectURL(file));
//                     }
//                   }} 
//                 />
//                 <button type="submit" className="post-submit-btn">Post to Network</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Network;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [followingList, setFollowingList] = useState([]); 
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
  
//   const [newPost, setNewPost] = useState({
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//   });

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   // HELPER: Defined once here to fix Windows backslashes and base URL
//   const getImageUrl = (path) => {
//     if (!path) return null;
//     return `${API_BASE_URL}/${path.replace(/\\/g, "/")}`;
//   };

//   const fetchData = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [postRes, userRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/achievements`),
//         axios.get(`${API_BASE_URL}/api/trainer/me`, config)
//       ]);
      
//       setAchievements(postRes.data.data || []);
//       setFollowingList(userRes.data?.data?.user?.following || []);
//     } catch (err) { 
//       console.error("Error fetching network data", err); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (!token) { 
//       navigate("/login"); 
//       return; 
//     }
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUser(payload);
//     } catch (e) { 
//       console.error("Token decoding failed", e); 
//     }
//     fetchData();
//   }, [token, navigate]);

//   const handleFollow = async (targetUserId) => {
//     if (!targetUserId) return alert("User ID not found.");
    
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/trainer/follow/${targetUserId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (res.data.isFollowing) {
//         setFollowingList(prev => [...prev, targetUserId]);
//       } else {
//         setFollowingList(prev => prev.filter(id => id !== targetUserId));
//       }
//       alert(res.data.message);
//     } catch (err) {
//       console.error(err);
//       alert("Could not update connection.");
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/achievements/${id}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, likes: res.data.likes } : a));
//     } catch (err) { console.error(err); }
//   };

//   const handleCommentSubmit = async (id) => {
//     if (!commentText.trim()) return;
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/achievements/${id}/comment`, { text: commentText }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, comments: res.data.data } : a));
//       setCommentText("");
//     } catch (err) { console.error(err); }
//   };

//   const handleRepost = async (id) => {
//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements/${id}/repost`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchData();
//       alert("Post Shared to your feed!");
//     } catch (err) { console.error(err); }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     formData.append("category", newPost.category);
//     formData.append("companyName", newPost.companyName);
//     if (selectedFile) formData.append("postImage", selectedFile);

//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements`, formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`, 
//           "Content-Type": "multipart/form-data" 
//         }
//       });
//       setShowPostModal(false);
//       setSelectedFile(null); 
//       setPreviewUrl(null);
//       setNewPost({ description: "", category: "Project Completion", companyName: "" });
//       fetchData();
//     } catch (err) { 
//       alert("Error posting milestone. Check if backend is handling multipart/form-data."); 
//     }
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? (
//             <div className="network-loader">Loading...</div>
//           ) : achievements.length === 0 ? (
//             <div className="no-posts">No posts yet. Start the conversation!</div>
//           ) : achievements.map((post) => (
//             <div key={post._id} className="pro-post-card">
//               <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <div className="author-img-circle">{post.trainer?.name?.charAt(0) || "U"}</div>
//                   <div className="author-details">
//                     <strong>{post.trainer?.name || "Unknown Trainer"}</strong>
//                     <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                   </div>
//                 </div>

//                 {post.trainer?.user && post.trainer.user !== currentUser?.id && (
//                   <button 
//                     className={`follow-btn-small ${followingList.includes(post.trainer.user) ? 'following' : ''}`}
//                     onClick={() => handleFollow(post.trainer.user)}
//                     style={{
//                       padding: '6px 14px',
//                       borderRadius: '20px',
//                       border: '1px solid #3b82f6',
//                       background: followingList.includes(post.trainer.user) ? '#3b82f6' : 'transparent',
//                       color: followingList.includes(post.trainer.user) ? 'white' : '#3b82f6',
//                       cursor: 'pointer',
//                       fontSize: '12px',
//                       fontWeight: '600',
//                       transition: 'all 0.2s'
//                     }}
//                   >
//                     {followingList.includes(post.trainer.user) ? '✓ Connected' : '+ Connect'}
//                   </button>
//                 )}
//               </div>

//               <div className="post-text"><p>{post.description}</p></div>
              
//               {post.imageUrl && (
//                 <div className="post-media">
//                   <img src={getImageUrl(post.imageUrl)} alt="Post Milestone" />
//                 </div>
//               )}
              
//               <div className="post-stats">
//                 <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//               </div>

//               <div className="post-interact">
//                 <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                   {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                 </button>
//                 <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                 <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                 <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>✈️ Copy</button>
//               </div>

//               {activeCommentId === post._id && (
//                 <div className="comment-box">
//                   <div className="comment-input">
//                     <input 
//                       type="text" 
//                       placeholder="Write a comment..." 
//                       value={commentText} 
//                       onChange={(e) => setCommentText(e.target.value)} 
//                     />
//                     <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                   </div>
//                   {post.comments?.map((c, i) => (
//                     <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>

//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head">
//               <h3>Share Achievement</h3>
//               <button onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option>
//                   <option>Certification</option>
//                   <option>Workshop</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Company/University name" 
//                   className="modal-input" 
//                   value={newPost.companyName}
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
//                 />
//                 <textarea 
//                   placeholder="Describe your milestone..." 
//                   className="modal-textarea" 
//                   value={newPost.description}
//                   onChange={(e) => setNewPost({...newPost, description: e.target.value})} 
//                   required 
//                 />
//                 {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input 
//                   type="file" 
//                   ref={fileInputRef} 
//                   hidden 
//                   accept="image/*" 
//                   onChange={(e) => { 
//                     const file = e.target.files[0];
//                     if (file) {
//                       setSelectedFile(file); 
//                       setPreviewUrl(URL.createObjectURL(file));
//                     }
//                   }} 
//                 />
//                 <button type="submit" className="post-submit-btn">Post to Network</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Network;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [followingList, setFollowingList] = useState([]); 
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
  
//   const [newPost, setNewPost] = useState({
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//   });

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   // Clean the image path and resolve against the Base URL
//   const getImageUrl = (path) => {
//     if (!path) return null;
//     let cleanPath = path.replace(/\\/g, "/"); // Convert Windows backslashes
//     if (cleanPath.startsWith("src/")) {
//       cleanPath = cleanPath.replace("src/", ""); // Remove 'src/' prefix if present
//     }
//     return `${API_BASE_URL}/${cleanPath}`;
//   };

//   const fetchData = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [postRes, userRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/achievements`),
//         axios.get(`${API_BASE_URL}/api/trainer/me`, config)
//       ]);
      
//       setAchievements(postRes.data.data || []);
//       setFollowingList(userRes.data?.data?.user?.following || []);
//     } catch (err) { 
//       console.error("Error fetching network data", err); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (!token) { 
//       navigate("/login"); 
//       return; 
//     }
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUser(payload);
//     } catch (e) { 
//       console.error("Token decoding failed", e); 
//     }
//     fetchData();
//   }, [token, navigate]);

//   // const handleFollow = async (targetUserId) => {
//   //   if (!targetUserId) return alert("User ID not found.");
//   //   try {
//   //     const res = await axios.put(`${API_BASE_URL}/api/trainer/follow/${targetUserId}`, {}, {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     });
//   //     if (res.data.isFollowing) {
//   //       setFollowingList(prev => [...prev, targetUserId]);
//   //     } else {
//   //       setFollowingList(prev => prev.filter(id => id !== targetUserId));
//   //     }
//   //     alert(res.data.message);
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Could not update connection.");
//   //   }
//   // };
//   const handleFollow = async (targetUserId) => {
//     if (!targetUserId) return alert("User ID not found.");
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/trainer/follow/${targetUserId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       // Use res.data.success as you intended
//       if (res.data.success) {
//         if (res.data.isFollowing) {
//           // Add to local state so button UI updates to "Connected"
//           setFollowingList(prev => [...prev, targetUserId]);
//         } else {
//           // Remove from local state so button UI updates back to "Connect"
//           setFollowingList(prev => prev.filter(id => id !== targetUserId));
//         }
//         alert(res.data.message);
//       }
//     } catch (err) {
//       console.error("Follow error:", err);
//       alert("Could not update connection.");
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/achievements/${id}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, likes: res.data.likes } : a));
//     } catch (err) { console.error(err); }
//   };

//   const handleCommentSubmit = async (id) => {
//     if (!commentText.trim()) return;
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/achievements/${id}/comment`, { text: commentText }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, comments: res.data.data } : a));
//       setCommentText("");
//     } catch (err) { console.error(err); }
//   };

//   const handleRepost = async (id) => {
//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements/${id}/repost`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchData();
//       alert("Post Shared to your feed!");
//     } catch (err) { console.error(err); }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     formData.append("category", newPost.category);
//     formData.append("companyName", newPost.companyName);
//     if (selectedFile) formData.append("postImage", selectedFile);

//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements`, formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`, 
//           "Content-Type": "multipart/form-data" 
//         }
//       });
//       setShowPostModal(false);
//       setSelectedFile(null); 
//       setPreviewUrl(null);
//       setNewPost({ description: "", category: "Project Completion", companyName: "" });
//       fetchData();
//     } catch (err) { 
//       alert("Error posting milestone. Ensure backend handles multipart/form-data."); 
//     }
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? (
//             <div className="network-loader">Loading...</div>
//           ) : achievements.length === 0 ? (
//             <div className="no-posts">No posts yet. Start the conversation!</div>
//           ) : achievements.map((post) => (
//             <div key={post._id} className="pro-post-card">
//               <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <div className="author-img-circle">{post.trainer?.name?.charAt(0) || "U"}</div>
//                   <div className="author-details">
//                     <strong>{post.trainer?.name || "Unknown Trainer"}</strong>
//                     <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                   </div>
//                 </div>

//                 {post.trainer?.user && post.trainer.user !== currentUser?.id && (
//                   <button 
//                     className={`follow-btn-small ${followingList.includes(post.trainer.user) ? 'following' : ''}`}
//                     onClick={() => handleFollow(post.trainer.user)}
//                     style={{
//                       padding: '6px 14px',
//                       borderRadius: '20px',
//                       border: '1px solid #3b82f6',
//                       background: followingList.includes(post.trainer.user) ? '#3b82f6' : 'transparent',
//                       color: followingList.includes(post.trainer.user) ? 'white' : '#3b82f6',
//                       cursor: 'pointer',
//                       fontSize: '12px',
//                       fontWeight: '600',
//                       transition: 'all 0.2s'
//                     }}
//                   >
//                     {followingList.includes(post.trainer.user) ? '✓ Connected' : '+ Connect'}
//                   </button>
//                 )}
//               </div>

//               <div className="post-text"><p>{post.description}</p></div>
              
//               {post.imageUrl && (
//                 <div className="post-media">
//                   <img src={getImageUrl(post.imageUrl)} alt="Post Milestone" />
//                 </div>
//               )}
              
//               <div className="post-stats">
//                 <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//               </div>

//               <div className="post-interact">
//                 <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                   {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                 </button>
//                 <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                 <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                 <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>✈️ Copy</button>
//               </div>

//               {activeCommentId === post._id && (
//                 <div className="comment-box">
//                   <div className="comment-input">
//                     <input 
//                       type="text" 
//                       placeholder="Write a comment..." 
//                       value={commentText} 
//                       onChange={(e) => setCommentText(e.target.value)} 
//                     />
//                     <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                   </div>
//                   {post.comments?.map((c, i) => (
//                     <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>

//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head">
//               <h3>Share Achievement</h3>
//               <button onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option>
//                   <option>Certification</option>
//                   <option>Workshop</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Company/University name" 
//                   className="modal-input" 
//                   value={newPost.companyName}
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
//                 />
//                 <textarea 
//                   placeholder="Describe your milestone..." 
//                   className="modal-textarea" 
//                   value={newPost.description}
//                   onChange={(e) => setNewPost({...newPost, description: e.target.value})} 
//                   required 
//                 />
//                 {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input 
//                   type="file" 
//                   ref={fileInputRef} 
//                   hidden 
//                   accept="image/*" 
//                   onChange={(e) => { 
//                     const file = e.target.files[0];
//                     if (file) {
//                       setSelectedFile(file); 
//                       setPreviewUrl(URL.createObjectURL(file));
//                     }
//                   }} 
//                 />
//                 <button type="submit" className="post-submit-btn">Post to Network</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Network;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [followingList, setFollowingList] = useState([]); 
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
  
//   const [newPost, setNewPost] = useState({
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//   });

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   const getImageUrl = (path) => {
//     if (!path) return null;
//     let cleanPath = path.replace(/\\/g, "/");
//     if (cleanPath.startsWith("src/")) {
//       cleanPath = cleanPath.replace("src/", "");
//     }
//     return `${API_BASE_URL}/${cleanPath}`;
//   };

//   const handleSearch = async (e) => {
//     const query = e.target.value;
//     setSearchTerm(query);
//     if (query.length > 2) {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/trainer/search?name=${query}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setSearchResults(res.data.data);
//       } catch (err) { console.error("Search error", err); }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [postRes, userRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/achievements`),
//         axios.get(`${API_BASE_URL}/api/trainer/me`, config)
//       ]);
//       setAchievements(postRes.data.data || []);
//       setFollowingList(userRes.data?.data?.user?.following || []);
//     } catch (err) { 
//       console.error("Error fetching network data", err); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (!token) { navigate("/login"); return; }
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUser(payload);
//     } catch (e) { console.error("Token decoding failed", e); }
//     fetchData();
//   }, [token, navigate]);

//   const handleFollow = async (targetUserId) => {
//     if (!targetUserId) return alert("User ID not found.");
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/trainer/follow/${targetUserId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.data.success) {
//         if (res.data.isFollowing) {
//           setFollowingList(prev => [...prev, targetUserId]);
//         } else {
//           setFollowingList(prev => prev.filter(id => id !== targetUserId));
//         }
//         alert(res.data.message);
//       }
//     } catch (err) {
//       console.error("Follow error:", err);
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/achievements/${id}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, likes: res.data.likes } : a));
//     } catch (err) { console.error(err); }
//   };

//   const handleCommentSubmit = async (id) => {
//     if (!commentText.trim()) return;
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/achievements/${id}/comment`, { text: commentText }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, comments: res.data.data } : a));
//       setCommentText("");
//     } catch (err) { console.error(err); }
//   };

//   const handleRepost = async (id) => {
//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements/${id}/repost`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchData();
//       alert("Post Shared to your feed!");
//     } catch (err) { console.error(err); }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     formData.append("category", newPost.category);
//     formData.append("companyName", newPost.companyName);
//     if (selectedFile) formData.append("postImage", selectedFile);

//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements`, formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`, 
//           "Content-Type": "multipart/form-data" 
//         }
//       });
//       setShowPostModal(false);
//       setSelectedFile(null); 
//       setPreviewUrl(null);
//       setNewPost({ description: "", category: "Project Completion", companyName: "" });
//       fetchData();
//     } catch (err) { alert("Error posting milestone."); }
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         {/* Corrected Search Placement */}
//         <div className="search-container" style={{ marginBottom: '20px', position: 'relative' }}>
//           <input 
//             type="text" 
//             placeholder="Search trainers by name..." 
//             className="search-input"
//             value={searchTerm}
//             onChange={handleSearch}
//             style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e0e0e0' }}
//           />
//           {searchResults.length > 0 && (
//             <div className="search-dropdown" style={{ position: 'absolute', top: '50px', width: '100%', background: 'white', zIndex: 10, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//               {searchResults.map(profile => (
//                 <div key={profile._id} className="search-item" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
//                   <span>{profile.user.name}</span>
//                   <button 
//                     onClick={() => handleFollow(profile.user._id)}
//                     style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}
//                   >
//                     {followingList.includes(profile.user._id) ? "✓ Connected" : "+ Connect"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? (
//             <div className="network-loader">Loading...</div>
//           ) : achievements.length === 0 ? (
//             <div className="no-posts">No posts yet. Start the conversation!</div>
//           ) : achievements.map((post) => (
//             <div key={post._id} className="pro-post-card">
//               <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <div className="author-img-circle">{post.trainer?.name?.charAt(0) || "U"}</div>
//                   <div className="author-details">
//                     <strong style={{ display: 'block' }}>{post.trainer?.name || "Unknown Trainer"}</strong>
//                     <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                   </div>
//                 </div>

//                 {post.trainer?.user && post.trainer.user !== currentUser?.id && (
//                   <button 
//                     className={`follow-btn-small ${followingList.includes(post.trainer.user) ? 'following' : ''}`}
//                     onClick={() => handleFollow(post.trainer.user)}
//                   >
//                     {followingList.includes(post.trainer.user) ? '✓ Connected' : '+ Connect'}
//                   </button>
//                 )}
//               </div>

//               <div className="post-text"><p>{post.description}</p></div>
              
//               {post.imageUrl && (
//                 <div className="post-media">
//                   <img src={getImageUrl(post.imageUrl)} alt="Post Milestone" />
//                 </div>
//               )}
              
//               <div className="post-stats">
//                 <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//               </div>

//               <div className="post-interact">
//                 <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                   {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                 </button>
//                 <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                 <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                 <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>✈️ Copy</button>
//               </div>

//               {activeCommentId === post._id && (
//                 <div className="comment-box">
//                   <div className="comment-input">
//                     <input 
//                       type="text" 
//                       placeholder="Write a comment..." 
//                       value={commentText} 
//                       onChange={(e) => setCommentText(e.target.value)} 
//                     />
//                     <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                   </div>
//                   {post.comments?.map((c, i) => (
//                     <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>

//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head">
//               <h3>Share Achievement</h3>
//               <button onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option>
//                   <option>Certification</option>
//                   <option>Workshop</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Company/University name" 
//                   className="modal-input" 
//                   value={newPost.companyName}
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
//                 />
//                 <textarea 
//                   placeholder="Describe your milestone..." 
//                   className="modal-textarea" 
//                   value={newPost.description}
//                   onChange={(e) => setNewPost({...newPost, description: e.target.value})} 
//                   required 
//                 />
//                 {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input 
//                   type="file" 
//                   ref={fileInputRef} 
//                   hidden 
//                   accept="image/*" 
//                   onChange={(e) => { 
//                     const file = e.target.files[0];
//                     if (file) {
//                       setSelectedFile(file); 
//                       setPreviewUrl(URL.createObjectURL(file));
//                     }
//                   }} 
//                 />
//                 <button type="submit" className="post-submit-btn">Post to Network</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Network;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 
// import "../../styles/Network.css";

// function Network() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [followingList, setFollowingList] = useState([]); 
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
  
//   const [newPost, setNewPost] = useState({
//     description: "",
//     category: "Project Completion",
//     companyName: "",
//   });

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   const getImageUrl = (path) => {
//     if (!path) return null;
//     let cleanPath = path.replace(/\\/g, "/");
//     if (cleanPath.startsWith("src/")) {
//       cleanPath = cleanPath.replace("src/", "");
//     }
//     return `${API_BASE_URL}/${cleanPath}`;
//   };

//   const handleSearch = async (e) => {
//     const query = e.target.value;
//     setSearchTerm(query);
//     if (query.length > 2) {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/trainer/search?name=${query}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setSearchResults(res.data.data);
//       } catch (err) { console.error("Search error", err); }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   // const fetchData = async () => {
//   //   try {
//   //     const config = { headers: { Authorization: `Bearer ${token}` } };
//   //     const [postRes, userRes] = await Promise.all([
//   //       axios.get(`${API_BASE_URL}/api/achievements`),
//   //       axios.get(`${API_BASE_URL}/api/trainer/me`, config)
//   //     ]);
//   //     setAchievements(postRes.data.data || []);
      
//   //     // Safety check: ensure followingList only contains IDs (strings)
//   //     const following = userRes.data?.data?.user?.following || [];
//   //     const formattedFollowing = following.map(item => typeof item === 'object' ? item._id : item);
//   //     setFollowingList(formattedFollowing);
//   //   } catch (err) { 
//   //     console.error("Error fetching network data", err); 
//   //   } finally { 
//   //     setLoading(false); 
//   //   }
//   // };
//   const fetchData = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const [postRes, userRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/achievements`),
//         // Change this URL to match your route exactly
//         axios.get(`${API_BASE_URL}/api/trainer/me`, config) 
//       ]);
      
//       setAchievements(postRes.data.data || []);
      
//       // Ensure we extract the following array correctly
//       const following = userRes.data?.data?.user?.following || [];
//       setFollowingList(following.map(f => typeof f === 'object' ? f._id : f));
//     } catch (err) { 
//       console.error("Error fetching network data", err); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (!token) { navigate("/login"); return; }
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUser(payload);
//     } catch (e) { console.error("Token decoding failed", e); }
//     fetchData();
//   }, [token, navigate]);

//   // const handleFollow = async (targetUserId) => {
//   //   if (!targetUserId) return alert("User ID not found.");
//   //   try {
//   //     const res = await axios.put(`${API_BASE_URL}/api/trainer/follow/${targetUserId}`, {}, {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     });
      
//   //     if (res.data.success) {
//   //       // Toggle the UI state immediately based on the response
//   //       if (res.data.isFollowing) {
//   //         setFollowingList(prev => [...prev, targetUserId]);
//   //       } else {
//   //         setFollowingList(prev => prev.filter(id => id !== targetUserId));
//   //       }
//   //       // Optional: you can remove the alert once you see it's working
//   //       console.log(res.data.message);
//   //     }
//   //   } catch (err) {
//   //     console.error("Follow error:", err);
//   //     alert("Could not update connection.");
//   //   }
//   // };
// const handleFollow = async (targetUserId) => {
//     if (!targetUserId) return alert("User ID not found.");
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/trainer/follow/${targetUserId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (res.data.success) {
//         // Toggle the UI state immediately based on the response
//         if (res.data.isFollowing) {
//           setFollowingList(prev => [...prev, targetUserId]);
//         } else {
//           setFollowingList(prev => prev.filter(id => id !== targetUserId));
//         }
//       }
//     } catch (err) {
//       console.error("Follow error:", err);
//       // This alert triggers if the backend returns a 4xx or 5xx error
//       alert("Could not update connection. Check console for details.");
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/achievements/${id}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, likes: res.data.likes } : a));
//     } catch (err) { console.error(err); }
//   };

//   const handleCommentSubmit = async (id) => {
//     if (!commentText.trim()) return;
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/achievements/${id}/comment`, { text: commentText }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAchievements(achievements.map(a => a._id === id ? { ...a, comments: res.data.data } : a));
//       setCommentText("");
//     } catch (err) { console.error(err); }
//   };

//   const handleRepost = async (id) => {
//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements/${id}/repost`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchData();
//       alert("Post Shared to your feed!");
//     } catch (err) { console.error(err); }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     formData.append("category", newPost.category);
//     formData.append("companyName", newPost.companyName);
//     if (selectedFile) formData.append("postImage", selectedFile);

//     try {
//       await axios.post(`${API_BASE_URL}/api/achievements`, formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`, 
//           "Content-Type": "multipart/form-data" 
//         }
//       });
//       setShowPostModal(false);
//       setSelectedFile(null); 
//       setPreviewUrl(null);
//       setNewPost({ description: "", category: "Project Completion", companyName: "" });
//       fetchData();
//     } catch (err) { alert("Error posting milestone."); }
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn active">Network Feed</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         <div className="search-container" style={{ marginBottom: '20px', position: 'relative' }}>
//           <input 
//             type="text" 
//             placeholder="Search trainers by name..." 
//             className="search-input"
//             value={searchTerm}
//             onChange={handleSearch}
//             style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e0e0e0' }}
//           />
//           {searchResults.length > 0 && (
//             <div className="search-dropdown" style={{ position: 'absolute', top: '50px', width: '100%', background: 'white', zIndex: 1000, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//               {searchResults.map(profile => (
//                 <div key={profile._id} className="search-item" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
//                   <span>{profile.user?.name}</span>
//                   <button 
//                     onClick={() => handleFollow(profile.user?._id)}
//                     style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}
//                   >
//                     {followingList.includes(profile.user?._id) ? "✓ Connected" : "+ Connect"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? (
//             <div className="network-loader">Loading...</div>
//           ) : achievements.length === 0 ? (
//             <div className="no-posts">No posts yet. Start the conversation!</div>
//           ) : achievements.map((post) => (
//             <div key={post._id} className="pro-post-card">
//               <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <div className="author-img-circle">{post.trainer?.name?.charAt(0) || "U"}</div>
//                   <div className="author-details">
//                     <strong style={{ display: 'block' }}>{post.trainer?.name || "Unknown Trainer"}</strong>
//                     <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                   </div>
//                 </div>

//                 {post.trainer?.user && post.trainer.user !== currentUser?.id && (
//                   <button 
//                     className={`follow-btn-small ${followingList.includes(post.trainer.user) ? 'following' : ''}`}
//                     onClick={() => handleFollow(post.trainer.user)}
//                   >
//                     {followingList.includes(post.trainer.user) ? '✓ Connected' : '+ Connect'}
//                   </button>
//                 )}
//               </div>

//               <div className="post-text"><p>{post.description}</p></div>
              
//               {post.imageUrl && (
//                 <div className="post-media">
//                   <img src={getImageUrl(post.imageUrl)} alt="Post Milestone" />
//                 </div>
//               )}
              
//               <div className="post-stats">
//                 <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//               </div>

//               <div className="post-interact">
//                 <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                   {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                 </button>
//                 <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                 <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                 <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>✈️ Copy</button>
//               </div>

//               {activeCommentId === post._id && (
//                 <div className="comment-box">
//                   <div className="comment-input">
//                     <input 
//                       type="text" 
//                       placeholder="Write a comment..." 
//                       value={commentText} 
//                       onChange={(e) => setCommentText(e.target.value)} 
//                     />
//                     <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                   </div>
//                   {post.comments?.map((c, i) => (
//                     <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>

//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head">
//               <h3>Share Achievement</h3>
//               <button onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Project Completion</option>
//                   <option>Certification</option>
//                   <option>Workshop</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Company/University name" 
//                   className="modal-input" 
//                   value={newPost.companyName}
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
//                 />
//                 <textarea 
//                   placeholder="Describe your milestone..." 
//                   className="modal-textarea" 
//                   value={newPost.description}
//                   onChange={(e) => setNewPost({...newPost, description: e.target.value})} 
//                   required 
//                 />
//                 {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input 
//                   type="file" 
//                   ref={fileInputRef} 
//                   hidden 
//                   accept="image/*" 
//                   onChange={(e) => { 
//                     const file = e.target.files[0];
//                     if (file) {
//                       setSelectedFile(file); 
//                       setPreviewUrl(URL.createObjectURL(file));
//                     }
//                   }} 
//                 />
//                 <button type="submit" className="post-submit-btn">Post to Network</button>
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
  const [followingList, setFollowingList] = useState([]); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const [newPost, setNewPost] = useState({
    description: "",
    category: "Project Completion",
    companyName: "",
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:5000";

  const getImageUrl = (path) => {
    if (!path) return null;
    let cleanPath = path.replace(/\\/g, "/");
    if (cleanPath.startsWith("src/")) {
      cleanPath = cleanPath.replace("src/", "");
    }
    return `${API_BASE_URL}/${cleanPath}`;
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 2) {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/trainer/search?name=${query}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSearchResults(res.data.data);
      } catch (err) { console.error("Search error", err); }
    } else {
      setSearchResults([]);
    }
  };

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [postRes, userRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/achievements`),
        axios.get(`${API_BASE_URL}/api/trainer/me`, config) 
      ]);
      
      setAchievements(postRes.data.data || []);
      
      const following = userRes.data?.data?.user?.following || [];
      setFollowingList(following.map(f => typeof f === 'object' ? f._id : f));
    } catch (err) { 
      console.error("Error fetching network data", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(payload);
    } catch (e) { console.error("Token decoding failed", e); }
    fetchData();
  }, [token, navigate]);

  const handleFollow = async (targetUserId) => {
    if (!targetUserId) return alert("User ID not found.");
    try {
      const res = await axios.put(`${API_BASE_URL}/api/trainer/follow/${targetUserId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.success) {
        if (res.data.isFollowing) {
          setFollowingList(prev => [...prev, targetUserId]);
        } else {
          setFollowingList(prev => prev.filter(id => id !== targetUserId));
        }
      }
    } catch (err) {
      console.error("Follow error:", err);
      alert("Could not update connection.");
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/achievements/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAchievements(achievements.map(a => a._id === id ? { ...a, likes: res.data.likes } : a));
    } catch (err) { console.error(err); }
  };

  const handleCommentSubmit = async (id) => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/achievements/${id}/comment`, { text: commentText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAchievements(achievements.map(a => a._id === id ? { ...a, comments: res.data.data } : a));
      setCommentText("");
    } catch (err) { console.error(err); }
  };

  const handleRepost = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/api/achievements/${id}/repost`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
      alert("Post Shared to your feed!");
    } catch (err) { console.error(err); }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", newPost.description);
    formData.append("category", newPost.category);
    formData.append("companyName", newPost.companyName);
    if (selectedFile) formData.append("postImage", selectedFile);

    try {
      await axios.post(`${API_BASE_URL}/api/achievements`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data" 
        }
      });
      setShowPostModal(false);
      setSelectedFile(null); 
      setPreviewUrl(null);
      setNewPost({ description: "", category: "Project Completion", companyName: "" });
      fetchData();
    } catch (err) { alert("Error posting milestone."); }
  };

  return (
    <div className="trainistry-network-container">
      <aside className="sidebar">
        <div className="logo">Trainistry</div>
        <nav className="nav-menu">
          <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
          <button className="sidebar-btn active">Industrial Network</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/profile")}>My Profile</button>
        </nav>
        <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
      </aside>

      <main className="network-content">
        <div className="search-container" style={{ marginBottom: '20px', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search trainers by name..." 
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e0e0e0' }}
          />
          {searchResults.length > 0 && (
            <div className="search-dropdown" style={{ position: 'absolute', top: '50px', width: '100%', background: 'white', zIndex: 1000, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              {searchResults.map(profile => (
                <div key={profile._id} className="search-item" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
                  <span>{profile.user?.name}</span>
                  <button 
                    onClick={() => handleFollow(profile.user?._id)}
                    style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}
                  >
                    {followingList.includes(profile.user?._id) ? "✓ Connected" : "+ Connect"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="post-trigger-box">
          <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "T"}</div>
          <button onClick={() => setShowPostModal(true)}>Share a project completion or certificate...</button>
        </div>

        <div className="main-feed">
          {loading ? (
            <div className="network-loader">Loading...</div>
          ) : achievements.length === 0 ? (
            <div className="no-posts">No posts yet. Start the conversation!</div>
          ) : achievements.map((post) => {
            const postUserId = post.trainer?.user?._id || post.trainer?.user || post.trainer?._id;
            const isMe = postUserId === currentUser?.id;

            return (
              <div key={post._id} className="pro-post-card">
                <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div className="author-img-circle">{post.trainer?.name?.charAt(0) || "U"}</div>
                    <div className="author-details">
                      <strong style={{ display: 'block' }}>{post.trainer?.name || "Unknown Trainer"}</strong>
                      <span className="post-meta-sub">{post.category} at {post.companyName}</span>
                    </div>
                  </div>

                  {/* Connect Button logic next to post */}
                  {!isMe && postUserId && (
                    <button 
                      onClick={() => handleFollow(postUserId)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#3b82f6', 
                        fontWeight: '700', 
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      {followingList.includes(postUserId.toString()) ? '✓ Connected' : '+ Connect'}
                    </button>
                  )}
                </div>

                <div className="post-text"><p>{post.description}</p></div>
                
                {post.imageUrl && (
                  <div className="post-media">
                    <img src={getImageUrl(post.imageUrl)} alt="Post Milestone" />
                  </div>
                )}
                
                <div className="post-stats">
                  <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
                </div>

                <div className="post-interact">
                  <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
                    {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
                  </button>
                  <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
                  <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
                  <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>✈️ Copy</button>
                </div>

                {activeCommentId === post._id && (
                  <div className="comment-box">
                    <div className="comment-input">
                      <input 
                        type="text" 
                        placeholder="Write a comment..." 
                        value={commentText} 
                        onChange={(e) => setCommentText(e.target.value)} 
                      />
                      <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
                    </div>
                    {post.comments?.map((c, i) => (
                      <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {showPostModal && (
        <div className="modern-modal-overlay">
          <div className="modern-modal">
            <div className="modal-head">
              <h3>Share Achievement</h3>
              <button onClick={() => setShowPostModal(false)}>&times;</button>
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="modal-body">
                <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
                  <option>Project Completion</option>
                  <option>Certification</option>
                  <option>Workshop</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Company/University name" 
                  className="modal-input" 
                  value={newPost.companyName}
                  onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
                />
                <textarea 
                  placeholder="Describe your milestone..." 
                  className="modal-textarea" 
                  value={newPost.description}
                  onChange={(e) => setNewPost({...newPost, description: e.target.value})} 
                  required 
                />
                {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  hidden 
                  accept="image/*" 
                  onChange={(e) => { 
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedFile(file); 
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }} 
                />
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