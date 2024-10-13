"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/components/css/login.css"; // Import the CSS file
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const Router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(
        axios.post("/api/login", user), // Login API call
        {
          loading: "Logging In...",
          success: "Login Successful!",
          error: "Login failed. Please try again.",
        }
      );

      // Assuming response contains user data or token
      localStorage.setItem("user", JSON.stringify(res.data.user));
      Router.push("/customer");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Toaster />
      <div className="container">
        <h2>Login to Your Account</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username"> {`Email:`}</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{`Password:`}</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            // type="submit"
            className="btn btn-success"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </form>
        <p className="mt-3">
          {` Don't have an account?`} <a href="/signup">Sign Up</a>
        </p>
      </div>
    </>
  );
};

export default Login;
