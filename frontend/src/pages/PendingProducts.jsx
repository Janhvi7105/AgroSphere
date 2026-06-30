import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

const PendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchPendingProducts = useCallback(async () => {
    try {
      const { data } = await API.get(
        "/api/products/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load pending products");
    }

    setLoading(false);
  }, [token]);

  useEffect(() => {
    fetchPendingProducts();
  }, [fetchPendingProducts]);

  const approveProduct = async (id) => {
    try {
      await API.put(
        `/api/products/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Approved");

      fetchPendingProducts();
    } catch (error) {
      console.log(error);
      alert("Unable to approve product");
    }
  };

  const rejectProduct = async (id) => {
    try {
      await API.put(
        `/api/products/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Rejected");

      fetchPendingProducts();
    } catch (error) {
      console.log(error);
      alert("Unable to reject product");
    }
  };

  return (
    <div
      style={{
        background: "#f0f3f0",
        minHeight: "100vh",
      }}
    >
      <AdminNavbar />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "30px",
        }}
      >
        <div style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          marginBottom: "30px"
        }}>
          <h1
            style={{
              color: "#0b3d0b",
              marginBottom: "8px",
              fontSize: "32px",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <span style={{ fontSize: "36px" }}>📦</span>
            Pending Product Approvals
            <span style={{
              fontSize: "16px",
              background: "#fff3cd",
              color: "#856404",
              padding: "4px 14px",
              borderRadius: "20px",
              fontWeight: "500",
              marginLeft: "10px"
            }}>
              {products.length} Pending
            </span>
          </h1>

          <p
            style={{
              color: "#666",
              margin: 0,
              fontSize: "16px"
            }}
          >
            Review products uploaded by farmers before publishing them to the Marketplace.
          </p>
        </div>

        {loading ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <div style={{
              textAlign: "center"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                border: "6px solid #f3f3f3",
                borderTop: "6px solid #0b3d0b",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px"
              }}></div>
              <h3 style={{ color: "#555" }}>Loading pending products...</h3>
            </div>
          </div>
        ) : Array.isArray(products) && products.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "80px 40px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "72px", display: "block", marginBottom: "20px" }}>✅</span>
            <h2 style={{ color: "#333", marginBottom: "10px" }}>No Pending Products</h2>
            <p style={{ color: "#666" }}>All products have been reviewed and approved!</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "28px",
            }}
          >
            {Array.isArray(products) &&
              products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
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
                    position: "relative"
                  }}>
                    <img
                      src={
                        product.imageUrl ||
                        "https://via.placeholder.com/400x240/0b3d0b/ffffff?text=No+Image"
                      }
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "240px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "#fff3cd",
                      color: "#856404",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      ⏳ Pending
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "20px 24px 24px",
                    }}
                  >
                    <h2
                      style={{
                        color: "#0b3d0b",
                        margin: "0 0 12px 0",
                        fontSize: "22px",
                        fontWeight: "600"
                      }}
                    >
                      {product.name}
                    </h2>

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginBottom: "12px"
                    }}>
                      <div style={{
                        background: "#f8f9fa",
                        padding: "8px 12px",
                        borderRadius: "8px"
                      }}>
                        <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>Category</div>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
                          {product.category}
                        </div>
                      </div>
                      <div style={{
                        background: "#f8f9fa",
                        padding: "8px 12px",
                        borderRadius: "8px"
                      }}>
                        <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>Price</div>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#0b3d0b" }}>
                          ₹{product.price}
                        </div>
                      </div>
                      <div style={{
                        background: "#f8f9fa",
                        padding: "8px 12px",
                        borderRadius: "8px"
                      }}>
                        <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>Quantity</div>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
                          {product.quantity} kg
                        </div>
                      </div>
                      <div style={{
                        background: "#f8f9fa",
                        padding: "8px 12px",
                        borderRadius: "8px"
                      }}>
                        <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>Seller</div>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
                          {product.farmerId?.name || "Unknown Farmer"}
                        </div>
                      </div>
                    </div>

                    <p
                      style={{
                        color: "#555",
                        margin: "12px 0 16px 0",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        minHeight: "40px"
                      }}
                    >
                      {product.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        borderTop: "1px solid #f0f0f0",
                        paddingTop: "16px"
                      }}
                    >
                      <button
                        onClick={() =>
                          approveProduct(product._id)
                        }
                        style={{
                          flex: 1,
                          padding: "12px 20px",
                          background: "linear-gradient(135deg, #28a745, #20c997)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "15px",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        ✅ Approve
                      </button>

                      <button
                        onClick={() =>
                          rejectProduct(product._id)
                        }
                        style={{
                          flex: 1,
                          padding: "12px 20px",
                          background: "linear-gradient(135deg, #dc3545, #e74c3c)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "15px",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 53, 69, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default PendingProducts;