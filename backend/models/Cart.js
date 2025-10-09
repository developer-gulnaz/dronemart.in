const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        refType: { type: String, enum: ["Product", "Accessory"], required: true }, // ✅ Added
        product: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "items.refType", // ✅ Dynamic reference
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
