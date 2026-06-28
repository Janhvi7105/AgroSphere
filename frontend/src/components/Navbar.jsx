import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 60px",
      backgroundColor: "#0b5d1e",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },

    logo: {
      fontSize: "30px",
      fontWeight: "bold",
    },

    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "35px",
    },

    navItem: {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      cursor: "pointer",
      fontSize: "16px",
    },

    authButtons: {
      display: "flex",
      gap: "12px",
    },

    loginBtn: {
      background: "white",
      color: "#0b5d1e",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    registerBtn: {
      background: "#90ee90",
      color: "#0b5d1e",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
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
          🌾 AgroSphere
        </div>
      </Link>

      {/* Menu */}
      <div style={styles.navLinks}>
        <a href="#home" style={styles.navItem}>
          Home
        </a>

        <a href="#about" style={styles.navItem}>
          About Us
        </a>

        <a href="#crop-guide" style={styles.navItem}>
          Crop Guide
        </a>

        <a href="#agriculturist" style={styles.navItem}>
          Agriculturist Support
        </a>

        <a href="#contact" style={styles.navItem}>
          Contact Us
        </a>
      </div>

      {/* Login Register */}
      <div style={styles.authButtons}>
        <button
          onClick={() => navigate("/login")}
          style={styles.loginBtn}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={styles.registerBtn}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;