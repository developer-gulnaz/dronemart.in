// models/Repair.js
const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    filename: String,         // saved filename on server
    originalname: String,     // original file name
    mimetype: String,
    size: Number,             // bytes
    url: String               // publicly accessible URL (e.g. /uploads/repairs/...)
}, { _id: false });

const RepairSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    brand: { type: String, required: true },
    modelName: { type: String }, // model name/number
    description: { type: String, required: true },
    attachments: [AttachmentSchema],
    status: {
        type: String,
        enum: ['new', 'connected', 'in-progress', 'resolved'],
        default: 'new'
    },
    adminNotes: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repair', RepairSchema);
