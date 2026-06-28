import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    footer: {
      background: "linear-gradient(135deg, #0b3d0b, #14532d, #1b5e20)",
      color: "white",
      padding: isMobile ? "40px 25px" : "50px 80px",
      marginTop: "auto",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
    },

    container: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "center" : "flex-start",
      textAlign: isMobile ? "center" : "left",
      gap: "40px",
      maxWidth: "1200px",
      margin: "0 auto",
    },

    section: {
      flex: 1,
      minWidth: isMobile ? "100%" : "200px",
    },

    heading: {
      fontSize: isMobile ? "20px" : "22px",
      marginBottom: "18px",
      fontWeight: "700",
      color: "#fff",
      position: "relative",
      display: "inline-block",
    },

    headingUnderline: {
      width: "50px",
      height: "3px",
      background: "linear-gradient(135deg, #4CAF50, #45a049)",
      borderRadius: "2px",
      marginTop: "8px",
      marginLeft: isMobile ? "auto" : "0",
      marginRight: isMobile ? "auto" : "0",
    },

    text: {
      fontSize: "15px",
      lineHeight: "1.9",
      color: "rgba(255,255,255,0.85)",
      marginBottom: "8px",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },

    textLink: {
      fontSize: "15px",
      lineHeight: "1.9",
      color: "rgba(255,255,255,0.85)",
      marginBottom: "8px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      display: "block",
    },

    logoText: {
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: isMobile ? "center" : "flex-start",
      background: "linear-gradient(135deg, #ffffff, #e8f5e9)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },

    socialIcons: {
      display: "flex",
      gap: "12px",
      marginTop: "15px",
      justifyContent: isMobile ? "center" : "flex-start",
      flexWrap: "wrap",
    },

    socialIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "white",
      backdropFilter: "blur(10px)",
    },

    bottom: {
      borderTop: "1px solid rgba(255,255,255,0.1)",
      marginTop: "40px",
      paddingTop: "25px",
      textAlign: "center",
      fontSize: "14px",
      color: "rgba(255,255,255,0.7)",
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
    },

    bottomLinks: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
    },

    bottomLink: {
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none",
      fontSize: "13px",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },

    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
      justifyContent: isMobile ? "center" : "flex-start",
      color: "rgba(255,255,255,0.85)",
      fontSize: "15px",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <div style={styles.logoText}>
            <span style={{ WebkitTextFillColor: "initial", color: "#4CAF50" }}>🌾</span>
            AgroSphere
          </div>

          <p style={styles.text}>
            Empowering farmers with technology,
            smart agriculture solutions,
            marketplace, weather updates,
            crop guidance and government schemes.
          </p>

          <div style={styles.socialIcons}>
            <div
              style={styles.socialIcon}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1877f2";
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.borderColor = "#1877f2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              📘
            </div>
            <div
              style={styles.socialIcon}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1DA1F2";
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.borderColor = "#1DA1F2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              🐦
            </div>
            <div
              style={styles.socialIcon}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E4405F";
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.borderColor = "#E4405F";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              📸
            </div>
            <div
              style={styles.socialIcon}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0A66C2";
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.borderColor = "#0A66C2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              💼
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>
            Quick Links
            <div style={styles.headingUnderline}></div>
          </h2>

          <p
            style={styles.textLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
              e.currentTarget.style.transform = "translateX(5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            🏠 Home
          </p>
          <p
            style={styles.textLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
              e.currentTarget.style.transform = "translateX(5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            ℹ️ About
          </p>
          <p
            style={styles.textLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
              e.currentTarget.style.transform = "translateX(5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            🌾 Crop Guide
          </p>
          <p
            style={styles.textLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
              e.currentTarget.style.transform = "translateX(5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            🛒 Marketplace
          </p>
          <p
            style={styles.textLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
              e.currentTarget.style.transform = "translateX(5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            📢 Schemes
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>
            Contact Us
            <div style={styles.headingUnderline}></div>
          </h2>

          <div style={styles.contactItem}>
            <span style={{ fontSize: "20px" }}>📧</span>
            <span>support@agrosphere.com</span>
          </div>

          <div style={styles.contactItem}>
            <span style={{ fontSize: "20px" }}>📞</span>
            <span>+91 9876543210</span>
          </div>

          <div style={styles.contactItem}>
            <span style={{ fontSize: "20px" }}>📍</span>
            <span>Maharashtra, India</span>
          </div>

          <div style={styles.contactItem}>
            <span style={{ fontSize: "20px" }}>🕐</span>
            <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <span>© 2026 AgroSphere. All Rights Reserved.</span>
        <div style={styles.bottomLinks}>
          <span
            style={styles.bottomLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            Privacy Policy
          </span>
          <span
            style={styles.bottomLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            Terms of Service
          </span>
          <span
            style={styles.bottomLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            Support
          </span>
          <span
            style={styles.bottomLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4CAF50";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            FAQ
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;