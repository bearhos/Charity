const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true},
    address: { type: String },
    img: { type: String },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    present: { type: Number },
    status: { type: String, default: "Done" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
