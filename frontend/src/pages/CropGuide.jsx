import React, { useState, useEffect } from "react";
import FarmerNavbar from "../components/FarmerNavbar";
import axios from "axios";

const CropGuide = () => {
  const [crops, setCrops] = useState([]);
  const [expandedCrop, setExpandedCrop] = useState(null);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/crops"
      );
      setCrops(data.crops);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  const toggleExpand = (cropId) => {
    if (expandedCrop === cropId) {
      setExpandedCrop(null);
    } else {
      setExpandedCrop(cropId);
    }
  };

  const renderSection = (title, category, emoji) => {
    const filteredCrops = crops.filter(crop => crop.category === category);

    if (filteredCrops.length === 0) return null;

    return (
      <>
        <h2
          style={{
            marginTop: "50px",
            marginBottom: "10px",
            color: "#0b5d1e",
            fontSize: "32px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderBottom: "3px solid #0b5d1e",
            paddingBottom: "10px",
          }}
        >
          <span style={{ fontSize: "36px" }}>{emoji}</span>
          {title}
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "16px",
            marginBottom: "25px",
            marginTop: "5px",
          }}
        >
          Explore different {title.toLowerCase()} varieties and their cultivation methods
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          {filteredCrops.map((crop) => (
            <div
              key={crop._id}
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                border: "1px solid #e8f0e8",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
                }}
              >
                <img
                  src={crop.image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600"}
                  alt={crop.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    fontSize: "32px",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "50%",
                    padding: "6px",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {emoji}
                </div>
              </div>

              <div
                style={{
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#1a3a2a",
                  }}
                >
                  {crop.name}
                </h3>

                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  <strong>Season:</strong> {crop.season || "N/A"}
                </p>

                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  <strong>Soil:</strong> {crop.soil || "N/A"}
                </p>

                {crop.seedPrice && (
                  <p
                    style={{
                      margin: "0 0 15px 0",
                      fontSize: "14px",
                      color: "#14532d",
                      fontWeight: "600",
                    }}
                  >
                    💰 Seed Price: ₹{crop.seedPrice}/kg
                  </p>
                )}

                <button
                  onClick={() => toggleExpand(crop._id)}
                  style={{
                    background: "#0b5d1e",
                    color: "white",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    letterSpacing: "0.3px",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#14532d";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#0b5d1e";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {expandedCrop === crop._id ? "📕 Show Less" : "📖 Learn More"}
                </button>

                {expandedCrop === crop._id && (
                  <div
                    style={{
                      marginTop: "15px",
                      paddingTop: "15px",
                      borderTop: "2px solid #e5e7eb",
                      animation: "slideDown 0.3s ease",
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      <h4 style={{ color: "#14532d", marginBottom: "3px", fontSize: "14px" }}>
                        🌱 Season
                      </h4>
                      <p style={{ color: "#4b5563", fontSize: "13px", margin: 0 }}>
                        {crop.season || "N/A"}
                      </p>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <h4 style={{ color: "#14532d", marginBottom: "3px", fontSize: "14px" }}>
                        🏞️ Soil
                      </h4>
                      <p style={{ color: "#4b5563", fontSize: "13px", margin: 0 }}>
                        {crop.soil || "N/A"}
                      </p>
                    </div>

                    {crop.fertilizers && crop.fertilizers.length > 0 && (
                      <div style={{ marginBottom: "10px" }}>
                        <h4 style={{ color: "#14532d", marginBottom: "3px", fontSize: "14px" }}>
                          🧪 Fertilizers
                        </h4>
                        <p style={{ color: "#4b5563", fontSize: "13px", margin: 0 }}>
                          {crop.fertilizers.join(", ")}
                        </p>
                      </div>
                    )}

                    {crop.diseases && crop.diseases.length > 0 && (
                      <div style={{ marginBottom: "10px" }}>
                        <h4 style={{ color: "#14532d", marginBottom: "3px", fontSize: "14px" }}>
                          🦠 Diseases
                        </h4>
                        <p style={{ color: "#4b5563", fontSize: "13px", margin: 0 }}>
                          {crop.diseases.join(", ")}
                        </p>
                      </div>
                    )}

                    {crop.seedPrice && (
                      <div style={{ marginBottom: "10px" }}>
                        <h4 style={{ color: "#14532d", marginBottom: "3px", fontSize: "14px" }}>
                          💰 Seed Price
                        </h4>
                        <p style={{ color: "#14532d", fontSize: "13px", margin: 0, fontWeight: "600" }}>
                          ₹{crop.seedPrice}/kg
                        </p>
                      </div>
                    )}

                    {crop.videoUrl && (
                      <div style={{ marginTop: "12px" }}>
                        <a
                          href={crop.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: "inline-block",
                            background: "#dc2626",
                            color: "white",
                            padding: "8px 20px",
                            borderRadius: "20px",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "14px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#b91c1c";
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#dc2626";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          ▶️ Watch Video
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          background: "linear-gradient(135deg, #f4f7f4 0%, #e8f0e8 100%)",
          minHeight: "100vh",
          padding: "30px 40px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
              padding: "40px 20px",
              background: "linear-gradient(135deg, #0b5d1e 0%, #14532d 100%)",
              borderRadius: "25px",
              color: "white",
              boxShadow: "0 10px 40px rgba(11, 93, 30, 0.3)",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                marginBottom: "10px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              🌾 Crop Guide
            </h1>

            <p
              style={{
                fontSize: "20px",
                maxWidth: "700px",
                margin: "0 auto",
                opacity: "0.95",
                lineHeight: "1.6",
              }}
            >
              Explore crops, cultivation methods, fertilizers, irrigation techniques,
              diseases and seeds for better farming.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                marginTop: "25px",
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>🌾</span> Field Crops
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>🥕</span> Vegetables
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>🍎</span> Fruits
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>🌺</span> Flowers
              </span>
            </div>
          </div>

          {renderSection("Field Crops", "Field Crops", "🌾")}
          {renderSection("Vegetables", "Vegetable", "🥕")}
          {renderSection("Fruits", "Fruit", "🍎")}
          {renderSection("Flowers", "Flower", "🌺")}

          {crops.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                background: "white",
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <p style={{ fontSize: "18px", color: "#6b7280" }}>
                No crops available yet. Please check back later.
              </p>
            </div>
          )}
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
    </>
  );
};

export default CropGuide;