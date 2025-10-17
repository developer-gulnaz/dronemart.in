
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /users/contact
router.post('/', async (req, res) => {

    try {
        const { name, email, phone, City, subject, message } = req.body;

        // Create and save contact in one step
        const newContact = await Contact.create({
            name,
            email,
            phone,
            city: City,
            subject,
            message
        });

        res.status(200).json({ success: true, message: 'Form submitted successfully!', data: newContact });
    } catch (err) {
        console.error('Error saving contact form:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// GET /users/contacts → Fetch all inquiries
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, contacts });
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// PATCH /contact/:id/status → Update status & remarks
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const contact = await Contact.findById(id);
        if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });

        contact.status = status || contact.status;
        contact.notes = notes || contact.notes;

        await contact.save();
        res.status(200).json({ success: true, message: 'Status updated successfully', contact });
    } catch (err) {
        console.error('Error updating contact status:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;