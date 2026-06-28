import React, { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    hero: {
      minHeight: "90vh",
      backgroundImage:
        'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      display: "flex",
      alignItems: "center",
      backgroundAttachment: "fixed",
    },

    overlay: {
      width: "100%",
      minHeight: "90vh",
      background: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: isMobile ? "center" : "flex-start",
      textAlign: isMobile ? "center" : "left",
      padding: isMobile ? "40px 25px" : "80px 60px",
      color: "white",
      position: "relative",
    },

    heading: {
      fontSize: isMobile ? "38px" : "62px",
      fontWeight: "800",
      lineHeight: "1.15",
      maxWidth: "700px",
      marginBottom: "20px",
      textShadow: "0 4px 20px rgba(0,0,0,0.3)",
      letterSpacing: "-0.5px",
    },

    headingHighlight: {
      color: "#4CAF50",
      background: "linear-gradient(135deg, #4CAF50, #45a049)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },

    paragraph: {
      fontSize: isMobile ? "17px" : "22px",
      maxWidth: "650px",
      lineHeight: "1.8",
      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
      marginBottom: isMobile ? "10px" : "0",
      opacity: "0.95",
    },

    buttonContainer: {
      marginTop: "40px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "18px",
      width: isMobile ? "100%" : "auto",
      alignItems: "center",
    },

    primaryButton: {
      width: isMobile ? "100%" : "220px",
      padding: "16px 28px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #4CAF50, #45a049)",
      color: "white",
      fontSize: "17px",
      cursor: "pointer",
      fontWeight: "700",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 20px rgba(76, 175, 80, 0.4)",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },

    secondaryButton: {
      width: isMobile ? "100%" : "220px",
      padding: "16px 28px",
      border: "2px solid rgba(255,255,255,0.3)",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      color: "white",
      fontSize: "17px",
      cursor: "pointer",
      fontWeight: "700",
      transition: "all 0.3s ease",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      border: "2px solid rgba(255,255,255,0.3)",
    },

    statsContainer: {
      display: "flex",
      gap: isMobile ? "30px" : "50px",
      marginTop: "50px",
      flexWrap: "wrap",
      justifyContent: isMobile ? "center" : "flex-start",
    },

    statItem: {
      textAlign: "center",
    },

    statNumber: {
      fontSize: isMobile ? "28px" : "36px",
      fontWeight: "800",
      color: "#4CAF50",
      display: "block",
    },

    statLabel: {
      fontSize: isMobile ? "14px" : "16px",
      opacity: "0.8",
      marginTop: "5px",
      display: "block",
    },

    floatingBadge: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(20px)",
      padding: "12px 20px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.15)",
      display: isMobile ? "none" : "block",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    },

    badgeText: {
      fontSize: "14px",
      color: "white",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}>
        {/* Floating Badge */}
        <div style={styles.floatingBadge}>
          <p style={styles.badgeText}>
            🌱 10,000+ Farmers Connected
          </p>
        </div>

        <h1 style={styles.heading}>
          Empowering Farmers <br />
          <span style={styles.headingHighlight}>Through Technology</span>
        </h1>

        <p style={styles.paragraph}>
          Buy & Sell Agricultural Products, Connect With Farmers,
          Access Weather Insights, Government Schemes and Modern
          Farming Solutions.
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={styles.primaryButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(76, 175, 80, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(76, 175, 80, 0.4)";
            }}
          >
            🚀 Get Started
          </button>

          <button
            style={styles.secondaryButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#0b3d0b";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            🛒 Explore Marketplace
          </button>
        </div>

        {/* Stats */}
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>10K+</span>
            <span style={styles.statLabel}>Farmers</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>500+</span>
            <span style={styles.statLabel}>Products</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>50+</span>
            <span style={styles.statLabel}>Schemes</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>98%</span>
            <span style={styles.statLabel}>Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;