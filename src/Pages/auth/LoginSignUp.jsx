import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../auth/LoginSignUp.css";
import { useNavigate } from 'react-router-dom';

function LoginSignUp() {

  // For login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token); // Store token
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
      navigate('/home'); // Redirect to Dashboard
    } else {
      alert(data.message);
    }
  };



  const containerRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [activeForm, setActiveForm] = useState("login"); // "login" or "register"

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 600;
      setIsMobile(mobile);
      if (!mobile) {
        containerRef.current.classList.remove("active");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleToRegister = () => {
    if (isMobile) {
      setActiveForm("register");
    } else {
      containerRef.current.classList.add("active");
    }
  };

  const toggleToLogin = () => {
    if (isMobile) {
      setActiveForm("login");
    } else {
      containerRef.current.classList.remove("active");
    }
  };

  return (
    <div className="login-body">
      <div
        ref={containerRef}
        className={`login-container ${
          isMobile
            ? activeForm === "login"
              ? "login-active"
              : "register-active"
            : ""
        }`}
      >
        {/* Login Form */}
        <div className="form-container sign-in-container">
          <form action="http://localhost:5000/login" method="post">
            <h1 className="mb-4">Login</h1>
            <div className="form-group mb-3">
              <div className="input-icon">
                <FaUser />
                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="form-control"
                  name="username"
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="input-icon">
                <FaLock />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="form-control"
                  name="password"
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <select required className="form-select" defaultValue="" name="selectDepartment">
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="teacher">Teacher</option>
                <option value="staff">Staff</option>
                <option value="parent">Parent</option>
              </select>
            </div>
            <a
              href="#"
              className="text-muted small mb-3 d-block"
              data-bs-toggle="modal"
              data-bs-target="#forgotPasswordModal"
            >
              Forgot Password?
            </a>
            <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
          </form>

          {/* Toggle button below login form only on mobile */}
          {isMobile && (
            <button
              className="btn btn-outline-primary mt-3 w-100"
              onClick={toggleToRegister}
              type="button"
            >
              Register
            </button>
          )}
        </div>

        {/* Register Form */}
        <div className="form-container sign-up-container">
          <form action="http://localhost:5000/signup" method="post" style={{overflow:"scroll",height:"100%",scrollbarWidth:"none"}}>
            <h1 className="mb-4">Register</h1>
            <div className="form-group mb-3">
              <div className="input-icon">
                <FaUser />
                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="input-icon">
                <FaLock />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="form-group mb-3">
              <select required className="form-select" defaultValue="">
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
              </select>
            </div>
            <button className="btn btn-success w-100">Register</button>
          </form>

          {/* Toggle button below register form only on mobile */}
          {isMobile && (
            <button
              className="btn btn-outline-success mt-3 w-100"
              onClick={toggleToLogin}
              type="button"
            >
              Login
            </button>
          )}
        </div>

        {/* Overlay (only on desktop) */}
        {!isMobile && (
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h2>Welcome Back!</h2>
                <p>If you already have an account, login here.</p>
                <button className="btn btn-outline-light mt-3" onClick={toggleToLogin}>
                  Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2>Hello, Friend!</h2>
                <p>If you're new here, register and get started.</p>
                <button className="btn btn-outline-light mt-3" onClick={toggleToRegister}>
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotPasswordModalLabel">
                Forgot Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Enter your email address to receive a password reset link:</p>
              <input type="email" placeholder="Email Address" className="form-control" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
