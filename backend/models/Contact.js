const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    city: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'New' },
    notes: { type: String, default: '' }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;