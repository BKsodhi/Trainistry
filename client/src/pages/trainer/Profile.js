// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/TrainerDashboard.css"; 

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false); 
  
//   const [editData, setEditData] = useState({
//     bio: "",
//     location: "",
//     expertise: "", 
//     experienceYears: 0,
//     availability: "available"
//   });
  
//   const [resumeFile, setResumeFile] = useState(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/trainer/me", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfile(res.data.data);
//       } catch (err) {
//         console.error("Error fetching profile", err);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [token, navigate]);

//   const openEditModal = () => {
//     // Safety check: handle cases where expertise might still be a string in DB
//     const expertiseValue = Array.isArray(profile.expertise) 
//       ? profile.expertise.join(", ") 
//       : (profile.expertise || "");

//     setEditData({
//       bio: profile.bio || "",
//       location: profile.location || "",
//       expertise: expertiseValue,
//       experienceYears: profile.experienceYears || 0,
//       availability: profile.availability || "available"
//     });
//     setResumeFile(null); 
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setIsUpdating(true);

//     try {
//       const formData = new FormData();
//       formData.append("bio", editData.bio);
//       formData.append("location", editData.location);
//       formData.append("experienceYears", Number(editData.experienceYears) || 0);
//       formData.append("availability", editData.availability);
      
//       // Convert text input to actual Array for the backend
//       const expertiseArray = editData.expertise
//         .split(",")
//         .map(item => item.trim())
//         .filter(item => item !== "");
      
//       // Stringify the array so Multer/Body-Parser handles it as a single field
//       formData.append("expertise", JSON.stringify(expertiseArray));

//       if (resumeFile) {
//         formData.append("resume", resumeFile);
//       }

//       const config = { 
//         headers: { 
//           Authorization: `Bearer ${token}` 
//           // Browser automatically sets multipart/form-data boundary
//         } 
//       };

//       const res = await axios.put("http://localhost:5000/api/trainer/profile", formData, config);
      
//       setProfile(res.data.data); 
//       setIsEditModalOpen(false);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Update failed", err.response?.data || err);
//       alert(err.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   if (loading) return <div className="loader">Loading Profile...</div>;
//   if (!profile) return (
//     <div className="error-container">
//       <p>Profile not found.</p>
//       <button onClick={() => navigate("/login")}>Go to Login</button>
//     </div>
//   );

//   return (
//     <div className="trainer-dashboard">
//       <aside className="sidebar">
//         <div className="logo">Trainistry</div>
//         <nav>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
//           <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
//           <button className="sidebar-btn active">My Profile</button>
//         </nav>
//         <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
//       </aside>

//       <main className="main-content">
//         <header className="header-section">
//           <h1>My Professional Profile</h1>
//           <button className="apply-btn" style={{width: 'auto'}} onClick={openEditModal}>Edit Profile</button>
//         </header>

//         <div className="profile-layout">
//           <div className="stat-card glass profile-main-card">
//             <div className="profile-header-flex">
//               <div className="profile-avatar-circle">{profile.user?.name?.charAt(0) || "T"}</div>
//               <div className="profile-intro">
//                 <h2>{profile.user?.name}</h2>
//                 <div className="expertise-tags" style={{ marginTop: '5px' }}>
//                     {Array.isArray(profile.expertise) 
//                       ? profile.expertise.map((skill, i) => (
//                           <span key={i} className="skill-badge" style={{ marginRight: '5px', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
//                             {skill}
//                           </span>
//                         )) 
//                       : (profile.expertise || "No expertise listed")}
//                 </div>
//                 <p className="location-info" style={{ marginTop: '8px' }}>📍 {profile.location || "City, India"}</p>
//               </div>
//               <div className="social-stats">
//                 <div className="stat-pill like">👍 {profile.likes || 0}</div>
//                 <div className="stat-pill dislike">👎 {profile.dislikes || 0}</div>
//               </div>
//             </div>
//           </div>

//           <div className="profile-grid">
//             <div className="profile-left">
//               <section className="stat-card glass bio-section">
//                 <h3>About Me</h3>
//                 <p>{profile.bio || "Click Edit to add your professional summary."}</p>
//               </section>

//               <section className="stat-card glass feedback-section">
//                 <h3>Student Feedback</h3>
//                 <div className="feedback-list">
//                   {profile.feedbacks && profile.feedbacks.length > 0 ? (
//                     profile.feedbacks.map((f, index) => (
//                       <div key={index} className="feedback-card">
//                         <p className="feedback-text">"{f.comment}"</p>
//                         <div className="feedback-meta">
//                            <span className="student-name">— {f.sender?.name || "Verified User"}</span>
//                            <span className="feedback-date">{f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "Recent"}</span>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="empty-state"><p>No feedback received yet.</p></div>
//                   )}
//                 </div>
//               </section>
//             </div>

//             <div className="profile-right">
//                 <div className="stat-card glass detail-box">
//                     <h3>Quick Details</h3>
//                     <div className="info-row">
//                         <span className="label">Experience</span>
//                         <span className="value">{profile.experienceYears || 0} Years</span>
//                     </div>
//                     <div className="info-row">
//                         <span className="label">Status</span>
//                         <span className={`value status-text ${profile.availability}`}>
//                             {profile.availability === 'available' ? 'Available' : 'Busy'}
//                         </span>
//                     </div>
//                     <hr className="divider" />
//                     <div className="resume-section">
//                         <span className="label">Professional Resume</span>
//                         {profile.resumeUrl ? (
//                             <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="view-resume-link" style={{display: 'block', marginTop: '10px', color: '#007bff'}}>
//                                 📄 View Current Resume
//                             </a>
//                         ) : (
//                             <p style={{fontSize: '13px', color: 'gray', marginTop: '10px'}}>No resume uploaded.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {isEditModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content glass">
//             <h3>Edit Professional Profile</h3>
//             <form onSubmit={handleUpdateProfile}>
//               <div className="form-group">
//                 <label>Expertise (comma separated)</label>
//                 <input type="text" value={editData.expertise} onChange={(e) => setEditData({...editData, expertise: e.target.value})} placeholder="e.g. Java, React, Node.js" />
//               </div>
//               <div className="form-group">
//                 <label>Location</label>
//                 <input type="text" value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} />
//               </div>
//               <div className="form-group">
//                 <label>Years of Experience</label>
//                 <input type="number" value={editData.experienceYears} onChange={(e) => setEditData({...editData, experienceYears: e.target.value})} />
//               </div>
//               <div className="form-group">
//                 <label>Bio</label>
//                 <textarea rows="4" value={editData.bio} onChange={(e) => setEditData({...editData, bio: e.target.value})} />
//               </div>
//               <div className="form-group">
//                 <label>Upload New Resume (PDF only)</label>
//                 <input type="file" accept=".pdf" style={{marginTop: '5px'}} onChange={(e) => setResumeFile(e.target.files[0])} />
//               </div>
//               <div className="modal-actions">
//                 <button type="button" className="logout-btn" style={{marginTop: 0}} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
//                 <button type="submit" className="apply-btn" disabled={isUpdating}>
//                   {isUpdating ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/TrainerDashboard.css"; 

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); 
  
  const [editData, setEditData] = useState({
    bio: "",
    location: "",
    expertise: "", 
    experienceYears: 0,
    availability: "available"
  });
  
  const [resumeFile, setResumeFile] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trainer/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const openEditModal = () => {
    const expertiseValue = Array.isArray(profile.expertise) 
      ? profile.expertise.join(", ") 
      : (profile.expertise || "");

    setEditData({
      bio: profile.bio || "",
      location: profile.location || "",
      expertise: expertiseValue,
      experienceYears: profile.experienceYears || 0,
      availability: profile.availability || "available"
    });
    setResumeFile(null); 
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("bio", editData.bio);
      formData.append("location", editData.location);
      formData.append("experienceYears", Number(editData.experienceYears) || 0);
      formData.append("availability", editData.availability);
      
      const expertiseArray = editData.expertise
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");
      
      formData.append("expertise", JSON.stringify(expertiseArray));

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const config = { 
        headers: { 
          Authorization: `Bearer ${token}` 
        } 
      };

      const res = await axios.put("http://localhost:5000/api/trainer/profile", formData, config);
      
      setProfile(res.data.data); 
      setIsEditModalOpen(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="loader">Loading Profile...</div>;
  if (!profile) return (
    <div className="error-container">
      <p>Profile not found.</p>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );

  return (
    <div className="trainer-dashboard">
      <aside className="sidebar">
        <div className="logo">Trainistry</div>
        <nav>
          <button className="sidebar-btn" onClick={() => navigate("/trainer-dashboard")}>Find Projects</button>
          <button className="sidebar-btn" onClick={() => navigate("/trainer/applications")}>Applications</button>
          <button className="sidebar-btn active">My Profile</button>
        </nav>
        <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
      </aside>

      <main className="main-content">
        <header className="header-section">
          <h1>My Professional Profile</h1>
          <button className="apply-btn" style={{width: 'auto'}} onClick={openEditModal}>Edit Profile</button>
        </header>

        <div className="profile-layout">
          <div className="stat-card glass profile-main-card">
            <div className="profile-header-flex">
              <div className="profile-avatar-circle">
                {profile.user?.name?.charAt(0) || "T"}
              </div>
              <div className="profile-intro">
                <h2>{profile.user?.name || "Professional Trainer"}</h2>
                <div className="expertise-tags" style={{ marginTop: '5px' }}>
                    {Array.isArray(profile.expertise) 
                      ? profile.expertise.map((skill, i) => (
                          <span key={i} className="skill-badge" style={{ marginRight: '5px', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                            {skill}
                          </span>
                        )) 
                      : (profile.expertise || "No expertise listed")}
                </div>
                <p className="location-info" style={{ marginTop: '8px' }}>📍 {profile.location || "City, India"}</p>
              </div>
              <div className="social-stats">
                <div className="stat-pill like">👍 {profile.likes || 0}</div>
                <div className="stat-pill dislike">👎 {profile.dislikes || 0}</div>
              </div>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-left">
              <section className="stat-card glass bio-section">
                <h3>About Me</h3>
                <p>{profile.bio || "Click Edit to add your professional summary."}</p>
              </section>

              <section className="stat-card glass feedback-section">
                <h3>Company Feedback</h3>
                <div className="feedback-list">
                  {profile.feedbacks && profile.feedbacks.length > 0 ? (
                    profile.feedbacks.map((f, index) => (
                      <div key={index} className="feedback-card">
                        <p className="feedback-text">"{f.comment}"</p>
                        <div className="feedback-meta">
                           <span className="student-name">— {f.sender?.name || "Verified Client"}</span>
                           <span className="feedback-date">{f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "Recent"}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state"><p>No company reviews received yet.</p></div>
                  )}
                </div>
              </section>
            </div>

           <div className="profile-right">
            <div className="stat-card glass detail-box">
                <h3>Quick Details</h3>
                
                <div className="info-row" style={{ marginBottom: '20px' }}>
                <span className="label">Current Status</span>
                {/* Dynamic Status Button */}
                <button className={`status-pill-btn ${profile.availability}`}>
                    <span className="status-dot"></span>
                    {profile.availability === 'available' ? 'Available for Hire' : 'Currently Busy'}
                </button>
                </div>

                <div className="info-row">
                <div className="detail-item">
                    <span className="label">Experience</span>
                    <span className="value-large">{profile.experienceYears || 0} <small>Years</small></span>
                </div>
                </div>

                <hr className="divider" />

                <div className="resume-section">
                <span className="label" style={{ display: 'block', marginBottom: '12px' }}>Professional Resume</span>
                {profile.resumeUrl ? (
                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-download-btn">
                    <span>📄</span> View Document
                    </a>
                ) : (
                    <div className="resume-placeholder">No resume uploaded</div>
                )}
                </div>
            </div>
            </div>
          </div>
        </div>
      </main>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <h3>Edit Professional Profile</h3>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label>Expertise (comma separated)</label>
                <input type="text" value={editData.expertise} onChange={(e) => setEditData({...editData, expertise: e.target.value})} placeholder="e.g. Java, React, Node.js" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Years of Experience</label>
                <input type="number" value={editData.experienceYears} onChange={(e) => setEditData({...editData, experienceYears: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea rows="4" value={editData.bio} onChange={(e) => setEditData({...editData, bio: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Upload New Resume (PDF only)</label>
                <input type="file" accept=".pdf" style={{marginTop: '5px'}} onChange={(e) => setResumeFile(e.target.files[0])} />
              </div>
              <div className="modal-actions">
                <button type="button" className="logout-btn" style={{marginTop: 0}} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="apply-btn" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;