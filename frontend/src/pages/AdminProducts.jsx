import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminProducts = () => {
  const [products, setProducts] =
    useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/products"
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/admin/products/${id}`
      );

      alert(
        "Product Deleted Successfully"
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate total value of all products
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          padding: "40px 30px",
          background: "#f0f3f0",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            marginBottom: "30px",
            border: "1px solid #e8ece8"
          }}>
            <h1 style={{
              margin: 0,
              fontSize: "32px",
              color: "#14532d",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{ fontSize: "36px" }}>🛒</span>
              Products Management
              <span style={{
                fontSize: "16px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500",
                marginLeft: "8px"
              }}>
                {products.length} Products
              </span>
            </h1>
            <p style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: "16px"
            }}>
              Manage all products listed on the platform
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e8ece8",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📦</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Total Products</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>{products.length}</h2>
            </div>

            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e8ece8",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📂</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Categories</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>{categories.length}</h2>
            </div>

            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e8ece8",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>💰</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Total Value</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "28px" }}>₹{totalValue.toLocaleString()}</h2>
            </div>

            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e8ece8",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📊</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Avg Price</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "28px" }}>
                ₹{products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(0) : 0}
              </h2>
            </div>
          </div>

          {/* Products Table */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              border: "1px solid #e8ece8",
              overflow: "hidden"
            }}
          >
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e8ece8",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <h3 style={{ margin: 0, color: "#14532d", fontSize: "18px" }}>
                📋 Product List
              </h3>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#6b7280"
              }}>
                <span>🔄</span>
                <span>{products.length} products found</span>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "600px"
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                      color: "white",
                    }}
                  >
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>
                      📦 Product
                    </th>

                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>
                      📂 Category
                    </th>

                    <th style={{ padding: "16px 20px", textAlign: "right", fontWeight: "600", fontSize: "14px" }}>
                      💰 Price
                    </th>

                    <th style={{ padding: "16px 20px", textAlign: "center", fontWeight: "600", fontSize: "14px" }}>
                      📊 Quantity
                    </th>

                    <th style={{ padding: "16px 20px", textAlign: "center", fontWeight: "600", fontSize: "14px" }}>
                      ⚡ Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, index) => {
                    // Get category color
                    const getCategoryColor = (category) => {
                      const colors = {
                        'Vegetables': '#e8f5e9',
                        'Fruits': '#fff3e0',
                        'Grains': '#fef3c7',
                        'Dairy': '#e3f2fd',
                        'Meat': '#fce4ec',
                        'Others': '#f3e5f5'
                      };
                      return colors[category] || '#f3f4f6';
                    };

                    return (
                      <tr
                        key={product._id}
                        style={{
                          borderBottom: index === products.length - 1 ? "none" : "1px solid #f3f4f6",
                          transition: "all 0.3s ease",
                          background: index % 2 === 0 ? "#ffffff" : "#fafbfc"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f0fdf4";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = index % 2 === 0 ? "#ffffff" : "#fafbfc";
                        }}
                      >
                        <td
                          style={{
                            padding: "16px 20px",
                            fontWeight: "500",
                            color: "#1f2937"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "8px",
                              background: "#e8ece8",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "20px"
                            }}>
                              🌾
                            </div>
                            {product.name}
                          </div>
                        </td>

                        <td
                          style={{
                            padding: "16px 20px",
                          }}
                        >
                          <span style={{
                            background: getCategoryColor(product.category),
                            padding: "4px 14px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#1f2937",
                            display: "inline-block"
                          }}>
                            {product.category}
                          </span>
                        </td>

                        <td
                          style={{
                            padding: "16px 20px",
                            textAlign: "right",
                            fontWeight: "600",
                            color: "#14532d",
                            fontSize: "16px"
                          }}
                        >
                          ₹{product.price}
                        </td>

                        <td
                          style={{
                            padding: "16px 20px",
                            textAlign: "center"
                          }}
                        >
                          <span style={{
                            background: product.quantity > 10 ? "#dcfce7" : product.quantity > 0 ? "#fef3c7" : "#fee2e2",
                            color: product.quantity > 10 ? "#166534" : product.quantity > 0 ? "#92400e" : "#991b1b",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600"
                          }}>
                            {product.quantity} {product.unit || "kg"}
                          </span>
                        </td>

                        <td
                          style={{
                            padding: "16px 20px",
                            textAlign: "center"
                          }}
                        >
                          <button
                            onClick={() =>
                              deleteProduct(
                                product._id
                              )
                            }
                            style={{
                              background: "#fee2e2",
                              color: "#dc2626",
                              border: "none",
                              padding: "8px 16px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "14px",
                              transition: "all 0.3s ease",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#dc2626";
                              e.currentTarget.style.color = "white";
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#fee2e2";
                              e.currentTarget.style.color = "#dc2626";
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {products.length === 0 && (
              <div style={{
                textAlign: "center",
                padding: "80px 20px",
                background: "#f9fafb"
              }}>
                <div style={{ fontSize: "72px", marginBottom: "15px" }}>📦</div>
                <h3 style={{ color: "#1f2937", marginBottom: "10px" }}>No Products Found</h3>
                <p style={{ color: "#6b7280", margin: 0 }}>
                  No products have been added to the platform yet.
                </p>
              </div>
            )}

            {/* Table Footer */}
            {products.length > 0 && (
              <div style={{
                padding: "16px 24px",
                borderTop: "1px solid #e8ece8",
                background: "#f9fafb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px"
              }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>
                  Showing {products.length} products
                </span>
                <div style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "13px",
                  color: "#6b7280"
                }}>
                  <span>📦 Total: {products.reduce((sum, p) => sum + p.quantity, 0)} kg</span>
                  <span>•</span>
                  <span>💰 Value: ₹{totalValue.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;