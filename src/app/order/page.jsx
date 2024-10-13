"use client";
import "@/components/css/order.css"; // Import the separate CSS file
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const OrderFuel = () => {
  const Router = useRouter();
  const [fuelType, setFuelType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // toast.success("Order Placed Successfully!!");
    Router.push("/OrderSuccess"); // Redirect to OrderSuccess page
  };

  return (
    <>
      <Toaster />
      <div className="container">
        <h2>Order Fuel</h2>
        <form>
          <div className="form-group">
            <label htmlFor="fuelType">Select Fuel Type:</label>
            <select
              className="form-control"
              id="fuelType"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select fuel type
              </option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="gas">Gas</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity (liters):</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryAddress">Delivery Address:</label>
            <textarea
              className="form-control"
              id="deliveryAddress"
              rows="3"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleClick}
          >
            Place Order
          </button>
        </form>

        <div className="order-summary">
          <h4>Order Summary</h4>
          <p>
            <strong>Fuel Type:</strong> {fuelType || "N/A"}
          </p>
          <p>
            <strong>Quantity:</strong> {quantity || "N/A"} liters
          </p>
          <p>
            <strong>Delivery Address:</strong> {deliveryAddress || "N/A"}
          </p>
        </div>

        <p className="mt-3">
          View your profile? <a href="/customer">Customer Profile</a>
        </p>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </>
  );
};

export default OrderFuel;
