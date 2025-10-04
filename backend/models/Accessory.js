const mongoose = require('mongoose');

const inTheBoxSchema = new mongoose.Schema({
  title: { type: String, required: true },      // e.g., "DJI Mavic 3 Pro"
  quantity: { type: Number, default: 1 },       // e.g., 1, 2, 3
  image: { type: String }                       // optional image URL
}, { _id: false }); // no separate _id for sub-docs

const AccessorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, index: true }, // SEO-friendly URL
  category: { type: String, index: true },
  brand: { type: String }, // optional, for brand filter
  price: { type: Number, required: true },
  salePrice: { type: Number }, // optional for discounts

  productCategory: { type: String, index: true },

  stock: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },

  image: { type: String, required: true }, // main image
  thumbnails: [{ type: String }], // array of extra images

  description: { type: String },
  shortDescription: { type: String }, // for category cards

  specs: { type: mongoose.Schema.Types.Mixed }, // product specs JSON (flexible)

  // 🔹 In the Box section
  inTheBox: [inTheBoxSchema],

  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },

  metaTitle: { type: String },   // SEO fields
  metaDescription: { type: String },
  keywords: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to keep updatedAt fresh
AccessorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Accessory', AccessorySchema);
