import React from "react";
import { useParams } from "react-router-dom";
import FarmerNavbar from "../components/FarmerNavbar";

const CropDetails = () => {
  const { name } = useParams();

  const crop = {
    name,

    season: "Kharif",

    climate: "20-35°C",

    rainfall: "1000-1500 mm",

    soil: "Clay & Loamy Soil",

    duration: "120-150 Days",

    irrigation:
      "Requires regular irrigation",

    fertilizers: [
      "Urea",
      "DAP",
      "Potash",
      "Zinc Sulphate",
    ],

    growthStages: [
      "Germination",
      "Seedling",
      "Tillering",
      "Flowering",
      "Harvesting",
    ],

    seeds: [
      {
        name: `${name} Hybrid Seed`,
        price: 450,
      },
      {
        name: `${name} Premium Seed`,
        price: 650,
      },
      {
        name: `${name} High Yield Seed`,
        price: 850,
      },
    ],
  };

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
        <h1>
          🌾 {crop.name} Cultivation
        </h1>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          <h3>Crop Details</h3>

          <p>
            <b>Season:</b> {crop.season}
          </p>

          <p>
            <b>Climate:</b>{" "}
            {crop.climate}
          </p>

          <p>
            <b>Rainfall:</b>{" "}
            {crop.rainfall}
          </p>

          <p>
            <b>Soil:</b> {crop.soil}
          </p>

          <p>
            <b>Duration:</b>{" "}
            {crop.duration}
          </p>

          <p>
            <b>Irrigation:</b>{" "}
            {crop.irrigation}
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          <h3>Growth Stages</h3>

          <ul>
            {crop.growthStages.map(
              (stage, index) => (
                <li key={index}>
                  {stage}
                </li>
              )
            )}
          </ul>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          <h3>Fertilizers</h3>

          <ul>
            {crop.fertilizers.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <h2
          style={{
            marginTop: "30px",
          }}
        >
          🌱 Available Seeds
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {crop.seeds.map(
            (seed, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{seed.name}</h3>

                <h2>
                  ₹{seed.price}
                </h2>

                <button
                  style={{
                    background:
                      "#0b5d1e",
                    color: "white",
                    border: "none",
                    padding:
                      "10px 20px",
                    borderRadius:
                      "8px",
                    cursor: "pointer",
                  }}
                >
                  Buy Now
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CropDetails;