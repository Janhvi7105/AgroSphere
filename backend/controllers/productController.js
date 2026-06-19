import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
      farmerId: req.user.id,
    });

    res.status(201).json({
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Products
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      farmerId: req.user.id,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.farmerId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.farmerId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
