import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("trainer");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Trainer fields
  const [expertise, setExpertise] = useState("");

  // Company fields
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      let payload = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        role
      };

      // Trainer payload
      if (role === "trainer") {
        payload.expertise = expertise.trim();
      }

      // Company payload
      if (role === "company") {
        payload.industry = industry.trim();
        payload.location = location.trim();
        payload.description = description.trim();
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload
      );

      console.log("Register Success:", response.data);

      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (err) {
      console.error("Register Error:", err);

      setError(
        err?.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-card">

        <h2>Create Account</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Account Type Selection */}

          <div className="account-options">

            <div
              className={`account-card ${role === "trainer" ? "selected" : ""}`}
              onClick={() => setRole("trainer")}
            >
              <h3>Trainer</h3>
              <p>Provide training sessions</p>
            </div>

            <div
              className={`account-card ${role === "company" ? "selected" : ""}`}
              onClick={() => setRole("company")}
            >
              <h3>Company</h3>
              <p>Hire trainers for projects</p>
            </div>

          </div>

          {/* Trainer Fields */}

          {role === "trainer" && (
            <input
              type="text"
              placeholder="Expertise (React, Java, Python...)"
              className="input"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
            />
          )}

          {/* Company Fields */}

          {role === "company" && (
            <>
              <input
                type="text"
                placeholder="Industry"
                className="input"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Location"
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <textarea
                placeholder="Company Description"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="btn-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </div>

      </div>
    </div>
  );
};

export default Register;