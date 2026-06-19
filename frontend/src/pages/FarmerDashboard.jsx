import React from "react";
import { useNavigate } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";

const FarmerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <FarmerNavbar />

      {/* Hero Section */}
      <div
        style={{
          background: "#0b5d1e",
          height: "250px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
          }}
        >
          🌾 Welcome to AgroSphere
        </h1>

        <p
          style={{
            fontSize: "20px",
            maxWidth: "700px",
          }}
        >
          Smart Farming for Better Future.
          Buy agricultural products, connect with
          farmers, check weather updates and
          explore government schemes.
        </p>

        <button
          onClick={() =>
            navigate("/marketplace")
          }
          style={{
            width: "220px",
            marginTop: "20px",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            background: "#28a745",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Explore Marketplace
        </button>
      </div>

      {/* Dashboard Content */}
      <div
        style={{
          padding: "40px",
        }}
      >
        <h2>📊 Dashboard Overview</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {/* My Products */}
          <div
            onClick={() =>
              navigate("/my-products")
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <h3>📦 My Products</h3>
            <h1>12</h1>
          </div>

          {/* Purchase */}
          <div
            onClick={() =>
              navigate("/marketplace")
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <h3>🛒 Purchase</h3>
            <h1>Buy</h1>
          </div>

          {/* Community */}
          <div
            onClick={() =>
              navigate("/community")
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <h3>👨‍🌾 Community Posts</h3>
            <h1>5</h1>
          </div>

          {/* Weather */}
          <div
            onClick={() =>
              navigate("/weather")
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <h3>🌤 Weather</h3>
            <h1>Check</h1>
          </div>

          {/* Marketplace */}
          <div
            onClick={() =>
              navigate("/marketplace")
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <h3>🛍 Marketplace</h3>
            <h1>Browse</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "30px",
            borderRadius: "12px",
          }}
        >
          <h2>⚡ Quick Actions</h2>

          <button
            onClick={() =>
              navigate("/marketplace")
            }
            style={{
              marginRight: "10px",
              padding: "12px 25px",
            }}
          >
            🛒 Purchase
          </button>

          <button
            onClick={() =>
              navigate("/community")
            }
            style={{
              marginRight: "10px",
              padding: "12px 25px",
            }}
          >
            👨‍🌾 Community Posts
          </button>

          <button
            onClick={() =>
              navigate("/marketplace")
            }
            style={{
              marginRight: "10px",
              padding: "12px 25px",
            }}
          >
            🛍 Marketplace
          </button>

          <button
            onClick={() =>
              navigate("/profile")
            }
            style={{
              padding: "12px 25px",
            }}
          >
            👤 Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;