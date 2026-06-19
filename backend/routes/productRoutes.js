import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createProduct,
  getProducts,
  getMyProducts,
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

// All Products
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