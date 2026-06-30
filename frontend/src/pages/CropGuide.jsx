import React, { useState, useEffect } from "react";
import FarmerNavbar from "../components/FarmerNavbar";
import API from "../api";

const CropGuide = () => {
  const [crops, setCrops] = useState([]);
  const [expandedCrop, setExpandedCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        "/api/crops"
      );
      setCrops(data.crops);
    } catch (error) {
      console.error("Error fetching crops:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (cropId) => {
    if (expandedCrop === cropId) {
      setExpandedCrop(null);
    } else {
      setExpandedCrop(cropId);
    }
  };

  const categories = [
    { id: "All", label: "All Crops", emoji: "🌿" },
    { id: "Field Crops", label: "Field Crops", emoji: "🌾" },
    { id: "Vegetable", label: "Vegetables", emoji: "🥕" },
    { id: "Fruit", label: "Fruits", emoji: "🍎" },
    { id: "Flower", label: "Flowers", emoji: "🌺" },
  ];

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderSection = (title, category, emoji) => {
    const filteredCrops = crops.filter(crop => crop.category === category);

    if (filteredCrops.length === 0) return null;

    return (
      <>
        <h2
          style={{
            marginTop: "50px",
            marginBottom: "10px",
            color: "#1a3c1f",
            fontSize: "clamp(28px, 3vw, 34px)",
            fontWeight: "800",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderBottom: "3px solid #2e7d32",
            paddingBottom: "12px",
            letterSpacing: "-0.5px",
          }}
        >
          <span style={{ fontSize: "36px" }}>{emoji}</span>
          {title}
          <span
            style={{
              marginLeft: "auto",
              fontSize: "14px",
              color: "#6b7280",
              fontWeight: "500",
              background: "#f0f5f0",
              padding: "4px 16px",
              borderRadius: "50px",
            }}
          >
            {filteredCrops.length} crops
          </span>
        </h2>

        <p
          style={{
            color: "#6b7280",
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
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
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
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid #e8f0e8",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.01)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#2e7d32";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#e8f0e8";
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
                    transition: "transform 0.6s ease",
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
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "50%",
                    padding: "6px",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  {emoji}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.3))",
                    padding: "20px",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "22px 22px 25px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "clamp(20px, 2vw, 24px)",
                    fontWeight: "700",
                    color: "#1a3c1f",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {crop.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#4a5568",
                      background: "#f0f5f0",
                      padding: "4px 12px",
                      borderRadius: "50px",
                    }}
                  >
                    🌱 {crop.season || "N/A"}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#4a5568",
                      background: "#f0f5f0",
                      padding: "4px 12px",
                      borderRadius: "50px",
                    }}
                  >
                    🏞️ {crop.soil || "N/A"}
                  </span>
                  {crop.seedPrice && (
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#2e7d32",
                        background: "#e8f5e9",
                        padding: "4px 12px",
                        borderRadius: "50px",
                        fontWeight: "600",
                      }}
                    >
                      💰 ₹{crop.seedPrice}/kg
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleExpand(crop._id)}
                  style={{
                    background: expandedCrop === crop._id 
                      ? "linear-gradient(135deg, #14532d, #0b5d1e)" 
                      : "linear-gradient(135deg, #2e7d32, #388e3c)",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    letterSpacing: "0.3px",
                    width: "100%",
                    boxShadow: expandedCrop === crop._id
                      ? "none"
                      : "0 4px 15px rgba(46, 125, 50, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(46, 125, 50, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = expandedCrop === crop._id
                      ? "none"
                      : "0 4px 15px rgba(46, 125, 50, 0.3)";
                  }}
                >
                  {expandedCrop === crop._id ? "📕 Show Less" : "📖 Learn More"}
                </button>

                {expandedCrop === crop._id && (
                  <div
                    style={{
                      marginTop: "18px",
                      paddingTop: "18px",
                      borderTop: "2px solid #e8f0e8",
                      animation: "slideDown 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <div style={{ background: "#f8faf8", padding: "12px", borderRadius: "10px" }}>
                        <h4 style={{ color: "#2e7d32", marginBottom: "3px", fontSize: "13px", fontWeight: "600" }}>
                          🌱 Season
                        </h4>
                        <p style={{ color: "#4a5568", fontSize: "13px", margin: 0 }}>
                          {crop.season || "N/A"}
                        </p>
                      </div>

                      <div style={{ background: "#f8faf8", padding: "12px", borderRadius: "10px" }}>
                        <h4 style={{ color: "#2e7d32", marginBottom: "3px", fontSize: "13px", fontWeight: "600" }}>
                          🏞️ Soil
                        </h4>
                        <p style={{ color: "#4a5568", fontSize: "13px", margin: 0 }}>
                          {crop.soil || "N/A"}
                        </p>
                      </div>
                    </div>

                    {crop.fertilizers && crop.fertilizers.length > 0 && (
                      <div style={{ marginTop: "12px", background: "#f8faf8", padding: "12px", borderRadius: "10px" }}>
                        <h4 style={{ color: "#2e7d32", marginBottom: "3px", fontSize: "13px", fontWeight: "600" }}>
                          🧪 Fertilizers
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {crop.fertilizers.map((fertilizer, index) => (
                            <span
                              key={index}
                              style={{
                                background: "#e8f5e9",
                                color: "#2e7d32",
                                padding: "3px 12px",
                                borderRadius: "50px",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              {fertilizer}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {crop.diseases && crop.diseases.length > 0 && (
                      <div style={{ marginTop: "12px", background: "#fef3c7", padding: "12px", borderRadius: "10px" }}>
                        <h4 style={{ color: "#92400e", marginBottom: "3px", fontSize: "13px", fontWeight: "600" }}>
                          🦠 Diseases
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {crop.diseases.map((disease, index) => (
                            <span
                              key={index}
                              style={{
                                background: "#fef3c7",
                                color: "#92400e",
                                padding: "3px 12px",
                                borderRadius: "50px",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              {disease}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {crop.seedPrice && (
                      <div style={{ marginTop: "12px", background: "#e8f5e9", padding: "12px", borderRadius: "10px" }}>
                        <h4 style={{ color: "#2e7d32", marginBottom: "3px", fontSize: "13px", fontWeight: "600" }}>
                          💰 Seed Price
                        </h4>
                        <p style={{ color: "#2e7d32", fontSize: "16px", margin: 0, fontWeight: "700" }}>
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
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                            color: "white",
                            padding: "10px 24px",
                            borderRadius: "50px",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "14px",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
                            width: "100%",
                            justifyContent: "center",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.03)";
                            e.currentTarget.style.boxShadow = "0 8px 25px rgba(220, 38, 38, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(220, 38, 38, 0.3)";
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

  if (loading) {
    return (
      <>
        <FarmerNavbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
            background: "#f4f7f4",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>⏳</div>
            <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading crop guide...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          background: "linear-gradient(180deg, #f4f7f4 0%, #e8f0e8 100%)",
          minHeight: "100vh",
          padding: "30px 20px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Hero Section */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
              padding: "50px 30px",
              background: "linear-gradient(135deg, #1a3c1f 0%, #2e7d32 50%, #388e3c 100%)",
              borderRadius: "25px",
              color: "white",
              boxShadow: "0 10px 40px rgba(11, 93, 30, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-100px",
                right: "-50px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-80px",
                left: "-30px",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.03)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  padding: "6px 20px",
                  borderRadius: "50px",
                  marginBottom: "15px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                📚 Knowledge Base
              </div>

              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  marginBottom: "10px",
                  fontWeight: "800",
                  letterSpacing: "-0.5px",
                }}
              >
                🌾 Crop Guide
              </h1>

              <p
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)",
                  maxWidth: "700px",
                  margin: "0 auto",
                  opacity: "0.95",
                  lineHeight: "1.7",
                }}
              >
                Explore crops, cultivation methods, fertilizers, irrigation techniques,
                diseases and seeds for better farming.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  marginTop: "25px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.1)",
                    padding: "6px 16px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span>🌾</span> Field Crops
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.1)",
                    padding: "6px 16px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span>🥕</span> Vegetables
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.1)",
                    padding: "6px 16px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span>🍎</span> Fruits
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.1)",
                    padding: "6px 16px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span>🌺</span> Flowers
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "30px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1, minWidth: "200px" }}>
              <input
                type="text"
                placeholder="🔍 Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  border: "2px solid #e5e7eb",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  background: "white",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2e7d32";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <div style={{ minWidth: "180px" }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  border: "2px solid #e5e7eb",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  background: "white",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2e7d32";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <span
              style={{
                color: "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
                background: "white",
                padding: "8px 18px",
                borderRadius: "50px",
                border: "1px solid #e5e7eb",
              }}
            >
              {filteredCrops.length} crops found
            </span>
          </div>

          {/* Crop Sections */}
          {renderSection("Field Crops", "Field Crops", "🌾")}
          {renderSection("Vegetables", "Vegetable", "🥕")}
          {renderSection("Fruits", "Fruit", "🍎")}
          {renderSection("Flowers", "Flower", "🌺")}

          {filteredCrops.length === 0 && crops.length > 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                background: "white",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid #e8f0e8",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔍</div>
              <h3 style={{ color: "#1a3c1f", marginBottom: "10px" }}>No crops found</h3>
              <p style={{ color: "#6b7280" }}>
                Try adjusting your search or filter criteria
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