import React, { useState } from "react";
import axios from "axios";
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

      await axios.post(
        "http://localhost:5000/api/products",
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
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <FarmerNavbar />

      {/* Page Content */}
      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "0 30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "36px",
                color: "#14532d",
                marginBottom: "10px",
              }}
            >
              🌾 Add New Product
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              List your agricultural products for sale on the marketplace.
            </p>
          </div>

          <form onSubmit={addProduct}>
            {/* Product Name */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                Product Name *
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
                  transition: "border-color 0.3s",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                Category *
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
                  transition: "border-color 0.3s",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
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
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Price (₹) *
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
                    transition: "border-color 0.3s",
                    backgroundColor: "#f9fafb",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Quantity (kg/L) *
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
                    transition: "border-color 0.3s",
                    backgroundColor: "#f9fafb",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                />
              </div>
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                Image URL
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
                  transition: "border-color 0.3s",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
              />
              {formData.imageUrl && (
                <div style={{ marginTop: "10px" }}>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Preview:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Product preview"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                Description *
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
                  transition: "border-color 0.3s",
                  backgroundColor: "#f9fafb",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
              />
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "16px",
                  background: loading ? "#6b7280" : "#14532d",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: "18px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#0b5d1e";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#14532d";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                {loading ? "⏳ Adding Product..." : "➕ Add Product"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/marketplace")}
                style={{
                  padding: "16px 30px",
                  background: "#e5e7eb",
                  color: "#1f2937",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "18px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#e5e7eb";
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;