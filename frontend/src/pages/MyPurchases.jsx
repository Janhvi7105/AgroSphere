import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerNavbar from "../components/FarmerNavbar";

const MyPurchases = () => {
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
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

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          padding: "40px",
          minHeight: "100vh",
          background: "#f4f7f4",
        }}
      >
        <h1
          style={{
            color: "#0b5d1e",
            marginBottom: "10px",
          }}
        >
          🛒 My Purchases
        </h1>

        <p
          style={{
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Products you have purchased from AgroSphere Marketplace.
        </p>

        {orders.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>No Purchases Yet</h2>
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
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#0b5d1e",
                    marginBottom: "20px",
                  }}
                >
                  🌾 {order.productId?.name}
                </h2>

                <p>
                  <b>Seller:</b>{" "}
                  {order.sellerId?.name}
                </p>

                <p>
                  <b>Quantity:</b>{" "}
                  {order.quantity}
                </p>

                <p>
                  <b>Price:</b> ₹
                  {order.price}
                </p>

                <p>
                  <b>Total Amount:</b> ₹
                  {order.totalAmount}
                </p>

                <p>
                  <b>Payment:</b>{" "}
                  {order.paymentStatus}
                </p>

                <p>
                  <b>Delivery Status:</b>{" "}
                  <span
                    style={{
                      background:
                        order.orderStatus ===
                        "Delivered"
                          ? "#28a745"
                          : order.orderStatus ===
                            "Pending"
                          ? "#ffc107"
                          : "#dc3545",

                      color:
                        order.orderStatus ===
                        "Pending"
                          ? "#000"
                          : "#fff",

                      padding: "6px 12px",

                      borderRadius: "20px",

                      fontWeight: "bold",
                    }}
                  >
                    {order.orderStatus}
                  </span>
                </p>

                <p>
                  <b>Delivery Address:</b>
                  <br />
                  {order.deliveryAddress}
                </p>

                {order.orderStatus === "Delivered" && (
                  <>
                    <hr style={{ margin: "20px 0" }} />

                    <h3>⭐ Write Review</h3>

                    <select
                      value={rating}
                      onChange={(e) =>
                        setRating(Number(e.target.value))
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "10px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        fontSize: "16px",
                      }}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐</option>
                      <option value={4}>⭐⭐⭐⭐</option>
                      <option value={3}>⭐⭐⭐</option>
                      <option value={2}>⭐⭐</option>
                      <option value={1}>⭐</option>
                    </select>

                    <textarea
                      placeholder="Write your review..."
                      value={comment}
                      onChange={(e) =>
                        setComment(e.target.value)
                      }
                      style={{
                        width: "100%",
                        marginTop: "15px",
                        padding: "10px",
                        minHeight: "80px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        fontSize: "16px",
                        fontFamily: "inherit",
                        resize: "vertical",
                      }}
                    />

                    <button
                      onClick={() =>
                        submitReview(order.productId._id)
                      }
                      style={{
                        width: "100%",
                        marginTop: "15px",
                        padding: "12px",
                        background: "#14532d",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#0b5d1e";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#14532d";
                      }}
                    >
                      Submit Review
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyPurchases;