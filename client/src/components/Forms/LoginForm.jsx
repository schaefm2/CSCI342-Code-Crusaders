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
    setIsLoading(true);

    try{
      fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      .then(response => {
        if(response.ok){
          return response.json();
        }
      })
      .then((data) => {
        
        // merge token with user details so that when account changes go through then the authentication state will stay the same
        const userWithToken = {
          ...data.user,
          token: data.token,
        };
        dispatch(login(userWithToken));
        toast.success("Login successful.");
        navigate("/account");
      })
      .catch(err => {
        toast.error(`Login failed: ${err.message}`);
      })
    }
    catch (err) {
      toast.error("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false);
    }
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
