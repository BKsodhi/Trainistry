import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/companyDashboard.css";

function CompanyNetwork() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNetworkFeed = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trainer/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data || [];
        setPosts(data);
        setFilteredPosts(data); // Initial view shows all
      } catch (error) {
        console.error("Error fetching network feed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNetworkFeed();
  }, [token]);

  // Handle Real-time Filtering
  useEffect(() => {
    const results = posts.filter(post => 
      post.trainer?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.trainer?.expertise?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  if (loading) return <div className="loader">Loading Industrial Feed...</div>;

  return (
    <div className="network-container">
      {/* Search Bar Header */}
      <div className="dashboard-card glass" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Industrial Talent Feed</h2>
          <p style={{ color: '#666', margin: '5px 0 0 0' }}>Discover and connect with experts.</p>
        </div>
        
        <div className="search-box" style={{ flex: '1', maxWidth: '400px', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search by skill, name, or topic (e.g. Java, MERN)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              outline: 'none',
              fontSize: '0.95rem'
            }}
          />
          {searchTerm && (
            <span 
              onClick={() => setSearchTerm("")} 
              style={{ position: 'absolute', right: '15px', top: '12px', cursor: 'pointer', color: '#999' }}
            >
              ✕
            </span>
          )}
        </div>
      </div>

      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          <div className="dashboard-card glass" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#888' }}>No results found for "{searchTerm}"</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post._id} className="post-card glass" style={{ marginBottom: '20px', padding: '20px' }}>
              <div className="post-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="avatar-circle" style={{ 
                  width: '45px', height: '45px', borderRadius: '50%', 
                  backgroundColor: '#2563eb', color: 'white', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                }}>
                  {post.trainer?.user?.name?.charAt(0) || "T"}
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>{post.trainer?.user?.name}</h4>
                  <small style={{ color: '#2563eb', fontWeight: '600' }}>{post.trainer?.expertise}</small>
                </div>
              </div>

              <div className="post-body" style={{ margin: '15px 0', lineHeight: '1.6', color: '#333' }}>
                <p>{post.content}</p>
              </div>

              <div className="post-footer" style={{ borderTop: '1px solid #eee', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>
                  📅 {new Date(post.createdAt).toLocaleDateString('en-IN')}
                </span>
                <button 
                  className="btn-link" 
                  style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => window.location.href = `/company/trainer-profile/${post.trainer?._id}`}
                >
                  View Full Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CompanyNetwork;