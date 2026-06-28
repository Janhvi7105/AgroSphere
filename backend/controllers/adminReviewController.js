import Review from "../models/Review.js";

// ======================================
// Get All Reviews (Admin)
// GET /api/admin/reviews
// ======================================
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("productId", "name")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

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

// ======================================
// Delete Review (Admin)
// DELETE /api/admin/reviews/:id
// ======================================
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};