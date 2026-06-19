import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <div>
        {/* Hero Section */}
        <section
          style={{
            height: "90vh",
            backgroundImage:
              'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
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
              paddingLeft: "80px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "60px",
                maxWidth: "700px",
              }}
            >
              Empowering Farmers Through Technology
            </h1>

            <p
              style={{
                fontSize: "22px",
                maxWidth: "700px",
                marginTop: "20px",
              }}
            >
              Buy & Sell Agricultural Products, Connect With
              Farmers, Access Weather Insights and Government
              Schemes.
            </p>

            <div style={{ marginTop: "30px" }}>
              <button
                style={{
                  padding: "15px 30px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "15px",
                  cursor: "pointer",
                }}
              >
                Get Started
              </button>

              <button
                style={{
                  padding: "15px 30px",
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Explore Marketplace
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          style={{
            padding: "80px 50px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              color: "#0b3d0b",
            }}
          >
            About AgroSphere
          </h2>

          <p
            style={{
              maxWidth: "900px",
              margin: "20px auto",
              fontSize: "20px",
              lineHeight: "1.8",
            }}
          >
            AgroSphere is a smart farmer marketplace and
            community platform that helps farmers sell their
            products, connect with agricultural experts,
            access weather updates, and stay informed about
            government schemes.
          </p>
        </section>

        {/* Services Section */}
        <section
          style={{
            padding: "80px 50px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "40px",
              marginBottom: "50px",
            }}
          >
            Our Services
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <h3>🛒 Marketplace</h3>
              <p>Buy and Sell Farm Products</p>
            </div>

            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <h3>👨‍🌾 Community</h3>
              <p>Connect with Farmers</p>
            </div>

            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <h3>🌦 Weather Updates</h3>
              <p>Real-Time Weather Forecast</p>
            </div>

            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <h3>📢 Government Schemes</h3>
              <p>Latest Agriculture Schemes</p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section
          style={{
            padding: "80px 50px",
            textAlign: "center",
          }}
        >
          <h2>AgroSphere Impact</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1>1000+</h1>
              <p>Farmers</p>
            </div>

            <div>
              <h1>500+</h1>
              <p>Products</p>
            </div>

            <div>
              <h1>100+</h1>
              <p>Communities</p>
            </div>

            <div>
              <h1>24/7</h1>
              <p>Support</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;