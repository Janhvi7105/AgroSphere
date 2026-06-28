import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        style={{
          height: "100vh",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.55)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "65px",
              marginBottom: "20px",
            }}
          >
            Welcome to AgroSphere
          </h1>

          <p
            style={{
              fontSize: "24px",
              maxWidth: "900px",
              lineHeight: "1.8",
            }}
          >
            Smart Agriculture Platform For Farmers.
            Crop Guidance, Expert Support,
            Marketplace, Government Schemes and
            Community in One Place.
          </p>

          <div style={{ marginTop: "30px" }}>
            <button
              style={{
                background: "#4CAF50",
                color: "white",
                border: "none",
                padding: "15px 35px",
                borderRadius: "8px",
                fontSize: "18px",
                cursor: "pointer",
                marginRight: "15px",
              }}
            >
              Explore AgroSphere
            </button>

            <button
              style={{
                background: "white",
                color: "#333",
                border: "none",
                padding: "15px 35px",
                borderRadius: "8px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        style={{
          padding: "80px 60px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            color: "#0b5d1e",
          }}
        >
          About AgroSphere
        </h2>

        <p
          style={{
            maxWidth: "1000px",
            margin: "25px auto",
            fontSize: "20px",
            lineHeight: "1.8",
          }}
        >
          AgroSphere is a smart digital platform
          designed to empower farmers through
          technology. Farmers can access crop
          guidance, expert advice, weather
          forecasts, government schemes and buy
          quality agricultural products.
        </p>
      </section>

      {/* CROP GUIDE */}
      <section
        id="crop-guide"
        style={{
          padding: "80px 60px",
          textAlign: "center",
          background: "#f7f7f7",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            color: "#0b5d1e",
          }}
        >
          Crop Guide
        </h2>

        <p
          style={{
            maxWidth: "900px",
            margin: "20px auto",
            fontSize: "20px",
            lineHeight: "1.8",
          }}
        >
          Learn about field crops, vegetables,
          fruits and flowers. Get information
          about climate, soil, fertilizers,
          diseases and recommended seeds.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <ServiceCard
            icon="🌾"
            title="Field Crops"
            desc="Rice, Wheat, Maize and more."
          />

          <ServiceCard
            icon="🥕"
            title="Vegetables"
            desc="Tomato, Potato, Onion and more."
          />

          <ServiceCard
            icon="🍎"
            title="Fruits"
            desc="Mango, Banana, Guava and more."
          />

          <ServiceCard
            icon="🌺"
            title="Flowers"
            desc="Rose, Marigold, Jasmine and more."
          />
        </div>
      </section>

      {/* SERVICES */}
      <section
        style={{
          background: "#f7f7f7",
          padding: "80px 60px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "50px",
          }}
        >
          Our Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px",
          }}
        >
          <ServiceCard
            icon="🌱"
            title="Crop Guide"
            desc="Detailed crop information and disease management."
          />

          <ServiceCard
            icon="👨‍🌾"
            title="Agriculturist Support"
            desc="Get guidance from agriculture experts."
          />

          <ServiceCard
            icon="🛒"
            title="Marketplace"
            desc="Buy and sell agricultural products."
          />

          <ServiceCard
            icon="☁️"
            title="Weather Forecast"
            desc="Real-time weather updates."
          />

          <ServiceCard
            icon="📢"
            title="Govt Schemes"
            desc="Latest agriculture schemes and benefits."
          />

          <ServiceCard
            icon="👥"
            title="Community"
            desc="Connect and share knowledge with farmers."
          />
        </div>
      </section>

      {/* AGRICULTURIST SUPPORT */}
      <section
        id="agriculturist"
        style={{
          padding: "80px 60px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            color: "#0b5d1e",
          }}
        >
          Agriculturist Support
        </h2>

        <p
          style={{
            fontSize: "20px",
            maxWidth: "900px",
            margin: "20px auto",
          }}
        >
          Farmers can ask questions regarding
          crop diseases, fertilizers, irrigation
          methods and pest management directly
          from agriculture experts.
        </p>

        <button
          style={{
            background: "#0b5d1e",
            color: "white",
            border: "none",
            padding: "15px 35px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Ask Expert
        </button>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          background: "#0b5d1e",
          color: "white",
          padding: "80px 60px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
          }}
        >
          Contact Us
        </h2>

        <p>Email: support@agrosphere.com</p>
        <p>Phone: +91 9876543210</p>
        <p>Location: Maharashtra, India</p>
      </section>

      <Footer />
    </>
  );
};

const ServiceCard = ({
  icon,
  title,
  desc,
}) => {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1>{icon}</h1>

      <h3>{title}</h3>

      <p>{desc}</p>
    </div>
  );
};

export default Home;