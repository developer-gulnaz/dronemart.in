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
        return res.status(401).json({ success: false, message: "Unauthorized - Admin login required" });
    }
    next();
};


// =============================
// Multer storage setup
// =============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "image":
      case "thumbnails":
        cb(null, "../public/assets/img/product");
        break;
      case "inTheBoxImage":
        cb(null, "../public/assets/img/product/in-the-box");
        break;
      default:
        cb(null, "../public/assets/img/product"); // safe fallback
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Accept fields
const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "thumbnails", maxCount: 10 },
  { name: "inTheBoxImage", maxCount: 20 },
  { name: "inTheBoxImage[]", maxCount: 30 },
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

    // Validate stock
    if (stock == null || isNaN(stock) || stock < 0) {
      return res.status(400).json({ success: false, message: 'Invalid stock value' });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.stock = Number(stock);
    product.inStock = Number(stock) > 0; // ✅ Align with add/update product logic

    await product.save();

    res.status(200).json({ success: true, message: 'Stock updated successfully', product });
  } catch (err) {
    console.error('Update stock error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



module.exports = router;
