import Post from "../models/Post.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;

    const post = await Post.create({
      farmerId: req.user.id,
      content,
      imageUrl,
    });

    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("farmerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};