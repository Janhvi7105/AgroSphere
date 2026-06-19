import React from "react";

const Profile = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>👨‍🌾 Farmer Profile</h1>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Janhvi</h2>

        <p>
          <b>Email:</b> janhvi@example.com
        </p>

        <p>
          <b>Products Added:</b> 0
        </p>

        <p>
          <b>Posts Created:</b> 0
        </p>

        <button
          style={{
            padding: "10px 20px",
            background: "#0b3d0b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;