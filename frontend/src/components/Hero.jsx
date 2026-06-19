import React from "react";

const Hero = () => {
  const styles = {
    hero: {
      height: "90vh",
      backgroundImage:
        'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
    },

    overlay: {
      height: "100%",
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "80px",
      color: "white",
    },

    heading: {
      fontSize: "60px",
      fontWeight: "bold",
      maxWidth: "700px",
      marginBottom: "20px",
    },

    paragraph: {
      fontSize: "22px",
      maxWidth: "700px",
      lineHeight: "1.6",
    },

    buttonContainer: {
      marginTop: "30px",
      display: "flex",
      gap: "15px",
    },

    primaryButton: {
      padding: "14px 30px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#4CAF50",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    secondaryButton: {
      padding: "14px 30px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "white",
      color: "#0b3d0b",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>
          Empowering Farmers Through Technology
        </h1>

        <p style={styles.paragraph}>
          Buy & Sell Agricultural Products,
          Connect With Farmers,
          Access Weather Insights,
          Government Schemes and Modern Farming Solutions.
        </p>

        <div style={styles.buttonContainer}>
          <button style={styles.primaryButton}>
            Get Started
          </button>

          <button style={styles.secondaryButton}>
            Explore Marketplace
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;