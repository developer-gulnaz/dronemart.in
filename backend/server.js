const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Serve frontend
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// SPA fallback
app.get('/', (req, res) => {
  if (req.originalUrl.startsWith('/admin')) {
    res.sendFile(path.join(__dirname, '../admin/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
