import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainersDirectory() {
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/company/trainers", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrainers(res.data.data);
      } catch (err) { console.error("Error fetching trainers:", err); }
    };
    fetchTrainers();
  }, [token]);

  // Filter trainers based on search
  const filtered = trainers.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="applications-container">
      <input 
        type="text" 
        placeholder="Search trainers by name..." 
        className="form-input glass"
        style={{ marginBottom: '20px', width: '100%', padding: '10px' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map(t => (
          <div key={t._id} className="glass application-card" style={{ padding: '20px' }}>
            <h4>{t.name}</h4>
            <p><strong>Email:</strong> {t.email}</p>
            <p><strong>Phone:</strong> {t.phone}</p>
            <button className="btn-select" style={{ marginTop: '10px', width: '100%' }}>
              Invite to Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainersDirectory;