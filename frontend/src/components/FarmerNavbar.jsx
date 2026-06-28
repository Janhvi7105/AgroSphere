import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FarmerNavbar = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);

      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuButtonStyle = {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    padding: "8px 14px",
    textAlign: "left",
    transition: "all 0.3s ease",
    borderRadius: "8px",
    whiteSpace: "nowrap",
  };

  const navItem = (title, route) => (
    <button
      style={{
        ...menuButtonStyle,
        padding: "14px 0",
        fontSize: "16px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
      onMouseEnter={(e) => {
        if (isMobile) {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.paddingLeft = "12px";
        }
      }}
      onMouseLeave={(e) => {
        if (isMobile) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.paddingLeft = "0";
        }
      }}
      onClick={() => {
        navigate(route);
        setMenuOpen(false);
      }}
    >
      {title}
    </button>
  );

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0b5d1e, #14532d)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "15px 20px" : "16px 30px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2
          style={{
            color: "white",
            margin: 0,
            fontSize: isMobile ? "24px" : "28px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            background: "linear-gradient(135deg, #ffffff, #e8f5e9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
          }}
          onClick={() => navigate("/farmer-dashboard")}
        >
          <span style={{ WebkitTextFillColor: "initial", color: "#fff" }}>🌾</span>
          AgroSphere
          <span style={{
            fontSize: "10px",
            background: "rgba(255,255,255,0.15)",
            padding: "2px 10px",
            borderRadius: "12px",
            WebkitTextFillColor: "initial",
            color: "rgba(255,255,255,0.8)",
            fontWeight: "500",
            letterSpacing: "0.5px",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            Farmer
          </span>
        </h2>

        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flexWrap: "nowrap",
            }}
          >
            <button
              style={{
                ...menuButtonStyle,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => navigate("/farmer-dashboard")}
            >
              🏠 Home
            </button>

            <button
              style={menuButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/crop-guide")}
            >
              🌾 Crop Guide
            </button>

            <button
              style={menuButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/weather")}
            >
              🌦 Weather
            </button>

            <button
              style={menuButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/govt-schemes")}
            >
              📢 Schemes
            </button>

            <button
              style={menuButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/marketplace")}
            >
              🛒 Marketplace
            </button>

            <button
              style={menuButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/my-purchases")}
            >
              🛍 Purchases
            </button>

            <button
              style={menuButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/my-orders")}
            >
              📦 Orders
            </button>

            <button
              style={menuButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/community")}
            >
              👨‍🌾 Community
            </button>

            <button
              style={{
                ...menuButtonStyle,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => navigate("/profile")}
            >
              👤 Profile
            </button>

            <button
              onClick={logoutHandler}
              style={{
                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                color: "white",
                border: "none",
                padding: "8px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(220, 38, 38, 0.4)";
                e.currentTarget.style.background = "linear-gradient(135deg, #b91c1c, #991b1b)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(220, 38, 38, 0.3)";
                e.currentTarget.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
              }}
            >
              🚪 Logout
            </button>
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              fontSize: "28px",
              cursor: "pointer",
              padding: "4px 12px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div
          style={{
            background: "linear-gradient(135deg, #14532d, #0b5d1e)",
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px",
            position: "sticky",
            top: "70px",
            zIndex: 999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {navItem("🏠 Home", "/farmer-dashboard")}
          {navItem("🌾 Crop Guide", "/crop-guide")}
          {navItem("🌦 Weather", "/weather")}
          {navItem("📢 Govt Schemes", "/govt-schemes")}
          {navItem("🛒 Marketplace", "/marketplace")}
          {navItem("🛍 My Purchases", "/my-purchases")}
          {navItem("📦 My Orders", "/my-orders")}
          {navItem("👨‍🌾 Community", "/community")}
          {navItem("👤 Profile", "/profile")}

          <button
            onClick={logoutHandler}
            style={{
              marginTop: "14px",
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(220, 38, 38, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(220, 38, 38, 0.3)";
            }}
          >
            🚪 Logout
          </button>
        </div>
      )}
    </>
  );
};

export default FarmerNavbar;