import React, { useEffect, useState } from "react";
import "./Forms.css";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
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
          {" "}
          <b className="email-login">Email</b>
        </label>
        <input
          className="email-input"
          type="text"
          placeholder="Enter Email"
          name="email"
        />
        <label htmlFor="email">
          {" "}
          <b className="email-login">Password</b>
        </label>
        <input
          className="email-input"
          type="text"
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
