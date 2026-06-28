import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ======================================
// Create Order
// POST /api/orders
// ======================================
export const createOrder = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      deliveryAddress,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Product is not approved",
      });
    }

    // Check if sufficient stock is available
    if (quantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Stock",
      });
    }

    const totalAmount = product.price * quantity;

    const order = await Order.create({
      userId: req.user.id,
      sellerId: product.farmerId,
      productId: product._id,
      productName: product.name,
      quantity,
      price: product.price,
      totalAmount,
      deliveryAddress,
      paymentId: "COD",
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    // Reduce stock after order is created
    product.quantity -= quantity;
    await product.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Buyer Orders
// ======================================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    })
      .populate("productId")
      .populate("sellerId", "name email");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Seller Orders
// ======================================
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      sellerId: req.user.id,
    })
      .populate("productId", "name image")
      .populate("userId", "name email");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Order Status
// ======================================
export const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.sellerId.toString() !==
      req.user.id
    ) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};