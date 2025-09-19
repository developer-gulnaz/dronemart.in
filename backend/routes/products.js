const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc    List products (optional search / category)
// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (category) filter.category = new RegExp(category, 'i');
    if (q) filter.title = new RegExp(q, 'i');

    const products = await Product.find(filter).limit(100).lean();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @desc    Get single product by ID
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Optionally: fetch related products (same category, exclude self)
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
      // .limit(4)
      .lean();

    res.json({ product, related });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
