// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/auth.css";

// function CompanyRegister() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     companyName: ""
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
//           name: formData.name.trim(),
//           email: formData.email.trim(),
//           password: formData.password.trim(),
//           role: "company",                 // IMPORTANT
//           industry: "General",
//           location: "India",
//           description: formData.companyName.trim()
//         }
//       );

//       console.log("Company registered:", res.data);

//       alert("Company registration successful! Please login.");

//       navigate("/login");

//     } catch (error) {

//       console.error("Registration error:", error);

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
//           🏢 Company Account
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
//             placeholder="Contact Name"
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
//             name="companyName"
//             placeholder="Company Name"
//             className="input"
//             value={formData.companyName}
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

// export default CompanyRegister;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/auth.css";

// function CompanyRegister() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "", // ADDED
//     companyName: ""
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
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone,
//         role: "company",
//         industry: "General",
//         location: "India",
//         description: formData.companyName
//       });
//       alert("Company registration successful!");
//       navigate("/login");
//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="auth-page">
//       <div className="form-card">
//         <div className="summary-bar">🏢 Company Account <span onClick={() => navigate("/select-account")}>Change</span></div>
//         {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Contact Name" className="input" value={formData.name} onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Email" className="input" value={formData.email} onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" className="input" value={formData.password} onChange={handleChange} required />
//           <input type="text" name="phone" placeholder="Phone Number" className="input" value={formData.phone} onChange={handleChange} required />
//           <input type="text" name="companyName" placeholder="Company Name" className="input" value={formData.companyName} onChange={handleChange} required />
//           <button type="submit" className="btn-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CompanyRegister;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/auth.css";

// function CompanyRegister() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     companyName: ""
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
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone,
//         role: "company",
//         industry: "General",
//         location: "India",
//         description: formData.companyName
//       });

//       alert("Company registration successful!");
//       navigate("/login");

//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="auth-page">
//       <div className="form-card">

//         <div className="summary-bar">
//           🏢 Company Account 
//           <span onClick={() => navigate("/select-account")}>Change</span>
//         </div>

//         <h2>Create Company Account</h2>
//         <p>Register your organization and start posting training projects</p>

//         {error && <div className="auth-error">{error}</div>}

//         <form onSubmit={handleSubmit}>

//           <input
//             type="text"
//             name="name"
//             placeholder="Contact Name"
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
//             name="phone"
//             placeholder="Phone Number"
//             className="input"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="text"
//             name="companyName"
//             placeholder="Company Name"
//             className="input"
//             value={formData.companyName}
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

// export default CompanyRegister;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/auth.css";

// function CompanyRegister() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     companyName: "",
//     industry: "",
//     gstNumber: "",
//     location: "",
//     website: "",
//     name: "",
//     email: "",
//     password: "",
//     phone: ""
//   });
//   const [registrationDoc, setRegistrationDoc] = useState(null);
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
//       const data = new FormData();
//       // Explicitly append to ensure order and key accuracy
//       data.append("companyName", formData.companyName);
//       data.append("industry", formData.industry);
//       data.append("gstNumber", formData.gstNumber);
//       data.append("location", formData.location);
//       data.append("website", formData.website);
//       data.append("name", formData.name);
//       data.append("email", formData.email.toLowerCase());
//       data.append("password", formData.password);
//       data.append("phone", formData.phone);
//       data.append("role", "company");
      
//       if (registrationDoc) {
//         data.append("verificationDoc", registrationDoc);
//       }

//       const response = await axios.post("http://localhost:5000/api/auth/register", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if (response.data.success) {
//         alert("Registration Successful!");
//         navigate("/login");
//       }
//     } catch (err) {
//       console.error("Submission Error:", err.response?.data);
//       setError(err.response?.data?.message || "Server Error. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="form-card glass">
//         <div className="summary-bar">🏢 Company Account <span onClick={() => navigate("/select-account")} style={{cursor:'pointer', textDecoration:'underline'}}>Change</span></div>
//         <h2>Register Organization</h2>
//         {error && <p style={{color: '#ff4d4d', fontSize: '14px'}}>{error}</p>}
        
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <input type="text" name="companyName" placeholder="Organization Name" className="input" onChange={handleChange} required />
//           <div className="input-group">
//             <input type="text" name="industry" placeholder="Industry (e.g., IT)" className="input" onChange={handleChange} required />
//             <input type="text" name="gstNumber" placeholder="GST Number" className="input" onChange={handleChange} required />
//           </div>
//           <input type="text" name="location" placeholder="Headquarters Location" className="input" onChange={handleChange} required />
//           <input type="text" name="website" placeholder="Website (Optional)" className="input" onChange={handleChange} />
          
//           <hr className="divider" />
//           <p className="section-label">Primary Contact Details:</p>
          
//           <input type="text" name="name" placeholder="Contact Full Name" className="input" onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Work Email" className="input" onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />
//           <input type="text" name="phone" placeholder="Contact Phone" className="input" onChange={handleChange} required />

//           <div className="file-input-group">
//             <label>Upload Business Registration (PDF/Image)</label>
//             <input type="file" accept=".pdf,image/*" onChange={(e) => setRegistrationDoc(e.target.files[0])} required />
//           </div>

//           <button type="submit" className="btn-full" disabled={loading}>
//             {loading ? "Registering..." : "Create Account"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CompanyRegister;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth.css";

function CompanyRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "", industry: "", gstNumber: "",
    location: "", website: "", name: "",
    email: "", password: "", phone: ""
  });
  const [registrationDoc, setRegistrationDoc] = useState(null);
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
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append("role", "company");
      
      // THIS KEY MUST MATCH Multer's upload.single('verificationDoc')
      if (registrationDoc) {
        data.append("verificationDoc", registrationDoc);
      }

      const response = await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        alert("Registration Successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-card glass">
        <h2>Register Organization</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="companyName" placeholder="Organization Name" className="input" onChange={handleChange} required />
          <input type="text" name="gstNumber" placeholder="GST Number" className="input" onChange={handleChange} required />
          <input type="text" name="industry" placeholder="Industry" className="input" onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" className="input" onChange={handleChange} required />
          
          <hr />
          <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" className="input" onChange={handleChange} required />
          <input type="text" name="name" placeholder="Full Name" className="input" onChange={handleChange} required />

          <div className="file-input-group">
            <label>Upload Business Registration (PDF/Image)</label>
            <input 
               type="file" 
               accept=".pdf,image/*" 
               onChange={(e) => setRegistrationDoc(e.target.files[0])} 
               required 
            />
          </div>

          <button type="submit" className="btn-full" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompanyRegister;