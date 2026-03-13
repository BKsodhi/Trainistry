// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/auth.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, role, _id } = res.data;

//       // Store JWT token & role
//       localStorage.setItem("token", token);
//       localStorage.setItem("userRole", role);

//       // ✅ Store companyId only if role is company
//       if (role === "company") localStorage.setItem("companyId", _id);

//       // ✅ Optionally store trainerId if role is trainer
//       if (role === "trainer") localStorage.setItem("trainerId", _id);

//       // Set Axios default Authorization header
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       // Redirect based on role
//       if (role === "trainer") navigate("/trainer-dashboard");
//       else if (role === "company") navigate("/company-dashboard");
//       else navigate("/dashboard");
//     } catch (err) {
//       console.error("Login Error:", err.response || err);
//       setError(
//         err.response?.data?.message ||
//           "Something went wrong. Please try again later."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="form-card">
//         <h2>Login</h2>

//         {error && (
//           <div
//             style={{ color: "red", marginBottom: "15px", textAlign: "center" }}
//           >
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input"
//             required
//           />
//           <button type="submit" className="btn-full" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="auth-footer">
//           Don't have an account?{" "}
//           <span onClick={() => navigate("/select-account")}>Register</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, role, userId, companyId, trainerId } = res.data;

      // Save token
      localStorage.setItem("token", token);

      // Save role
      localStorage.setItem("userRole", role);

      // Save userId
      if (userId) {
        localStorage.setItem("userId", userId);
      }

      // Save company profile id
      if (role === "company" && companyId) {
        localStorage.setItem("companyId", companyId);
      }

      // Save trainer profile id
      if (role === "trainer" && trainerId) {
        localStorage.setItem("trainerId", trainerId);
      }

      // Set axios default auth header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      // Redirect user
      if (role === "trainer") {
        navigate("/trainer-dashboard");
      } else if (role === "company") {
        navigate("/company-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err.response || err);

      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-card">
        <h2>Login</h2>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />

          <button
            type="submit"
            className="btn-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/select-account")}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;