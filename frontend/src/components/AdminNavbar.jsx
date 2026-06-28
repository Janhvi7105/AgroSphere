import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");
  };

  const btnStyle = {
    background: "white",
    color: "#0b3d0b",
    border: "none",
    padding: "10px 18px",
    marginRight: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        background: "#0b3d0b",
        color: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h2
        style={{
          margin: 0,
          cursor: "pointer",
        }}
        onClick={() => navigate("/admin-dashboard")}
      >
        🌾 AgroSphere Admin
      </h2>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          style={btnStyle}
          onClick={() => navigate("/admin-dashboard")}
        >
          Dashboard
        </button>

        <button
          style={btnStyle}
          onClick={() => navigate("/admin-users")}
        >
          Users
        </button>

        <button
          style={btnStyle}
          onClick={() => navigate("/admin-products")}
        >
          Products
        </button>

        <button
          style={btnStyle}
          onClick={() => navigate("/admin-pending-products")}
        >
          Pending Products
        </button>

        <button
          style={btnStyle}
          onClick={() => navigate("/admin-orders")}
        >
          Orders
        </button>

        <button
          style={btnStyle}
          onClick={() => navigate("/admin-crop-guide")}
        >
          Crop Guide
        </button>

        <button
          style={btnStyle}
          onClick={() => navigate("/admin-schemes")}
        >
          Govt Schemes
        </button>

        <button
          style={btnStyle}
          onClick={() => navigate("/admin-posts")}
        >
          Posts
        </button>

        <button
          onClick={logoutHandler}
          style={{
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

export default AdminNavbar;