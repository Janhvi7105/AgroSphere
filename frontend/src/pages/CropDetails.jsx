import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
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

      const { data } = await API.post(
        "/api/payment/create-order",
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

          await API.post(
            "/api/orders",
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
          background: "#f0f3f0",
          minHeight: "100vh",
        }}
      >
        {/* Banner */}
        <div
          style={{
            position: "relative",
            height: "400px",
            overflow: "hidden",
          }}
        >
          <img
            src={crop.image}
            alt={crop.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.6)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(11, 61, 11, 0.7), rgba(20, 83, 45, 0.5))",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "60px",
                margin: 0,
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                fontWeight: "700",
                letterSpacing: "2px"
              }}
            >
              🌾 {crop.name} Guide
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "18px",
              marginTop: "10px",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)"
            }}>
              Complete cultivation guide for maximum yield
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 30px",
        }}>
          {/* Intro */}
          <SectionCard title="📖 Introduction">
            <p style={{
              fontSize: "16px",
              lineHeight: "1.8",
              color: "#4b5563",
              margin: 0
            }}>{crop.description}</p>
          </SectionCard>

          {/* Info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginTop: "25px",
            }}
          >
            <InfoCard
              title="🌤 Climate"
              value={crop.climate}
              icon="🌡️"
            />
            <InfoCard
              title="🌧 Rainfall"
              value={crop.rainfall}
              icon="💧"
            />
            <InfoCard
              title="🌱 Soil"
              value={crop.soil}
              icon="🌍"
            />
            <InfoCard
              title="📅 Duration"
              value={crop.duration}
              icon="⏳"
            />
          </div>

          <SectionCard title="🌾 Varieties">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px"
            }}>
              {crop.varieties.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    padding: "14px 20px",
                    borderRadius: "10px",
                    border: "1px solid #bbf7d0",
                    fontWeight: "500",
                    color: "#14532d",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>🌱</span> {item}
                </div>
              ))}
            </div>
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
                    background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
                    padding: "16px 24px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    color: "#14532d",
                    border: "1px solid #a5d6a7",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                >
                  <span>🌱</span> {stage}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="💧 Irrigation">
            <div style={{
              background: "#f0f9ff",
              padding: "16px 20px",
              borderRadius: "10px",
              border: "1px solid #bae6fd"
            }}>
              <p style={{
                margin: 0,
                fontSize: "16px",
                color: "#0c4a6e",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <span style={{ fontSize: "20px" }}>💦</span>
                {crop.irrigation}
              </p>
            </div>
          </SectionCard>

          <SectionCard title="🧪 Recommended Fertilizers">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "15px",
              }}
            >
              {crop.fertilizers.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "linear-gradient(135deg, #f1f8e9, #dcedc8)",
                    padding: "16px 20px",
                    borderRadius: "10px",
                    border: "1px solid #c5e1a5",
                    fontWeight: "500",
                    color: "#33691e",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                >
                  <span>🧪</span> {item}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="🦠 Disease Management">
            <div style={{
              display: "grid",
              gap: "16px"
            }}>
              {crop.diseases.map((disease, index) => (
                <div
                  key={index}
                  style={{
                    background: "#fff7ed",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #fed7aa",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#fb923c";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(251, 146, 60, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#fed7aa";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h4 style={{
                    color: "#9a3412",
                    margin: "0 0 10px 0",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <span>⚠️</span> {disease.name}
                  </h4>

                  <p style={{
                    margin: "6px 0",
                    color: "#78350f",
                    fontSize: "15px"
                  }}>
                    <b>Symptoms:</b> {disease.symptoms}
                  </p>

                  <p style={{
                    margin: "6px 0 0 0",
                    color: "#78350f",
                    fontSize: "15px"
                  }}>
                    <b>Treatment:</b> {disease.treatment}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Seeds */}
          <div style={{
            marginTop: "50px",
            paddingTop: "30px",
            borderTop: "2px solid #e8ece8"
          }}>
            <h2
              style={{
                color: "#14532d",
                fontSize: "32px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              <span>🌱</span> Available Seeds
              <span style={{
                fontSize: "14px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500"
              }}>
                {crop.seeds.length} varieties
              </span>
            </h2>
            <p style={{
              color: "#6b7280",
              marginBottom: "30px",
              fontSize: "16px"
            }}>
              Premium quality seeds for better yield and profitability
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "30px",
              }}
            >
              {crop.seeds.map((seed, index) => (
                <div
                  key={index}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    border: "1px solid #e8ece8"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{
                    position: "relative",
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    height: "240px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <span style={{
                      fontSize: "80px",
                      opacity: 0.8
                    }}>
                      🌾
                    </span>
                    <div style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "#14532d",
                      color: "white",
                      padding: "4px 14px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      Premium
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "24px",
                    }}
                  >
                    <h3 style={{
                      margin: "0 0 8px 0",
                      color: "#14532d",
                      fontSize: "20px"
                    }}>
                      {seed.name}
                    </h3>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px"
                    }}>
                      <h2
                        style={{
                          color: "#14532d",
                          margin: 0,
                          fontSize: "28px",
                          fontWeight: "700"
                        }}
                      >
                        ₹{seed.price}
                      </h2>
                      <span style={{
                        color: "#6b7280",
                        fontSize: "14px"
                      }}>
                        per kg
                      </span>
                    </div>

                    <button
                      onClick={() => handlePayment(seed)}
                      style={{
                        width: "100%",
                        padding: "14px",
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
                        justifyContent: "center",
                        gap: "8px"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(20, 83, 45, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(20, 83, 45, 0.3)";
                      }}
                    >
                      🛒 Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoCard = ({ title, value, icon }) => (
  <div
    style={{
      background: "white",
      padding: "24px 20px",
      borderRadius: "14px",
      textAlign: "center",
      border: "1px solid #e8ece8",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
      e.currentTarget.style.borderColor = "#14532d";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
      e.currentTarget.style.borderColor = "#e8ece8";
    }}
  >
    <div style={{
      fontSize: "32px",
      marginBottom: "8px"
    }}>
      {icon}
    </div>
    <h3 style={{
      margin: "0 0 6px 0",
      color: "#6b7280",
      fontSize: "14px",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    }}>{title}</h3>
    <p style={{
      margin: 0,
      fontSize: "18px",
      fontWeight: "700",
      color: "#14532d"
    }}>{value}</p>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div
    style={{
      background: "white",
      padding: "28px 30px",
      borderRadius: "16px",
      marginTop: "25px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      border: "1px solid #e8ece8",
      transition: "all 0.3s ease"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "#bbf7d0";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "#e8ece8";
    }}
  >
    <h2 style={{
      margin: "0 0 18px 0",
      color: "#14532d",
      fontSize: "24px",
      fontWeight: "600"
    }}>{title}</h2>
    {children}
  </div>
);

export default CropDetails;