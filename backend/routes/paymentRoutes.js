import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const router = express.Router();

// Debug Environment Variables
console.log(
  "RAZORPAY_KEY_ID =",
  process.env.RAZORPAY_KEY_ID
);

console.log(
  "RAZORPAY_SECRET =",
  process.env.RAZORPAY_SECRET
    ? "Loaded ✅"
    : "Missing ❌"
);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Order
router.post("/create-order", async (req, res) => {
  try {
    console.log(
      "Payment Request Body:",
      req.body
    );

    const amount = Number(req.body.amount);

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt:
        "receipt_" + Date.now(),
    };

    console.log(
      "Creating Razorpay Order:",
      options
    );

    const order =
      await razorpay.orders.create(
        options
      );

    console.log(
      "Order Created Successfully:",
      order
    );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(
      "========================"
    );
    console.log("RAZORPAY ERROR");
    console.log(error);
    console.log(
      "========================"
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Verify Payment
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET
      )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;