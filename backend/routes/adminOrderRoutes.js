import express from "express";

import {
  getOrderStats,
  getAllOrders,
} from "../controllers/adminOrderController.js";

const router = express.Router();

// Dashboard Statistics
// GET /api/admin/orders/stats
router.get("/stats", getOrderStats);

// All Orders
// GET /api/admin/orders
router.get("/", getAllOrders);

export default router;