import Crop from "../models/Crop.js";

// =====================================
// Get All Crops
// GET /api/crops
// =====================================
export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      crops,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch crops",
    });
  }
};

// =====================================
// Get Crop By Name
// GET /api/crops/:name
// =====================================
export const getCropByName = async (req, res) => {
  try {
    const crop = await Crop.findOne({
      name: {
        $regex: req.params.name,
        $options: "i",
      },
    });

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
      crop,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch crop",
    });
  }
};

// =====================================
// Get Crops By Category
// GET /api/crops/category/:category
// =====================================
export const getCropsByCategory = async (req, res) => {
  try {
    const crops = await Crop.find({
      category: req.params.category,
    });

    res.status(200).json({
      success: true,
      crops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Create Crop
// POST /api/crops
// =====================================
export const createCrop = async (req, res) => {
  try {
    const {
      name,
      category,
      image,
      description,
      season,
      climate,
      rainfall,
      soil,
      duration,
      irrigation,
      seedPrice,
      videoUrl,
      varieties,
      growthStages,
      fertilizers,
      diseases,
      treatment,
    } = req.body;

    const cropExists = await Crop.findOne({
      name,
    });

    if (cropExists) {
      return res.status(400).json({
        success: false,
        message: "Crop already exists",
      });
    }

    const crop = await Crop.create({
      name,
      category,
      image,
      description,
      season,
      climate,
      rainfall,
      soil,
      duration,
      irrigation,
      seedPrice,
      videoUrl,
      varieties,
      growthStages,
      fertilizers,
      diseases,
      treatment,
    });

    res.status(201).json({
      success: true,
      message: "Crop created successfully",
      crop,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create crop",
    });
  }
};

// =====================================
// Update Crop
// PUT /api/crops/:id
// =====================================
export const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      crop,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update crop",
    });
  }
};

// =====================================
// Delete Crop
// DELETE /api/crops/:id
// =====================================
export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(
      req.params.id
    );

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete crop",
    });
  }
};