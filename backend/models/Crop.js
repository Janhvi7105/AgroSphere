import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    image: String,

    season: String,
    climate: String,
    rainfall: String,
    soil: String,
    duration: String,
    irrigation: String,

    fertilizers: [String],
    growthStages: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Crop", cropSchema);