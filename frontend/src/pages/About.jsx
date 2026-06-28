import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();

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
              🌾 About Us
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
            Empowering Farmers Through <br />
            <span style={{ color: "#a5d6a7" }}>Technology</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.8",
              opacity: "0.95",
            }}
          >
            AgroSphere is a smart agriculture platform developed to empower
            farmers through modern technology. Farmers can buy and sell products,
            access crop guidance, explore government schemes, connect with other
            farmers, and receive AI-powered farming assistance.
          </p>

          <button
            onClick={() => navigate("/register")}
            style={{
              marginTop: "30px",
              background: "white",
              color: "#1a3c1f",
              border: "none",
              padding: "16px 40px",
              borderRadius: "50px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
            }}
          >
            🚀 Get Started
          </button>
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
          {/* Mission, Vision, Features Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              marginBottom: "60px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "35px 30px",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                borderTop: "4px solid #2e7d32",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>🌱</div>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                  color: "#1a3c1f",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                Our Mission
              </h3>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  color: "#4a5568",
                  lineHeight: "1.7",
                }}
              >
                To help farmers improve productivity using digital technology and
                make agriculture more sustainable and profitable.
              </p>
            </div>

            <div
              style={{
                background: "white",
                padding: "35px 30px",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                borderTop: "4px solid #f57c00",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>🚀</div>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                  color: "#1a3c1f",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                Our Vision
              </h3>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  color: "#4a5568",
                  lineHeight: "1.7",
                }}
              >
                To become India's most trusted smart farming platform, empowering
                millions of farmers with technology-driven solutions.
              </p>
            </div>

            <div
              style={{
                background: "white",
                padding: "35px 30px",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                borderTop: "4px solid #0d47a1",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>💡</div>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                  color: "#1a3c1f",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                Key Features
              </h3>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  color: "#4a5568",
                  lineHeight: "1.7",
                }}
              >
                Marketplace, AI Assistant, Weather, Crop Guide, Community and
                Government Schemes — all in one platform.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "30px",
              marginTop: "20px",
              padding: "40px",
              background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
              borderRadius: "20px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#1a3c1f" }}>50K+</div>
              <div style={{ fontSize: "16px", color: "#2e7d32", fontWeight: "500" }}>Active Farmers</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#1a3c1f" }}>10K+</div>
              <div style={{ fontSize: "16px", color: "#2e7d32", fontWeight: "500" }}>Products Listed</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#1a3c1f" }}>98%</div>
              <div style={{ fontSize: "16px", color: "#2e7d32", fontWeight: "500" }}>Satisfaction Rate</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#1a3c1f" }}>24/7</div>
              <div style={{ fontSize: "16px", color: "#2e7d32", fontWeight: "500" }}>Expert Support</div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div style={{ marginTop: "60px" }}>
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#1a3c1f",
                fontWeight: "800",
                marginBottom: "40px",
                letterSpacing: "-1px",
              }}
            >
              Why Choose <span style={{ color: "#2e7d32" }}>AgroSphere?</span>
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "25px",
              }}
            >
              <FeatureItem
                icon="🤖"
                title="AI-Powered Assistance"
                desc="Get instant answers to your farming questions with our intelligent AI assistant."
              />
              <FeatureItem
                icon="📊"
                title="Real-Time Insights"
                desc="Access weather forecasts, market prices, and crop recommendations in real-time."
              />
              <FeatureItem
                icon="🤝"
                title="Community Connect"
                desc="Connect with fellow farmers, share experiences, and learn from each other."
              />
              <FeatureItem
                icon="🛡️"
                title="Trusted Platform"
                desc="Secure and verified marketplace with quality assurance and farmer verification."
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const FeatureItem = ({ icon, title, desc }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "30px 25px",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        textAlign: "center",
        border: "1px solid #e8f0e8",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.1)";
        e.currentTarget.style.borderColor = "#2e7d32";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
        e.currentTarget.style.borderColor = "#e8f0e8";
      }}
    >
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>{icon}</div>
      <h4
        style={{
          fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
          color: "#1a3c1f",
          marginBottom: "8px",
          fontWeight: "700",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: "clamp(0.95rem, 1.1vw, 1rem)",
          color: "#4a5568",
          lineHeight: "1.6",
        }}
      >
        {desc}
      </p>
    </div>
  );
};

export default About;