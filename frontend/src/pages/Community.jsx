import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerNavbar from "../components/FarmerNavbar";

const Community = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/posts"
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

      const { data } = await axios.post(
        "http://localhost:5000/api/posts",
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
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <FarmerNavbar />

      {/* Page Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "35px",
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
            }}
          >
            <h1
              style={{
                fontSize: "36px",
                color: "#14532d",
                marginBottom: "10px",
              }}
            >
              👨‍🌾 Community Feed
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              Connect with fellow farmers, share experiences, and learn from the community.
            </p>
          </div>

          {/* Create Post Section */}
          <div
            style={{
              background: "#f9fafb",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                color: "#14532d",
                marginBottom: "15px",
                fontSize: "20px",
              }}
            >
              📝 Share Your Story
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
                  padding: "15px",
                  borderRadius: "12px",
                  border: "2px solid #d1d5db",
                  fontSize: "16px",
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 0.3s",
                  fontFamily: "inherit",
                  backgroundColor: "#fff",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#14532d";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
              />

              <br />
              <br />

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                }}
              >
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "14px 35px",
                    background: submitting ? "#6b7280" : "#14532d",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.background = "#0b5d1e";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.background = "#14532d";
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  {submitting ? "⏳ Posting..." : "📤 Create Post"}
                </button>

                <button
                  type="button"
                  onClick={() => setContent("")}
                  style={{
                    padding: "14px 25px",
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
                  🗑 Clear
                </button>
              </div>
            </form>
          </div>

          <hr style={{ margin: "35px 0", border: "1px solid #e5e7eb" }} />

          {/* Recent Posts Section */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  color: "#14532d",
                  fontSize: "24px",
                  margin: 0,
                }}
              >
                📋 Recent Posts
              </h2>
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>

            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#6b7280",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>⏳</div>
                <p>Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "#f9fafb",
                  borderRadius: "15px",
                  border: "2px dashed #d1d5db",
                }}
              >
                <div style={{ fontSize: "64px", marginBottom: "15px" }}>🌱</div>
                <h3 style={{ color: "#1f2937", marginBottom: "10px" }}>
                  No posts yet
                </h3>
                <p style={{ color: "#6b7280", fontSize: "16px" }}>
                  Be the first to share your farming story with the community!
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  style={{
                    background: "#fff",
                    padding: "25px",
                    marginTop: "20px",
                    borderRadius: "15px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "translateY(0px)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "#14532d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        marginRight: "15px",
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
                        }}
                      >
                        Farmer
                      </h4>
                      <small
                        style={{
                          color: "#6b7280",
                          fontSize: "14px",
                        }}
                      >
                        {new Date(
                          post.createdAt
                        ).toLocaleString()}
                      </small>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.8",
                      color: "#1f2937",
                      margin: "10px 0",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {post.content}
                  </p>

                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        borderRadius: "10px",
                        marginTop: "15px",
                      }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;