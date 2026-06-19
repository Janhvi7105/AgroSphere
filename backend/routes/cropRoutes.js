import express from "express";
import Crop from "../models/Crop.js";

const router = express.Router();

// Get all crops
router.get("/", async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
});

// Get crop by name
router.get("/:name", async (req, res) => {
  const crop = await Crop.findOne({
    name: req.params.name,
  });

  res.json(crop);
});

export default router;