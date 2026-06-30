import React, { useEffect, useState } from "react";
import API from "../api";
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
        const { data } = await API.get(
          "/api/products"
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
        const { data } = await API.get(
          `/api/reviews/${id}`
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
      const { data } = await API.post(
        "/api/payment/create-order",
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
            await API.post(
              "/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            // Step 4: Create Order after successful payment
            await API.post(
              "/api/orders",
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
          background: "#f0f3f0",
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
            <div style={{
              width: "60px",
              height: "60px",
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #14532d",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px"
            }}></div>
            <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading product details...</p>
          </div>
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
  }

  if (!product) {
    return (
      <div
        style={{
          background: "#f0f3f0",
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
          <div style={{
            textAlign: "center",
            background: "white",
            padding: "60px 40px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            maxWidth: "500px"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "15px" }}>🔍</div>
            <h2 style={{ color: "#1f2937", marginBottom: "10px" }}>Product Not Found</h2>
            <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "20px" }}>
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              style={{
                padding: "14px 40px",
                background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(20, 83, 45, 0.3)"
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
        background: "#f0f3f0",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <FarmerNavbar />

      {/* Page Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "0 30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            border: "1px solid #e8ece8",
          }}
        >
          <div
            style={{
              marginBottom: "35px",
              borderBottom: "2px solid #e8ece8",
              paddingBottom: "25px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px"
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "32px",
                  color: "#14532d",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span>📦</span> Product Details
              </h1>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "15px",
                  margin: 0
                }}
              >
                View complete information about this product.
              </p>
            </div>
            <button
              onClick={() => navigate("/marketplace")}
              style={{
                padding: "12px 24px",
                background: "#f3f4f6",
                color: "#1f2937",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e5e7eb";
                e.currentTarget.style.transform = "translateX(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f3f4f6";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              ⬅️ Back to Marketplace
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
            }}
          >
            {/* Product Image */}
            <div>
              <div style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                border: "1px solid #e8ece8"
              }}>
                <img
                  src={product.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop";
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    padding: "8px 18px",
                    background: "#e8f5e9",
                    color: "#14532d",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>📂</span> {product.category}
                </span>
                <span
                  style={{
                    padding: "8px 18px",
                    background: "#fef3c7",
                    color: "#92400e",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>✅</span> In Stock
                </span>
                {product.isOrganic && (
                  <span
                    style={{
                      padding: "8px 18px",
                      background: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <span>🌱</span> Organic
                  </span>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h2
                style={{
                  fontSize: "30px",
                  color: "#14532d",
                  marginBottom: "12px",
                  fontWeight: "700"
                }}
              >
                🌾 {product.name}
              </h2>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px"
              }}>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#f59e0b",
                    margin: 0,
                    fontWeight: "600"
                  }}
                >
                  ⭐ {product.averageRating?.toFixed(1) || "0.0"}
                </p>
                <span style={{ color: "#9ca3af" }}>|</span>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "15px" }}>
                  {product.numberOfReviews || 0} Reviews
                </p>
              </div>

              <div
                style={{
                  marginBottom: "25px",
                  padding: "20px",
                  background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
                  borderRadius: "14px",
                  border: "1px solid #e8ece8",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "13px",
                        marginBottom: "4px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}
                    >
                      💰 Price
                    </p>
                    <h3
                      style={{
                        color: "#14532d",
                        margin: 0,
                        fontSize: "30px",
                        fontWeight: "700"
                      }}
                    >
                      ₹{product.price}
                    </h3>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "13px",
                        marginBottom: "4px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}
                    >
                      📦 Available Stock
                    </p>
                    <h3
                      style={{
                        color: "#14532d",
                        margin: 0,
                        fontSize: "30px",
                        fontWeight: "700"
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
                    fontSize: "17px",
                    fontWeight: "600"
                  }}
                >
                  📝 Description
                </h4>
                <div style={{
                  background: "#f9fafb",
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid #e8ece8"
                }}>
                  <p
                    style={{
                      color: "#4b5563",
                      lineHeight: "1.8",
                      fontSize: "15px",
                      margin: 0
                    }}
                  >
                    {product.description || "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div style={{ marginBottom: "25px" }}>
                <h3
                  style={{
                    color: "#14532d",
                    marginBottom: "12px",
                    fontSize: "17px",
                    fontWeight: "600"
                  }}
                >
                  📊 Select Quantity
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      quantity > 1 && setQuantity(quantity - 1)
                    }
                    disabled={product.quantity === 0}
                    style={{
                      padding: "12px 24px",
                      background: product.quantity === 0 ? "#e5e7eb" : "#14532d",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "22px",
                      fontWeight: "bold",
                      cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: product.quantity === 0 ? 0.5 : 1,
                      minWidth: "60px"
                    }}
                    onMouseEnter={(e) => {
                      if (product.quantity > 0) {
                        e.currentTarget.style.background = "#0b5d1e";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (product.quantity > 0) {
                        e.currentTarget.style.background = "#14532d";
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  >
                    −
                  </button>

                  <div style={{
                    background: "#f9fafb",
                    padding: "8px 20px",
                    borderRadius: "10px",
                    border: "2px solid #e8ece8",
                    minWidth: "80px",
                    textAlign: "center"
                  }}>
                    <h3 style={{ margin: 0, fontSize: "26px", color: "#14532d" }}>
                      {quantity}
                    </h3>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>kg</span>
                  </div>

                  <button
                    onClick={() =>
                      quantity < product.quantity &&
                      setQuantity(quantity + 1)
                    }
                    disabled={product.quantity === 0}
                    style={{
                      padding: "12px 24px",
                      background: product.quantity === 0 ? "#e5e7eb" : "#14532d",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "22px",
                      fontWeight: "bold",
                      cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: product.quantity === 0 ? 0.5 : 1,
                      minWidth: "60px"
                    }}
                    onMouseEnter={(e) => {
                      if (product.quantity > 0) {
                        e.currentTarget.style.background = "#0b5d1e";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (product.quantity > 0) {
                        e.currentTarget.style.background = "#14532d";
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  >
                    +
                  </button>
                </div>

                <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
                  <b>Available Stock:</b> {product.quantity} kg
                </p>
              </div>

              {/* Total Price */}
              <div
                style={{
                  marginBottom: "20px",
                  padding: "18px 20px",
                  background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                  borderRadius: "12px",
                  border: "2px solid #14532d",
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <h3
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: "600"
                    }}
                  >
                    💳 Total Price
                  </h3>
                  <h3
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "28px",
                      fontWeight: "700"
                    }}
                  >
                    ₹{product.price * quantity}
                  </h3>
                </div>
              </div>

              {/* Delivery Address */}
              <div style={{ marginBottom: "25px" }}>
                <h4
                  style={{
                    color: "#14532d",
                    marginBottom: "10px",
                    fontSize: "16px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>📍</span> Delivery Address
                </h4>
                <textarea
                  placeholder="Enter your complete delivery address..."
                  value={deliveryAddress}
                  onChange={(e) =>
                    setDeliveryAddress(e.target.value)
                  }
                  disabled={product.quantity === 0}
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "2px solid #e8ece8",
                    borderRadius: "12px",
                    fontSize: "15px",
                    minHeight: "80px",
                    resize: "vertical",
                    fontFamily: "inherit",
                    opacity: product.quantity === 0 ? 0.5 : 1,
                    cursor: product.quantity === 0 ? "not-allowed" : "text",
                    transition: "all 0.3s ease",
                    background: product.quantity === 0 ? "#f9fafb" : "white"
                  }}
                  onFocus={(e) => {
                    if (product.quantity > 0) {
                      e.currentTarget.style.borderColor = "#14532d";
                      e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e8ece8";
                    e.currentTarget.style.boxShadow = "none";
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
                      padding: "18px",
                      background: "#e5e7eb",
                      color: "#6b7280",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "not-allowed",
                      fontWeight: "600",
                      fontSize: "18px",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px"
                    }}
                  >
                    🚫 Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={handleBuyNow}
                    style={{
                      flex: 1,
                      padding: "18px",
                      background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "18px",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      boxShadow: "0 4px 12px rgba(20, 83, 45, 0.3)"
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
                    🛒 Buy Now
                  </button>
                )}

                <button
                  onClick={() => navigate("/marketplace")}
                  style={{
                    padding: "18px 32px",
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
                  🔍 View More
                </button>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div
            style={{
              marginTop: "50px",
              background: "#fff",
              padding: "35px",
              borderRadius: "16px",
              border: "1px solid #e8ece8",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
            }}
          >
            <h2 style={{
              color: "#14532d",
              marginBottom: "25px",
              fontSize: "26px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span>⭐</span> Customer Reviews
              <span style={{
                fontSize: "16px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "2px 12px",
                borderRadius: "20px",
                fontWeight: "500"
              }}>
                {reviews.length}
              </span>
            </h2>

            {reviews.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "40px 20px",
                background: "#f9fafb",
                borderRadius: "12px"
              }}>
                <span style={{ fontSize: "48px", display: "block", marginBottom: "10px" }}>📝</span>
                <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gap: "16px"
              }}>
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    style={{
                      border: "1px solid #e8ece8",
                      borderRadius: "12px",
                      padding: "20px",
                      background: "#fafbfc",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f8f9fa";
                      e.currentTarget.style.borderColor = "#14532d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fafbfc";
                      e.currentTarget.style.borderColor = "#e8ece8";
                    }}
                  >
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px"
                    }}>
                      <h4 style={{
                        color: "#14532d",
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "600"
                      }}>
                        {review.userId?.name || "Anonymous"}
                      </h4>
                      <span style={{
                        fontSize: "18px",
                        color: "#f59e0b"
                      }}>
                        {"⭐".repeat(review.rating)}
                      </span>
                    </div>

                    <p style={{
                      color: "#4b5563",
                      margin: "8px 0 0 0",
                      fontSize: "15px",
                      lineHeight: "1.6"
                    }}>
                      {review.comment}
                    </p>
                    <div style={{
                      marginTop: "8px",
                      fontSize: "12px",
                      color: "#9ca3af"
                    }}>
                      {new Date(review.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;