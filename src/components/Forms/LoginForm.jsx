import React, { useEffect, useState } from "react";
import "./Forms.css";
import { NavLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice/'
import { Link, useNavigate, Outlet} from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email format"}).nonempty({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({  
    resolver: zodResolver(formSchema)
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    errorKeys.forEach((key, index) => {
      setTimeout(() => {
        toast.error(errors[key].message);
      }, (index + 1) * 1000);
    });
  }, [errors]);
  const onSubmit = (data) => {
    setIsLoading(true)

    // Functional login via local storage and store authenticator
    // STARTING HERE should be a try catch statement attempting to fetch login data from the database
    const userData = JSON.parse(localStorage.getItem("user"));
    const storedEmail = userData ? userData.email : null;
    const storedPassword = userData ? userData.password : null;

    if (email === storedEmail && userData.password === storedPassword) {
      toast.success("login successful");
      dispatch(login(userData))
      navigate("/account")

    } else {
      toast.error("Invalid email or password");
    }
    console.log("click registered");
    // ENDING HERE

    setIsLoading(false)
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
          type="email"
          placeholder="Enter Email"
          name="email"
        />
        <label htmlFor="psw">
          <b className="email-login">Password</b>
        </label>
        <input
          {...register("password")}
          className="email-input"
          type="password"
          placeholder="Enter Password"
          name="password"
        />
        <div className="checkbox">
          <input type="checkbox" />
          <p className="px-20">Keep me Logged in</p>
        </div>
        <button type="submit" className="login-btn" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
