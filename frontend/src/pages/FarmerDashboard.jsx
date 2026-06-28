import React from "react";
import { useNavigate } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";
import VoiceAssistant from "../components/VoiceAssistant";

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
          minHeight: "320px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "50px 70px",
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
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 30px 60px",
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
              borderRadius: "18px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              border: "1px solid #edf2f7",
              cursor: "pointer",
              transition: "0.3s",
              minHeight: "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3>📦 My Products</h3>
            <h1>12</h1>
          </div>

          {/* My Orders */}
          <div
            onClick={() =>
              navigate("/my-orders")
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              border: "1px solid #edf2f7",
              cursor: "pointer",
              transition: "0.3s",
              minHeight: "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3>📋 My Orders</h3>
            <h1>Orders</h1>
          </div>

          {/* Marketplace */}
          <div
            onClick={() =>
              navigate("/marketplace")
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              border: "1px solid #edf2f7",
              cursor: "pointer",
              transition: "0.3s",
              minHeight: "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3>🛒 Marketplace</h3>
            <h1>Browse</h1>
          </div>

          {/* Community */}
          <div
            onClick={() =>
              navigate("/community")
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              border: "1px solid #edf2f7",
              cursor: "pointer",
              transition: "0.3s",
              minHeight: "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
              borderRadius: "18px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              border: "1px solid #edf2f7",
              cursor: "pointer",
              transition: "0.3s",
              minHeight: "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3>🌤 Weather</h3>
            <h1>Check</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            marginTop: "45px",
            background: "#ffffff",
            padding: "35px",
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            border: "1px solid #edf2f7",
          }}
        >
          <h2>⚡ Quick Actions</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "25px",
            }}
          >
            <button
              onClick={() =>
                navigate("/marketplace")
              }
              style={{
                padding: "14px 24px",
                borderRadius: "10px",
                background: "#14532d",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              🛒 Marketplace
            </button>

            <button
              onClick={() =>
                navigate("/add-product")
              }
              style={{
                padding: "14px 24px",
                borderRadius: "10px",
                background: "#f59e0b",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              🌾 Sell Product
            </button>

            <button
              onClick={() =>
                navigate("/my-products")
              }
              style={{
                padding: "14px 24px",
                borderRadius: "10px",
                background: "#14532d",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              📦 My Products
            </button>

            <button
              onClick={() =>
                navigate("/my-orders")
              }
              style={{
                padding: "14px 24px",
                borderRadius: "10px",
                background: "#f59e0b",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              📋 My Orders
            </button>

            <button
              onClick={() =>
                navigate("/profile")
              }
              style={{
                padding: "14px 24px",
                borderRadius: "10px",
                background: "#14532d",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              👤 Profile
            </button>
          </div>
        </div>

        {/* AI Assistant */}
        <div
          style={{
            marginTop: "50px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "35px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#14532d",
              fontSize: "32px",
            }}
          >
            🤖 AgroSphere AI Assistant
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginTop: "10px",
              marginBottom: "30px",
              fontSize: "16px",
            }}
          >
            Ask farming questions using voice or text and get AI-powered guidance instantly.
          </p>

          <VoiceAssistant />
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;