import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FarmerNavbar from "../components/FarmerNavbar";

const CropDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  // Function to load Razorpay SDK dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (seed) => {
    try {
      // Load Razorpay SDK
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay SDK Failed To Load");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: seed.price,
        }
      );

      const options = {
        key: "rzp_test_SGJDv8CpSvpMfO",
        amount: data.amount,
        currency: "INR",
        name: "AgroSphere",
        description: seed.name,
        order_id: data.id,
        handler: async function (response) {
          alert("✅ Payment Successful");

          await axios.post(
            "http://localhost:5000/api/orders",
            {
              productName: seed.name,
              price: seed.price,
              quantity: 1,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              status: "Paid",
            }
          );

          navigate("/purchase");
        },
        theme: {
          color: "#0b5d1e",
        },
      };

      // Debug check
      console.log("Razorpay Object:", window.Razorpay);

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  const crop = {
    name,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    description: `${name} is an important agricultural crop cultivated widely for food and commercial purposes. Proper cultivation practices can significantly improve yield and profitability.`,
    climate: "20°C - 35°C",
    rainfall: "1000 - 1500 mm",
    soil: "Clay & Loamy Soil",
    duration: "120 - 150 Days",
    irrigation: "Requires regular irrigation during growth stages.",
    varieties: [
      `${name} Hybrid`,
      `${name} Premium`,
      `${name} High Yield`,
    ],
    fertilizers: [
      "Urea",
      "DAP",
      "Potash",
      "Zinc Sulphate",
    ],
    growthStages: [
      "Germination",
      "Seedling",
      "Vegetative Growth",
      "Flowering",
      "Harvesting",
    ],
    diseases: [
      {
        name: "Leaf Blight",
        symptoms: "Yellowing and drying of leaves.",
        treatment: "Use Copper Oxychloride spray.",
      },
      {
        name: "Root Rot",
        symptoms: "Roots become weak and decay.",
        treatment: "Ensure proper drainage and fungicide application.",
      },
    ],
    seeds: [
      {
        name: `${name} Hybrid Seed`,
        price: 450,
        image: "/seeds/hybrid-seed.jpg",
      },
      {
        name: `${name} Premium Seed`,
        price: 650,
        image: "/seeds/premium-seed.jpg",
      },
      {
        name: `${name} High Yield Seed`,
        price: 850,
        image: "/seeds/highyield-seed.jpg",
      },
    ],
  };

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          background: "#f4f7f4",
          minHeight: "100vh",
        }}
      >
        {/* Banner */}
        <div
          style={{
            position: "relative",
            height: "350px",
          }}
        >
          <img
            src={crop.image}
            alt={crop.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "55px",
              }}
            >
              🌾 {crop.name} Guide
            </h1>
          </div>
        </div>

        <div style={{ padding: "40px" }}>
          {/* Intro */}
          <SectionCard title="📖 Introduction">
            <p>{crop.description}</p>
          </SectionCard>

          {/* Info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginTop: "25px",
            }}
          >
            <InfoCard
              title="🌤 Climate"
              value={crop.climate}
            />
            <InfoCard
              title="🌧 Rainfall"
              value={crop.rainfall}
            />
            <InfoCard
              title="🌱 Soil"
              value={crop.soil}
            />
            <InfoCard
              title="📅 Duration"
              value={crop.duration}
            />
          </div>

          <SectionCard title="🌾 Varieties">
            <ul>
              {crop.varieties.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="🌿 Growth Stages">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              {crop.growthStages.map((stage, index) => (
                <div
                  key={index}
                  style={{
                    background: "#e8f5e9",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  {stage}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="💧 Irrigation">
            <p>{crop.irrigation}</p>
          </SectionCard>

          <SectionCard title="🧪 Recommended Fertilizers">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: "15px",
              }}
            >
              {crop.fertilizers.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#f1f8e9",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="🦠 Disease Management">
            {crop.diseases.map((disease, index) => (
              <div
                key={index}
                style={{
                  background: "#fff3e0",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              >
                <h4>{disease.name}</h4>

                <p>
                  <b>Symptoms:</b> {disease.symptoms}
                </p>

                <p>
                  <b>Treatment:</b> {disease.treatment}
                </p>
              </div>
            ))}
          </SectionCard>

          {/* Seeds */}
          <h2
            style={{
              marginTop: "40px",
              color: "#0b5d1e",
            }}
          >
            🌱 Available Seeds
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "25px",
              marginTop: "25px",
            }}
          >
            {crop.seeds.map((seed, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={seed.image}
                  alt={seed.name}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    padding: "20px",
                  }}
                >
                  <h3>{seed.name}</h3>

                  <h2
                    style={{
                      color: "#0b5d1e",
                    }}
                  >
                    ₹{seed.price}
                  </h2>

                  <button
                    onClick={() => handlePayment(seed)}
                    style={{
                      background: "#0b5d1e",
                      color: "white",
                      border: "none",
                      padding: "12px 25px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const InfoCard = ({ title, value }) => (
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      textAlign: "center",
    }}
  >
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div
    style={{
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      marginTop: "25px",
    }}
  >
    <h2>{title}</h2>
    {children}
  </div>
);

export default CropDetails;