import Order from "../models/Order.js";

// ===============================
// Dashboard Statistics
// GET /api/admin/orders/stats
// ===============================
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const revenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.json({
      totalOrders,
      revenue,
      pendingOrders,
      deliveredOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get All Orders
// GET /api/admin/orders
// ===============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("sellerId", "name email")
      .populate("productId", "name image");

    const formattedOrders = orders.map((order) => ({
      _id: order._id,

      productName:
        order.productName ||
        order.productId?.name ||
        "N/A",

      productImage:
        order.productId?.image || "",

      buyer:
        order.userId?.name || "Unknown",

      seller:
        order.sellerId?.name || "Unknown",

      quantity: order.quantity,

      totalAmount: order.totalAmount,

      paymentStatus:
        order.paymentStatus,

      orderStatus:
        order.orderStatus,

      createdAt:
        order.createdAt,
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};