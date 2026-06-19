import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPost,
  getPosts,
} from "../controllers/postController.js";

const router = express.Router();

// Create Post
router.post(
  "/",
  authMiddleware,
  createPost
);

// Get All Posts
router.get(
  "/",
  getPosts
);

export default router;