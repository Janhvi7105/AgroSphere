import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createScheme,
  getSchemes,
  updateScheme,
  deleteScheme,
} from "../controllers/schemeController.js";

const router = express.Router();

// Create Scheme
router.post(
  "/",
  authMiddleware,
  createScheme
);

// Get All Schemes
router.get(
  "/",
  getSchemes
);

// Update Scheme
router.put(
  "/:id",
  authMiddleware,
  updateScheme
);

// Delete Scheme
router.delete(
  "/:id",
  authMiddleware,
  deleteScheme
);

export default router;