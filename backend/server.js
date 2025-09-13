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

// Define absolute paths
const publicPath = path.resolve(__dirname, '../public');
const adminPath = path.resolve(__dirname, '../admin');

console.log("Public path:", path.join(publicPath, 'index.html'));
console.log("Admin path:", path.join(adminPath, 'index.html'));

// Serve static
app.use('/', express.static(publicPath));
app.use('/admin', express.static(adminPath));

// SPA fallback
app.get(/^\/(?!api).*/, (req, res) => {
  if (req.originalUrl.startsWith('/admin')) {
    res.sendFile(path.join(adminPath, 'index.html'));
  } else {
    res.sendFile(path.join(publicPath, 'index.html'));
  }
});

const PORT = process.env.PORT || 5000;
//  const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
