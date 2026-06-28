import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Get Logged-in User Profile
router.get(
  "/profile",
  authMiddleware,
  getUserProfile
);

// Update Logged-in User Profile
router.put(
  "/profile",
  authMiddleware,
  updateUserProfile
);

export default router;