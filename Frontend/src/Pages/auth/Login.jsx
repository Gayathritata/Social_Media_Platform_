import './Login.css';
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import exploreBg from '../../assets/explore-bg.mp4';
import socialLogo from '../../assets/social-logo.png';

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation (can be removed if testing)
    if (emailRef.current.value && passwordRef.current.value) {
      navigate("/AppLayout");
    } else {
      navigate("/AppLayout"); // Fallback for now based on user action, or alert
      // alert("Please enter both email and password.");
    }
  }

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (nextRef) {
        nextRef.current.focus(); // Move to next input
      } else {
        handleLogin(e); // If no next input, try login
      }
    }
  };

  return (
    <div className="login-container split-screen">
      {/* Left Pane - Video & Branding */}
      <div className="left-pane">
        <video className="bg-video" autoPlay loop muted playsInline>
          <source src={exploreBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <div className="logo-area">
            <img src={socialLogo} alt="Logo" />
          </div>
          <div className="brand-text">
            <h1>Synergy</h1>
            <p>Connect with the world around you.</p>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="right-pane">
        <div className="auth-box">
          <div className="auth-header">
            <h2>Welcome Back</h2>
          </div>

          <form>
            <div className="form-group">
              <label>Email Address</label>
              <input
                ref={emailRef}
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
                onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
                onKeyDown={(e) => handleKeyDown(e, null)}
              />
            </div>

            <button className="btn-primary" onClick={handleLogin}>Log In</button>
          </form>

          <div className="auth-footer">
            <p>
              Don’t have an account? <Link to="/register">Register here</Link>
            </p>
            <p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
