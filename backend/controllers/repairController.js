const Repair = require("../models/Repairs");
const path = require("path");
const fs = require("fs");

// --------------------------------------------------
// 📩 Create a new repair (public form)
// --------------------------------------------------
exports.createRepair = async (req, res) => {
  try {
    const { name, email, phone, city, state, brand, modelName, description } = req.body;

    if (!name || !email || !phone || !brand || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Map uploaded files
    const attachments = (req.files || []).map((file) => ({
      url: `/assets/img/repairs/${file.filename}`,
      type: file.mimetype.startsWith("video") ? "video" : "image",
      name: file.originalname,
    }));

    const repair = await Repair.create({
      name,
      email,
      phone,
      city,
      state,
      brand,
      modelName,
      description,
      attachments,
      status: "new",
    });

    res.status(201).json({ message: "Repair request submitted", repair });
  } catch (err) {
    console.error("Error creating repair:", err);
    res.status(500).json({ message: "Server error while creating repair" });
  }
};

// --------------------------------------------------
// 📋 Get all repairs (admin)
// --------------------------------------------------
exports.getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.find().sort({ createdAt: -1 });
    res.json(repairs);
  } catch (err) {
    console.error("Error fetching repairs:", err);
    res.status(500).json({ message: "Server error while fetching repairs" });
  }
};

// --------------------------------------------------
// 🔍 Get single repair (admin)
// --------------------------------------------------
exports.getRepairById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);
    if (!repair) return res.status(404).json({ message: "Repair not found" });
    res.json(repair);
  } catch (err) {
    console.error("Error fetching repair:", err);
    res.status(500).json({ message: "Server error while fetching repair" });
  }
};

// --------------------------------------------------
// 🔁 Update status or admin notes (admin)
// --------------------------------------------------
exports.updateRepairStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const validStatuses = ["new", "connected", "in-progress", "resolved"];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const repair = await Repair.findById(req.params.id);
    if (!repair) return res.status(404).json({ message: "Repair not found" });

    if (status) repair.status = status;
    if (adminNotes) repair.adminNotes = adminNotes;

    await repair.save();
    res.json({ message: "Repair updated successfully", repair });
  } catch (err) {
    console.error("Error updating repair:", err);
    res.status(500).json({ message: "Server error while updating repair" });
  }
};

// --------------------------------------------------
// ❌ Delete repair (admin)
// --------------------------------------------------
exports.deleteRepair = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);
    if (!repair) return res.status(404).json({ message: "Repair not found" });

    // Delete uploaded files
    (repair.attachments || []).forEach((file) => {
      const filePath = path.resolve("uploads/repairs", path.basename(file.url));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await repair.deleteOne();
    res.json({ message: "Repair deleted successfully" });
  } catch (err) {
    console.error("Error deleting repair:", err);
    res.status(500).json({ message: "Server error while deleting repair" });
  }
};
