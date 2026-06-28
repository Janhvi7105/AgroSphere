import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Thank you for reaching out! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3c1f 0%, #2e7d32 50%, #388e3c 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              padding: "8px 24px",
              borderRadius: "50px",
              marginBottom: "20px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
              📬 Get in Touch
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: "800",
              marginBottom: "20px",
              letterSpacing: "-1px",
              textShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            Let's <span style={{ color: "#a5d6a7" }}>Connect</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8",
              opacity: "0.95",
            }}
          >
            Have questions, feedback, or need assistance? We'd love to hear from you.
            Reach out to us through any of the channels below.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: "80px 20px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8faf8 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
            }}
          >
            {/* Contact Form */}
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid #e8f0e8",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                  color: "#1a3c1f",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                📝 Send a Message
              </h2>
              <p
                style={{
                  color: "#4a5568",
                  marginBottom: "25px",
                  fontSize: "clamp(0.95rem, 1.1vw, 1rem)",
                }}
              >
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "14px",
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "10px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      backgroundColor: "#f9fafb",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2e7d32";
                      e.currentTarget.style.backgroundColor = "#fff";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "14px",
                    }}
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "10px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      backgroundColor: "#f9fafb",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2e7d32";
                      e.currentTarget.style.backgroundColor = "#fff";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "14px",
                    }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "10px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      backgroundColor: "#f9fafb",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2e7d32";
                      e.currentTarget.style.backgroundColor = "#fff";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "25px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "14px",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    rows="4"
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "10px",
                      border: "2px solid #e5e7eb",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      backgroundColor: "#f9fafb",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2e7d32";
                      e.currentTarget.style.backgroundColor = "#fff";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "linear-gradient(135deg, #2e7d32, #388e3c)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "18px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(46, 125, 50, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(46, 125, 50, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(46, 125, 50, 0.3)";
                  }}
                >
                  🚀 Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div
                style={{
                  background: "white",
                  padding: "35px",
                  borderRadius: "20px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  border: "1px solid #e8f0e8",
                  marginBottom: "25px",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.3rem, 2vw, 1.5rem)",
                    color: "#1a3c1f",
                    marginBottom: "20px",
                    fontWeight: "700",
                  }}
                >
                  📞 Get in Touch
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#e8f5e9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    📧
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Email</div>
                    <div style={{ fontSize: "16px", color: "#1a3c1f", fontWeight: "600" }}>
                      support@agrosphere.com
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#fff3e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Phone</div>
                    <div style={{ fontSize: "16px", color: "#1a3c1f", fontWeight: "600" }}>
                      +91 9876543210
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#e3f2fd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    📍
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Location</div>
                    <div style={{ fontSize: "16px", color: "#1a3c1f", fontWeight: "600" }}>
                      Maharashtra, India
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px 0",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#f3e5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    🕒
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500" }}>Working Hours</div>
                    <div style={{ fontSize: "16px", color: "#1a3c1f", fontWeight: "600" }}>
                      Mon - Sat (9 AM - 6 PM)
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div
                style={{
                  background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
                  padding: "30px",
                  borderRadius: "20px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>🌱</div>
                <h4
                  style={{
                    fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
                    color: "#1a3c1f",
                    marginBottom: "8px",
                    fontWeight: "700",
                  }}
                >
                  Need Immediate Help?
                </h4>
                <p style={{ color: "#2e7d32", marginBottom: "15px", fontSize: "14px" }}>
                  Our support team is ready to assist you.
                </p>
                <button
                  onClick={() => navigate("/faq")}
                  style={{
                    background: "#2e7d32",
                    color: "white",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1a3c1f";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#2e7d32";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Visit FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;