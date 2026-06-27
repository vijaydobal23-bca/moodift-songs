import React, { useState } from "react";
import "../style/register.scss";

import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterArtist = () => {
  const { loading, handleRegisterArtist } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegisterArtist({ username, email, password });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register as Artist</h1>
        <p style={{ color: "#b3b3b3", marginBottom: "20px" }}>
          Join Moodify to upload and share your own songs with the world.
        </p>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Artist Username"
            placeholder="Enter artist name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></FormGroup>

          <FormGroup
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormGroup>

          <FormGroup
            label="Password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormGroup>

          <button className="button" disabled={loading}>
            {loading ? "Registering..." : "Register as Artist"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          Just looking to listen? <Link to="/register">Sign up as a regular user</Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterArtist;
