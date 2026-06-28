import express from "express";

import {
  getAllReviews,
  deleteReview,
} from "../controllers/adminReviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get All Reviews
router.get(
  "/",
  authMiddleware,
  getAllReviews
);

// Delete Review
router.delete(
  "/:id",
  authMiddleware,
  deleteReview
);

export default router;