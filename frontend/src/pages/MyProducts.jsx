import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
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

      setProducts(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.delete(
        `/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ 
      padding: "30px", 
      background: "#f5f7fa", 
      minHeight: "100vh" 
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto" 
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "30px"
        }}>
          <h1 style={{ 
            fontSize: "32px", 
            color: "#0b3d0b",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{ fontSize: "36px" }}>🛒</span> 
            My Products
            <span style={{ 
              fontSize: "16px", 
              background: "#0b3d0b", 
              color: "white", 
              padding: "4px 12px", 
              borderRadius: "20px",
              marginLeft: "10px"
            }}>
              {products.length}
            </span>
          </h1>
          <button
            onClick={() => navigate("/add-product")}
            style={{
              background: "#0b3d0b",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(11, 61, 11, 0.2)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 12px rgba(11, 61, 11, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(11, 61, 11, 0.2)";
            }}
          >
            <span style={{ fontSize: "20px" }}>+</span> Add New Product
          </button>
        </div>

        {products.length === 0 ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            padding: "80px 40px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            textAlign: "center"
          }}>
            <span style={{ fontSize: "64px", marginBottom: "20px" }}>📦</span>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>No Products Added Yet</h3>
            <p style={{ color: "#666" }}>Start selling by adding your first product!</p>
            <button
              onClick={() => navigate("/add-product")}
              style={{
                marginTop: "20px",
                background: "#0b3d0b",
                color: "white",
                border: "none",
                padding: "12px 32px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
              marginTop: "20px",
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "1px solid #f0f0f0"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{
                  background: "linear-gradient(135deg, #0b3d0b, #1a6b1a)",
                  padding: "20px",
                  color: "white"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                  }}>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: "20px",
                      fontWeight: "600"
                    }}>
                      {product.name}
                    </h3>
                    <span style={{
                      background: "rgba(255,255,255,0.2)",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}>
                      #{product.category}
                    </span>
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    marginBottom: "16px"
                  }}>
                    <div style={{
                      background: "#f8f9fa",
                      padding: "10px",
                      borderRadius: "8px",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>Price</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", color: "#0b3d0b" }}>
                        ₹{product.price}
                      </div>
                    </div>
                    <div style={{
                      background: "#f8f9fa",
                      padding: "10px",
                      borderRadius: "8px",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>Quantity</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", color: "#0b3d0b" }}>
                        {product.quantity}
                      </div>
                    </div>
                  </div>

                  <p style={{ 
                    color: "#555", 
                    fontSize: "14px", 
                    lineHeight: "1.6",
                    marginBottom: "16px",
                    minHeight: "40px"
                  }}>
                    {product.description}
                  </p>

                  <div style={{ 
                    display: "flex", 
                    gap: "10px",
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: "16px"
                  }}>
                    <button
                      onClick={() =>
                        navigate(`/edit-product/${product._id}`)
                      }
                      style={{
                        flex: 1,
                        background: "#0b3d0b",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#0f520f";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#0b3d0b";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      style={{
                        flex: 1,
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#c82333";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#dc3545";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;