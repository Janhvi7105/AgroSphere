import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    season: {
      type: String,
      required: true,
    },

    climate: {
      type: String,
      required: true,
    },

    rainfall: {
      type: String,
      required: true,
    },

    soil: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    irrigation: {
      type: String,
      required: true,
    },

    seedPrice: {
      type: Number,
      required: true,
    },

    videoUrl: {
      type: String,
      default: "",
    },

    varieties: [
      {
        type: String,
      },
    ],

    growthStages: [
      {
        type: String,
      },
    ],

    fertilizers: [
      {
        type: String,
      },
    ],

    diseases: [
      {
        type: String,
      },
    ],

    treatment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Crop", cropSchema);