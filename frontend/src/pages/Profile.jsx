import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerNavbar from "../components/FarmerNavbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
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
      setUser(data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile");
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
            <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading profile...</p>
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
          maxWidth: "900px",
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
                👨‍🌾 Farmer Profile
              </h1>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "16px",
                }}
              >
                Manage your personal information and account settings.
              </p>
            </div>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#14532d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
              }}
            >
              👨‍🌾
            </div>
          </div>

          {isEditing ? (
            // Edit Profile Form
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
                  marginBottom: "20px",
                  fontSize: "20px",
                }}
              >
                ✏️ Edit Profile
              </h3>

              <form onSubmit={updateProfile}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    Full Name
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
                      transition: "border-color 0.3s",
                      backgroundColor: "#fff",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#14532d";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    Email Address
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
                      transition: "border-color 0.3s",
                      backgroundColor: "#fff",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#14532d";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      padding: "14px 35px",
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
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#14532d";
                      e.currentTarget.style.transform = "scale(1)";
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
                      });
                    }}
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
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      marginBottom: "5px",
                    }}
                  >
                    Full Name
                  </p>
                  <h3
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "22px",
                    }}
                  >
                    {user?.name || "N/A"}
                  </h3>
                </div>

                <div
                  style={{
                    background: "#f9fafb",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      marginBottom: "5px",
                    }}
                  >
                    Email Address
                  </p>
                  <h3
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "22px",
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
                    background: "#f0f9f0",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #c8e6c9",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "5px" }}>📦</div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      marginBottom: "5px",
                    }}
                  >
                    Products Added
                  </p>
                  <h2
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "28px",
                    }}
                  >
                    {user?.productsCount || 0}
                  </h2>
                </div>

                <div
                  style={{
                    background: "#f0f9f0",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #c8e6c9",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "5px" }}>📝</div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      marginBottom: "5px",
                    }}
                  >
                    Posts Created
                  </p>
                  <h2
                    style={{
                      color: "#14532d",
                      margin: 0,
                      fontSize: "28px",
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
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;