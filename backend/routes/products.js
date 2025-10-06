const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/productController");
const Product = require("../models/Product.js"); 

// -----------------------------
// Middleware
// -----------------------------

const checkAdminSession = (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ message: "Unauthorized - Admin login required" });
  }
  next();
};


// =============================
// Multer setup for images
// =============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  }
});

const upload = multer({ storage });

// =============================
// Routes
// =============================

// Add product
router.post(
  "/",
  checkAdminSession,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "thumbnails", maxCount: 8 },
    { name: "boxImages", maxCount: 12 }
  ]),
  productController.addProduct
);

// Update product
router.put(
  "/:id",
  checkAdminSession,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "thumbnails", maxCount: 8 },
    { name: "boxImages", maxCount: 12 }
  ]),
  productController.updateProduct
);

// Delete product
router.delete("/:id", checkAdminSession, productController.deleteProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get Product by Id
router.get('/slug/:slug', productController.getProductbySlug);

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("title price image stock");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      stock: product.stock,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error while fetching product" });
  }
});

module.exports = router;
