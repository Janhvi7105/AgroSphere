import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";
import VoiceAssistant from "../components/VoiceAssistant";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // Sample stats data (you can replace with actual data from API)
  const stats = {
    products: 12,
    orders: 8,
    community: 5,
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f0f5f0 0%, #f7f9fc 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <FarmerNavbar />

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3c1f 0%, #2e7d32 50%, #388e3c 100%)",
          minHeight: "320px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isMobile ? "40px 20px" : "50px 70px",
          textAlign: isMobile ? "center" : "left",
          alignItems: isMobile ? "center" : "flex-start",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-50px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-30px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              padding: "6px 20px",
              borderRadius: "50px",
              marginBottom: "15px",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            🌱 Welcome Back, Farmer!
          </div>

          <h1
            style={{
              fontSize: isMobile ? "34px" : "48px",
              marginBottom: "10px",
              lineHeight: "1.3",
              fontWeight: "800",
              letterSpacing: "-0.5px",
            }}
          >
            🌾 Welcome to AgroSphere
          </h1>

          <p
            style={{
              fontSize: isMobile ? "16px" : "20px",
              maxWidth: "700px",
              lineHeight: "1.7",
              opacity: "0.95",
            }}
          >
            Smart Farming for Better Future.
            Buy agricultural products, connect with
            farmers, check weather updates and
            explore government schemes.
          </p>

          <button
            onClick={() => navigate("/marketplace")}
            style={{
              width: isMobile ? "100%" : "220px",
              maxWidth: "320px",
              marginTop: "20px",
              padding: "14px 28px",
              border: "none",
              borderRadius: "50px",
              background: "linear-gradient(135deg, #4CAF50, #45a049)",
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(76, 175, 80, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(76, 175, 80, 0.4)";
            }}
          >
            🛒 Explore Marketplace
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "25px 15px" : "40px 30px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "28px" : "36px",
              fontWeight: "800",
              color: "#1a3c1f",
              letterSpacing: "-0.5px",
            }}
          >
            📊 Dashboard Overview
          </h2>
          <span
            style={{
              fontSize: "14px",
              color: "#6b7280",
              background: "white",
              padding: "8px 20px",
              borderRadius: "50px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {/* My Products */}
          <div
            onClick={() => navigate("/my-products")}
            style={{
              background: "linear-gradient(135deg, #ffffff, #f8faf8)",
              padding: isMobile ? "20px" : "25px",
              borderRadius: "18px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid #e8f0e8",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              minHeight: isMobile ? "140px" : "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "#2e7d32";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "#e8f0e8";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(46, 125, 50, 0.08)",
              }}
            />
            <div>
              <h3 style={{ fontSize: "16px", color: "#4a5568", fontWeight: "600" }}>
                📦 My Products
              </h3>
              <h1
                style={{
                  fontSize: "42px",
                  color: "#1a3c1f",
                  fontWeight: "800",
                  marginTop: "5px",
                }}
              >
                {stats.products}
              </h1>
            </div>
            <p style={{ fontSize: "14px", color: "#2e7d32", fontWeight: "500" }}>
              View All →
            </p>
          </div>

          {/* My Orders */}
          <div
            onClick={() => navigate("/my-orders")}
            style={{
              background: "linear-gradient(135deg, #ffffff, #f8faf8)",
              padding: isMobile ? "20px" : "25px",
              borderRadius: "18px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid #e8f0e8",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              minHeight: isMobile ? "140px" : "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "#f57c00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "#e8f0e8";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(245, 124, 0, 0.08)",
              }}
            />
            <div>
              <h3 style={{ fontSize: "16px", color: "#4a5568", fontWeight: "600" }}>
                📋 My Orders
              </h3>
              <h1
                style={{
                  fontSize: "42px",
                  color: "#1a3c1f",
                  fontWeight: "800",
                  marginTop: "5px",
                }}
              >
                {stats.orders}
              </h1>
            </div>
            <p style={{ fontSize: "14px", color: "#f57c00", fontWeight: "500" }}>
              View All →
            </p>
          </div>

          {/* Marketplace */}
          <div
            onClick={() => navigate("/marketplace")}
            style={{
              background: "linear-gradient(135deg, #ffffff, #f8faf8)",
              padding: isMobile ? "20px" : "25px",
              borderRadius: "18px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid #e8f0e8",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              minHeight: isMobile ? "140px" : "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "#0d47a1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "#e8f0e8";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(13, 71, 161, 0.08)",
              }}
            />
            <div>
              <h3 style={{ fontSize: "16px", color: "#4a5568", fontWeight: "600" }}>
                🛒 Marketplace
              </h3>
              <h1
                style={{
                  fontSize: "28px",
                  color: "#1a3c1f",
                  fontWeight: "700",
                  marginTop: "5px",
                }}
              >
                Browse
              </h1>
            </div>
            <p style={{ fontSize: "14px", color: "#0d47a1", fontWeight: "500" }}>
              Explore →
            </p>
          </div>

          {/* Community */}
          <div
            onClick={() => navigate("/community")}
            style={{
              background: "linear-gradient(135deg, #ffffff, #f8faf8)",
              padding: isMobile ? "20px" : "25px",
              borderRadius: "18px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid #e8f0e8",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              minHeight: isMobile ? "140px" : "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "#c62828";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "#e8f0e8";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(198, 40, 40, 0.08)",
              }}
            />
            <div>
              <h3 style={{ fontSize: "16px", color: "#4a5568", fontWeight: "600" }}>
                👨‍🌾 Community
              </h3>
              <h1
                style={{
                  fontSize: "42px",
                  color: "#1a3c1f",
                  fontWeight: "800",
                  marginTop: "5px",
                }}
              >
                {stats.community}
              </h1>
            </div>
            <p style={{ fontSize: "14px", color: "#c62828", fontWeight: "500" }}>
              View Posts →
            </p>
          </div>

          {/* Weather */}
          <div
            onClick={() => navigate("/weather")}
            style={{
              background: "linear-gradient(135deg, #ffffff, #f8faf8)",
              padding: isMobile ? "20px" : "25px",
              borderRadius: "18px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid #e8f0e8",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              minHeight: isMobile ? "140px" : "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "#0288d1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "#e8f0e8";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(2, 136, 209, 0.08)",
              }}
            />
            <div>
              <h3 style={{ fontSize: "16px", color: "#4a5568", fontWeight: "600" }}>
                🌤 Weather
              </h3>
              <h1
                style={{
                  fontSize: "28px",
                  color: "#1a3c1f",
                  fontWeight: "700",
                  marginTop: "5px",
                }}
              >
                Check
              </h1>
            </div>
            <p style={{ fontSize: "14px", color: "#0288d1", fontWeight: "500" }}>
              View Forecast →
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            marginTop: "45px",
            background: "linear-gradient(135deg, #ffffff, #fafafa)",
            padding: isMobile ? "20px" : "35px",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid #e8f0e8",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "24px" : "28px",
              color: "#1a3c1f",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            ⚡ Quick Actions
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "5px",
            }}
          >
            <button
              onClick={() => navigate("/marketplace")}
              style={{
                padding: "14px 28px",
                width: isMobile ? "100%" : "auto",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #14532d, #1a3c1f)",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                boxShadow: "0 4px 15px rgba(20, 83, 45, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(20, 83, 45, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(20, 83, 45, 0.3)";
              }}
            >
              🛒 Marketplace
            </button>

            <button
              onClick={() => navigate("/add-product")}
              style={{
                padding: "14px 28px",
                width: isMobile ? "100%" : "auto",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(245, 158, 11, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(245, 158, 11, 0.3)";
              }}
            >
              🌾 Sell Product
            </button>

            <button
              onClick={() => navigate("/my-products")}
              style={{
                padding: "14px 28px",
                width: isMobile ? "100%" : "auto",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #14532d, #1a3c1f)",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                boxShadow: "0 4px 15px rgba(20, 83, 45, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(20, 83, 45, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(20, 83, 45, 0.3)";
              }}
            >
              📦 My Products
            </button>

            <button
              onClick={() => navigate("/my-orders")}
              style={{
                padding: "14px 28px",
                width: isMobile ? "100%" : "auto",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(245, 158, 11, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(245, 158, 11, 0.3)";
              }}
            >
              📋 My Orders
            </button>

            <button
              onClick={() => navigate("/profile")}
              style={{
                padding: "14px 28px",
                width: isMobile ? "100%" : "auto",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #14532d, #1a3c1f)",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                boxShadow: "0 4px 15px rgba(20, 83, 45, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(20, 83, 45, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(20, 83, 45, 0.3)";
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
            background: "linear-gradient(135deg, #ffffff, #fafafa)",
            borderRadius: "20px",
            padding: isMobile ? "20px" : "35px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid #e8f0e8",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <span style={{ fontSize: "32px" }}>🤖</span>
            <h2
              style={{
                margin: 0,
                color: "#14532d",
                fontSize: isMobile ? "24px" : "32px",
                fontWeight: "700",
              }}
            >
              AgroSphere AI Assistant
            </h2>
          </div>

          <p
            style={{
              color: "#6b7280",
              marginTop: "5px",
              marginBottom: "30px",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.6",
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