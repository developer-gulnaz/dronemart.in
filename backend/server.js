const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.set('trust proxy', 1);
}

// Session configuration
app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "secret123",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: "lax",
    // secure: false
    secure: process.env.NODE_ENV === "production" // true in production
  }
}));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/payments', require('./routes/payments'));

// Define absolute paths
const publicPath = path.resolve(__dirname, '../public');
const adminPath = path.resolve(__dirname, '../admin');

// Serve static files
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

// Debug session (optional)
app.get("/api/debug-session", (req, res) => {
  res.json({ session: req.session });
});

// Use Railway port or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const PORT = 5000;
// app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
