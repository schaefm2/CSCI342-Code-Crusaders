import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "react-hot-toast";
import "./Forms.css";

const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .nonempty({ message: "Email is required" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    profession: z.string().min(1, { message: "Profession is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data) => {
    if(data.password !== data.confirmPassword){
      toast.error("Passwords do not match")
    }

    try{
      setIsLoading(true);
  
      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(response => {
        if(response.ok){
          toast.success("Signup successful. Please login.");
          navigate("/login");
        }
      })
      .catch(err => {
        console.log(err);
        toast.error("An error occurred during signup.");
      })
    }
    catch (error) {
      console.error("Signup error: ", error);
      toast.error("An error occurred during signup. Please try again.");
    } 
    finally {
      setIsLoading(false);
    }

    //storing in console for testing purposes
    console.log("Signup data: ", data);
  };

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    errorKeys.forEach((key, index) => {
      setTimeout(() => {
        toast.error(errors[key].message);
      }, (index + 1) * 1000);
    });
  }, [errors]);

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup</h2>

        <label htmlFor="firstName">
          <b className="email-login">First Name</b>
        </label>
        <input
          {...register("firstName")}
          className="email-input"
          type="text"
          placeholder="Enter First Name"
          name="firstName"
        />

        <label htmlFor="lastName">
          <b className="email-login">Last Name</b>
        </label>
        <input
          {...register("lastName")}
          className="email-input"
          type="text"
          placeholder="Enter Last Name"
          name="lastName"
        />

        <label htmlFor="email">
          <b className="email-login">Email</b>
        </label>
        <input
          {...register("email")}
          className="email-input"
          type="text"
          placeholder="Enter Email"
          name="email"
        />

        <label htmlFor="phoneNumber">
          <b className="email-login">Phone Number</b>
        </label>
        <input
          {...register("phoneNumber")}
          className="email-input"
          type="text"
          placeholder="Enter Phone Number"
          name="phoneNumber"
        />

        <label htmlFor="profession">
          <b className="email-login">Profession</b>
        </label>
        <input
          {...register("profession")}
          className="email-input"
          type="text"
          placeholder="Enter Profession"
          name="profession"
        />

        <label htmlFor="password">
          <b className="email-login">Password</b>
        </label>
        <input
          {...register("password")}
          className="email-input"
          type="password"
          placeholder="Enter Password"
          name="password"
        />

        <label htmlFor="confirmPassword">
          <b className="email-login">Confirm Password</b>
        </label>
        <input
          {...register("confirmPassword")}
          className="email-input"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
        />

        <button type="submit" className="signup-btn">
          Sign up
        </button>
        <p className="subtitle">
          Already have an account? <NavLink to="/login">Log in</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
