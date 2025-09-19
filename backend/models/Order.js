const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ],
  address: { type: Object, required: true },  // Reuse User address snapshot
  payment: { type: Object, required: true },  // Type + details
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema, "orders");
