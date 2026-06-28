import React, { useState, useEffect } from "react";
import axios from "axios";
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
      const { data } = await axios.get(
        "http://localhost:5000/api/crops"
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
        await axios.put(
          `http://localhost:5000/api/crops/${currentCropId}`,
          cropData,
          config
        );
        alert("Crop updated successfully!");
      } else {
        // Add new crop
        await axios.post(
          "http://localhost:5000/api/crops",
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
      await axios.delete(
        `http://localhost:5000/api/crops/${id}`,
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
    <div style={{ background: "#f4f7fb", minHeight: "100vh" }}>
      <AdminNavbar />

      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 30px" }}>
        <div style={{ marginBottom: "35px" }}>
          <h1 style={{ color: "#14532d", fontSize: "42px", marginBottom: "10px" }}>
            🌱 Crop Guide Management
          </h1>
          <p style={{ color: "#6b7280", fontSize: "18px" }}>
            Add, edit, or delete crop information for the Crop Guide feature.
          </p>
        </div>

        {/* Add/Edit Form */}
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ color: "#14532d", marginBottom: "20px" }}>
            {isEditing ? "✏️ Edit Crop" : "➕ Add New Crop"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Crop Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Grain">Grain</option>
                  <option value="Pulse">Pulse</option>
                  <option value="Oilseed">Oilseed</option>
                  <option value="Spice">Spice</option>
                  <option value="Flower">Flower</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                >
                  <option value="">Select Season</option>
                  <option value="Kharif">Kharif (Monsoon)</option>
                  <option value="Rabi">Rabi (Winter)</option>
                  <option value="Zaid">Zaid (Summer)</option>
                  <option value="All Seasons">All Seasons</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Climate
                </label>
                <input
                  type="text"
                  name="climate"
                  value={formData.climate}
                  onChange={handleChange}
                  placeholder="e.g., Tropical, Temperate"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Rainfall (mm)
                </label>
                <input
                  type="text"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="e.g., 500-1000 mm"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Soil Type
                </label>
                <input
                  type="text"
                  name="soil"
                  value={formData.soil}
                  onChange={handleChange}
                  placeholder="e.g., Loamy, Sandy, Clay"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Duration (days)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 60-90 days"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Irrigation
                </label>
                <input
                  type="text"
                  name="irrigation"
                  value={formData.irrigation}
                  onChange={handleChange}
                  placeholder="e.g., Drip, Sprinkler"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Seed Price (₹ per kg)
                </label>
                <input
                  type="number"
                  name="seedPrice"
                  value={formData.seedPrice}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Video URL
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Varieties (comma separated)
                </label>
                <input
                  type="text"
                  name="varieties"
                  value={formData.varieties}
                  onChange={handleChange}
                  placeholder="e.g., Hybrid, Heirloom"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Growth Stages (comma separated)
                </label>
                <input
                  type="text"
                  name="growthStages"
                  value={formData.growthStages}
                  onChange={handleChange}
                  placeholder="e.g., Seedling, Vegetative, Flowering"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Fertilizers (comma separated)
                </label>
                <input
                  type="text"
                  name="fertilizers"
                  value={formData.fertilizers}
                  onChange={handleChange}
                  placeholder="e.g., NPK, Urea, DAP"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                  Diseases (comma separated)
                </label>
                <input
                  type="text"
                  name="diseases"
                  value={formData.diseases}
                  onChange={handleChange}
                  placeholder="e.g., Leaf Curl, Blight"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#14532d",
                  color: "white",
                  padding: "12px 30px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
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
                {loading ? "Saving..." : isEditing ? "✏️ Update Crop" : "➕ Add Crop"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    background: "#6b7280",
                    color: "white",
                    padding: "12px 30px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#4b5563";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#6b7280";
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Crops List */}
        <h2 style={{ color: "#14532d", marginBottom: "20px" }}>
          📋 All Crops ({crops.length})
        </h2>

        {loading && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading crops...</p>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          {Array.isArray(crops) &&
            crops.map((crop) => (
              <div
                key={crop._id}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "18px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                }}
              >
                <img
                  src={crop.image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600"}
                  alt={crop.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />

                <h3 style={{ color: "#14532d", fontSize: "22px", marginBottom: "5px" }}>
                  {crop.name}
                </h3>

                <p style={{ color: "#6b7280", marginBottom: "10px" }}>
                  <strong>Category:</strong> {crop.category}
                </p>

                <p style={{ color: "#6b7280", marginBottom: "10px", fontSize: "14px" }}>
                  {crop.description?.substring(0, 100)}...
                </p>

                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                  <button
                    onClick={() => handleEdit(crop)}
                    style={{
                      flex: 1,
                      background: "#1a56db",
                      color: "white",
                      padding: "8px 15px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1e40af";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#1a56db";
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(crop._id)}
                    style={{
                      flex: 1,
                      background: "#dc2626",
                      color: "white",
                      padding: "8px 15px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#b91c1c";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#dc2626";
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {crops.length === 0 && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ fontSize: "18px", color: "#6b7280" }}>
              No crops added yet. Click "Add New Crop" to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCropGuide;