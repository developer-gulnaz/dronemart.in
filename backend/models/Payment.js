const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  method: { type: String, enum: ["COD", "PayU"], required: true },
  status: {
    type: String,
    enum: ["initiated", "pending", "paid", "failed", "cod-pending"],
    default: "pending"
  },
  amount: { type: Number, required: true },

  // PayU-specific
  txnid: String,
  mihpayid: String,
  productinfo: String,
  mode: String,
  bank_ref_num: String,
  rawResponse: Object
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema, "payments");
