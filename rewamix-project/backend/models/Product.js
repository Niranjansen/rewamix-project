const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, default: "General" },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
