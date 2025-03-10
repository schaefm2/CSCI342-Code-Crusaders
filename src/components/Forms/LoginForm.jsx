import React, { useEffect, useState } from "react";
import "./Forms.css";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));
    const storedEmail = userData ? userData.email : null;
    const storedPassword = userData ? userData.password : null;

    console.log(email);
    console.log(password);

    if (email === storedEmail && password === storedPassword) {
      console.log("Login successful");
      // navigate to account page
      
    } else {
      console.log("Invalid email or password");
    }
    console.log("click registered");
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="container">
          <p>Need a Crusader Travels account?</p>
          <NavLink className="link" to="/signup">
            Create Account
          </NavLink>
        </div>

        <label htmlFor="email">
          <b className="email-login">Email</b>
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
          type="email"
          placeholder="Enter Email"
          name="email"
        />
        <label htmlFor="email">
          <b className="email-login">Password</b>
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="email-input"
          type="password"
          placeholder="Enter Password"
          name="email"
        />
        <div className="checkbox">
          <input type="checkbox" />
          <p className="px-20">Keep me Logged in</p>
        </div>
        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
