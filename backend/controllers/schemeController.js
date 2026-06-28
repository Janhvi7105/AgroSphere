import Scheme from "../models/Scheme.js";

// ============================
// Create Scheme
// ============================

export const createScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);

    res.status(201).json({
      success: true,
      message: "Scheme Added Successfully",
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get All Schemes
// ============================

export const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      schemes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Update Scheme
// ============================

export const updateScheme = async (req, res) => {
  try {
    const scheme =
      await Scheme.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme Not Found",
      });
    }

    res.json({
      success: true,
      message: "Scheme Updated Successfully",
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Delete Scheme
// ============================

export const deleteScheme = async (req, res) => {
  try {
    const scheme =
      await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme Not Found",
      });
    }

    await Scheme.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Scheme Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};