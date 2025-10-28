import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import "./login.css";
import { apiFetch } from "../../utility/Api.js";
import { ApiContext } from "../../App.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const apiFetch = useContext(ApiContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError("");
    const { email, password } = formData;

    try {
      const credentials = btoa(`${email}:${password}`);
      const response = await fetch(`http://localhost:3000/login`, {

        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please check your credentials.");
        return;
      }else{
        window.alert("Login Successful!");
      }

      signIn(data.user); 
      navigate("/homepage");
    } catch (err) {
      console.error(err);
      setError("Error signing in. Please try again.");
    }
  };

  return (
    <div className="mainDiv">
      <div id="signin">
      <h1 className="welcome">Welcome Back!</h1>
        <h3>Sign In</h3>
        <form onSubmit={handleSignIn}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="name@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
          <p>
            Don't have an account? <Link to="/SignUp">Sign Up</Link>
          </p>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;