import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products",
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
    }
  }, [search, category, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
          maxWidth: "1300px",
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
              fontSize: "42px",
              color: "#14532d",
              marginBottom: "10px",
            }}
          >
            🛒 Marketplace
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
            }}
          >
            Buy quality agricultural products directly from farmers.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px",
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
                padding: "14px 30px",
                background: "#14532d",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0b5d1e";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#14532d";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              🛒 Buy Products
            </button>

            <button
              onClick={() =>
                navigate("/add-product")
              }
              style={{
                padding: "14px 30px",
                background: "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d97706";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f59e0b";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              🌾 Sell Your Product
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search Product"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
          }}
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "18px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
          }}
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">
            Vegetables
          </option>
          <option value="Fruits">
            Fruits
          </option>
          <option value="Grains">
            Grains
          </option>
        </select>

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "18px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
          }}
        >
          <option value="">Default Sorting</option>
          <option value="low">
            Price: Low to High
          </option>
          <option value="high">
            Price: High to Low
          </option>
        </select>

        <div
          id="product-list"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "18px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
                transition: "0.3s",
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
              {/* Product Image - Highly Recommended for Resume */}
              <img
                src={product.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "15px",
                }}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop";
                }}
              />

              <h2
                style={{
                  color: "#14532d",
                  marginBottom: "15px",
                  fontSize: "22px",
                }}
              >
                🌾 {product.name}
              </h2>

              <p>
                <b>Category:</b>{" "}
                {product.category}
              </p>

              <p>
                <b>Price:</b> ₹{product.price} / kg
              </p>

              <p>
                <b>Stock:</b> {product.quantity} kg
              </p>

              <p>{product.description}</p>

              <button
                onClick={() =>
                  navigate(
                    `/product/${product._id}`
                  )
                }
                style={{
                  width: "100%",
                  marginTop: "18px",
                  padding: "14px",
                  background: "#14532d",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0b5d1e";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#14532d";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                📖 View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;