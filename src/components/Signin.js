import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };

      let response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      let json = await response.json();
      console.log(json);

      if (response.ok) {
        alert(json.msg); // Show success message
        localStorage.setItem("isAuthenticated", "true"); // Set auth status
        navigate("/"); // Redirect to the Home page
      } else {
        alert(json.msg); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      {/* Login Form */}
      <div className="form-section">
        <div className="welcome-text">
          <h2>Welcome back!</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signin-button">
            SIGN IN
          </button>
        </form>
        <p className="signin-text">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
