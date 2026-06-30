import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        "/api/products",
        {
          params: {
            search,
            category,
            sort,
          },
        }
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ["All", "Vegetables", "Fruits", "Grains", "Spices", "Dairy", "Poultry"];

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f0f5f0 0%, #f7f9fc 100%)",
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
              🛒 Buy & Sell
            </div>

            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                marginBottom: "10px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              🛒 Marketplace
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
              Buy quality agricultural products directly from verified farmers.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => {
                  const productSection = document.getElementById("product-list");
                  if (productSection) {
                    productSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={{
                  padding: "14px 32px",
                  background: "linear-gradient(135deg, #4CAF50, #45a049)",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(76, 175, 80, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(76, 175, 80, 0.3)";
                }}
              >
                🛒 Buy Products
              </button>

              <button
                onClick={() => navigate("/add-product")}
                style={{
                  padding: "14px 32px",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                🌾 Sell Your Product
              </button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid #e8f0e8",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568", display: "block", marginBottom: "6px" }}>
                🔍 Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2e7d32";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568", display: "block", marginBottom: "6px" }}>
                📂 Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f9fafb",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2e7d32";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "📋 All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568", display: "block", marginBottom: "6px" }}>
                📊 Sort By
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f9fafb",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2e7d32";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <option value="">Default Sorting</option>
                <option value="low">💰 Price: Low to High</option>
                <option value="high">💰 Price: High to Low</option>
              </select>
            </div>
          </div>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              paddingTop: "15px",
              borderTop: "1px solid #e8f0e8",
            }}
          >
            <span style={{ fontSize: "14px", color: "#6b7280" }}>
              {loading ? "Loading..." : `Found ${products.length} products`}
            </span>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("");
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#2e7d32",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1a3c1f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#2e7d32";
              }}
            >
              🔄 Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>⏳</div>
              <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
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
            <h3 style={{ color: "#1a3c1f", marginBottom: "10px" }}>No products found</h3>
            <p style={{ color: "#6b7280" }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div
            id="product-list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "30px",
              marginTop: "10px",
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  border: "1px solid #e8f0e8",
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
                    height: "220px",
                  }}
                >
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"}
                    alt={product.name}
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
                      background: "rgba(255,255,255,0.95)",
                      padding: "4px 14px",
                      borderRadius: "50px",
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#2e7d32",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {product.category}
                  </div>
                  {product.quantity === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: "8px 20px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "16px",
                      }}
                    >
                      Out of Stock
                    </div>
                  )}
                </div>

                <div style={{ padding: "22px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "10px",
                    }}
                  >
                    <h2
                      style={{
                        color: "#1a3c1f",
                        fontSize: "clamp(20px, 2vw, 24px)",
                        fontWeight: "700",
                        letterSpacing: "-0.3px",
                        margin: 0,
                      }}
                    >
                      🌾 {product.name}
                    </h2>
                    {product.averageRating > 0 && (
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#f59e0b",
                          fontWeight: "600",
                        }}
                      >
                        ⭐ {product.averageRating.toFixed(1)}
                      </span>
                    )}
                  </div>

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
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#2e7d32",
                      }}
                    >
                      ₹{product.price}
                      <span style={{ fontSize: "14px", fontWeight: "400", color: "#6b7280" }}> / kg</span>
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#4a5568",
                        background: "#f0f5f0",
                        padding: "4px 12px",
                        borderRadius: "50px",
                      }}
                    >
                      📦 {product.quantity} kg
                    </span>
                  </div>

                  <p
                    style={{
                      color: "#4b5563",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: "15px",
                    }}
                  >
                    {product.description || "Fresh and high-quality produce directly from the farm."}
                  </p>

                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "linear-gradient(135deg, #2e7d32, #388e3c)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "15px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(46, 125, 50, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(46, 125, 50, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(46, 125, 50, 0.3)";
                    }}
                  >
                    📖 View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;