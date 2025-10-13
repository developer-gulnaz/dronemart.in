const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      refType: { type: String, enum: ["Product", "Accessory"], required: true }, // ✅ NEW
      title: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      quantity: { type: Number, required: true },
    },
  ],

  total: { type: Number, required: true },

  paymentMethod: { type: String, enum: ["COD", "PayU"], required: true },

  status: {
    type: String,
    enum: ["pending","confirmed", "processing", "shipped", "delivered", "cancelled", "payment-failed", "initiated"],
    default: "initiated",
  },

  paymentStatus: { type: String, enum: ["initiated", "cod-pending", "pending", "completed", "not paid(cancelled)", "paid"] },

  paymentRef: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }

}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema, "orders");
