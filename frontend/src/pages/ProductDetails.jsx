import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/products"
        );

        const selectedProduct = data.find(
          (item) => item._id === id
        );

        setProduct(selectedProduct);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/reviews/${id}`
        );

        setReviews(data.reviews);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleBuyNow = async () => {
    try {
      // Validate delivery address
      if (!deliveryAddress.trim()) {
        alert("Please enter delivery address");
        return;
      }

      const token = localStorage.getItem("token");

      // Step 1: Create Razorpay Order
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: product.price * quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const razorpayOrder = data.order;

      // Step 2: Configure Razorpay options
      const options = {
        key: "rzp_test_SGJDv8CpSvpMfO",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "AgroSphere",
        description: product.name,
        handler: async function (response) {
          try {
            // Step 3: Verify Payment
            await axios.post(
              "http://localhost:5000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            // Step 4: Create Order after successful payment
            await axios.post(
              "http://localhost:5000/api/orders",
              {
                productId: product._id,
                quantity,
                deliveryAddress,
                paymentId: response.razorpay_payment_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("✅ Order placed successfully!");
            navigate("/my-purchases");
          } catch (error) {
            console.log(error);
            alert(
              error.response?.data?.message ||
                "Payment verification failed"
            );
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "User",
          email: localStorage.getItem("userEmail") || "user@example.com",
        },
        theme: {
          color: "#14532d",
        },
        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          },
        },
      };

      console.log(options);
      console.log(window.Razorpay);

      // Step 5: Open Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to initiate payment"
      );
    }
  };

  if (loading) {
    return (
      <div
        style={{
          background: "#f4f7fb",
          minHeight: "100vh",
        }}
      >
        <FarmerNavbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>⏳</div>
            <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          background: "#f4f7fb",
          minHeight: "100vh",
        }}
      >
        <FarmerNavbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "64px", marginBottom: "15px" }}>🔍</div>
            <h2 style={{ color: "#1f2937", marginBottom: "10px" }}>Product Not Found</h2>
            <p style={{ color: "#6b7280", fontSize: "16px" }}>
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              style={{
                marginTop: "20px",
                padding: "12px 30px",
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
              🛒 Browse Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          maxWidth: "1000px",
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  color: "#14532d",
                  marginBottom: "5px",
                }}
              >
                📦 Product Details
              </h1>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "16px",
                }}
              >
                View complete information about this product.
              </p>
            </div>
            <button
              onClick={() => navigate("/marketplace")}
              style={{
                padding: "10px 20px",
                background: "#e5e7eb",
                color: "#1f2937",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d1d5db";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#e5e7eb";
              }}
            >
              ⬅️ Back to Marketplace
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            {/* Product Image */}
            <div>
              <img
                src={product.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop"}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  border: "1px solid #e5e7eb",
                }}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop";
                }}
              />

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    padding: "6px 15px",
                    background: "#e8f5e9",
                    color: "#14532d",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {product.category}
                </span>
                <span
                  style={{
                    padding: "6px 15px",
                    background: "#fef3c7",
                    color: "#92400e",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  In Stock
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h2
                style={{
                  fontSize: "32px",
                  color: "#14532d",
                  marginBottom: "15px",
                }}
              >
                🌾 {product.name}
              </h2>

              <p
                style={{
                  fontSize: "18px",
                  color: "#f59e0b",
                  marginBottom: "15px",
                }}
              >
                ⭐ {product.averageRating?.toFixed(1) || "0.0"} (
                {product.numberOfReviews || 0} Reviews)
              </p>

              <div
                style={{
                  marginBottom: "25px",
                  padding: "20px",
                  background: "#f9fafb",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "14px",
                        marginBottom: "2px",
                      }}
                    >
                      Price
                    </p>
                    <h3
                      style={{
                        color: "#14532d",
                        margin: 0,
                        fontSize: "28px",
                      }}
                    >
                      ₹{product.price}
                    </h3>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "14px",
                        marginBottom: "2px",
                      }}
                    >
                      Quantity Available
                    </p>
                    <h3
                      style={{
                        color: "#14532d",
                        margin: 0,
                        fontSize: "28px",
                      }}
                    >
                      {product.quantity} {product.unit || "kg"}
                    </h3>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <h4
                  style={{
                    color: "#14532d",
                    marginBottom: "10px",
                    fontSize: "18px",
                  }}
                >
                  📝 Description
                </h4>
                <p
                  style={{
                    color: "#4b5563",
                    lineHeight: "1.8",
                    fontSize: "16px",
                  }}
                >
                  {product.description || "No description available for this product."}
                </p>
              </div>

              {/* Quantity Selector */}
              <div style={{ marginBottom: "25px" }}>
                <h3
                  style={{
                    color: "#14532d",
                    marginBottom: "10px",
                    fontSize: "18px",
                  }}
                >
                  Quantity
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      quantity > 1 && setQuantity(quantity - 1)
                    }
                    disabled={product.quantity === 0}
                    style={{
                      padding: "10px 20px",
                      background: product.quantity === 0 ? "#d1d5db" : "#e5e7eb",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: product.quantity === 0 ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (product.quantity > 0) {
                        e.currentTarget.style.background = "#d1d5db";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (product.quantity > 0) {
                        e.currentTarget.style.background = "#e5e7eb";
                      }
                    }}
                  >
                    -
                  </button>

                  <h3 style={{ margin: 0, fontSize: "24px" }}>
                    {quantity} kg
                  </h3>

                  <button
                    onClick={() =>
                      quantity < product.quantity &&
                      setQuantity(quantity + 1)
                    }
                    disabled={product.quantity === 0}
                    style={{
                      padding: "10px 20px",
                      background: product.quantity === 0 ? "#d1d5db" : "#e5e7eb",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: product.quantity === 0 ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (product.quantity > 0) {
                        e.currentTarget.style.background = "#d1d5db";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (product.quantity > 0) {
                        e.currentTarget.style.background = "#e5e7eb";
                      }
                    }}
                  >
                    +
                  </button>
                </div>

                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  <b>Available Stock:</b> {product.quantity} kg
                </p>
              </div>

              {/* Total Price */}
              <div
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  background: "#f0fdf4",
                  borderRadius: "10px",
                  border: "2px solid #14532d",
                }}
              >
                <h3
                  style={{
                    color: "#14532d",
                    margin: 0,
                    fontSize: "22px",
                  }}
                >
                  Total Price: ₹{product.price * quantity}
                </h3>
              </div>

              {/* Delivery Address */}
              <div style={{ marginBottom: "25px" }}>
                <h4
                  style={{
                    color: "#14532d",
                    marginBottom: "10px",
                    fontSize: "16px",
                  }}
                >
                  📍 Delivery Address
                </h4>
                <textarea
                  placeholder="Enter Delivery Address"
                  value={deliveryAddress}
                  onChange={(e) =>
                    setDeliveryAddress(e.target.value)
                  }
                  disabled={product.quantity === 0}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "16px",
                    minHeight: "80px",
                    resize: "vertical",
                    fontFamily: "inherit",
                    opacity: product.quantity === 0 ? 0.5 : 1,
                    cursor: product.quantity === 0 ? "not-allowed" : "text",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "10px",
                }}
              >
                {product.quantity === 0 ? (
                  <button
                    disabled
                    style={{
                      flex: 1,
                      padding: "16px",
                      background: "#d1d5db",
                      color: "#6b7280",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "not-allowed",
                      fontWeight: "600",
                      fontSize: "18px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    🚫 Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={handleBuyNow}
                    style={{
                      flex: 1,
                      padding: "16px",
                      background: "#14532d",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "18px",
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
                    🛒 Buy Now
                  </button>
                )}

                <button
                  onClick={() => navigate("/marketplace")}
                  style={{
                    padding: "16px 30px",
                    background: "#e5e7eb",
                    color: "#1f2937",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#e5e7eb";
                  }}
                >
                  🔍 View More
                </button>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div
            style={{
              marginTop: "40px",
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ color: "#14532d", marginBottom: "20px" }}>
              ⭐ Customer Reviews
            </h2>

            {reviews.length === 0 ? (
              <p style={{ color: "#6b7280" }}>No Reviews Yet</p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "20px 0",
                  }}
                >
                  <h4 style={{ color: "#14532d", marginBottom: "5px" }}>
                    {review.userId?.name || "Anonymous"}
                  </h4>

                  <p style={{ color: "#f59e0b", marginBottom: "5px" }}>
                    {"⭐".repeat(review.rating)}
                  </p>

                  <p style={{ color: "#4b5563" }}>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;