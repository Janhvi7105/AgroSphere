import express from "express";

import {
  addReview,
  getProductReviews,
} from "../controllers/reviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Review
router.post(
  "/",
  authMiddleware,
  addReview
);

// Get Reviews
router.get(
  "/:productId",
  getProductReviews
);

export default router;