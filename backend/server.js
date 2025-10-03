const express = require("express");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// Connect MongoDB (main app DB)
connectDB();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Trust proxy if in production (needed for secure cookies behind proxies like Railway, Render, Heroku)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Session configuration (sessions stored in MongoDB)
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "dronemartDB", // force correct DB
      collectionName: "sessions", // default is "sessions"
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // only true in production
      // secure: false
    },
  })
);

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/payments", require("./routes/payments"));

// Paths for static files
const publicPath = path.resolve(__dirname, "../public");
const adminPath = path.resolve(__dirname, "../admin");

console.log("__dirname:", __dirname);
console.log("publicPath:", publicPath);
console.log("adminPath:", adminPath);


// Serve static files
app.use("/", express.static(publicPath));
app.use("/admin", express.static(adminPath));

// SPA fallback for React/Vue/Angular apps
app.get(/^\/(?!api).*/, (req, res) => {
  if (req.originalUrl.startsWith("/admin")) {
    res.sendFile(path.join(adminPath, "index.html"));
  } else {
    res.sendFile(path.join(publicPath, "index.html"));
  }
});

// Debug session route (optional, remove in production)
app.get("/api/debug-session", (req, res) => {
  res.json({ session: req.session });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});


// Use Railway port or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});



// Server listen
// const PORT = 5000;
// app.listen(PORT, "0.0.0.0", () =>
//   console.log(`✅ Server running on port ${PORT}`)
// );