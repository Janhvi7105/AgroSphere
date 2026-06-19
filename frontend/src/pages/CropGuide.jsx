import React from "react";
import { useNavigate } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";

const CropGuide = () => {
  const navigate = useNavigate();

  const fieldCrops = [
    "Rice",
    "Wheat",
    "Maize",
    "Jowar",
    "Bajra",
    "Sugarcane",
  ];

  const vegetables = [
    "Tomato",
    "Potato",
    "Onion",
    "Carrot",
    "Cabbage",
    "Okra",
  ];

  const fruits = [
    "Mango",
    "Banana",
    "Apple",
    "Guava",
    "Papaya",
    "Pomegranate",
  ];

  const flowers = [
    "Rose",
    "Marigold",
    "Sunflower",
    "Jasmine",
    "Hibiscus",
  ];

  const renderSection = (title, data, emoji) => (
    <>
      <h2 style={{ marginTop: "40px" }}>
        {emoji} {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(150px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {data.map((item) => (
          <div
            key={item}
            onClick={() =>
              navigate(`/crop/${item}`)
            }
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#e8f5e9",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              🌱
            </div>

            <h4>{item}</h4>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          padding: "40px",
          background: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <h1>🌾 Crop Guide</h1>

        {renderSection(
          "Field Crops",
          fieldCrops,
          "🌾"
        )}

        {renderSection(
          "Vegetables",
          vegetables,
          "🥕"
        )}

        {renderSection(
          "Fruits",
          fruits,
          "🍎"
        )}

        {renderSection(
          "Flowers",
          flowers,
          "🌺"
        )}
      </div>
    </>
  );
};

export default CropGuide;