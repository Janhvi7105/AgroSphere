import express from "express";

import {
  getAllUsers,
  getAllProducts,
  getAllPosts,
  deleteUser,
  deleteProduct,
  deletePost,
} from "../controllers/adminController.js";

const router = express.Router();

// ======================
// Users
// ======================

router.get(
  "/users",
  getAllUsers
);

router.delete(
  "/users/:id",
  deleteUser
);

// ======================
// Products
// ======================

router.get(
  "/products",
  getAllProducts
);

router.delete(
  "/products/:id",
  deleteProduct
);

// ======================
// Posts
// ======================

router.get(
  "/posts",
  getAllPosts
);

router.delete(
  "/posts/:id",
  deletePost
);

export default router;