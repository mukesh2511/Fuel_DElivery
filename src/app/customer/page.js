"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/components/css/customer.css";

const CustomerProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This will run only on the client-side
    const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve user data
    setUser(storedUser); // Set user data in state
  }, []); // The empty dependency array ensures this runs once after the initial render

  if (!user) {
    return <div>{`Loading...`}</div>; // Handle the case where user data is not yet available
  }

  return (
    <div className="container">
      <h2>{`Customer Profile`}</h2>
      <div className="profile-info">
        <h4>{`Profile Information`}</h4>
        <p>
          <strong>{`Name:`}</strong> {user.name}
        </p>
        <p>
          <strong>{`Email:`}</strong> {user.email}
        </p>
        <p>
          <strong>{`Contact Number:`}</strong> {user.phone}
        </p>
        {/* <p>
          <strong>Delivery Address:</strong> Mum, MH 65
        </p> */}
      </div>
      <div className="text-center">
        <a href="/order" className="btn btn-success btn-custom">
          {`Order Fuel`}
        </a>
      </div>
    </div>
  );
};

export default CustomerProfile;
