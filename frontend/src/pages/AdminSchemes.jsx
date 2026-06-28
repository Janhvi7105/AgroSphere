import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerNavbar from "../components/AdminNavbar"; // Change if your admin navbar file name is different

const AdminSchemes = () => {
  const [schemes, setSchemes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligibility: "",
    benefits: "",
    deadline: "",
    officialLink: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  const fetchSchemes = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/schemes"
      );

      setSchemes(data.schemes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addScheme = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/schemes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Scheme Added Successfully");

      setFormData({
        title: "",
        description: "",
        eligibility: "",
        benefits: "",
        deadline: "",
        officialLink: "",
        image: "",
      });

      fetchSchemes();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const deleteScheme = async (id) => {
    if (!window.confirm("Delete Scheme?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/schemes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSchemes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          background: "#f0f3f0",
          minHeight: "100vh",
          padding: "40px 20px"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
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
              <span style={{ fontSize: "36px" }}>📢</span>
              Government Schemes
              <span style={{
                fontSize: "16px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500",
                marginLeft: "8px"
              }}>
                {schemes.length} Schemes
              </span>
            </h1>
            <p style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: "16px"
            }}>
              Manage government schemes for farmers and agricultural development
            </p>
          </div>

          {/* Add Scheme Form */}
          <div style={{
            background: "white",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            border: "1px solid #e8ece8",
            marginBottom: "40px",
          }}>
            <h2 style={{
              margin: "0 0 20px 0",
              color: "#14532d",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span>➕</span> Add New Scheme
            </h2>

            <form onSubmit={addScheme}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#14532d",
                    fontSize: "14px"
                  }}>
                    📝 Scheme Title
                  </label>
                  <input
                    name="title"
                    placeholder="Enter scheme title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={input}
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

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#14532d",
                    fontSize: "14px"
                  }}>
                    📅 Deadline
                  </label>
                  <input
                    name="deadline"
                    placeholder="Enter deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    style={input}
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

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#14532d",
                    fontSize: "14px"
                  }}>
                    ✅ Eligibility
                  </label>
                  <input
                    name="eligibility"
                    placeholder="Enter eligibility criteria"
                    value={formData.eligibility}
                    onChange={handleChange}
                    required
                    style={input}
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

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#14532d",
                    fontSize: "14px"
                  }}>
                    🎁 Benefits
                  </label>
                  <input
                    name="benefits"
                    placeholder="Enter benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    required
                    style={input}
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

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#14532d",
                    fontSize: "14px"
                  }}>
                    🔗 Official Link
                  </label>
                  <input
                    name="officialLink"
                    placeholder="Enter official website link"
                    value={formData.officialLink}
                    onChange={handleChange}
                    required
                    style={input}
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

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    color: "#14532d",
                    fontSize: "14px"
                  }}>
                    🖼️ Image URL
                  </label>
                  <input
                    name="image"
                    placeholder="Enter image URL (optional)"
                    value={formData.image}
                    onChange={handleChange}
                    style={input}
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
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "600",
                  color: "#14532d",
                  fontSize: "14px"
                }}>
                  📝 Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter detailed description of the scheme"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={textarea}
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

              <button style={button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(20, 83, 45, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(20, 83, 45, 0.3)";
                }}
              >
                ➕ Add Scheme
              </button>
            </form>
          </div>

          {/* Schemes List */}
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px"
            }}>
              <h2 style={{
                margin: 0,
                color: "#14532d",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <span>📋</span> Uploaded Schemes
              </h2>
              <span style={{
                color: "#6b7280",
                fontSize: "14px",
                background: "#f3f4f6",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500"
              }}>
                {schemes.length} schemes
              </span>
            </div>

            {schemes.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "80px 20px",
                background: "white",
                borderRadius: "16px",
                border: "2px dashed #d1d5db"
              }}>
                <div style={{ fontSize: "64px", marginBottom: "15px" }}>📢</div>
                <h3 style={{ color: "#1f2937", marginBottom: "10px" }}>No Schemes Added Yet</h3>
                <p style={{ color: "#6b7280", margin: 0 }}>
                  Start adding government schemes to help farmers benefit from them.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                  gap: "25px",
                }}
              >
                {schemes.map((scheme) => (
                  <div
                    key={scheme._id}
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      transition: "all 0.3s ease",
                      border: "1px solid #e8ece8"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    }}
                  >
                    {scheme.image && (
                      <img
                        src={scheme.image}
                        alt={scheme.title}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderBottom: "1px solid #e8ece8"
                        }}
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x200/14532d/ffffff?text=Scheme";
                        }}
                      />
                    )}

                    <div style={{ padding: "24px" }}>
                      <h3 style={{
                        margin: "0 0 12px 0",
                        color: "#14532d",
                        fontSize: "20px"
                      }}>
                        {scheme.title}
                      </h3>

                      <p style={{
                        color: "#4b5563",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        marginBottom: "16px"
                      }}>
                        {scheme.description}
                      </p>

                      <div style={{
                        display: "grid",
                        gap: "8px",
                        marginBottom: "16px"
                      }}>
                        <div style={{
                          background: "#f9fafb",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid #f3f4f6"
                        }}>
                          <span style={{ fontWeight: "600", color: "#14532d" }}>✅ Eligibility:</span>
                          <span style={{ marginLeft: "6px", color: "#4b5563" }}>{scheme.eligibility}</span>
                        </div>

                        <div style={{
                          background: "#f9fafb",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid #f3f4f6"
                        }}>
                          <span style={{ fontWeight: "600", color: "#14532d" }}>🎁 Benefits:</span>
                          <span style={{ marginLeft: "6px", color: "#4b5563" }}>{scheme.benefits}</span>
                        </div>

                        <div style={{
                          background: "#fef3c7",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid #fde68a"
                        }}>
                          <span style={{ fontWeight: "600", color: "#92400e" }}>📅 Deadline:</span>
                          <span style={{ marginLeft: "6px", color: "#92400e", fontWeight: "500" }}>{scheme.deadline}</span>
                        </div>
                      </div>

                      <div style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap"
                      }}>
                        <a
                          href={scheme.officialLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            flex: 1,
                            padding: "10px 16px",
                            background: "#0b3d0b",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "8px",
                            textAlign: "center",
                            fontWeight: "600",
                            fontSize: "14px",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#1a6b1a";
                            e.currentTarget.style.transform = "scale(1.02)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#0b3d0b";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          🔗 Visit Website
                        </a>

                        <button
                          onClick={() => deleteScheme(scheme._id)}
                          style={{
                            padding: "10px 20px",
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
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#fee2e2";
                            e.currentTarget.style.color = "#dc2626";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "0",
  borderRadius: "10px",
  border: "2px solid #d1d5db",
  fontSize: "15px",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
  background: "#fafbfc",
  outline: "none",
  fontFamily: "inherit"
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "12px 14px",
  marginBottom: "0",
  borderRadius: "10px",
  border: "2px solid #d1d5db",
  fontSize: "15px",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
  background: "#fafbfc",
  outline: "none",
  fontFamily: "inherit",
  resize: "vertical"
};

const button = {
  padding: "14px 35px",
  background: "linear-gradient(135deg, #14532d, #1a6b1a)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(20, 83, 45, 0.3)",
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

export default AdminSchemes;