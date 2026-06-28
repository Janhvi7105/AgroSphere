import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");
  };

  const desktopBtnStyle = {
    background: "white",
    color: "#0b3d0b",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    minWidth: "auto",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  };

  const mobileBtnStyle = {
    background: "transparent",
    color: "white",
    border: "none",
    padding: "14px 0",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0b3d0b, #14532d)",
          color: "white",
          padding: isMobile ? "15px 20px" : "14px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Logo */}
        <h2
          style={{
            margin: 0,
            cursor: "pointer",
            fontSize: isMobile ? "22px" : "24px",
            fontWeight: "700",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #ffffff, #e8f5e9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
          }}
          onClick={() => navigate("/admin-dashboard")}
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
            Admin
          </span>
        </h2>

        {/* Hamburger Menu Button */}
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

        {/* Desktop Navigation */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "nowrap",
            }}
          >
            <button
              style={{
                ...desktopBtnStyle,
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-dashboard")}
            >
              🏠 Dashboard
            </button>

            <button
              style={desktopBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0fdf4";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-users")}
            >
              👥 Users
            </button>

            <button
              style={desktopBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0fdf4";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-products")}
            >
              🛒 Products
            </button>

            <button
              style={{
                ...desktopBtnStyle,
                background: "#fef3c7",
                color: "#92400e",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fde68a";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fef3c7";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-pending-products")}
            >
              ⏳ Pending
            </button>

            <button
              style={desktopBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0fdf4";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-orders")}
            >
              📦 Orders
            </button>

            <button
              style={desktopBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0fdf4";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-crop-guide")}
            >
              🌾 Crops
            </button>

            <button
              style={desktopBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0fdf4";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-schemes")}
            >
              📢 Schemes
            </button>

            <button
              style={desktopBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0fdf4";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-posts")}
            >
              📝 Posts
            </button>

            <button
              style={desktopBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0fdf4";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-reviews")}
            >
              ⭐ Reviews
            </button>

            <button
              style={{
                ...desktopBtnStyle,
                background: "#dbeafe",
                color: "#1e40af",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#bfdbfe";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#dbeafe";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
              onClick={() => navigate("/admin-profile")}
            >
              👤 Profile
            </button>

            <button
              onClick={logoutHandler}
              style={{
                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
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
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: "linear-gradient(135deg, #14532d, #0b3d0b)",
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px",
            position: "sticky",
            top: isMobile ? "70px" : "0",
            zIndex: 999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <button
            style={{
              ...mobileBtnStyle,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-dashboard");
              setMenuOpen(false);
            }}
          >
            🏠 Dashboard
          </button>

          <button
            style={mobileBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-users");
              setMenuOpen(false);
            }}
          >
            👥 Users
          </button>

          <button
            style={mobileBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-products");
              setMenuOpen(false);
            }}
          >
            🛒 Products
          </button>

          <button
            style={{
              ...mobileBtnStyle,
              color: "#fbbf24",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-pending-products");
              setMenuOpen(false);
            }}
          >
            ⏳ Pending
          </button>

          <button
            style={mobileBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-orders");
              setMenuOpen(false);
            }}
          >
            📦 Orders
          </button>

          <button
            style={mobileBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-crop-guide");
              setMenuOpen(false);
            }}
          >
            🌾 Crops
          </button>

          <button
            style={mobileBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-schemes");
              setMenuOpen(false);
            }}
          >
            📢 Schemes
          </button>

          <button
            style={mobileBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-posts");
              setMenuOpen(false);
            }}
          >
            📝 Posts
          </button>

          <button
            style={mobileBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-reviews");
              setMenuOpen(false);
            }}
          >
            ⭐ Reviews
          </button>

          <button
            style={{
              ...mobileBtnStyle,
              color: "#93c5fd",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.paddingLeft = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.paddingLeft = "0";
            }}
            onClick={() => {
              navigate("/admin-profile");
              setMenuOpen(false);
            }}
          >
            👤 Profile
          </button>

          <button
            onClick={() => {
              logoutHandler();
              setMenuOpen(false);
            }}
            style={{
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              color: "white",
              border: "none",
              padding: "14px",
              marginTop: "14px",
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

export default AdminNavbar;