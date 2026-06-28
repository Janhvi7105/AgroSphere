import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const PendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchPendingProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products/pending",
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
      await axios.put(
        `http://localhost:5000/api/products/${id}/approve`,
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
      await axios.put(
        `http://localhost:5000/api/products/${id}/reject`,
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
        background: "#f4f7fc",
        minHeight: "100vh",
      }}
    >
      <AdminNavbar />

      <div
        style={{
          width: "90%",
          margin: "30px auto",
        }}
      >
        <h1
          style={{
            color: "#0b5d1e",
            marginBottom: "10px",
          }}
        >
          📦 Pending Product Approvals
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Review products uploaded by farmers before publishing them to the Marketplace.
        </p>

        {loading ? (
          <h3>Loading...</h3>
        ) : Array.isArray(products) && products.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>✅ No Pending Products</h2>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "25px",
            }}
          >
            {Array.isArray(products) &&
              products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow:
                      "0 5px 18px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={
                      product.imageUrl ||
                      "https://via.placeholder.com/400x220"
                    }
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      padding: "20px",
                    }}
                  >
                    <h2
                      style={{
                        color: "#0b5d1e",
                      }}
                    >
                      {product.name}
                    </h2>

                    <p>
                      <b>Category:</b> {product.category}
                    </p>

                    <p>
                      <b>Price:</b> ₹{product.price}
                    </p>

                    <p>
                      <b>Quantity:</b> {product.quantity}
                    </p>

                    <p>
                      <b>Seller:</b>{" "}
                      {product.farmerId?.name || "Unknown Farmer"}
                    </p>

                    <p
                      style={{
                        color: "#666",
                        marginTop: "10px",
                      }}
                    >
                      {product.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "20px",
                      }}
                    >
                      <button
                        onClick={() =>
                          approveProduct(product._id)
                        }
                        style={{
                          flex: 1,
                          padding: "12px",
                          background: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
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
                          padding: "12px",
                          background: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
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
    </div>
  );
};

export default PendingProducts;