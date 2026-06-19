import Crop from "./models/Crop.js";
import connectDB from "./config/db.js";

connectDB();

await Crop.insertMany([
  {
    name: "Rice",
    category: "Field Crop",
    image:
      "https://images.unsplash.com/photo-1536657464919-892534f60d6e",

    season: "Kharif",

    climate: "20-35°C",

    rainfall: "1000-1500 mm",

    soil: "Clay Soil",

    duration: "120-150 Days",

    irrigation: "Standing Water",

    fertilizers: [
      "Urea",
      "DAP",
      "Potash",
    ],

    growthStages: [
      "Germination",
      "Seedling",
      "Tillering",
      "Flowering",
      "Harvesting",
    ],
  },

  {
    name: "Wheat",
    category: "Field Crop",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d",
  },
]);