import React, { useState, useEffect } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

const AdminCropGuide = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCropId, setCurrentCropId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    description: "",
    season: "",
    climate: "",
    rainfall: "",
    soil: "",
    duration: "",
    irrigation: "",
    seedPrice: "",
    videoUrl: "",
    varieties: "",
    growthStages: "",
    fertilizers: "",
    diseases: "",
  });

  // Fetch all crops
  const fetchCrops = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(
        "/api/crops"
      );
      setCrops(data.crops);
    } catch (error) {
      console.error("Error fetching crops:", error);
      alert("Failed to fetch crops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      image: "",
      description: "",
      season: "",
      climate: "",
      rainfall: "",
      soil: "",
      duration: "",
      irrigation: "",
      seedPrice: "",
      videoUrl: "",
      varieties: "",
      growthStages: "",
      fertilizers: "",
      diseases: "",
    });
    setIsEditing(false);
    setCurrentCropId(null);
  };

  // Handle form submit (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Prepare data - convert string arrays to actual arrays if needed
      const cropData = {
        ...formData,
        seedPrice: formData.seedPrice ? parseFloat(formData.seedPrice) : 0,
        varieties: formData.varieties ? formData.varieties.split(",").map(item => item.trim()) : [],
        growthStages: formData.growthStages ? formData.growthStages.split(",").map(item => item.trim()) : [],
        fertilizers: formData.fertilizers ? formData.fertilizers.split(",").map(item => item.trim()) : [],
        diseases: formData.diseases ? formData.diseases.split(",").map(item => item.trim()) : [],
      };

      if (isEditing) {
        // Update crop
        await API.put(
          `/api/crops/${currentCropId}`,
          cropData,
          config
        );
        alert("Crop updated successfully!");
      } else {
        // Add new crop
        await API.post(
          "/api/crops",
          cropData,
          config
        );
        alert("Crop added successfully!");
      }

      resetForm();
      fetchCrops();
    } catch (error) {
      console.error("Error saving crop:", error);
      alert(error.response?.data?.message || "Failed to save crop");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (crop) => {
    setIsEditing(true);
    setCurrentCropId(crop._id);
    setFormData({
      name: crop.name || "",
      category: crop.category || "",
      image: crop.image || "",
      description: crop.description || "",
      season: crop.season || "",
      climate: crop.climate || "",
      rainfall: crop.rainfall || "",
      soil: crop.soil || "",
      duration: crop.duration || "",
      irrigation: crop.irrigation || "",
      seedPrice: crop.seedPrice || "",
      videoUrl: crop.videoUrl || "",
      varieties: crop.varieties ? crop.varieties.join(", ") : "",
      growthStages: crop.growthStages ? crop.growthStages.join(", ") : "",
      fertilizers: crop.fertilizers ? crop.fertilizers.join(", ") : "",
      diseases: crop.diseases ? crop.diseases.join(", ") : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.delete(
        `/api/crops/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Crop deleted successfully!");
      fetchCrops();
    } catch (error) {
      console.error("Error deleting crop:", error);
      alert("Failed to delete crop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f0f3f0", minHeight: "100vh" }}>
      <AdminNavbar />

      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 30px" }}>
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
            <span style={{ fontSize: "36px" }}>🌱</span>
            Crop Guide Management
            <span style={{
              fontSize: "16px",
              background: "#f3f4f6",
              color: "#6b7280",
              padding: "4px 14px",
              borderRadius: "20px",
              fontWeight: "500",
              marginLeft: "8px"
            }}>
              {crops.length} Crops
            </span>
          </h1>
          <p style={{
            margin: "8px 0 0 0",
            color: "#6b7280",
            fontSize: "16px"
          }}>
            Add, edit, or delete crop information for the Crop Guide feature.
          </p>
        </div>

        {/* Add/Edit Form */}
        <div
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            border: "1px solid #e8ece8",
            marginBottom: "40px",
          }}
        >
          <h2 style={{
            color: "#14532d",
            marginBottom: "24px",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            {isEditing ? "✏️ Edit Crop" : "➕ Add New Crop"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "600",
                  color: "#14532d",
                  fontSize: "14px"
                }}>
                  🌾 Crop Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  📂 Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Vegetable">🥬 Vegetable</option>
                  <option value="Fruit">🍎 Fruit</option>
                  <option value="Grain">🌾 Grain</option>
                  <option value="Pulse">🫘 Pulse</option>
                  <option value="Oilseed">🛢️ Oilseed</option>
                  <option value="Spice">🌶️ Spice</option>
                  <option value="Flower">🌸 Flower</option>
                  <option value="Other">📦 Other</option>
                </select>
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
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  📝 Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  🌱 Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select Season</option>
                  <option value="Kharif">☀️ Kharif (Monsoon)</option>
                  <option value="Rabi">❄️ Rabi (Winter)</option>
                  <option value="Zaid">🌤️ Zaid (Summer)</option>
                  <option value="All Seasons">🌿 All Seasons</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "600",
                  color: "#14532d",
                  fontSize: "14px"
                }}>
                  🌡️ Climate
                </label>
                <input
                  type="text"
                  name="climate"
                  value={formData.climate}
                  onChange={handleChange}
                  placeholder="e.g., Tropical, Temperate"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  💧 Rainfall (mm)
                </label>
                <input
                  type="text"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="e.g., 500-1000 mm"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  🌍 Soil Type
                </label>
                <input
                  type="text"
                  name="soil"
                  value={formData.soil}
                  onChange={handleChange}
                  placeholder="e.g., Loamy, Sandy, Clay"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  ⏳ Duration (days)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 60-90 days"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  💦 Irrigation
                </label>
                <input
                  type="text"
                  name="irrigation"
                  value={formData.irrigation}
                  onChange={handleChange}
                  placeholder="e.g., Drip, Sprinkler"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  💰 Seed Price (₹ per kg)
                </label>
                <input
                  type="number"
                  name="seedPrice"
                  value={formData.seedPrice}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  ▶️ Video URL
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  🌾 Varieties (comma separated)
                </label>
                <input
                  type="text"
                  name="varieties"
                  value={formData.varieties}
                  onChange={handleChange}
                  placeholder="e.g., Hybrid, Heirloom"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  📈 Growth Stages (comma separated)
                </label>
                <input
                  type="text"
                  name="growthStages"
                  value={formData.growthStages}
                  onChange={handleChange}
                  placeholder="e.g., Seedling, Vegetative, Flowering"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  🧪 Fertilizers (comma separated)
                </label>
                <input
                  type="text"
                  name="fertilizers"
                  value={formData.fertilizers}
                  onChange={handleChange}
                  placeholder="e.g., NPK, Urea, DAP"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
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
                  🦠 Diseases (comma separated)
                </label>
                <input
                  type="text"
                  name="diseases"
                  value={formData.diseases}
                  onChange={handleChange}
                  placeholder="e.g., Leaf Curl, Blight"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "2px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    background: "#fafbfc",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14532d";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(20, 83, 45, 0.1)";
                    e.currentTarget.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafbfc";
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: "25px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px 36px",
                  background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(20, 83, 45, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: loading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(20, 83, 45, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(20, 83, 45, 0.3)";
                  }
                }}
              >
                {loading ? "⏳ Saving..." : isEditing ? "✏️ Update Crop" : "➕ Add Crop"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: "14px 32px",
                    background: "#f3f4f6",
                    color: "#1f2937",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
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
              )}
            </div>
          </form>
        </div>

        {/* Crops List */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          border: "1px solid #e8ece8"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <h2 style={{
              margin: 0,
              color: "#14532d",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span>📋</span> All Crops
            </h2>
            <span style={{
              color: "#6b7280",
              fontSize: "14px",
              background: "#f3f4f6",
              padding: "4px 14px",
              borderRadius: "20px",
              fontWeight: "500"
            }}>
              {crops.length} crops
            </span>
          </div>

          {loading && (
            <div style={{
              textAlign: "center",
              padding: "40px"
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                border: "6px solid #f3f3f3",
                borderTop: "6px solid #14532d",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px"
              }}></div>
              <p style={{ color: "#6b7280" }}>Loading crops...</p>
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>
          )}

          {crops.length === 0 && !loading && (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#f9fafb",
              borderRadius: "12px"
            }}>
              <div style={{ fontSize: "64px", marginBottom: "15px" }}>🌱</div>
              <p style={{ fontSize: "18px", color: "#6b7280", margin: 0 }}>
                No crops added yet. Click "Add New Crop" to get started!
              </p>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "25px",
            }}
          >
            {Array.isArray(crops) &&
              crops.map((crop) => (
                <div
                  key={crop._id}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    border: "1px solid #e8ece8",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
                    e.currentTarget.style.borderColor = "#14532d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "#e8ece8";
                  }}
                >
                  <img
                    src={crop.image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600"}
                    alt={crop.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderBottom: "1px solid #e8ece8"
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600";
                    }}
                  />

                  <div style={{ padding: "20px" }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px"
                    }}>
                      <h3 style={{
                        margin: 0,
                        color: "#14532d",
                        fontSize: "20px",
                        fontWeight: "600"
                      }}>
                        {crop.name}
                      </h3>
                      <span style={{
                        background: "#e8f5e9",
                        color: "#14532d",
                        padding: "2px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {crop.category}
                      </span>
                    </div>

                    <p style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      marginBottom: "12px",
                      minHeight: "40px"
                    }}>
                      {crop.description?.substring(0, 100)}...
                    </p>

                    <div style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "16px"
                    }}>
                      <span style={{
                        background: "#f3f4f6",
                        padding: "2px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#4b5563"
                      }}>
                        🌱 {crop.season || "N/A"}
                      </span>
                      <span style={{
                        background: "#f3f4f6",
                        padding: "2px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#4b5563"
                      }}>
                        ⏳ {crop.duration || "N/A"}
                      </span>
                      {crop.seedPrice && (
                        <span style={{
                          background: "#fef3c7",
                          padding: "2px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          color: "#92400e"
                        }}>
                          💰 ₹{crop.seedPrice}/kg
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => handleEdit(crop)}
                        style={{
                          flex: 1,
                          background: "#1a56db",
                          color: "white",
                          padding: "10px 15px",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "14px",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#1e40af";
                          e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#1a56db";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => handleDelete(crop._id)}
                        style={{
                          flex: 1,
                          background: "#fee2e2",
                          color: "#dc2626",
                          padding: "10px 15px",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "14px",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#dc2626";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.transform = "scale(1.02)";
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
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCropGuide;