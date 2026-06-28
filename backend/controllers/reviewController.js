import Review from "../models/Review.js";
import Product from "../models/Product.js";

// ==========================================
// Add Review
// POST /api/reviews
// ==========================================
export const addReview = async (req, res) => {
  try {
    const {
      productId,
      rating,
      comment,
    } = req.body;

    // Check Product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      productId,
      userId: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product.",
      });
    }

    const review = await Review.create({
      productId,
      userId: req.user.id,
      rating,
      comment,
    });

    // Calculate average rating
    const reviews = await Review.find({
      productId,
    });

    const totalRating = reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    product.averageRating =
      totalRating / reviews.length;

    product.numberOfReviews =
      reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Product Reviews
// GET /api/reviews/:productId
// ==========================================
export const getProductReviews = async (
  req,
  res
) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    })
      .populate("userId", "name")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};