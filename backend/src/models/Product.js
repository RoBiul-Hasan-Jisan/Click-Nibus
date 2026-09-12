const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ["new", "hot", "sale", ""], default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
