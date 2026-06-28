import React from "react";
import { useNavigate } from "react-router-dom";

const FarmerNavbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const navBtn = {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "18px",
  };

  return (
    <div
      style={{
        background: "#0b5d1e",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo */}
      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        🌾 AgroSphere
      </h2>

      {/* Navigation Menu */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          style={navBtn}
          onClick={() =>
            navigate("/farmer-dashboard")
          }
        >
          Home
        </button>

        <button
          style={navBtn}
          onClick={() =>
            navigate("/crop-guide")
          }
        >
          Crop Guide
        </button>

        <button
          style={navBtn}
          onClick={() =>
            navigate("/weather")
          }
        >
          Weather
        </button>

        <button
          style={navBtn}
          onClick={() =>
            navigate("/govt-schemes")
          }
        >
          Govt Schemes
        </button>

        <button
          style={navBtn}
          onClick={() =>
            navigate("/marketplace")
          }
        >
          Marketplace
        </button>

        <button
          style={navBtn}
          onClick={() =>
            navigate("/my-purchases")
          }
        >
          My Purchases
        </button>

        <button
          style={navBtn}
          onClick={() =>
            navigate("/my-orders")
          }
        >
          My Orders
        </button>

        <button
          style={navBtn}
          onClick={() =>
            navigate("/community")
          }
        >
          Community Posts
        </button>

        <button
          style={navBtn}
          onClick={() =>
            navigate("/profile")
          }
        >
          Profile
        </button>

        <button
          onClick={logoutHandler}
          style={{
            marginLeft: "20px",
            background: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default FarmerNavbar;