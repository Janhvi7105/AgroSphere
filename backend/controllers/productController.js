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
      status: "pending",
    });

    res.status(201).json({
      message: "Product submitted for approval.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Products (Search + Filter + Sort)
export const getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let query = {
      status: "approved",
    };

    // Search by Product Name
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category Filter
    if (
      category &&
      category !== "All"
    ) {
      query.category = category;
    }

    let products = Product.find(query);

    // Price Sorting
    if (sort === "low") {
      products = products.sort({
        price: 1,
      });
    }

    if (sort === "high") {
      products = products.sort({
        price: -1,
      });
    }

    const result =
      await products.exec();

    res.status(200).json(result);
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

// Get Pending Products (Admin Only)
export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "pending",
    }).populate("farmerId", "name email");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve Product (Admin Only)
export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.status = "approved";
    await product.save();

    res.json({
      message: "Product approved successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Reject Product (Admin Only)
export const rejectProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.status = "rejected";
    await product.save();

    res.json({
      message: "Product rejected successfully",
      product,
    });
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