const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };

const HelpSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    amount: { type: Number, required: true},
    address: { type: Object, required: true },
    phone: {type: Number },
    email: {type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true },
  opts
);

module.exports = mongoose.model("Help", HelpSchema);
