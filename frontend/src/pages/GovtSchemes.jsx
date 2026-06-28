import React, { useState, useEffect } from "react";
import FarmerNavbar from "../components/FarmerNavbar";
import axios from "axios";

const GovtSchemes = () => {
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/schemes"
      );
      setSchemes(data.schemes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDetails = (index) => {
    if (expandedScheme === index) {
      setExpandedScheme(null);
    } else {
      setExpandedScheme(index);
    }
  };

  const categories = ["All", "Agriculture", "Financial", "Insurance", "Subsidy", "Training"];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || scheme.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      Agriculture: "#2e7d32",
      Financial: "#0d47a1",
      Insurance: "#f57c00",
      Subsidy: "#6a1b9a",
      Training: "#c62828",
    };
    return colors[category] || "#2e7d32";
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      Agriculture: "🌾",
      Financial: "💰",
      Insurance: "🛡️",
      Subsidy: "📊",
      Training: "📚",
    };
    return emojis[category] || "📋";
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
            <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading schemes...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f4f7f4 0%, #e8f0e8 100%)",
        minHeight: "100vh",
      }}
    >
      <FarmerNavbar />

      <div
        style={{
          maxWidth: "1400px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            padding: "50px 30px",
            background: "linear-gradient(135deg, #1a3c1f 0%, #2e7d32 50%, #388e3c 100%)",
            borderRadius: "24px",
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
              🇮🇳 Government Initiatives
            </div>

            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                marginBottom: "10px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              📢 Government Schemes
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
              Explore agriculture schemes and financial support provided by the Government for farmers.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "4px 14px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                🌾 Agriculture
              </span>
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "4px 14px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                💰 Financial
              </span>
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "4px 14px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                🛡️ Insurance
              </span>
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "4px 14px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                📊 Subsidy
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
              placeholder="🔍 Search schemes..."
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
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
                <option key={cat} value={cat}>
                  {cat === "All" ? "📋 All Categories" : `${getCategoryEmoji(cat)} ${cat}`}
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
            {filteredSchemes.length} schemes found
          </span>
        </div>

        {/* Schemes Grid */}
        {filteredSchemes.length === 0 ? (
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
            <h3 style={{ color: "#1a3c1f", marginBottom: "10px" }}>No schemes found</h3>
            <p style={{ color: "#6b7280" }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "30px",
              marginTop: "20px",
            }}
          >
            {filteredSchemes.map((scheme, index) => {
              const categoryColor = getCategoryColor(scheme.category || "Agriculture");
              const categoryEmoji = getCategoryEmoji(scheme.category || "Agriculture");

              return (
                <div
                  key={index}
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
                    e.currentTarget.style.borderColor = categoryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px) scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "#e8f0e8";
                  }}
                >
                  {/* Category Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      background: categoryColor,
                      color: "white",
                      padding: "4px 14px",
                      borderRadius: "50px",
                      fontSize: "12px",
                      fontWeight: "600",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {categoryEmoji} {scheme.category || "Agriculture"}
                  </div>

                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: "200px",
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
                      padding: "22px",
                    }}
                  >
                    <h2
                      style={{
                        color: "#1a3c1f",
                        marginBottom: "10px",
                        fontSize: "clamp(20px, 2vw, 24px)",
                        fontWeight: "700",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {scheme.title}
                    </h2>

                    <p
                      style={{
                        color: "#4b5563",
                        lineHeight: "1.7",
                        fontSize: "15px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
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
                        marginTop: "18px",
                        width: "100%",
                        background: expandedScheme === index
                          ? "linear-gradient(135deg, #14532d, #0b5d1e)"
                          : `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`,
                        color: "white",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "50px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                        boxShadow: expandedScheme === index
                          ? "none"
                          : `0 4px 15px ${categoryColor}44`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow = `0 8px 25px ${categoryColor}66`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = expandedScheme === index
                          ? "none"
                          : `0 4px 15px ${categoryColor}44`;
                      }}
                    >
                      {expandedScheme === index ? "📕 Show Less" : "📖 Learn More"}
                    </button>

                    {expandedScheme === index && (
                      <div
                        style={{
                          marginTop: "18px",
                          paddingTop: "18px",
                          borderTop: `2px solid ${categoryColor}33`,
                          animation: "slideDown 0.3s ease",
                        }}
                      >
                        <div style={{ marginBottom: "12px" }}>
                          <h4 style={{ color: categoryColor, marginBottom: "4px", fontSize: "14px", fontWeight: "600" }}>
                            📝 Description
                          </h4>
                          <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
                            {scheme.description}
                          </p>
                        </div>

                        <div style={{ marginBottom: "12px" }}>
                          <h4 style={{ color: categoryColor, marginBottom: "4px", fontSize: "14px", fontWeight: "600" }}>
                            ✅ Eligibility
                          </h4>
                          <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
                            {scheme.eligibility || "All eligible farmers can apply."}
                          </p>
                        </div>

                        <div style={{ marginBottom: "12px" }}>
                          <h4 style={{ color: categoryColor, marginBottom: "4px", fontSize: "14px", fontWeight: "600" }}>
                            🎯 Benefits
                          </h4>
                          <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
                            {scheme.benefits || "Various benefits for farmers."}
                          </p>
                        </div>

                        <div style={{ marginBottom: "12px" }}>
                          <h4 style={{ color: categoryColor, marginBottom: "4px", fontSize: "14px", fontWeight: "600" }}>
                            📅 Deadline
                          </h4>
                          <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
                            {scheme.deadline || "Check official website for updates."}
                          </p>
                        </div>

                        {scheme.officialLink && (
                          <div style={{ marginTop: "12px" }}>
                            <a
                              href={scheme.officialLink}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                color: categoryColor,
                                fontWeight: "600",
                                textDecoration: "none",
                                background: `${categoryColor}11`,
                                padding: "8px 20px",
                                borderRadius: "50px",
                                transition: "all 0.3s ease",
                                border: `1px solid ${categoryColor}33`,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = `${categoryColor}22`;
                                e.currentTarget.style.transform = "scale(1.02)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = `${categoryColor}11`;
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            >
                              🔗 Official Website
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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