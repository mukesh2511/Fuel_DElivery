"use client";
import React, { useEffect, useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); // Add empty dependency array to prevent infinite loop

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Optionally reset user state after logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/customer">
            Fuel_Delivery
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            {!user && (
              <div>
                <a className="btn btn-primary mx-1" href="/login" role="button">
                  Login
                </a>
                <a
                  className="btn btn-primary mx-1"
                  href="/signup"
                  role="button"
                >
                  Signup
                </a>
              </div>
            )}
            {user && (
              <div>
                <a
                  className="btn btn-primary mx-1"
                  href="/login"
                  role="button"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
