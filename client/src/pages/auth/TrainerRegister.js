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
//     phone: "", // ADDED
//     expertise: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", {
//         ...formData,
//         role: "trainer"
//       });
//       alert("Registration successful!");
//       navigate("/login");
//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="auth-page">
//       <div className="form-card">
//         <div className="summary-bar">👨‍🏫 Trainer Account <span onClick={() => navigate("/select-account")}>Change</span></div>
//         {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Full Name" className="input" value={formData.name} onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Email" className="input" value={formData.email} onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" className="input" value={formData.password} onChange={handleChange} required />
//           <input type="text" name="phone" placeholder="Phone Number" className="input" value={formData.phone} onChange={handleChange} required />
//           <input type="text" name="expertise" placeholder="Area of Expertise" className="input" value={formData.expertise} onChange={handleChange} required />
//           <button type="submit" className="btn-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default TrainerRegister;

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
//     phone: "", // ADDED
//     expertise: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", {
//         ...formData,
//         role: "trainer"
//       });
//       alert("Registration successful!");
//       navigate("/login");
//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="auth-page">
//       <div className="form-card">
//         <div className="summary-bar">👨‍🏫 Trainer Account <span onClick={() => navigate("/select-account")}>Change</span></div>
//         {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Full Name" className="input" value={formData.name} onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Email" className="input" value={formData.email} onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" className="input" value={formData.password} onChange={handleChange} required />
//           <input type="text" name="phone" placeholder="Phone Number" className="input" value={formData.phone} onChange={handleChange} required />
//           <input type="text" name="expertise" placeholder="Area of Expertise" className="input" value={formData.expertise} onChange={handleChange} required />
//           <button type="submit" className="btn-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
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
    phone: "",
    expertise: "", // Input as comma-separated string
    experienceYears: "",
    location: ""
  });
  const [verificationDoc, setVerificationDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationDoc) return setError("Please upload a verification document.");
    
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("phone", formData.phone);
      data.append("role", "trainer");
      data.append("expertise", formData.expertise); // Backend handles .split(',')
      data.append("experienceYears", formData.experienceYears);
      data.append("location", formData.location);
      data.append("verificationDoc", verificationDoc);

      await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Trainer Registration Successful! Pending Admin Review.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-card glass">
        <div className="summary-bar">👨‍🏫 Trainer Account <span onClick={() => navigate("/select-account")}>Change</span></div>
        <h2>Join as a Trainer</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name (e.g. Arjan Singh)" className="input" onChange={handleChange} required />
          <div className="input-group">
            <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" className="input" onChange={handleChange} required />
          </div>
          <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />
          <input type="text" name="expertise" placeholder="Key Expertise (React, AWS, Java...)" className="input" onChange={handleChange} required />
          <input type="number" name="experienceYears" placeholder="Years of Experience" className="input" onChange={handleChange} required />
          <input type="text" name="location" placeholder="City, Country" className="input" onChange={handleChange} required />
          
          <div className="file-input-group">
            <label>Upload Certification / ID Proof</label>
            <input type="file" accept=".pdf,image/*" onChange={(e) => setVerificationDoc(e.target.files[0])} required />
          </div>

          <button type="submit" className="btn-full" disabled={loading}>{loading ? "Processing..." : "Create Trainer Account"}</button>
        </form>
      </div>
    </div>
  );
}

export default TrainerRegister;