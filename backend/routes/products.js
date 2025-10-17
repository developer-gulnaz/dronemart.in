const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/productController");
const Product = require("../models/Product.js");
const fs = require("fs");

// -----------------------------
// Middleware
// -----------------------------
const checkAdminSession = (req, res, next) => {
  if (!req.session.adminId) {
    return res.redirect('/admin');
  }
  next();
};

// =============================
// Multer storage setup
// =============================
// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image" || file.fieldname === "thumbnails") {
      cb(null, "../public/assets/img/product");
    } else if (file.fieldname === "inTheBoxImage") {
      cb(null, "../public/assets/img/product/in-the-box");
    } else if (file.fieldname === "thumbnails") {
      cb(null, "../public/assets/img/product"); // fallback
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Fields setup
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "thumbnails", maxCount: 10 },
  { name: "inTheBoxImage", maxCount: 20 }
]);

router.post("/", checkAdminSession, uploadFields, productController.addProduct);

router.patch('/:id', uploadFields, productController.updateProduct);


// Delete product
router.delete("/:id", checkAdminSession, productController.deleteProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get Product by Id
router.get('/slug/:slug', productController.getProductbySlug);

router.get("/:id", checkAdminSession, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error while fetching product" });
  }
});

router.patch('/:id/stock', checkAdminSession, async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock == null || isNaN(stock) || stock < 0) {
      return res.status(400).json({ success: false, message: 'Invalid stock value' });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.stock = stock;
    await product.save();

    res.status(200).json({ success: true, message: 'Stock updated successfully', product });
  } catch (err) {
    console.error('Update stock error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
