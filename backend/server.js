import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js";

// NEW
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

// Product Reviews
import reviewRoutes from "./routes/reviewRoutes.js";
import adminReviewRoutes from "./routes/adminReviewRoutes.js";

// Connect Database
connectDB();

const app = express();

// =========================
// Middleware
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://agro-sphere-egok.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// API Routes
// =========================
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/crops", cropRoutes);

app.use("/api/schemes", schemeRoutes);

// =========================
// NEW ROUTES
// =========================

// Razorpay Payment
app.use(
  "/api/payment",
  paymentRoutes
);

// Orders / Purchase History
app.use(
  "/api/orders",
  orderRoutes
);

// Admin Orders
app.use(
  "/api/admin/orders",
  adminOrderRoutes
);

// AI Assistant
app.use(
  "/api/ai",
  aiRoutes
);

// Product Reviews
app.use(
  "/api/reviews",
  reviewRoutes
);

// Admin Reviews
app.use(
  "/api/admin/reviews",
  adminReviewRoutes
);

// =========================
// Test Route
// =========================
app.get("/", (req, res) => {
  res.send("🌾 AgroSphere API Running");
});

// =========================
// 404 Route
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =========================
// Server Start
// =========================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server Running on Port ${PORT}`
  );
});