import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "✅ Product submitted successfully.\n\nYour product is waiting for admin approval."
      );

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        imageUrl: "",
      });
      setLoading(false);
      navigate("/my-products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message
      );
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f0f3f0",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <FarmerNavbar />

      {/* Page Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "45px",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            border: "1px solid #e8ece8",
          }}
        >
          <div
            style={{
              marginBottom: "35px",
              borderBottom: "2px solid #e8ece8",
              paddingBottom: "25px",
            }}
          >
            <h1
              style={{
                fontSize: "34px",
                color: "#14532d",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              <span style={{ fontSize: "38px" }}>🌾</span>
              Add New Product
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "16px",
                margin: 0
              }}
            >
              List your agricultural products for sale on the marketplace.
            </p>
          </div>

          <form onSubmit={addProduct}>
            {/* Product Name */}
            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#14532d",
                  fontSize: "15px"
                }}
              >
                📝 Product Name *
              </label>
              <input
                name="name"
                placeholder="e.g., Organic Tomatoes"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  border: "2px solid #d1d5db",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fafbfc",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "#fafbfc";
                }}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#14532d",
                  fontSize: "15px"
                }}
              >
                📂 Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  border: "2px solid #d1d5db",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fafbfc",
                  boxSizing: "border-box",
                  appearance: "auto"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "#fafbfc";
                }}
              >
                <option value="">Select Category</option>
                <option value="Vegetables">🥬 Vegetables</option>
                <option value="Fruits">🍎 Fruits</option>
                <option value="Grains">🌾 Grains</option>
                <option value="Spices">🌶️ Spices</option>
                <option value="Dairy">🥛 Dairy</option>
                <option value="Poultry">🐔 Poultry</option>
                <option value="Others">📦 Others</option>
              </select>
            </div>

            {/* Price and Quantity */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "22px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#14532d",
                    fontSize: "15px"
                  }}
                >
                  💰 Price (₹) *
                </label>
                <input
                  name="price"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: "10px",
                    border: "2px solid #d1d5db",
                    fontSize: "16px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    backgroundColor: "#fafbfc",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.backgroundColor = "#fafbfc";
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#14532d",
                    fontSize: "15px"
                  }}
                >
                  📦 Quantity (kg/L) *
                </label>
                <input
                  name="quantity"
                  type="number"
                  placeholder="e.g., 10"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: "10px",
                    border: "2px solid #d1d5db",
                    fontSize: "16px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    backgroundColor: "#fafbfc",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.backgroundColor = "#fafbfc";
                  }}
                />
              </div>
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#14532d",
                  fontSize: "15px"
                }}
              >
                🖼️ Image URL
              </label>
              <input
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  border: "2px solid #d1d5db",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fafbfc",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "#fafbfc";
                }}
              />
              {formData.imageUrl && (
                <div style={{ marginTop: "12px" }}>
                  <p style={{ 
                    fontSize: "13px", 
                    color: "#6b7280",
                    marginBottom: "8px",
                    fontWeight: "500"
                  }}>📸 Image Preview:</p>
                  <div style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "2px solid #e8ece8",
                    maxWidth: "250px"
                  }}>
                    <img
                      src={formData.imageUrl}
                      alt="Product preview"
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#14532d",
                  fontSize: "15px"
                }}
              >
                📝 Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe your product in detail..."
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  border: "2px solid #d1d5db",
                  fontSize: "16px",
                  outline: "none",
                  resize: "vertical",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fafbfc",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  minHeight: "120px"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "#fafbfc";
                }}
              />
            </div>

            {/* Info Box */}
            <div style={{
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              padding: "16px 20px",
              borderRadius: "10px",
              marginBottom: "25px",
              border: "1px solid #bbf7d0",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{ fontSize: "24px" }}>ℹ️</span>
              <div>
                <p style={{
                  margin: 0,
                  color: "#14532d",
                  fontSize: "14px",
                  fontWeight: "500"
                }}>
                  Product will be reviewed by admin before publishing
                </p>
                <p style={{
                  margin: "2px 0 0 0",
                  color: "#166534",
                  fontSize: "13px"
                }}>
                  Once approved, it will appear in the marketplace
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap"
              }}
            >
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "16px 24px",
                  background: loading ? "#9ca3af" : "linear-gradient(135deg, #14532d, #1a6b1a)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: "17px",
                  transition: "all 0.3s ease",
                  boxShadow: loading ? "none" : "0 4px 12px rgba(20, 83, 45, 0.3)",
                  opacity: loading ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  minWidth: "180px"
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(20, 83, 45, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(20, 83, 45, 0.3)";
                  }
                }}
              >
                {loading ? "⏳ Adding Product..." : "➕ Add Product"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/marketplace")}
                style={{
                  padding: "16px 32px",
                  background: "#f3f4f6",
                  color: "#1f2937",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "17px",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e5e7eb";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f3f4f6";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;