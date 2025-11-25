import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";
import { AuthContext } from "../AuthContext.jsx";

const elasticIP =  import.meta.env.REACT_APP_API_URL || "http://54.226.0.228:3000";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (formData.password !== formData.confirmPassword) {
      window.alert("Passwords do not match!");
      setMessage("Error: Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${elasticIP}/signup`, formData);

      if (res.status === 201) {
        window.alert("Signup Successful!");
        setMessage("Signup Successful! Redirecting...");
        setFormData({
          name: "",
          email: "",
          address: "",
          password: "",
          confirmPassword: ""
        });

        // Automatically sign in the user after successful signup
        signIn(res.data.user);

        navigate("/homepage");
      } else {
        window.alert("Something went wrong. Please try again.");
        setMessage("Signup failed: Unexpected response.");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      window.alert("Signup Failed: " + errorMsg);
      setMessage("Signup Failed: " + errorMsg);
    }
  };

  return (
    // Applied main-split class for CSS layout
    <div className="mainDiv main-split"> 
      
      {/* Left Side: Form Container */}
      <div id="signup" className="signup-form-container"> 
        <h1>Welcome To Our Store!</h1>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          {/* Removed <br /><br /> tags */}
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="signupButton">Create Account</button>
          <p className="login">
            Already have an account? <Link to="/SignIn">Sign In</Link>
          </p>
        </form>
        {message && <p className="status-message">{message}</p>}

      </div>
      
      {/* Right Side: Info Panel (Split Screen) */}
      <div className="rightDiv">
        <h1>START YOUR JOURNEY</h1>
        <p>A simple and fast shopping experience awaits you.</p>
      </div>
    </div>
  );
};

export default Signup;