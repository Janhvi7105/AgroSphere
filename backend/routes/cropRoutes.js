import express from "express";

import {
  getAllCrops,
  getCropByName,
  getCropsByCategory,
  createCrop,
  updateCrop,
  deleteCrop,
} from "../controllers/cropController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =============================
// GET ALL CROPS
// =============================
router.get("/", getAllCrops);

// =============================
// GET CROPS BY CATEGORY
// Example:
// /api/crops/category/Vegetable
// =============================
router.get("/category/:category", getCropsByCategory);

// =============================
// GET CROP BY NAME
// Example:
// /api/crops/Rice
// =============================
router.get("/:name", getCropByName);

// =============================
// CREATE NEW CROP
// (Admin Only)
// =============================
router.post("/", authMiddleware, createCrop);

// =============================
// UPDATE CROP
// (Admin Only)
// =============================
router.put("/:id", authMiddleware, updateCrop);

// =============================
// DELETE CROP
// (Admin Only)
// =============================
router.delete("/:id", authMiddleware, deleteCrop);

export default router;