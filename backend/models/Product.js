const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  rating: Number,
  reviews: { type: Number, default: 0 },
  image: String,
  badge: String,
  stock: { type: Number, default: 0 },
  description: String,
  featured: { type: Boolean, default: false },
  specs: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
