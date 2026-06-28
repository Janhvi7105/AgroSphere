import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    eligibility: {
      type: String,
      required: true,
    },

    benefits: {
      type: String,
      required: true,
    },

    deadline: {
      type: String,
      required: true,
    },

    officialLink: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Scheme",
  schemeSchema
);