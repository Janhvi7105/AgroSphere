import React, { useState, useEffect } from "react";
import FarmerNavbar from "../components/FarmerNavbar";
import axios from "axios";

const GovtSchemes = () => {
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/schemes"
      );

      setSchemes(data.schemes);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDetails = (index) => {
    if (expandedScheme === index) {
      setExpandedScheme(null);
    } else {
      setExpandedScheme(index);
    }
  };

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <FarmerNavbar />

      {/* Page Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "0 30px",
        }}
      >
        <div
          style={{
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              color: "#14532d",
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            📢 Government Schemes
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
            }}
          >
            Explore agriculture schemes and financial support provided by the Government for farmers.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          {schemes.map((scheme, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "28px",
                borderRadius: "18px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
                transition: "0.3s",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
              }}
            >
              <img
                src={
                  scheme.image ||
                  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600"
                }
                alt={scheme.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />

              <h2
                style={{
                  color: "#14532d",
                  marginBottom: "15px",
                  fontSize: "24px",
                }}
              >
                {scheme.title}
              </h2>

              <p
                style={{
                  color: "#4b5563",
                  lineHeight: "1.7",
                  fontSize: "16px",
                }}
              >
                {scheme.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetails(index);
                }}
                style={{
                  marginTop: "20px",
                  background: expandedScheme === index ? "#b45309" : "#14532d",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (expandedScheme !== index) {
                    e.currentTarget.style.background = "#0b5d1e";
                  }
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  if (expandedScheme !== index) {
                    e.currentTarget.style.background = "#14532d";
                  }
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {expandedScheme === index ? "📕 Show Less" : "📖 Learn More"}
              </button>

              {expandedScheme === index && (
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "20px",
                    borderTop: "2px solid #e5e7eb",
                    animation: "slideDown 0.3s ease",
                  }}
                >
                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ color: "#14532d", marginBottom: "5px" }}>Description</h4>
                    <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
                      {scheme.description}
                    </p>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ color: "#14532d", marginBottom: "5px" }}>Eligibility</h4>
                    <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
                      {scheme.eligibility}
                    </p>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ color: "#14532d", marginBottom: "5px" }}>Benefits</h4>
                    <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
                      {scheme.benefits}
                    </p>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ color: "#14532d", marginBottom: "5px" }}>Deadline</h4>
                    <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
                      {scheme.deadline}
                    </p>
                  </div>

                  <div>
                    <a
                      href={scheme.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#14532d",
                        fontWeight: "600",
                        textDecoration: "underline",
                      }}
                    >
                      Official Website
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default GovtSchemes;