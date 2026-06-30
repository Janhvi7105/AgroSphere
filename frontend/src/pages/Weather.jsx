import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerNavbar from "../components/FarmerNavbar";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentCities, setRecentCities] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentCities");
    if (saved) {
      setRecentCities(JSON.parse(saved));
    }
  }, []);

  const saveRecentCity = (cityName) => {
    const updated = [cityName, ...recentCities.filter(c => c !== cityName)].slice(0, 5);
    setRecentCities(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

  const getWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      // Using axios directly for external API call
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(data);
      saveRecentCity(city);
      setLoading(false);
    } catch (error) {
      console.log("WEATHER ERROR:", error.response?.data);

      if (error.response?.data?.message === "city not found") {
        alert("❌ City not found. Please check the spelling and try again.");
      } else {
        alert("❌ Failed to fetch weather data. Please try again.");
      }
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    const icons = {
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Snow: "❄️",
      Thunderstorm: "⛈️",
      Drizzle: "🌦️",
      Mist: "🌫️",
      Fog: "🌫️",
      Haze: "🌫️",
      Smoke: "🌫️",
    };
    return icons[main] || "🌤️";
  };

  const getWeatherBackground = (main) => {
    const backgrounds = {
      Clear: "linear-gradient(135deg, #fdb813, #f7a81b)",
      Clouds: "linear-gradient(135deg, #b8c6db, #8fa2bf)",
      Rain: "linear-gradient(135deg, #2c3e50, #3498db)",
      Snow: "linear-gradient(135deg, #e8f0f8, #c8d8e8)",
      Thunderstorm: "linear-gradient(135deg, #1a1a2e, #16213e)",
      Drizzle: "linear-gradient(135deg, #667eea, #764ba2)",
      Mist: "linear-gradient(135deg, #d4d4d4, #b8b8b8)",
    };
    return backgrounds[main] || "linear-gradient(135deg, #4facfe, #00f2fe)";
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f0f5f0 0%, #f7f9fc 100%)",
        minHeight: "100vh",
      }}
    >
      <FarmerNavbar />

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
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            padding: "40px",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <div style={{ fontSize: "48px", marginBottom: "5px" }}>🌤️</div>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 38px)",
                color: "#1a3c1f",
                marginBottom: "5px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              Weather Updates
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "16px",
                marginBottom: "0",
              }}
            >
              Get real-time weather information for your city
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Enter City Name (e.g., Mumbai)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getWeather();
                }
              }}
              style={{
                flex: 1,
                padding: "14px 18px",
                borderRadius: "12px",
                border: "2px solid #e5e7eb",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s ease",
                backgroundColor: "#f9fafb",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#2e7d32";
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(46, 125, 50, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            <button
              onClick={getWeather}
              disabled={loading}
              style={{
                padding: "14px 30px",
                background: loading ? "#6b7280" : "linear-gradient(135deg, #2e7d32, #388e3c)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: loading ? "none" : "0 4px 15px rgba(46, 125, 50, 0.3)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(46, 125, 50, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(46, 125, 50, 0.3)";
                }
              }}
            >
              {loading ? "⏳ Loading..." : "🔍 Get Weather"}
            </button>
          </div>

          {/* Recent Cities */}
          {recentCities.length > 0 && !weather && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                Recent Searches:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {recentCities.map((cityName, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCity(cityName);
                      setTimeout(() => getWeather(), 100);
                    }}
                    style={{
                      background: "#f0f5f0",
                      border: "1px solid #e5e7eb",
                      padding: "6px 14px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontSize: "13px",
                      color: "#1a3c1f",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#2e7d32";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f0f5f0";
                      e.currentTarget.style.color = "#1a3c1f";
                    }}
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {weather && (
            <div
              style={{
                marginTop: "25px",
                background: getWeatherBackground(weather.weather[0].main),
                padding: "25px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.2)",
                animation: "fadeIn 0.5s ease",
                color: ["Rain", "Thunderstorm", "Drizzle"].includes(weather.weather[0].main) ? "white" : "#1a3c1f",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: ["Rain", "Thunderstorm", "Drizzle"].includes(weather.weather[0].main)
                    ? "2px solid rgba(255,255,255,0.2)"
                    : "2px solid rgba(0,0,0,0.1)",
                  paddingBottom: "15px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "clamp(24px, 3vw, 30px)",
                      fontWeight: "700",
                      color: ["Rain", "Thunderstorm", "Drizzle"].includes(weather.weather[0].main) ? "white" : "#1a3c1f",
                    }}
                  >
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p
                    style={{
                      margin: "5px 0 0",
                      fontSize: "14px",
                      opacity: 0.8,
                      color: ["Rain", "Thunderstorm", "Drizzle"].includes(weather.weather[0].main) ? "white" : "#1a3c1f",
                    }}
                  >
                    {new Date().toLocaleString()}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "56px",
                    lineHeight: "1",
                  }}
                >
                  {getWeatherIcon(weather.weather[0].main)}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "3px" }}>🌡️</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>Temperature</div>
                  <div style={{ fontSize: "24px", fontWeight: "700" }}>
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>
                    Feels like {Math.round(weather.main.feels_like)}°C
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "3px" }}>💧</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>Humidity</div>
                  <div style={{ fontSize: "24px", fontWeight: "700" }}>
                    {weather.main.humidity}%
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "3px" }}>🌬️</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>Wind Speed</div>
                  <div style={{ fontSize: "24px", fontWeight: "700" }}>
                    {Math.round(weather.wind.speed * 3.6)} km/h
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "3px" }}>☁️</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>Condition</div>
                  <div style={{ fontSize: "24px", fontWeight: "700" }}>
                    {weather.weather[0].main}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>
                    {weather.weather[0].description}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                  padding: "12px 15px",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "13px",
                }}
              >
                <span>🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</span>
                <span>🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</span>
                <span>📏 Pressure: {weather.main.pressure} hPa</span>
                <span>👁️ Visibility: {(weather.visibility / 1000).toFixed(1)} km</span>
              </div>
            </div>
          )}

          {!weather && !loading && (
            <div
              style={{
                marginTop: "25px",
                textAlign: "center",
                padding: "40px 20px",
                background: "linear-gradient(135deg, #f8faf8, #f0f5f0)",
                borderRadius: "16px",
                border: "2px dashed #c8e6c9",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>🌤️</div>
              <h3 style={{ color: "#1a3c1f", marginBottom: "5px", fontWeight: "600" }}>
                No Weather Data
              </h3>
              <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>
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