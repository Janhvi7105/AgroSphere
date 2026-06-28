import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "15px 20px" : "16px 50px",
      background: "linear-gradient(135deg, #0b5d1e, #14532d)",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      flexWrap: "wrap",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    },

    logo: {
      fontSize: isMobile ? "24px" : "28px",
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
    },

    hamburger: {
      display: isMobile ? "block" : "none",
      fontSize: "28px",
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.15)",
      color: "white",
      cursor: "pointer",
      padding: "4px 12px",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
    },

    navContainer: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "35px",
    },

    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "30px",
    },

    navLinksMobile: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
      width: "100%",
      padding: "20px 0",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      background: "rgba(0,0,0,0.1)",
      borderRadius: "10px",
      marginTop: "10px",
    },

    navItem: {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
      padding: "8px 12px",
      borderRadius: "8px",
      position: "relative",
    },

    authButtons: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
    },

    authButtonsMobile: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
      paddingTop: "15px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
    },

    loginBtn: {
      background: "transparent",
      color: "white",
      border: "2px solid rgba(255,255,255,0.5)",
      padding: "9px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
    },

    registerBtn: {
      background: "linear-gradient(135deg, #4CAF50, #45a049)",
      color: "white",
      border: "none",
      padding: "9px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
      whiteSpace: "nowrap",
    },

    link: {
      textDecoration: "none",
      color: "white",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.link}>
        <div style={styles.logo}>
          <span style={{ WebkitTextFillColor: "initial", color: "#fff" }}>🌾</span>
          AgroSphere
        </div>
      </Link>

      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        style={styles.hamburger}
        aria-label="Toggle menu"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        }}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Desktop Menu */}
      <div style={styles.navContainer}>
        <div style={styles.navLinks}>
          <Link
            to="/"
            style={styles.navItem}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🏠 Home
          </Link>

          <Link
            to="/about"
            style={styles.navItem}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ℹ️ About Us
          </Link>

          <Link
            to="/crop-library"
            style={styles.navItem}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🌾 Crop Guide
          </Link>

          <Link
            to="/contact"
            style={styles.navItem}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            📧 Contact Us
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div style={styles.authButtons}>
          <button
            onClick={() => navigate("/login")}
            style={styles.loginBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#0b5d1e";
              e.currentTarget.style.borderColor = "white";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            🔑 Login
          </button>

          <button
            onClick={() => navigate("/register")}
            style={styles.registerBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(76, 175, 80, 0.4)";
              e.currentTarget.style.background = "linear-gradient(135deg, #45a049, #3d8b40)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(76, 175, 80, 0.3)";
              e.currentTarget.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";
            }}
          >
            📝 Register
          </button>
        </div>
      </div>

      {/* Mobile Menu (Conditional) */}
      {isMobile && isOpen && (
        <>
          <div
            style={{
              ...styles.navLinksMobile,
            }}
          >
            <Link
              to="/"
              style={styles.navItem}
              onClick={toggleMenu}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.paddingLeft = "20px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "12px";
              }}
            >
              🏠 Home
            </Link>

            <Link
              to="/about"
              style={styles.navItem}
              onClick={toggleMenu}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.paddingLeft = "20px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "12px";
              }}
            >
              ℹ️ About Us
            </Link>

            <Link
              to="/crop-library"
              style={styles.navItem}
              onClick={toggleMenu}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.paddingLeft = "20px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "12px";
              }}
            >
              🌾 Crop Guide
            </Link>

            <Link
              to="/contact"
              style={styles.navItem}
              onClick={toggleMenu}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.paddingLeft = "20px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "12px";
              }}
            >
              📧 Contact Us
            </Link>
          </div>

          <div style={styles.authButtonsMobile}>
            <button
              onClick={() => {
                toggleMenu();
                navigate("/login");
              }}
              style={styles.loginBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#0b5d1e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              🔑 Login
            </button>

            <button
              onClick={() => {
                toggleMenu();
                navigate("/register");
              }}
              style={styles.registerBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(76, 175, 80, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(76, 175, 80, 0.3)";
              }}
            >
              📝 Register
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;