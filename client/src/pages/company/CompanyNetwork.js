// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/companyDashboard.css";

// function CompanyNetwork() {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchNetworkFeed = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/trainer/posts", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = res.data.data || [];
//         setPosts(data);
//         setFilteredPosts(data); // Initial view shows all
//       } catch (error) {
//         console.error("Error fetching network feed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNetworkFeed();
//   }, [token]);

//   // Handle Real-time Filtering
//   useEffect(() => {
//     const results = posts.filter(post => 
//       post.trainer?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.trainer?.expertise?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.content?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredPosts(results);
//   }, [searchTerm, posts]);

//   if (loading) return <div className="loader">Loading Industrial Feed...</div>;

//   return (
//     <div className="network-container">
//       {/* Search Bar Header */}
//       <div className="dashboard-card glass" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//         <div>
//           <h2 style={{ margin: 0 }}>Industrial Talent Feed</h2>
//           <p style={{ color: '#666', margin: '5px 0 0 0' }}>Discover and connect with experts.</p>
//         </div>
        
//         <div className="search-box" style={{ flex: '1', maxWidth: '400px', position: 'relative' }}>
//           <input 
//             type="text" 
//             placeholder="Search by skill, name, or topic (e.g. Java, MERN)..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '12px 15px',
//               borderRadius: '8px',
//               border: '1px solid #ddd',
//               outline: 'none',
//               fontSize: '0.95rem'
//             }}
//           />
//           {searchTerm && (
//             <span 
//               onClick={() => setSearchTerm("")} 
//               style={{ position: 'absolute', right: '15px', top: '12px', cursor: 'pointer', color: '#999' }}
//             >
//               ✕
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="posts-list">
//         {filteredPosts.length === 0 ? (
//           <div className="dashboard-card glass" style={{ textAlign: 'center', padding: '40px' }}>
//             <p style={{ color: '#888' }}>No results found for "{searchTerm}"</p>
//           </div>
//         ) : (
//           filteredPosts.map((post) => (
//             <div key={post._id} className="post-card glass" style={{ marginBottom: '20px', padding: '20px' }}>
//               <div className="post-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                 <div className="avatar-circle" style={{ 
//                   width: '45px', height: '45px', borderRadius: '50%', 
//                   backgroundColor: '#2563eb', color: 'white', 
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
//                 }}>
//                   {post.trainer?.user?.name?.charAt(0) || "T"}
//                 </div>
//                 <div>
//                   <h4 style={{ margin: 0 }}>{post.trainer?.user?.name}</h4>
//                   <small style={{ color: '#2563eb', fontWeight: '600' }}>{post.trainer?.expertise}</small>
//                 </div>
//               </div>

//               <div className="post-body" style={{ margin: '15px 0', lineHeight: '1.6', color: '#333' }}>
//                 <p>{post.content}</p>
//               </div>

//               <div className="post-footer" style={{ borderTop: '1px solid #eee', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span style={{ fontSize: '0.85rem', color: '#888' }}>
//                   📅 {new Date(post.createdAt).toLocaleDateString('en-IN')}
//                 </span>
//                 <button 
//                   className="btn-link" 
//                   style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
//                   onClick={() => window.location.href = `/company/trainer-profile/${post.trainer?._id}`}
//                 >
//                   View Full Profile
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default CompanyNetwork;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/companyDashboard.css";
// import "../../styles/Network.css"; // Reuse the professional post styling

// function CompanyNetwork() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const API_BASE_URL = "http://localhost:5000";

//   // Helper for images
//   const getImageUrl = (path) => {
//     if (!path) return null;
//     let cleanPath = path.replace(/\\/g, "/");
//     if (cleanPath.startsWith("src/")) {
//       cleanPath = cleanPath.replace("src/", "");
//     }
//     return `${API_BASE_URL}/${cleanPath}`;
//   };

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/achievements`);
//       setAchievements(res.data.data || []);
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

//   // Interaction Handlers
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

//   // Filter achievements based on search
//   const filteredAchievements = achievements.filter(post =>
//     post.trainer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     post.category?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div className="loader">Loading Industrial Feed...</div>;

//   return (
//     <div className="network-container">
//       {/* Header & Search */}
//       <div className="dashboard-card glass" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//         <div>
//           <h2 style={{ margin: 0 }}>Industrial Talent Feed</h2>
//           <p style={{ color: '#666', margin: '5px 0 0 0' }}>Monitor top trainers and project milestones.</p>
//         </div>
        
//         <div className="search-box" style={{ flex: '1', maxWidth: '400px', position: 'relative' }}>
//           <input 
//             type="text" 
//             placeholder="Search by trainer, skill, or project..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{
//               width: '100%', padding: '12px 15px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none'
//             }}
//           />
//         </div>
//       </div>

//       <div className="main-feed">
//         {filteredAchievements.length === 0 ? (
//           <div className="dashboard-card glass" style={{ textAlign: 'center', padding: '40px' }}>
//             <p style={{ color: '#888' }}>No industrial updates found for "{searchTerm}"</p>
//           </div>
//         ) : (
//           filteredAchievements.map((post) => (
//             <div key={post._id} className="pro-post-card glass" style={{ marginBottom: '20px' }}>
//               <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <div className="author-img-circle" style={{ backgroundColor: '#2563eb' }}>
//                     {post.trainer?.name?.charAt(0) || "T"}
//                   </div>
//                   <div className="author-details">
//                     <strong style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate(`/company/trainer-profile/${post.trainer?._id}`)}>
//                       {post.trainer?.name}
//                     </strong>
//                     <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="post-text" style={{ margin: '15px 0' }}>
//                 <p>{post.description}</p>
//               </div>

//               {post.imageUrl && (
//                 <div className="post-media">
//                   <img src={getImageUrl(post.imageUrl)} alt="Milestone" style={{ borderRadius: '8px', width: '100%' }} />
//                 </div>
//               )}

//               <div className="post-stats" style={{ padding: '10px 0', fontSize: '0.85rem', color: '#666' }}>
//                 <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//               </div>

//               <div className="post-interact" style={{ borderTop: '1px solid #eee', display: 'flex', gap: '10px', paddingTop: '10px' }}>
//                 <button 
//                    className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} 
//                    onClick={() => handleLike(post._id)}
//                    style={{ border: 'none', background: 'none', cursor: 'pointer', color: post.likes?.includes(currentUser?.id) ? '#e11d48' : '#666' }}
//                 >
//                   {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                 </button>
//                 <button 
//                   className="interact-btn" 
//                   onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}
//                   style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}
//                 >
//                   💬 Comment
//                 </button>
//                 <button 
//                   className="btn-link" 
//                   style={{ marginLeft: 'auto', border: 'none', background: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer' }}
//                   onClick={() => navigate(`/company/trainer-profile/${post.trainer?._id}`)}
//                 >
//                   Hire Trainer
//                 </button>
//               </div>

//               {activeCommentId === post._id && (
//                 <div className="comment-box" style={{ marginTop: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
//                   <div className="comment-input" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//                     <input 
//                       type="text" 
//                       placeholder="Write a comment..." 
//                       value={commentText} 
//                       onChange={(e) => setCommentText(e.target.value)} 
//                       style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                     />
//                     <button onClick={() => handleCommentSubmit(post._id)} style={{ padding: '8px 15px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}>Post</button>
//                   </div>
//                   {post.comments?.map((c, i) => (
//                     <div key={i} className="comment-item" style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
//                       <strong>{c.name}</strong>: {c.text}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default CompanyNetwork;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/companyDashboard.css";
// import "../../styles/Network.css"; 

// function CompanyNetwork() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);

//   const navigate = useNavigate();
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

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/achievements`);
//       setAchievements(res.data.data || []);
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
//       alert("Shared to your network!");
//     } catch (err) { console.error(err); }
//   };

//   const filteredAchievements = achievements.filter(post =>
//     post.trainer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     post.description?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div className="loader">Loading Industrial Feed...</div>;

//   return (
//     <div className="trainistry-network-container"> {/* Use the same container class as Trainer */}
//       <main className="network-content" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        
//         {/* Unified Search Bar */}
//         <div className="search-container" style={{ marginBottom: '20px' }}>
//           <input 
//             type="text" 
//             placeholder="Search industrial talent or milestones..." 
//             className="search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e0e0e0' }}
//           />
//         </div>

//         <div className="main-feed">
//           {filteredAchievements.length === 0 ? (
//             <div className="no-posts">No industrial updates found.</div>
//           ) : (
//             filteredAchievements.map((post) => (
//               <div key={post._id} className="pro-post-card">
//                 <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <div style={{ display: 'flex', gap: '12px' }}>
//                     <div className="author-img-circle">
//                       {post.trainer?.name?.charAt(0) || "T"}
//                     </div>
//                     <div className="author-details">
//                       <strong 
//                         style={{ cursor: 'pointer' }} 
//                         onClick={() => navigate(`/company/trainer-profile/${post.trainer?._id}`)}
//                       >
//                         {post.trainer?.name || "Unknown Trainer"}
//                       </strong>
//                       <span className="post-meta-sub">{post.category} at {post.companyName}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="post-text">
//                   <p>{post.description}</p>
//                 </div>

//                 {post.imageUrl && (
//                   <div className="post-media">
//                     <img src={getImageUrl(post.imageUrl)} alt="Milestone" />
//                   </div>
//                 )}

//                 <div className="post-stats">
//                   <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//                 </div>

//                 <div className="post-interact">
//                   <button 
//                     className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} 
//                     onClick={() => handleLike(post._id)}
//                   >
//                     {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                   </button>
//                   <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>
//                     💬 Comment
//                   </button>
//                   <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                   <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>
//                     ✈️ Copy
//                   </button>
//                 </div>

//                 {activeCommentId === post._id && (
//                   <div className="comment-box">
//                     <div className="comment-input">
//                       <input 
//                         type="text" 
//                         placeholder="Write a comment..." 
//                         value={commentText} 
//                         onChange={(e) => setCommentText(e.target.value)} 
//                       />
//                       <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                     </div>
//                     {post.comments?.map((c, i) => (
//                       <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CompanyNetwork;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/companyDashboard.css"; // Using Company sidebar/layout styles
// import "../../styles/Network.css"; // Using shared Glassmorphism styles

// function CompanyNetwork() {
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
//     category: "Hiring Drive",
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

//   // Search logic for other Companies
//   const handleSearch = async (e) => {
//     const query = e.target.value;
//     setSearchTerm(query);
//     if (query.length > 2) {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/company/search?name=${query}`, {
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
//         axios.get(`${API_BASE_URL}/api/company/me`, config) 
//       ]);
      
//       setAchievements(postRes.data.data || []);
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

//   // Connect logic for Companies
//   const handleFollow = async (targetUserId) => {
//     if (!targetUserId) return alert("User ID not found.");
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/company/follow/${targetUserId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (res.data.success) {
//         if (res.data.isFollowing) {
//           setFollowingList(prev => [...prev, targetUserId]);
//         } else {
//           setFollowingList(prev => prev.filter(id => id !== targetUserId));
//         }
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
//       setNewPost({ description: "", category: "Hiring Drive", companyName: "" });
//       fetchData();
//     } catch (err) { alert("Error posting milestone."); }
//   };

//   return (
//     <div className="trainistry-network-container">
//       {/* Sidebar matching Company Dashboard */}
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/company-dashboard")}>Dashboard</button>
//           <button className="sidebar-btn active">Corporate Network</button>
//           <button className="sidebar-btn" onClick={() => navigate("/company/post-project")}>Post Project</button>
//           <button className="sidebar-btn" onClick={() => navigate("/company/profile")}>Company Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         {/* Search for other companies */}
//         <div className="search-container" style={{ marginBottom: '20px', position: 'relative' }}>
//           <input 
//             type="text" 
//             placeholder="Search industrial partners by company name..." 
//             className="search-input"
//             value={searchTerm}
//             onChange={handleSearch}
//             style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e0e0e0' }}
//           />
//           {searchResults.length > 0 && (
//             <div className="search-dropdown" style={{ position: 'absolute', top: '50px', width: '100%', background: 'white', zIndex: 1000, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//               {searchResults.map(profile => (
//                 <div key={profile._id} className="search-item" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
//                   <span>{profile.user?.name || profile.companyName}</span>
//                   <button 
//                     onClick={() => handleFollow(profile.user?._id || profile._id)}
//                     style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}
//                   >
//                     {followingList.includes(profile.user?._id || profile._id) ? "✓ Connected" : "+ Connect"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Self Post Trigger */}
//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "C"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a hiring drive, corporate workshop, or industrial milestone...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? (
//             <div className="network-loader">Loading Industrial Feed...</div>
//           ) : achievements.length === 0 ? (
//             <div className="no-posts">No industrial updates yet.</div>
//           ) : achievements.map((post) => {
//             // Check if post is from the current company to hide connect button on own posts
//             const postUserId = post.trainer?.user?._id || post.trainer?.user || post.trainer?._id || post.authorId;
//             const isMe = postUserId === currentUser?.id;

//             return (
//               <div key={post._id} className="pro-post-card">
//                 <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                   <div style={{ display: 'flex', gap: '12px' }}>
//                     <div className="author-img-circle">{post.trainer?.name?.charAt(0) || post.companyName?.charAt(0) || "I"}</div>
//                     <div className="author-details">
//                       <strong style={{ display: 'block' }}>{post.trainer?.name || post.companyName || "Industrial Partner"}</strong>
//                       <span className="post-meta-sub">{post.category} at {post.companyName || "Industrial Hub"}</span>
//                     </div>
//                   </div>

//                   {/* Connect Button for Other Companies/Trainers */}
//                   {!isMe && postUserId && (
//                     <button 
//                       onClick={() => handleFollow(postUserId)}
//                       style={{ 
//                         background: 'none', 
//                         border: 'none', 
//                         color: '#3b82f6', 
//                         fontWeight: '700', 
//                         cursor: 'pointer',
//                         fontSize: '0.9rem'
//                       }}
//                     >
//                       {followingList.includes(postUserId.toString()) ? '✓ Connected' : '+ Connect'}
//                     </button>
//                   )}
//                 </div>

//                 <div className="post-text"><p>{post.description}</p></div>
                
//                 {post.imageUrl && (
//                   <div className="post-media">
//                     <img src={getImageUrl(post.imageUrl)} alt="Post Milestone" />
//                   </div>
//                 )}
                
//                 <div className="post-stats">
//                   <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//                 </div>

//                 <div className="post-interact">
//                   <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                     {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                   </button>
//                   <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                   <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                   <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>✈️ Copy</button>
//                 </div>

//                 {activeCommentId === post._id && (
//                   <div className="comment-box">
//                     <div className="comment-input">
//                       <input 
//                         type="text" 
//                         placeholder="Write a comment..." 
//                         value={commentText} 
//                         onChange={(e) => setCommentText(e.target.value)} 
//                       />
//                       <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                     </div>
//                     {post.comments?.map((c, i) => (
//                       <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       {/* Industrial Milestone Modal */}
//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head">
//               <h3>Share Industrial Milestone</h3>
//               <button onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option>Hiring Drive</option>
//                   <option>Industrial Workshop</option>
//                   <option>Project Launch</option>
//                   <option>Achievement</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Your Company Name" 
//                   className="modal-input" 
//                   value={newPost.companyName}
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
//                 />
//                 <textarea 
//                   placeholder="Share details about the update..." 
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

// export default CompanyNetwork;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/companyDashboard.css"; 
// import "../../styles/Network.css"; 

// function CompanyNetwork() {
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
//     category: "Project Completion", // Matches backend Enum
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
//         const res = await axios.get(`${API_BASE_URL}/api/company/search?name=${query}`, {
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
//         axios.get(`${API_BASE_URL}/api/company/me`, config) 
//       ]);
      
//       setAchievements(postRes.data.data || []);
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

//   const handleFollow = async (targetUserId) => {
//     if (!targetUserId) return alert("User ID not found.");
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/company/follow/${targetUserId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (res.data.success) {
//         if (res.data.isFollowing) {
//           setFollowingList(prev => [...prev, targetUserId]);
//         } else {
//           setFollowingList(prev => prev.filter(id => id !== targetUserId));
//         }
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
//       console.error("Full Error Object:", err.response?.data);
//       alert("Validation Error: Category must be Project Completion, Certification, or Workshop."); 
//     }
//   };

//   return (
//     <div className="trainistry-network-container">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav className="nav-menu">
//           <button className="sidebar-btn" onClick={() => navigate("/company-dashboard")}>Dashboard</button>
//           <button className="sidebar-btn active">Corporate Network</button>
//           <button className="sidebar-btn" onClick={() => navigate("/company/post-project")}>Post Project</button>
//           <button className="sidebar-btn" onClick={() => navigate("/company/profile")}>Company Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="network-content">
//         <div className="search-container" style={{ marginBottom: '20px', position: 'relative' }}>
//           <input 
//             type="text" 
//             placeholder="Search industrial partners..." 
//             className="search-input"
//             value={searchTerm}
//             onChange={handleSearch}
//             style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e0e0e0' }}
//           />
//           {searchResults.length > 0 && (
//             <div className="search-dropdown" style={{ position: 'absolute', top: '50px', width: '100%', background: 'white', zIndex: 1000, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//               {searchResults.map(profile => (
//                 <div key={profile._id} className="search-item" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
//                   <span>{profile.user?.name || profile.companyName}</span>
//                   <button 
//                     onClick={() => handleFollow(profile.user?._id || profile._id)}
//                     style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}
//                   >
//                     {followingList.includes(profile.user?._id || profile._id) ? "✓ Connected" : "+ Connect"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="post-trigger-box">
//           <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "C"}</div>
//           <button onClick={() => setShowPostModal(true)}>Share a corporate update or milestone...</button>
//         </div>

//         <div className="main-feed">
//           {loading ? (
//             <div className="network-loader">Loading Feed...</div>
//           ) : achievements.length === 0 ? (
//             <div className="no-posts">No updates yet.</div>
//           ) : achievements.map((post) => {
//             const postUserId = post.trainer?.user?._id || post.trainer?.user || post.trainer?._id || post.authorId;
//             const isMe = postUserId === currentUser?.id;

//             return (
//               <div key={post._id} className="pro-post-card">
//                 <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                   <div style={{ display: 'flex', gap: '12px' }}>
//                     <div className="author-img-circle">{post.trainer?.name?.charAt(0) || post.companyName?.charAt(0) || "I"}</div>
//                     <div className="author-details">
//                       <strong style={{ display: 'block' }}>{post.trainer?.name || post.companyName || "Industrial Partner"}</strong>
//                       <span className="post-meta-sub">{post.category} at {post.companyName || "Industrial Hub"}</span>
//                     </div>
//                   </div>

//                   {!isMe && postUserId && (
//                     <button 
//                       onClick={() => handleFollow(postUserId)}
//                       style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}
//                     >
//                       {followingList.includes(postUserId.toString()) ? '✓ Connected' : '+ Connect'}
//                     </button>
//                   )}
//                 </div>

//                 <div className="post-text"><p>{post.description}</p></div>
                
//                 {post.imageUrl && (
//                   <div className="post-media">
//                     <img src={getImageUrl(post.imageUrl)} alt="Post Milestone" />
//                   </div>
//                 )}
                
//                 <div className="post-stats">
//                   <span>{post.likes?.length || 0} Likes</span> • <span>{post.comments?.length || 0} Comments</span>
//                 </div>

//                 <div className="post-interact">
//                   <button className={`interact-btn ${post.likes?.includes(currentUser?.id) ? 'active-like' : ''}`} onClick={() => handleLike(post._id)}>
//                     {post.likes?.includes(currentUser?.id) ? '❤️ Liked' : '👍 Like'}
//                   </button>
//                   <button className="interact-btn" onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}>💬 Comment</button>
//                   <button className="interact-btn" onClick={() => handleRepost(post._id)}>🔄 Repost</button>
//                   <button className="interact-btn" onClick={() => { navigator.clipboard.writeText(post.description); alert("Text Copied!"); }}>✈️ Copy</button>
//                 </div>

//                 {activeCommentId === post._id && (
//                   <div className="comment-box">
//                     <div className="comment-input">
//                       <input 
//                         type="text" 
//                         placeholder="Write a comment..." 
//                         value={commentText} 
//                         onChange={(e) => setCommentText(e.target.value)} 
//                       />
//                       <button onClick={() => handleCommentSubmit(post._id)}>Post</button>
//                     </div>
//                     {post.comments?.map((c, i) => (
//                       <div key={i} className="comment-item"><strong>{c.name}</strong>: {c.text}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal">
//             <div className="modal-head">
//               <h3>Share Corporate Milestone</h3>
//               <button onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 {/* Updated dropdown to only use Backend-Valid Enums */}
//                 <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option value="Project Completion">Project Launch</option>
//                   <option value="Certification">Corporate Certification</option>
//                   <option value="Workshop">Industrial Workshop</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Your Company Name" 
//                   className="modal-input" 
//                   value={newPost.companyName}
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
//                 />
//                 <textarea 
//                   placeholder="Share details about the update..." 
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

// export default CompanyNetwork;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import "../../styles/companyDashboard.css"; 
// import "../../styles/Network.css"; 

// function CompanyNetwork() {
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
//         const res = await axios.get(`${API_BASE_URL}/api/company/search?name=${query}`, {
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
//         axios.get(`${API_BASE_URL}/api/company/me`, config) 
//       ]);
      
//       setAchievements(postRes.data.data || []);
//       const following = userRes.data?.data?.user?.following || [];
//       setFollowingList(following.map(f => typeof f === 'object' ? f._id : f));
//     } catch (err) { 
//       console.error("Error fetching network data", err); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         setCurrentUser(payload);
//       } catch (e) { console.error("Token decoding failed", e); }
//       fetchData();
//     }
//   }, [token]);

//   const handleFollow = async (targetUserId) => {
//     if (!targetUserId) return alert("User ID not found.");
//     try {
//       const res = await axios.put(`${API_BASE_URL}/api/company/follow/${targetUserId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (res.data.success) {
//         if (res.data.isFollowing) {
//           setFollowingList(prev => [...prev, targetUserId]);
//         } else {
//           setFollowingList(prev => prev.filter(id => id !== targetUserId));
//         }
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
//     } catch (err) { 
//       alert("Error posting milestone. Ensure category is valid."); 
//     }
//   };

//   return (
//     <div className="network-content-wrapper">
//       {/* Search Bar */}
//       <div className="search-container" style={{ marginBottom: '20px', position: 'relative' }}>
//         <input 
//           type="text" 
//           placeholder="Search industrial partners..." 
//           className="search-input glass"
//           value={searchTerm}
//           onChange={handleSearch}
//           style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.2)' }}
//         />
//         {searchResults.length > 0 && (
//           <div className="search-dropdown glass" style={{ position: 'absolute', top: '50px', width: '100%', zIndex: 1000, borderRadius: '12px' }}>
//             {searchResults.map(profile => (
//               <div key={profile._id} className="search-item" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
//                 <span>{profile.user?.name || profile.companyName}</span>
//                 <button 
//                   onClick={() => handleFollow(profile.user?._id || profile._id)}
//                   style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}
//                 >
//                   {followingList.includes(profile.user?._id || profile._id) ? "✓ Connected" : "+ Connect"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Post Trigger */}
//       <div className="post-trigger-box glass">
//         <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "C"}</div>
//         <button onClick={() => setShowPostModal(true)}>Share a corporate update or industrial milestone...</button>
//       </div>

//       {/* Main Feed */}
//       <div className="main-feed">
//         {loading ? (
//           <div className="network-loader">Loading Industrial Feed...</div>
//         ) : achievements.length === 0 ? (
//           <div className="no-posts">No updates yet.</div>
//         ) : achievements.map((post) => {
//           const postUserId = post.trainer?.user?._id || post.trainer?.user || post.trainer?._id || post.authorId;
//           const isMe = postUserId === currentUser?.id;

//           return (
//             <div key={post._id} className="pro-post-card glass">
//               <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <div className="author-img-circle">{post.trainer?.name?.charAt(0) || post.companyName?.charAt(0) || "I"}</div>
//                   <div className="author-details">
//                     <strong style={{ display: 'block' }}>{post.trainer?.name || post.companyName || "Industrial Partner"}</strong>
//                     <span className="post-meta-sub">{post.category} at {post.companyName || "Industrial Hub"}</span>
//                   </div>
//                 </div>

//                 {!isMe && postUserId && (
//                   <button 
//                     onClick={() => handleFollow(postUserId)}
//                     style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}
//                   >
//                     {followingList.includes(postUserId.toString()) ? '✓ Connected' : '+ Connect'}
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
//           );
//         })}
//       </div>

//       {/* Modal - Kept internal for state management */}
//       {showPostModal && (
//         <div className="modern-modal-overlay">
//           <div className="modern-modal glass">
//             <div className="modal-head">
//               <h3>Share Milestone</h3>
//               <button onClick={() => setShowPostModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handlePostSubmit}>
//               <div className="modal-body">
//                 <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
//                   <option value="Project Completion">Project Launch</option>
//                   <option value="Certification">Corporate Certification</option>
//                   <option value="Workshop">Industrial Workshop</option>
//                 </select>
//                 <input 
//                   type="text" 
//                   placeholder="Your Company Name" 
//                   className="modal-input" 
//                   value={newPost.companyName}
//                   onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
//                 />
//                 <textarea 
//                   placeholder="Share details..." 
//                   className="modal-textarea" 
//                   value={newPost.description}
//                   onChange={(e) => setNewPost({...newPost, description: e.target.value})} 
//                   required 
//                 />
//                 {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
//                 <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     setSelectedFile(file); 
//                     setPreviewUrl(URL.createObjectURL(file));
//                   }
//                 }} />
//                 <button type="submit" className="post-submit-btn">Post</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CompanyNetwork;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../styles/companyDashboard.css"; 
import "../../styles/Network.css"; 

function CompanyNetwork() {
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

  // UPDATED: Standardized search to use params object for reliability
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim().length > 2) {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/company/search`, {
          params: { name: query.trim() },
          headers: { Authorization: `Bearer ${token}` }
        });
        setSearchResults(res.data.data || []);
      } catch (err) { 
        console.error("Search error", err); 
      }
    } else {
      setSearchResults([]);
    }
  };

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [postRes, userRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/achievements`),
        axios.get(`${API_BASE_URL}/api/company/me`, config) 
      ]);
      
      setAchievements(postRes.data.data || []);
      // Ensure we extract IDs from the following list for string comparison
      const following = userRes.data?.data?.user?.following || [];
      setFollowingList(following.map(f => typeof f === 'object' ? f._id.toString() : f.toString()));
    } catch (err) { 
      console.error("Error fetching network data", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser(payload);
      } catch (e) { console.error("Token decoding failed", e); }
      fetchData();
    }
  }, [token]);

  // UPDATED: Optimized follow logic for immediate UI feedback
  const handleFollow = async (targetUserId) => {
    if (!targetUserId) return alert("User ID not found.");
    try {
      const res = await axios.put(`${API_BASE_URL}/api/company/follow/${targetUserId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.success) {
        const targetIdStr = targetUserId.toString();
        if (res.data.isFollowing) {
          setFollowingList(prev => [...prev, targetIdStr]);
        } else {
          setFollowingList(prev => prev.filter(id => id !== targetIdStr));
        }
      }
    } catch (err) {
      console.error("Follow error:", err);
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
    } catch (err) { 
      alert("Error posting milestone. Ensure category is valid."); 
    }
  };

  return (
    <div className="network-content-wrapper">
      {/* Search Bar */}
      <div className="search-container" style={{ marginBottom: '20px', position: 'relative' }}>
        <input 
          type="text" 
          placeholder="Search industrial partners..." 
          className="search-input glass"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.2)' }}
        />
        {searchResults.length > 0 && (
          <div className="search-dropdown glass" style={{ position: 'absolute', top: '50px', width: '100%', zIndex: 1000, borderRadius: '12px', overflow: 'hidden' }}>
            {searchResults.map(profile => {
              const targetId = profile.user?._id || profile._id;
              return (
                <div key={profile._id} className="search-item" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>{profile.name || profile.companyName || profile.user?.name}</span>
                  <button 
                    onClick={() => handleFollow(targetId)}
                    style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}
                  >
                    {followingList.includes(targetId.toString()) ? "✓ Connected" : "+ Connect"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Post Trigger */}
      <div className="post-trigger-box glass">
        <div className="user-avatar-small">{currentUser?.name?.charAt(0) || "C"}</div>
        <button onClick={() => setShowPostModal(true)}>Share a corporate update or industrial milestone...</button>
      </div>

      {/* Main Feed */}
      <div className="main-feed">
        {loading ? (
          <div className="network-loader">Loading Industrial Feed...</div>
        ) : achievements.length === 0 ? (
          <div className="no-posts">No updates yet.</div>
        ) : achievements.map((post) => {
          const postUserId = post.trainer?.user?._id || post.trainer?.user || post.trainer?._id || post.authorId;
          const isMe = postUserId === currentUser?.id;

          return (
            <div key={post._id} className="pro-post-card glass">
              <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div className="author-img-circle">{post.trainer?.name?.charAt(0) || post.companyName?.charAt(0) || "I"}</div>
                  <div className="author-details">
                    <strong style={{ display: 'block' }}>{post.trainer?.name || post.companyName || "Industrial Partner"}</strong>
                    <span className="post-meta-sub">{post.category} at {post.companyName || "Industrial Hub"}</span>
                  </div>
                </div>

                {!isMe && postUserId && (
                  <button 
                    onClick={() => handleFollow(postUserId)}
                    style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}
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

      {/* Modal */}
      {showPostModal && (
        <div className="modern-modal-overlay">
          <div className="modern-modal glass">
            <div className="modal-head">
              <h3>Share Milestone</h3>
              <button onClick={() => setShowPostModal(false)}>&times;</button>
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="modal-body">
                <select className="modal-select" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
                  <option value="Project Completion">Project Launch</option>
                  <option value="Certification">Corporate Certification</option>
                  <option value="Workshop">Industrial Workshop</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Your Company Name" 
                  className="modal-input" 
                  value={newPost.companyName}
                  onChange={(e) => setNewPost({...newPost, companyName: e.target.value})} 
                />
                <textarea 
                  placeholder="Share details..." 
                  className="modal-textarea" 
                  value={newPost.description}
                  onChange={(e) => setNewPost({...newPost, description: e.target.value})} 
                  required 
                />
                {previewUrl && <div className="modal-preview"><img src={previewUrl} alt="Preview" /></div>}
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => fileInputRef.current.click()}>📷 Photo</button>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedFile(file); 
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }} />
                <button type="submit" className="post-submit-btn">Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyNetwork;