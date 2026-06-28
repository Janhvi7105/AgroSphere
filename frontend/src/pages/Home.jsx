import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          height: "auto",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "20px",
            paddingTop: "90px",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              animation: "fadeInUp 1s ease-out",
            }}
          >
            {/* Animated Badge */}
            <div
              style={{
                display: "inline-block",
                background: "rgba(76, 175, 80, 0.2)",
                backdropFilter: "blur(10px)",
                padding: "8px 24px",
                borderRadius: "50px",
                marginBottom: "20px",
                border: "1px solid rgba(76, 175, 80, 0.3)",
                animation: "pulse 2s infinite",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
                🌱 Smart Farming Revolution
              </span>
            </div>

            <div
              style={{
                fontSize: "clamp(3rem, 8vw, 5rem)",
                marginBottom: "10px",
                display: "inline-block",
                background: "linear-gradient(135deg, #4CAF50, #8BC34A, #4CAF50)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientShift 3s ease infinite",
              }}
            >
              🌾
            </div>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                padding: "0 10px",
                marginBottom: "20px",
                fontWeight: "800",
                letterSpacing: "-1px",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                background: "linear-gradient(135deg, #ffffff 0%, #e8f5e9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome to AgroSphere
            </h1>

            <p
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                padding: "0 15px",
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: "1.8",
                opacity: "0.95",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                color: "#f0fdf4",
              }}
            >
              Smart Agriculture Platform For Farmers.
              Crop Guidance, Expert Support,
              Marketplace, Government Schemes and
              Community in One Place.
            </p>

            {/* Stats Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginTop: "40px",
                flexWrap: "wrap",
                padding: "20px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#4CAF50" }}>50K+</div>
                <div style={{ fontSize: "14px", opacity: "0.8" }}>Active Farmers</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#4CAF50" }}>10K+</div>
                <div style={{ fontSize: "14px", opacity: "0.8" }}>Products Listed</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#4CAF50" }}>98%</div>
                <div style={{ fontSize: "14px", opacity: "0.8" }}>Satisfaction Rate</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#4CAF50" }}>24/7</div>
                <div style={{ fontSize: "14px", opacity: "0.8" }}>Expert Support</div>
              </div>
            </div>

            <div
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate("/about")}
                style={{
                  background: "linear-gradient(135deg, #4CAF50, #45a049)",
                  color: "white",
                  border: "none",
                  padding: "16px 40px",
                  borderRadius: "50px",
                  fontSize: "clamp(16px, 1.2vw, 18px)",
                  cursor: "pointer",
                  fontWeight: "600",
                  width: "220px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 12px 35px rgba(76, 175, 80, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(76, 175, 80, 0.4)";
                }}
              >
                🚀 Explore AgroSphere
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8faf8 100%)",
          padding: "80px 20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
                color: "#0d47a1",
                padding: "8px 24px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "15px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              What We Offer
            </span>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.2rem)",
                marginBottom: "15px",
                color: "#1a3c1f",
                fontWeight: "800",
                letterSpacing: "-1px",
              }}
            >
              Our <span style={{ color: "#2e7d32" }}>Services</span>
            </h2>
            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                color: "#4a5568",
                lineHeight: "1.8",
              }}
            >
              Comprehensive solutions to help farmers succeed in modern agriculture.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "30px",
            }}
          >
            <ServiceCard
              icon="🌱"
              title="Crop Guide"
              desc="Detailed crop information and disease management."
              color="#2e7d32"
              gradient="linear-gradient(135deg, #e8f5e9, #c8e6c9)"
            />

            <ServiceCard
              icon="👨‍🌾"
              title="Agriculturist Support"
              desc="Get guidance from agriculture experts."
              color="#f57c00"
              gradient="linear-gradient(135deg, #fff3e0, #ffe0b2)"
            />

            <ServiceCard
              icon="🛒"
              title="Marketplace"
              desc="Buy and sell agricultural products."
              color="#0d47a1"
              gradient="linear-gradient(135deg, #e3f2fd, #bbdefb)"
            />

            <ServiceCard
              icon="☁️"
              title="Weather Forecast"
              desc="Real-time weather updates."
              color="#0288d1"
              gradient="linear-gradient(135deg, #e1f5fe, #b3e5fc)"
            />

            <ServiceCard
              icon="📢"
              title="Govt Schemes"
              desc="Latest agriculture schemes and benefits."
              color="#4a148c"
              gradient="linear-gradient(135deg, #f3e5f5, #e1bee7)"
            />

            <ServiceCard
              icon="👥"
              title="Community"
              desc="Connect and share knowledge with farmers."
              color="#c62828"
              gradient="linear-gradient(135deg, #ffebee, #ffcdd2)"
            />
          </div>
        </div>
      </section>

      <Footer />

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </>
  );
};

const ServiceCard = ({
  icon,
  title,
  desc,
  color = "#2e7d32",
  gradient = "linear-gradient(135deg, #ffffff, #f5f5f5)",
}) => {
  return (
    <div
      style={{
        background: gradient,
        padding: "35px 25px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        borderTop: `4px solid ${color}`,
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
          background: `radial-gradient(circle, ${color}15, transparent 70%)`,
        }}
      />
      
      <div
        style={{
          fontSize: "64px",
          marginBottom: "15px",
          display: "block",
          position: "relative",
          zIndex: 1,
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: "clamp(1.2rem, 2vw, 1.4rem)",
          marginBottom: "10px",
          color: "#1a3c1f",
          fontWeight: "700",
          position: "relative",
          zIndex: 1,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "clamp(0.95rem, 1.2vw, 1rem)",
          lineHeight: "1.6",
          color: "#4a5568",
          position: "relative",
          zIndex: 1,
        }}
      >
        {desc}
      </p>

      {/* Hover Underline Effect */}
      <div
        style={{
          width: "0%",
          height: "3px",
          background: color,
          margin: "12px auto 0",
          borderRadius: "2px",
          transition: "width 0.4s ease",
        }}
        className="service-underline"
        onMouseEnter={(e) => {
          e.currentTarget.style.width = "60%";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.width = "0%";
        }}
      />
    </div>
  );
};

export default Home;