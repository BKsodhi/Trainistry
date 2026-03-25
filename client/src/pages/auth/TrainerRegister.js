// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/auth.css";

// function TrainerRegister() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     expertise: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           role: "trainer",   // IMPORTANT
//           expertise: formData.expertise
//         }
//       );

//       alert("Registration successful!");

//       navigate("/login");

//     } catch (error) {
//       console.error("Register error:", error);

//       setError(
//         error.response?.data?.message ||
//         "Registration failed"
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="auth-page">
//       <div className="form-card">

//         <div className="summary-bar">
//           👨‍🏫 Trainer Account
//           <span onClick={() => navigate("/select-account")}>
//             Change
//           </span>
//         </div>

//         {error && (
//           <div style={{ color: "red", marginBottom: "10px" }}>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             className="input"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="input"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="input"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="text"
//             name="expertise"
//             placeholder="Area of Expertise"
//             className="input"
//             value={formData.expertise}
//             onChange={handleChange}
//             required
//           />

//           <button
//             type="submit"
//             className="btn-full"
//             disabled={loading}
//           >
//             {loading ? "Creating..." : "Create Account"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }

// export default TrainerRegister;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth.css";

function TrainerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "", // ADDED
    expertise: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role: "trainer"
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="form-card">
        <div className="summary-bar">👨‍🏫 Trainer Account <span onClick={() => navigate("/select-account")}>Change</span></div>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" className="input" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="input" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="input" value={formData.password} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" className="input" value={formData.phone} onChange={handleChange} required />
          <input type="text" name="expertise" placeholder="Area of Expertise" className="input" value={formData.expertise} onChange={handleChange} required />
          <button type="submit" className="btn-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        </form>
      </div>
    </div>
  );
}

export default TrainerRegister;