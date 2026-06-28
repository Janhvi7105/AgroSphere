import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data);
      setEditData({
        name: data.name || "",
        email: data.email || "",
        password: "",
      });
      setLoading(false);
    } catch (error) {
      console.log("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data.user);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
      setEditData({
        name: data.user.name,
        email: data.user.email,
        password: "",
      });
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile");
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
        <AdminNavbar />
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
            <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading profile...</p>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
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
      <AdminNavbar />

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
            padding: "45px",
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
                  gap: "12px"
                }}
              >
                <span style={{ fontSize: "36px" }}>🛠</span>
                Admin Profile
              </h1>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "16px",
                  margin: 0
                }}
              >
                Manage your administrator account settings.
              </p>
            </div>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "44px",
                boxShadow: "0 4px 12px rgba(20, 83, 45, 0.3)",
                border: "4px solid #e8ece8"
              }}
            >
              🛠
            </div>
          </div>

          {isEditing ? (
            // Edit Profile Form
            <div
              style={{
                background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
                padding: "30px",
                borderRadius: "16px",
                border: "2px solid #e8ece8",
              }}
            >
              <h3
                style={{
                  color: "#14532d",
                  marginBottom: "24px",
                  fontSize: "22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span>✏️</span> Edit Profile
              </h3>

              <form onSubmit={updateProfile}>
                <div style={{ marginBottom: "22px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#14532d",
                      fontSize: "15px"
                    }}
                  >
                    👤 Full Name
                  </label>
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="Enter your full name"
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "10px",
                      border: "2px solid #d1d5db",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      backgroundColor: "#fff",
                      boxSizing: "border-box"
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
                </div>

                <div style={{ marginBottom: "22px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#14532d",
                      fontSize: "15px"
                    }}
                  >
                    📧 Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    placeholder="Enter your email"
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "10px",
                      border: "2px solid #d1d5db",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      backgroundColor: "#fff",
                      boxSizing: "border-box"
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
                </div>

                <div style={{ marginBottom: "22px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#14532d",
                      fontSize: "15px"
                    }}
                  >
                    🔒 New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={editData.password}
                    onChange={handleEditChange}
                    placeholder="Leave blank if you don't want to change password"
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "10px",
                      border: "2px solid #d1d5db",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      backgroundColor: "#fff",
                      boxSizing: "border-box"
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
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap"
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      padding: "14px 40px",
                      background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(20, 83, 45, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
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
                    💾 Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({
                        name: user.name || "",
                        email: user.email || "",
                        password: "",
                      });
                    }}
                    style={{
                      padding: "14px 30px",
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
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Profile Display
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "25px",
                }}
              >
                <div
                  style={{
                    background: "#f9fafb",
                    padding: "22px 24px",
                    borderRadius: "12px",
                    border: "1px solid #e8ece8",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e8ece8";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "13px",
                      marginBottom: "6px",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    👤 Full Name
                  </p>
                  <h3
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: "600"
                    }}
                  >
                    {user?.name || "N/A"}
                  </h3>
                </div>

                <div
                  style={{
                    background: "#f9fafb",
                    padding: "22px 24px",
                    borderRadius: "12px",
                    border: "1px solid #e8ece8",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e8ece8";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "13px",
                      marginBottom: "6px",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    📧 Email Address
                  </p>
                  <h3
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: "600"
                    }}
                  >
                    {user?.email || "N/A"}
                  </h3>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "1px solid #bbf7d0",
                    textAlign: "center",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(20, 83, 45, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>📦</div>
                  <p
                    style={{
                      color: "#065f46",
                      fontSize: "14px",
                      marginBottom: "4px",
                      fontWeight: "500"
                    }}
                  >
                    Products Added
                  </p>
                  <h2
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "32px",
                      fontWeight: "700"
                    }}
                  >
                    {user?.productsCount || 0}
                  </h2>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "1px solid #bbf7d0",
                    textAlign: "center",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(20, 83, 45, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>📝</div>
                  <p
                    style={{
                      color: "#065f46",
                      fontSize: "14px",
                      marginBottom: "4px",
                      fontWeight: "500"
                    }}
                  >
                    Posts Created
                  </p>
                  <h2
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "32px",
                      fontWeight: "700"
                    }}
                  >
                    {user?.postsCount || 0}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                style={{
                  width: "100%",
                  padding: "18px",
                  background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "18px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(20, 83, 45, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px"
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
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;