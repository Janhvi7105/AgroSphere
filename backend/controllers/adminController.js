import User from "../models/User.js";
import Product from "../models/Product.js";
import Post from "../models/Post.js";

// ======================
// Get All Users
// ======================
export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find().select(
      "-password"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Get All Products
// ======================
export const getAllProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Get All Posts
// ======================
export const getAllPosts = async (
  req,
  res
) => {
  try {
    const posts = await Post.find()
      .populate(
        "farmerId",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Delete User
// ======================
export const deleteUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Delete Product
// ======================
export const deleteProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res
          .status(404)
          .json({
            message:
              "Product not found",
          });
      }

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Product Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ======================
// Delete Post
// ======================
export const deletePost =
  async (req, res) => {
    try {
      const post =
        await Post.findById(
          req.params.id
        );

      if (!post) {
        return res
          .status(404)
          .json({
            message:
              "Post not found",
          });
      }

      await Post.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Post Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };