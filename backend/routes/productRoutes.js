import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createProduct,
  getProducts,
  getMyProducts,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
const router = express.Router();

// Add Product
router.post(
  "/",
  authMiddleware,
  createProduct
);

// All Products (Only Approved)
router.get(
  "/",
  getProducts
);

// My Products
router.get(
  "/my-products",
  authMiddleware,
  getMyProducts
);

// Get Pending Products (Admin Only)
router.get(
  "/pending",
  authMiddleware,
  getPendingProducts
);

// Approve Product (Admin Only)
router.put(
  "/:id/approve",
  authMiddleware,
  approveProduct
);

// Reject Product (Admin Only)
router.put(
  "/:id/reject",
  authMiddleware,
  rejectProduct
);

// Update Product
router.put(
  "/:id",
  authMiddleware,
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);

export default router;