import React, { useState, useEffect } from "react";
import API from "../api";
import FarmerNavbar from "../components/FarmerNavbar";

const Community = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        "/api/posts"
      );

      console.log("POSTS RECEIVED:", data);

      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log("FETCH ERROR:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please write something before posting.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/api/posts",
        {
          content,
          imageUrl: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      setContent("");

      fetchPosts();
      setSubmitting(false);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message
      );
      setSubmitting(false);
    }
  };

  console.log("Current Posts State:", posts);

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
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            border: "1px solid #e8ece8",
          }}
        >
          <div
            style={{
              marginBottom: "35px",
              borderBottom: "2px solid #e8ece8",
              paddingBottom: "25px",
            }}
          >
            <h1
              style={{
                fontSize: "34px",
                color: "#14532d",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              <span style={{ fontSize: "38px" }}>👨‍🌾</span>
              Community Feed
              <span style={{
                fontSize: "14px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500",
                marginLeft: "8px"
              }}>
                {posts.length} posts
              </span>
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "16px",
                margin: 0
              }}
            >
              Connect with fellow farmers, share experiences, and learn from the community.
            </p>
          </div>

          {/* Create Post Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
              padding: "28px",
              borderRadius: "16px",
              border: "2px solid #e8ece8",
              marginBottom: "10px"
            }}
          >
            <h3
              style={{
                color: "#14532d",
                marginBottom: "18px",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span>📝</span> Share Your Story
            </h3>

            <form onSubmit={createPost}>
              <textarea
                rows="5"
                placeholder="What's happening on your farm? Share tips, challenges, or success stories..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "2px solid #d1d5db",
                  fontSize: "16px",
                  outline: "none",
                  resize: "vertical",
                  transition: "all 0.3s ease",
                  fontFamily: "inherit",
                  backgroundColor: "#fff",
                  minHeight: "120px"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "18px",
                  flexWrap: "wrap"
                }}
              >
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "14px 36px",
                    background: submitting ? "#9ca3af" : "linear-gradient(135deg, #14532d, #1a6b1a)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    boxShadow: submitting ? "none" : "0 4px 12px rgba(20, 83, 45, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: submitting ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(20, 83, 45, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(20, 83, 45, 0.3)";
                    }
                  }}
                >
                  {submitting ? "⏳ Posting..." : "📤 Create Post"}
                </button>

                <button
                  type="button"
                  onClick={() => setContent("")}
                  style={{
                    padding: "14px 28px",
                    background: "#f3f4f6",
                    color: "#1f2937",
                    border: "none",
                    borderRadius: "10px",
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
                  🗑 Clear
                </button>
              </div>
            </form>
          </div>

          <hr style={{ margin: "40px 0", border: "1px solid #e8ece8" }} />

          {/* Recent Posts Section */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  color: "#14532d",
                  fontSize: "24px",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span>📋</span> Recent Posts
              </h2>
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  background: "#f3f4f6",
                  padding: "4px 14px",
                  borderRadius: "20px",
                  fontWeight: "500"
                }}
              >
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>

            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "#f9fafb",
                  borderRadius: "16px",
                }}
              >
                <div style={{
                  width: "50px",
                  height: "50px",
                  border: "6px solid #f3f3f3",
                  borderTop: "6px solid #14532d",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 20px"
                }}></div>
                <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>Loading posts...</p>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            ) : posts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
                  borderRadius: "16px",
                  border: "2px dashed #d1d5db",
                }}
              >
                <div style={{ fontSize: "72px", marginBottom: "15px" }}>🌱</div>
                <h3 style={{ color: "#1f2937", marginBottom: "10px", fontSize: "24px" }}>
                  No posts yet
                </h3>
                <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>
                  Be the first to share your farming story with the community!
                </p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gap: "20px"
              }}>
                {posts.map((post) => (
                  <div
                    key={post._id}
                    style={{
                      background: "#fff",
                      padding: "28px",
                      borderRadius: "16px",
                      border: "1px solid #e8ece8",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = "#14532d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "#e8ece8";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "26px",
                          marginRight: "16px",
                          boxShadow: "0 2px 8px rgba(20, 83, 45, 0.2)"
                        }}
                      >
                        👨‍🌾
                      </div>
                      <div>
                        <h4
                          style={{
                            margin: 0,
                            color: "#14532d",
                            fontSize: "18px",
                            fontWeight: "600"
                          }}
                        >
                          Farmer
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginTop: "2px"
                          }}
                        >
                          <small
                            style={{
                              color: "#6b7280",
                              fontSize: "13px",
                            }}
                          >
                            📅 {new Date(
                              post.createdAt
                            ).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </small>
                          <span style={{ color: "#d1d5db" }}>•</span>
                          <small
                            style={{
                              color: "#6b7280",
                              fontSize: "13px",
                            }}
                          >
                            ⏰ {new Date(
                              post.createdAt
                            ).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </small>
                        </div>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.8",
                        color: "#1f2937",
                        margin: "0 0 12px 0",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {post.content}
                    </p>

                    {post.imageUrl && (
                      <div style={{
                        marginTop: "12px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #e8ece8"
                      }}>
                        <img
                          src={post.imageUrl}
                          alt="Post"
                          style={{
                            width: "100%",
                            maxHeight: "350px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}

                    <div style={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px solid #f3f4f6",
                      display: "flex",
                      gap: "20px"
                    }}>
                      <span style={{
                        color: "#6b7280",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        👍 Like
                      </span>
                      <span style={{
                        color: "#6b7280",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        💬 Comment
                      </span>
                      <span style={{
                        color: "#6b7280",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        🔗 Share
                      </span>
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

export default Community;