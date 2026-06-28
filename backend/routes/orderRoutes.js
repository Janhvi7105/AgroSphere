import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// =====================================
// Place Order
// POST /api/orders
// =====================================
router.post(
  "/",
  authMiddleware,
  createOrder
);

// =====================================
// Buyer Orders
// GET /api/orders/my-orders
// =====================================
router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

// =====================================
// Seller Orders
// GET /api/orders/seller-orders
// =====================================
router.get(
  "/seller-orders",
  authMiddleware,
  getSellerOrders
);

// =====================================
// Update Order Status
// PUT /api/orders/:id
// =====================================
router.put(
  "/:id",
  authMiddleware,
  updateOrderStatus
);

export default router;