import React, { useState } from "react";
import axios from "axios";
import FarmerNavbar from "../components/FarmerNavbar";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    try {
      setLoading(true);
      const apiKey =
        process.env.REACT_APP_WEATHER_API_KEY;

      console.log("API KEY:", apiKey);

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.log(
        "WEATHER ERROR:",
        error.response?.data
      );

      alert(
        JSON.stringify(
          error.response?.data ||
          error.message
        )
      );
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <FarmerNavbar />

      {/* Page Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              color: "#0b5d1e",
              marginBottom: "10px",
            }}
          >
            🌦 Weather Updates
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "25px",
              fontSize: "16px",
            }}
          >
            Get real-time weather information for your city
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Enter City Name (e.g., Mumbai)"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getWeather();
                }
              }}
              style={{
                flex: 1,
                padding: "14px 18px",
                borderRadius: "10px",
                border: "2px solid #d1d5db",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#0b5d1e";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
              }}
            />

            <button
              onClick={getWeather}
              disabled={loading}
              style={{
                padding: "14px 30px",
                background: loading ? "#6b7280" : "#0b5d1e",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "#14532d";
                  e.currentTarget.style.transform = "scale(1.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "#0b5d1e";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {loading ? "⏳ Loading..." : "🔍 Get Weather"}
            </button>
          </div>

          {weather && (
            <div
              style={{
                marginTop: "30px",
                background: "linear-gradient(135deg, #f0f9f0 0%, #e8f5e9 100%)",
                padding: "25px",
                borderRadius: "15px",
                border: "1px solid #c8e6c9",
                animation: "fadeIn 0.5s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "2px solid #c8e6c9",
                  paddingBottom: "15px",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    color: "#0b5d1e",
                  }}
                >
                  {weather.name}
                </h2>
                <span
                  style={{
                    fontSize: "48px",
                  }}
                >
                  {weather.weather[0].main === "Clear" && "☀️"}
                  {weather.weather[0].main === "Clouds" && "☁️"}
                  {weather.weather[0].main === "Rain" && "🌧️"}
                  {weather.weather[0].main === "Snow" && "❄️"}
                  {weather.weather[0].main === "Thunderstorm" && "⛈️"}
                  {weather.weather[0].main === "Drizzle" && "🌦️"}
                  {weather.weather[0].main === "Mist" && "🌫️"}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "5px" }}>🌡️</div>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>Temperature</div>
                  <div style={{ fontSize: "22px", fontWeight: "bold", color: "#0b5d1e" }}>
                    {weather.main.temp}°C
                  </div>
                </div>

                <div
                  style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "5px" }}>💧</div>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>Humidity</div>
                  <div style={{ fontSize: "22px", fontWeight: "bold", color: "#0b5d1e" }}>
                    {weather.main.humidity}%
                  </div>
                </div>

                <div
                  style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "5px" }}>🌬️</div>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>Wind Speed</div>
                  <div style={{ fontSize: "22px", fontWeight: "bold", color: "#0b5d1e" }}>
                    {weather.wind.speed} m/s
                  </div>
                </div>

                <div
                  style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "5px" }}>☁️</div>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>Condition</div>
                  <div style={{ fontSize: "22px", fontWeight: "bold", color: "#0b5d1e" }}>
                    {weather.weather[0].main}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!weather && !loading && (
            <div
              style={{
                marginTop: "30px",
                textAlign: "center",
                padding: "40px 20px",
                background: "#f9fafb",
                borderRadius: "12px",
                border: "2px dashed #d1d5db",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>🌤️</div>
              <p style={{ color: "#6b7280", fontSize: "16px" }}>
                Enter a city name above to get weather information
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Weather;