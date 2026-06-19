import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Store token
      localStorage.setItem(
        "token",
        data.token
      );

      // Store role
      localStorage.setItem(
        "role",
        data.role
      );

      // Store user info
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(data.message);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/farmer-dashboard");
      }
    } catch (error) {
      console.log("ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "400px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0b3d0b",
            marginBottom: "30px",
          }}
        >
          🌾 Login
        </h1>

        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#0b3d0b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;