import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/posts"
      );

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/admin/posts/${id}`
      );

      alert("Post Deleted Successfully");

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get random avatar color
  const getAvatarColor = (name) => {
    const colors = [
      '#14532d', '#1a6b1a', '#0b5d1e', '#2d7a2d', 
      '#3a8a3a', '#4a9a4a', '#5aaa5a', '#6aba6a'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

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
              <span style={{ fontSize: "36px" }}>👨‍🌾</span>
              Community Posts
              <span style={{
                fontSize: "16px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500",
                marginLeft: "8px"
              }}>
                {posts.length} Posts
              </span>
            </h1>
            <p style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: "16px"
            }}>
              Manage all community posts shared by farmers
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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📝</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Total Posts</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>{posts.length}</h2>
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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🌾</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Farmers</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>
                {new Set(posts.map(p => p.farmerId?._id)).size}
              </h2>
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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📅</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Latest Post</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "18px", fontWeight: "600" }}>
                {posts.length > 0 ? new Date(posts[0]?.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short'
                }) : 'N/A'}
              </h2>
            </div>
          </div>

          {/* Posts List */}
          {posts.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "white",
              borderRadius: "16px",
              border: "2px dashed #d1d5db"
            }}>
              <div style={{ fontSize: "72px", marginBottom: "15px" }}>📝</div>
              <h3 style={{ color: "#1f2937", marginBottom: "10px", fontSize: "24px" }}>No Posts Found</h3>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "16px" }}>
                No community posts have been created yet.
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gap: "24px"
            }}>
              {posts.map((post) => {
                const farmerName = post.farmerId?.name || "Farmer";
                const avatarColor = getAvatarColor(farmerName);
                const initials = farmerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                
                return (
                  <div
                    key={post._id}
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      padding: "0",
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
                    {/* Post Header */}
                    <div style={{
                      padding: "20px 24px",
                      borderBottom: "1px solid #e8ece8",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                      background: "#fafbfc"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px"
                      }}>
                        <div style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}dd)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "700",
                          fontSize: "18px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}>
                          {initials || "👨‍🌾"}
                        </div>
                        <div>
                          <h3 style={{
                            margin: 0,
                            color: "#14532d",
                            fontSize: "18px",
                            fontWeight: "600"
                          }}>
                            {farmerName}
                          </h3>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginTop: "2px"
                          }}>
                            <small style={{
                              color: "#6b7280",
                              fontSize: "13px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px"
                            }}>
                              📅 {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </small>
                            <span style={{ color: "#d1d5db" }}>•</span>
                            <small style={{
                              color: "#6b7280",
                              fontSize: "13px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px"
                            }}>
                              ⏰ {new Date(post.createdAt).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </small>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => deletePost(post._id)}
                        style={{
                          padding: "8px 18px",
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
                        🗑️ Delete
                      </button>
                    </div>

                    {/* Post Content */}
                    <div style={{
                      padding: "24px"
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: "16px",
                        lineHeight: "1.8",
                        color: "#1f2937",
                        whiteSpace: "pre-wrap"
                      }}>
                        {post.content}
                      </p>

                      {post.imageUrl && (
                        <div style={{
                          marginTop: "16px",
                          borderRadius: "10px",
                          overflow: "hidden",
                          border: "1px solid #e8ece8"
                        }}>
                          <img
                            src={post.imageUrl}
                            alt="Post"
                            style={{
                              width: "100%",
                              maxHeight: "300px",
                              objectFit: "cover"
                            }}
                          />
                        </div>
                      )}

                      {/* Post Actions */}
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPosts;