const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const repairController = require("../controllers/repairController");

// --------------------------------------------------
// 🛡️ Admin middleware
// --------------------------------------------------
const checkAdminSession = (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ message: "Unauthorized - Admin login required" });
  }
  next();
};

const uploadsFolder = path.resolve(__dirname, "..", "..", "public", "assets", "img", "repairs");
if (!fs.existsSync(uploadsFolder)) fs.mkdirSync(uploadsFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsFolder),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = crypto.randomBytes(8).toString("hex") + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("attachments", 5), repairController.createRepair);

router.get("/", checkAdminSession, repairController.getAllRepairs);

router.get("/:id", checkAdminSession, repairController.getRepairById);

router.patch("/:id/status", checkAdminSession, repairController.updateRepairStatus);

router.delete("/:id", checkAdminSession, repairController.deleteRepair);

module.exports = router;
