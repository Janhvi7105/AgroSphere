import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const apiKey =
        process.env.REACT_APP_WEATHER_API_KEY;

      console.log("API KEY:", apiKey);

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(data);
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
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>🌦 Weather Updates</h1>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
        style={{
          padding: "10px",
          width: "70%",
        }}
      />

      <button
        onClick={getWeather}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          background: "#0b3d0b",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {weather && (
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>{weather.name}</h2>

          <p>
            🌡 Temperature:{" "}
            {weather.main.temp}°C
          </p>

          <p>
            ☁ Condition:{" "}
            {weather.weather[0].main}
          </p>

          <p>
            💧 Humidity:{" "}
            {weather.main.humidity}%
          </p>

          <p>
            🌬 Wind Speed:{" "}
            {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;