const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };

const DonorSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    amount: { type: Number, required: true},
    address: { type: Object, required: true },
    phone: {type: Number },
    email: {type: String, required: true },
    gender: {type: String },
    status: { type: String, default: "Done" },
  },
  { timestamps: true },
  opts
);

module.exports = mongoose.model("Donor", DonorSchema);
