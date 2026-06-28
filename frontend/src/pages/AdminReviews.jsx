import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/admin/reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this review?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review Deleted Successfully");

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Get rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

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
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              <span style={{ fontSize: "36px" }}>⭐</span>
              Product Reviews
              <span style={{
                fontSize: "16px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500",
                marginLeft: "8px"
              }}>
                {reviews.length} Reviews
              </span>
            </h1>
            <p style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: "16px"
            }}>
              Manage and monitor customer reviews for all products
            </p>
          </div>

          {/* Stats Cards */}
          {reviews.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              <div style={{
                background: "white",
                padding: "24px",
                borderRadius: "14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: "1px solid #e8ece8",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>⭐</div>
                <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Average Rating</h3>
                <h2 style={{ margin: "8px 0 0 0", color: "#f59e0b", fontSize: "36px" }}>
                  {averageRating}
                </h2>
                <div style={{ color: "#f59e0b", fontSize: "20px" }}>
                  {"⭐".repeat(Math.round(averageRating))}
                </div>
              </div>

              <div style={{
                background: "white",
                padding: "24px",
                borderRadius: "14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: "1px solid #e8ece8"
              }}>
                <h3 style={{ margin: "0 0 12px 0", color: "#6b7280", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>
                  Rating Distribution
                </h3>
                {[5, 4, 3, 2, 1].map(star => {
                  const count = ratingDistribution[star] || 0;
                  const percentage = reviews.length > 0 ? (count / reviews.length * 100) : 0;
                  return (
                    <div key={star} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px"
                    }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563", minWidth: "20px" }}>
                        {star}⭐
                      </span>
                      <div style={{
                        flex: 1,
                        height: "8px",
                        background: "#f3f4f6",
                        borderRadius: "4px",
                        overflow: "hidden"
                      }}>
                        <div style={{
                          width: `${percentage}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
                          borderRadius: "4px",
                          transition: "width 0.5s ease"
                        }} />
                      </div>
                      <span style={{ fontSize: "12px", color: "#6b7280", minWidth: "30px" }}>
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{
                background: "white",
                padding: "24px",
                borderRadius: "14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: "1px solid #e8ece8",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>📝</div>
                <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Total Reviews</h3>
                <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "36px" }}>
                  {reviews.length}
                </h2>
                <p style={{ margin: "4px 0 0 0", color: "#6b7280", fontSize: "13px" }}>
                  {reviews.length > 0 ? "Reviews from customers" : "No reviews yet"}
                </p>
              </div>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "white",
              borderRadius: "16px",
              border: "2px dashed #d1d5db"
            }}>
              <div style={{ fontSize: "72px", marginBottom: "15px" }}>📝</div>
              <h3 style={{ color: "#1f2937", marginBottom: "10px", fontSize: "24px" }}>No Reviews Found</h3>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "16px" }}>
                No customer reviews available at the moment.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review._id}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    border: "1px solid #e8ece8",
                    transition: "all 0.3s ease",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "#14532d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "#e8ece8";
                  }}
                >
                  {/* Header with product name */}
                  <div style={{
                    background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                    padding: "18px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <h2 style={{
                      margin: 0,
                      color: "white",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}>
                      <span>🌾</span>
                      {review.productId?.name || "Unknown Product"}
                    </h2>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(255,255,255,0.2)",
                      padding: "4px 14px",
                      borderRadius: "20px"
                    }}>
                      <span style={{ color: "white", fontSize: "18px" }}>
                        {"⭐".repeat(review.rating)}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: "500" }}>
                        {review.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Review content */}
                  <div style={{ padding: "24px" }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginBottom: "16px"
                    }}>
                      <div style={{
                        background: "#f9fafb",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid #f3f4f6"
                      }}>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>👤 Customer</div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937" }}>
                          {review.userId?.name || "Anonymous"}
                        </div>
                      </div>
                      <div style={{
                        background: "#f9fafb",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid #f3f4f6"
                      }}>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>📧 Email</div>
                        <div style={{ fontSize: "14px", color: "#4b5563" }}>
                          {review.userId?.email || "No email provided"}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      background: "#fafbfc",
                      padding: "16px",
                      borderRadius: "10px",
                      border: "1px solid #f3f4f6",
                      marginBottom: "16px"
                    }}>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>💬 Review</div>
                      <p style={{
                        margin: 0,
                        color: "#1f2937",
                        fontSize: "15px",
                        lineHeight: "1.6"
                      }}>
                        {review.comment || "No comment provided"}
                      </p>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px"
                    }}>
                      <div style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}>
                        <span>📅</span>
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }) : "Date unavailable"}
                      </div>

                      <button
                        onClick={() => deleteReview(review._id)}
                        style={{
                          padding: "10px 22px",
                          background: "#fee2e2",
                          color: "#dc2626",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "14px",
                          transition: "all 0.3s ease",
                          display: "flex",
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
                        🗑️ Delete Review
                      </button>
                    </div>
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

export default AdminReviews;