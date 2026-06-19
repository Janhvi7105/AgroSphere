import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");
  };

  const btnStyle = {
    background: "white",
    color: "#0b3d0b",
    border: "none",
    padding: "10px 18px",
    marginRight: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        background: "#0b3d0b",
        color: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ margin: 0 }}>
        🌾 AgroSphere Admin
      </h2>

      <div>
        <button
          style={btnStyle}
          onClick={() =>
            navigate("/admin-dashboard")
          }
        >
          Dashboard
        </button>

        <button
          style={btnStyle}
          onClick={() =>
            navigate("/admin-users")
          }
        >
          Users
        </button>

        <button
          style={btnStyle}
          onClick={() =>
            navigate("/admin-products")
          }
        >
          Products
        </button>

        <button
          style={btnStyle}
          onClick={() =>
            navigate("/admin-posts")
          }
        >
          Posts
        </button>

        <button
          onClick={logoutHandler}
          style={{
            background: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;