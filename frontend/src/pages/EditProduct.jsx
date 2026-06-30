import React, { useState, useEffect, useCallback } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    price: "",
    quantity: "",
    description: "",
  });

  const fetchProduct = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get(
        "/api/products/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const selectedProduct = data.find(
        (p) => p._id === id
      );

      if (selectedProduct) {
        setProduct({
          price: selectedProduct.price,
          quantity: selectedProduct.quantity,
          description: selectedProduct.description,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { data } = await API.put(
        `/api/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      navigate("/my-products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <div style={{
      background: "#f0f3f0",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px"
    }}>
      <div style={{
        background: "white",
        maxWidth: "600px",
        width: "100%",
        padding: "45px",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        border: "1px solid #e8ece8"
      }}>
        <div style={{
          marginBottom: "30px",
          borderBottom: "2px solid #e8ece8",
          paddingBottom: "20px"
        }}>
          <h1 style={{
            margin: 0,
            fontSize: "28px",
            color: "#14532d",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ fontSize: "32px" }}>✏️</span>
            Edit Product
          </h1>
          <p style={{
            margin: "8px 0 0 0",
            color: "#6b7280",
            fontSize: "15px"
          }}>
            Update your product information
          </p>
        </div>

        <form onSubmit={updateProduct}>
          <div style={{ marginBottom: "22px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#14532d",
              fontSize: "15px"
            }}>
              💰 Price (₹)
            </label>
            <input
              type="number"
              placeholder="Enter product price"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e8ece8",
                borderRadius: "12px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
                background: "#fafbfc"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#14532d";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                e.currentTarget.style.background = "white";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e8ece8";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "#fafbfc";
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#14532d",
              fontSize: "15px"
            }}>
              📦 Quantity (kg)
            </label>
            <input
              type="number"
              placeholder="Enter product quantity"
              value={product.quantity}
              onChange={(e) =>
                setProduct({
                  ...product,
                  quantity: e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e8ece8",
                borderRadius: "12px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
                background: "#fafbfc"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#14532d";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                e.currentTarget.style.background = "white";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e8ece8";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "#fafbfc";
              }}
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#14532d",
              fontSize: "15px"
            }}>
              📝 Description
            </label>
            <textarea
              placeholder="Enter product description"
              value={product.description}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
              }
              rows="4"
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e8ece8",
                borderRadius: "12px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
                fontFamily: "inherit",
                resize: "vertical",
                background: "#fafbfc",
                minHeight: "120px"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#14532d";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                e.currentTarget.style.background = "white";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e8ece8";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "#fafbfc";
              }}
            />
          </div>

          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "16px 32px",
                background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "17px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(20, 83, 45, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minWidth: "140px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(20, 83, 45, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(20, 83, 45, 0.3)";
              }}
            >
              <span>💾</span> Update Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-products")}
              style={{
                padding: "16px 28px",
                background: "#f3f4f6",
                color: "#1f2937",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
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
              ⬅️ Cancel
            </button>
          </div>
        </form>

        <div style={{
          marginTop: "20px",
          padding: "14px 16px",
          background: "#f9fafb",
          borderRadius: "10px",
          border: "1px solid #e8ece8",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>
            ℹ️ Product ID: 
          </span>
          <span style={{
            fontSize: "13px",
            color: "#14532d",
            fontWeight: "500",
            background: "#e8f5e9",
            padding: "2px 10px",
            borderRadius: "4px",
            fontFamily: "monospace"
          }}>
            #{id.slice(-8).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;