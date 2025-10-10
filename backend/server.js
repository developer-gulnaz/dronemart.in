const express = require("express");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ensure connectDB returns a promise (most do)
async function startServer() {
  // 1) Connect to Mongo (your connectDB should set up mongoose)
  await connectDB();

  // 2) Clear sessions only in production (so dev nodemon restarts don't log everyone out)
  if (process.env.NODE_ENV === "production") {
    try {
      const db = mongoose.connection.db;
      const colInfo = await db.listCollections({ name: "sessions" }).next();
      if (colInfo) {
        await db.collection("sessions").deleteMany({});
        console.log("✅ Cleared 'sessions' collection on production startup");
      } else {
        console.log("ℹ️ 'sessions' collection not found (nothing to clear)");
      }
    } catch (err) {
      console.error("❌ Error clearing sessions collection:", err);
    }
  } else {
    console.log("⚙️ Development mode: sessions are preserved between restarts (nodemon safe)");
  }


  // 3) Create session store with 1 hour TTL (seconds)
  const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "dronemartDB",
    collectionName: "sessions",
    ttl: 60 * 60 // 1 hour TTL in seconds
  });

  // 4) Apply express-session middleware
  app.set("trust proxy", process.env.NODE_ENV === "production" ? 1 : 0);
  app.use(
    session({
      name: "sessionId",
      secret: process.env.SESSION_SECRET || "secret123",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      rolling: false, // false => fixed expiry 1 hour after creation; set true for sliding expiry
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hour in ms
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" // set true only behind HTTPS
        // secure: false
      }
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
  app.use("/api/accessory", require("./routes/accessory"));

  const publicPath = path.resolve(__dirname, "../public");
  const adminPath = path.resolve(__dirname, "../admin");

  app.use("/", express.static(publicPath));
  app.use("/admin", express.static(adminPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    if (req.originalUrl.startsWith("/admin")) {
      res.sendFile(path.join(adminPath, "index.html"));
    } else {
      res.sendFile(path.join(publicPath, "index.html"));
    }
  });

  // Debugging helpers (remove in production)
  app.get("/api/debug-session", (req, res) => {
    res.json({ session: req.session });
  });
  app.get("/api/debug-session-count", async (req, res) => {
    try {
      const count = await mongoose.connection.db
        .collection("sessions")
        .countDocuments();
      const sample = await mongoose.connection.db
        .collection("sessions")
        .findOne({});
      res.json({ count, sample });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  const PORT = process.env.PORT || 5000;
  // const PORT  5000;

  app.listen(PORT, "0.0.0.0", () =>
    console.log(`✅ Server running on port ${PORT}`)
  );
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
