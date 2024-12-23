import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let data = {
        "name": name,
        "email": email,
        "password": password,
      };
  
      let response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      let json = await response.json();
      console.log(json);
  
      if (response.ok) {
        alert(json.message); // Show success message
      } else {
        alert(json.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };
  
  

  return (
    <div className="signup-container">
      <div className="signup-body">
        <h1 className="welcome-text">Welcome to MealMate!</h1>
        <form className="input-container" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input-field"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>
        <p className="signup-text">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
