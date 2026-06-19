import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cropRoutes from "./routes/cropRoutes.js"; // NEW

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/crops", cropRoutes); // NEW

// Test Route
app.get("/", (req, res) => {
  res.send("🌾 AgroSphere API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});