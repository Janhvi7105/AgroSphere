import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [showCropFarming, setShowCropFarming] = useState(false);

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 60px",
      backgroundColor: "#0b3d0b",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },

    logo: {
      fontSize: "28px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    navLinks: {
      display: "flex",
      listStyle: "none",
      gap: "30px",
      margin: 0,
      padding: 0,
      alignItems: "center",
    },

    navItem: {
      cursor: "pointer",
      fontWeight: "500",
      position: "relative",
      color: "white",
      textDecoration: "none",
    },

    dropdown: {
      position: "absolute",
      top: "45px",
      left: 0,
      backgroundColor: "white",
      color: "black",
      width: "300px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      overflow: "hidden",
      zIndex: 999,
    },

    dropdownItem: {
      padding: "15px 20px",
      borderBottom: "1px solid #eee",
      cursor: "pointer",
    },

    authButtons: {
      display: "flex",
      gap: "10px",
    },

    loginBtn: {
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "white",
      fontWeight: "bold",
    },

    registerBtn: {
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "#90ee90",
      fontWeight: "bold",
    },

    link: {
      textDecoration: "none",
      color: "white",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>
        <div style={styles.logo}>🌾 AgroSphere</div>
      </Link>

      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>

        {/* Solutions */}
        <li
          style={styles.navItem}
          onClick={() => {
            setShowSolutions(!showSolutions);
            setShowCropFarming(false);
          }}
        >
          Solutions ▼

          {showSolutions && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem}>
                🌾 Solution For Farmers
              </div>

              <div style={styles.dropdownItem}>
                🏪 Solution For Agri Businesses
              </div>

              <div style={styles.dropdownItem}>
                🏛 Solution For Government
              </div>
            </div>
          )}
        </li>

        {/* Crop Farming */}
        <li
          style={styles.navItem}
          onClick={() => {
            setShowCropFarming(!showCropFarming);
            setShowSolutions(false);
          }}
        >
          Crop Farming ▼

          {showCropFarming && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem}>
                🥬 Vegetable Farming
              </div>

              <div style={styles.dropdownItem}>
                🍎 Fruit Farming
              </div>

              <div style={styles.dropdownItem}>
                💰 Cash Crops
              </div>

              <div style={styles.dropdownItem}>
                🌾 Grain & Millet Crops
              </div>

              <div style={styles.dropdownItem}>
                🌿 Medicinal Crops
              </div>

              <div style={styles.dropdownItem}>
                🛡 Crop Protection
              </div>
            </div>
          )}
        </li>

        <li style={styles.navItem}>Marketplace</li>
        <li style={styles.navItem}>Community</li>
        <li style={styles.navItem}>Careers</li>
        <li style={styles.navItem}>Contact Us</li>
      </ul>

      <div style={styles.authButtons}>
        <Link to="/login">
          <button style={styles.loginBtn}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button style={styles.registerBtn}>
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;