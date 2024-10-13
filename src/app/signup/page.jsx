"use client";
import React, { useState } from "react";
import "@/components/css/signup.css"; // Import the separate CSS file
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const Router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: 0,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(
        axios.post("/api/register", user), // Login API call
        {
          loading: "Registering User...",
          success: "Registered Successful!",
          error: "Regsiter failed. Please try again.",
        }
      );
      Router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Toaster />
      <div className="container">
        <h2>Create an Account</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">{`Full Name:`}</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={user.name}
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{`Email:`}</label>
            <input
              type="email"
              className="form-control"
              id="email"
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
              value={user.password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">{`Contact Number:`}</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              value={user.phone}
              onChange={handleChange}
              name="phone"
              minLength={10}
              maxLength={10}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => handleLogin(e)}
          >
            Sign Up
          </button>
        </form>
        <p className="mt-3">
          {`Already have an account?`} <a href="/login">Login</a>
        </p>
      </div>
    </>
  );
};

export default SignUp;
