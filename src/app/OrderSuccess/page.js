"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/components/css/orderSuccess.css"; // Import custom CSS
import { Toaster } from "react-hot-toast";

const OrderSuccess = () => {
  //   const Router = useRouter();

  //   useEffect(() => {
  //     // Redirect to login if no order is placed (optional logic)
  //     const storedUser = JSON.parse(localStorage.getItem("user"));
  //     if (!storedUser) {
  //       Router.push("/login");
  //     }
  //   }, []);

  return (
    <>
      <Toaster />
      <div className="container">
        <div className="order-success-container">
          <h2>Order Placed Successfully!</h2>
          <p>
            Thank you for your order. We have received your request and are
            processing it. You will receive an update shortly.
          </p>

          <div className="text-center">
            <a href="/customer" className="btn btn-primary mx-2">
              View Profile
            </a>
            <a href="/order" className="btn btn-success mx-2">
              Place New Order
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
