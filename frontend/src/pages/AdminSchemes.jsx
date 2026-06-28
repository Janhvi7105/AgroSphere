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
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1>📢 Government Schemes</h1>

        <form
          onSubmit={addScheme}
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
            marginBottom: "40px",
          }}
        >
          <input
            name="title"
            placeholder="Scheme Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={input}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            style={textarea}
          />

          <input
            name="eligibility"
            placeholder="Eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            required
            style={input}
          />

          <input
            name="benefits"
            placeholder="Benefits"
            value={formData.benefits}
            onChange={handleChange}
            required
            style={input}
          />

          <input
            name="deadline"
            placeholder="Deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            style={input}
          />

          <input
            name="officialLink"
            placeholder="Official Link"
            value={formData.officialLink}
            onChange={handleChange}
            required
            style={input}
          />

          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            style={input}
          />

          <button style={button}>
            Add Scheme
          </button>
        </form>

        <h2>Uploaded Schemes</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {schemes.map((scheme) => (
            <div
              key={scheme._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,.1)",
              }}
            >
              {scheme.image && (
                <img
                  src={scheme.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              )}

              <h3>{scheme.title}</h3>

              <p>{scheme.description}</p>

              <p>
                <b>Eligibility:</b>{" "}
                {scheme.eligibility}
              </p>

              <p>
                <b>Benefits:</b>{" "}
                {scheme.benefits}
              </p>

              <p>
                <b>Deadline:</b>{" "}
                {scheme.deadline}
              </p>

              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noreferrer"
              >
                Official Website
              </a>

              <br />
              <br />

              <button
                onClick={() =>
                  deleteScheme(scheme._id)
                }
                style={{
                  ...button,
                  background: "#dc3545",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  padding: "12px 25px",
  background: "#0b5d1e",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminSchemes;