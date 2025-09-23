const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/db');

connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// ✅ CORS must come before session
app.use(cors({
  origin: "http://localhost:5000", // adjust if frontend served differently
  credentials: true
}));

app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "secret123",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: "lax",
    secure: false // true if https
  }
}));


// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use("/api/payments", require("./routes/payments"));


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

app.get("/api/debug-session", (req, res) => {
  res.json({ session: req.session });
});

// const PORT = 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
