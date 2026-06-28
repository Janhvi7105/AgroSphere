import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CropLibrary = () => {
  const navigate = useNavigate();

  const crops = [
    {
      icon: "🌾",
      title: "Field Crops",
      desc: "Rice, Wheat, Cotton, Maize and more",
      color: "#2e7d32",
      bgGradient: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
      emoji: "🌾",
    },
    {
      icon: "🥕",
      title: "Vegetables",
      desc: "Tomato, Onion, Potato, Brinjal and more",
      color: "#f57c00",
      bgGradient: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
      emoji: "🥬",
    },
    {
      icon: "🍎",
      title: "Fruits",
      desc: "Mango, Banana, Apple, Grapes and more",
      color: "#c62828",
      bgGradient: "linear-gradient(135deg, #ffebee, #ffcdd2)",
      emoji: "🍇",
    },
    {
      icon: "🌺",
      title: "Flowers",
      desc: "Rose, Marigold, Jasmine, Lily and more",
      color: "#6a1b9a",
      bgGradient: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
      emoji: "🌸",
    },
    {
      icon: "🌿",
      title: "Herbs & Spices",
      desc: "Turmeric, Ginger, Mint, Basil and more",
      color: "#00897b",
      bgGradient: "linear-gradient(135deg, #e0f2f1, #b2dfdb)",
      emoji: "🌿",
    },
    {
      icon: "🌰",
      title: "Nuts & Seeds",
      desc: "Groundnut, Sunflower, Mustard and more",
      color: "#4e342e",
      bgGradient: "linear-gradient(135deg, #efebe9, #d7ccc8)",
      emoji: "🥜",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3c1f 0%, #2e7d32 50%, #388e3c 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              padding: "8px 24px",
              borderRadius: "50px",
              marginBottom: "20px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
              📚 Knowledge Base
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: "800",
              marginBottom: "20px",
              letterSpacing: "-1px",
              textShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            Comprehensive <br />
            <span style={{ color: "#a5d6a7" }}>Crop Guide</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8",
              opacity: "0.95",
            }}
          >
            Explore detailed information about various crops including
            cultivation practices, climate requirements, and disease management.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: "80px 20px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8faf8 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
                color: "#1a3c1f",
                padding: "8px 24px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "15px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Select a Category
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#1a3c1f",
                fontWeight: "800",
                letterSpacing: "-1px",
              }}
            >
              Explore <span style={{ color: "#2e7d32" }}>Crop Categories</span>
            </h2>
            <p
              style={{
                maxWidth: "600px",
                margin: "15px auto 0",
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                color: "#4a5568",
                lineHeight: "1.8",
              }}
            >
              Select any category below to explore detailed information about
              various crops, their cultivation practices, and management tips.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {crops.map((crop) => (
              <div
                key={crop.title}
                onClick={() => navigate("/crop-guide")}
                style={{
                  background: crop.bgGradient,
                  padding: "35px 25px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  borderTop: `4px solid ${crop.color}`,
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                }}
              >
                {/* Decorative Circle */}
                <div
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${crop.color}15, transparent 70%)`,
                  }}
                />

                <div
                  style={{
                    fontSize: "64px",
                    marginBottom: "15px",
                    display: "block",
                    position: "relative",
                    zIndex: 1,
                    animation: "bounce 2s infinite",
                  }}
                >
                  {crop.icon}
                </div>

                <h3
                  style={{
                    fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                    color: "#1a3c1f",
                    marginBottom: "10px",
                    fontWeight: "700",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {crop.title}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    color: "#4a5568",
                    lineHeight: "1.6",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {crop.desc}
                </p>

                {/* Hover Underline Effect */}
                <div
                  style={{
                    width: "0%",
                    height: "3px",
                    background: crop.color,
                    margin: "12px auto 0",
                    borderRadius: "2px",
                    transition: "width 0.4s ease",
                  }}
                  className="crop-underline"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.width = "40%";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.width = "0%";
                  }}
                />

                {/* Explore Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "15px",
                    background: crop.color,
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "600",
                    opacity: "0",
                    transition: "opacity 0.3s ease",
                  }}
                  className="explore-badge"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                >
                  Explore →
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div
            style={{
              marginTop: "60px",
              padding: "40px",
              background: "linear-gradient(135deg, #1a3c1f, #2e7d32)",
              borderRadius: "20px",
              color: "white",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                marginBottom: "20px",
                fontWeight: "700",
              }}
            >
              🌱 Growing Together
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "30px",
              }}
            >
              <div>
                <div style={{ fontSize: "32px", fontWeight: "800", color: "#a5d6a7" }}>500+</div>
                <div style={{ fontSize: "14px", opacity: "0.8" }}>Crop Varieties</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "800", color: "#a5d6a7" }}>1000+</div>
                <div style={{ fontSize: "14px", opacity: "0.8" }}>Farmers Helped</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "800", color: "#a5d6a7" }}>50+</div>
                <div style={{ fontSize: "14px", opacity: "0.8" }}>Expert Guides</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .crop-underline {
            transition: width 0.4s ease;
          }

          .explore-badge {
            transition: opacity 0.3s ease;
          }
        `}
      </style>
    </>
  );
};

export default CropLibrary;