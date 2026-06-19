import React from "react";

const GovtSchemes = () => {
  const schemes = [
    {
      name: "PM-KISAN",
      benefit: "₹6000 yearly financial support",
    },
    {
      name: "PMFBY",
      benefit: "Crop Insurance Scheme",
    },
    {
      name: "Kisan Credit Card",
      benefit: "Low interest agricultural loans",
    },
    {
      name: "Soil Health Card",
      benefit: "Soil testing and recommendations",
    },
    {
      name: "e-NAM",
      benefit: "National Agriculture Marketplace",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>📢 Government Schemes</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {schemes.map((scheme, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{scheme.name}</h3>
            <p>{scheme.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovtSchemes;