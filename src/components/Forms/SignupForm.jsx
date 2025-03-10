import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "react-hot-toast";
import "./Forms.css";

const SignupForm = () => {
  const handleSubmit = () => {
    event.preventDefault();
    console.log("click registered");
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <label htmlFor="firstName">
          {" "}
          <b className="email-login">First Name</b>
        </label>
        <input
          className="email-input"
          type="text"
          placeholder="Enter First Name"
          name="email"
        />

        <label htmlFor="lastName">
          {" "}
          <b className="email-login">Last Name</b>
        </label>
        <input
          className="email-input"
          type="text"
          placeholder="Enter Last Name"
          name="email"
        />

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
        <label htmlFor="phoneNumber">
          {" "}
          <b className="email-login">Phone Number</b>
        </label>

        <input
          className="email-input"
          type="text"
          placeholder="Enter Phone Number"
          name="email"
        />
        <label htmlFor="profession">
          {" "}
          <b className="email-login">Profession</b>
        </label>

        <input
          className="email-input"
          type="text"
          placeholder="Enter Profession"
          name="email"
        />

        <label htmlFor="password">
          {" "}
          <b className="email-login">Password</b>
        </label>
        <input
          className="email-input"
          type="text"
          placeholder="Enter Password"
          name="email"
        />

        <label htmlFor="confirmPassword">
          {" "}
          <b className="email-login">Confirm Password</b>
        </label>
        <input
          className="email-input"
          type="text"
          placeholder="Confirm Password"
          name="email"
        />

        <button type="submit" className="signup-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
