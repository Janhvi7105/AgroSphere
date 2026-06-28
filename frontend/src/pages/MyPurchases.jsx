import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerNavbar from "../components/FarmerNavbar";

const MyPurchases = () => {
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          productId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("⭐ Review Submitted Successfully");

      setComment("");
      setRating(5);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to submit review"
      );
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Delivered: "#2e7d32",
      Pending: "#f59e0b",
      Processing: "#0d47a1",
      Shipped: "#0288d1",
      Cancelled: "#dc2626",
    };
    return colors[status] || "#6b7280";
  };

  const getStatusEmoji = (status) => {
    const emojis = {
      Delivered: "✅",
      Pending: "⏳",
      Processing: "🔄",
      Shipped: "🚚",
      Cancelled: "❌",
    };
    return emojis[status] || "📦";
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
            <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading your purchases...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          padding: "30px 20px 60px",
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f4f7f4 0%, #e8f0e8 100%)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Hero Section */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
              padding: "40px 30px",
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
                🛒 My Orders
              </div>

              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  marginBottom: "10px",
                  fontWeight: "800",
                  letterSpacing: "-0.5px",
                }}
              >
                🛒 My Purchases
              </h1>

              <p
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  opacity: "0.95",
                  lineHeight: "1.7",
                }}
              >
                Products you have purchased from AgroSphere Marketplace.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
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
                  📦 {orders.length} Orders
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
                  ✅ {orders.filter(o => o.orderStatus === "Delivered").length} Delivered
                </span>
              </div>
            </div>
          </div>

          {orders.length === 0 ? (
            <div
              style={{
                background: "white",
                padding: "60px 40px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid #e8f0e8",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "15px" }}>🛒</div>
              <h2 style={{ color: "#1a3c1f", marginBottom: "10px", fontWeight: "700" }}>
                No Purchases Yet
              </h2>
              <p style={{ color: "#6b7280", fontSize: "16px" }}>
                Start shopping on the marketplace to see your orders here.
              </p>
              <button
                onClick={() => window.location.href = "/marketplace"}
                style={{
                  marginTop: "20px",
                  padding: "14px 35px",
                  background: "linear-gradient(135deg, #2e7d32, #388e3c)",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "16px",
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
                🛒 Browse Marketplace
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "25px",
              }}
            >
              {orders.map((order) => (
                <div
                  key={order._id}
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    border: "1px solid #e8f0e8",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                  }}
                >
                  <div
                    style={{
                      padding: "22px 22px 18px",
                      borderBottom: "1px solid #e8f0e8",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h2
                      style={{
                        color: "#1a3c1f",
                        margin: 0,
                        fontSize: "clamp(20px, 2vw, 24px)",
                        fontWeight: "700",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      🌾 {order.productId?.name || "Product"}
                    </h2>
                    <span
                      style={{
                        background: `${getStatusColor(order.orderStatus)}20`,
                        color: getStatusColor(order.orderStatus),
                        padding: "4px 14px",
                        borderRadius: "50px",
                        fontSize: "13px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {getStatusEmoji(order.orderStatus)} {order.orderStatus}
                    </span>
                  </div>

                  <div style={{ padding: "20px 22px" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginBottom: "15px",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 2px 0", fontWeight: "500" }}>
                          Seller
                        </p>
                        <p style={{ fontSize: "15px", color: "#1a3c1f", margin: 0, fontWeight: "600" }}>
                          {order.sellerId?.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 2px 0", fontWeight: "500" }}>
                          Quantity
                        </p>
                        <p style={{ fontSize: "15px", color: "#1a3c1f", margin: 0, fontWeight: "600" }}>
                          {order.quantity} kg
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 2px 0", fontWeight: "500" }}>
                          Price
                        </p>
                        <p style={{ fontSize: "15px", color: "#1a3c1f", margin: 0, fontWeight: "600" }}>
                          ₹{order.price}/kg
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 2px 0", fontWeight: "500" }}>
                          Total Amount
                        </p>
                        <p style={{ fontSize: "15px", color: "#2e7d32", margin: 0, fontWeight: "700" }}>
                          ₹{order.totalAmount}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 2px 0", fontWeight: "500" }}>
                          Payment
                        </p>
                        <p style={{ fontSize: "15px", color: "#1a3c1f", margin: 0, fontWeight: "600" }}>
                          {order.paymentStatus}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 2px 0", fontWeight: "500" }}>
                          Order Date
                        </p>
                        <p style={{ fontSize: "15px", color: "#1a3c1f", margin: 0, fontWeight: "600" }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 3px 0", fontWeight: "500" }}>
                        📍 Delivery Address
                      </p>
                      <p style={{ fontSize: "14px", color: "#4a5568", margin: 0, lineHeight: "1.5" }}>
                        {order.deliveryAddress}
                      </p>
                    </div>

                    {order.orderStatus === "Delivered" && (
                      <div
                        style={{
                          marginTop: "15px",
                          paddingTop: "15px",
                          borderTop: "2px solid #e8f0e8",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "16px",
                            color: "#1a3c1f",
                            marginBottom: "12px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          ⭐ Write a Review
                        </h3>

                        <select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            border: "2px solid #e5e7eb",
                            fontSize: "16px",
                            outline: "none",
                            transition: "all 0.3s ease",
                            backgroundColor: "#f9fafb",
                            cursor: "pointer",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#2e7d32";
                            e.currentTarget.style.backgroundColor = "#ffffff";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#e5e7eb";
                            e.currentTarget.style.backgroundColor = "#f9fafb";
                          }}
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                          <option value={4}>⭐⭐⭐⭐ Very Good</option>
                          <option value={3}>⭐⭐⭐ Good</option>
                          <option value={2}>⭐⭐ Fair</option>
                          <option value={1}>⭐ Poor</option>
                        </select>

                        <textarea
                          placeholder="Share your experience with this product..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          style={{
                            width: "100%",
                            marginTop: "12px",
                            padding: "12px 14px",
                            minHeight: "80px",
                            borderRadius: "10px",
                            border: "2px solid #e5e7eb",
                            fontSize: "15px",
                            fontFamily: "inherit",
                            resize: "vertical",
                            outline: "none",
                            transition: "all 0.3s ease",
                            backgroundColor: "#f9fafb",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#2e7d32";
                            e.currentTarget.style.backgroundColor = "#ffffff";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#e5e7eb";
                            e.currentTarget.style.backgroundColor = "#f9fafb";
                          }}
                        />

                        <button
                          onClick={() => submitReview(order.productId._id)}
                          disabled={!comment.trim()}
                          style={{
                            width: "100%",
                            marginTop: "12px",
                            padding: "12px",
                            background: !comment.trim()
                              ? "#6b7280"
                              : "linear-gradient(135deg, #2e7d32, #388e3c)",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            cursor: !comment.trim() ? "not-allowed" : "pointer",
                            fontSize: "15px",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                            boxShadow: !comment.trim() ? "none" : "0 4px 15px rgba(46, 125, 50, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            if (comment.trim()) {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.boxShadow = "0 8px 25px rgba(46, 125, 50, 0.4)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (comment.trim()) {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "0 4px 15px rgba(46, 125, 50, 0.3)";
                            }
                          }}
                        >
                          ⭐ Submit Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPurchases;