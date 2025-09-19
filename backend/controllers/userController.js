
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");

// -----------------------------
// REGISTER USER
// -----------------------------
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, mobile, city, state, pincode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobile,
      city,
      state,
      pincode,
    });

    if (user) {
      res.status(201).json({
        message: "User registered successfully. Please login.",
        firstName: user.firstName,
        email: user.email
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// LOGIN USER (SESSION)
// -----------------------------
exports.loginUserSession = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    req.session.userId = user._id;   // store user ID in session

    res.json({
      message: "Login successfully !",
      firstName: user.firstName,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// USER PROFILE (SESSION USER)
// -----------------------------
exports.getUserProfile = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });

    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    };

    const user = await User.findByIdAndUpdate(req.session.userId, updates, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: "Not authenticated" });

    await User.findByIdAndDelete(req.session.userId);
    req.session.destroy(() => { });
    res.json({ message: "Account deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// OTHER USER ROUTES (ADMIN)
// -----------------------------
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.userType = req.body.userType || user.userType;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        userType: updatedUser.userType
      });
    } else res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------
// ADMIN DASHBOARD & RECENT USERS
// -----------------------------
const checkAdminSession = (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ message: "Unauthorized - Admin login required" });
  }
  next();
};

exports.getDashboardStatus = [
  checkAdminSession,
  async (req, res) => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const totalUsers = await User.countDocuments();
      // const totalOrders = await Order.countDocuments();
      const newLeads = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

      let totalOrders = 0;
      let newOrders = 0;
      let revenue = 0;

      try {
        const Order = require("../models/Order");
        if (Order) {
          totalOrders = await Order.countDocuments();
          newOrders = await Order.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

          const revenueData = await Order.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
          ]);
          revenue = revenueData[0]?.totalRevenue || 0;
        }
      } catch (e) { }

      let totalLeads = 0;
      try {
        const Lead = require("../models/Leads");
        if (Lead) {
          totalLeads = await Lead.countDocuments();
        }
      } catch (e) { }

      res.json({
        totalUsers,
        newLeads,
        newOrders,
        revenue,
        totalLeads
      });
    } catch (err) {
      console.error("Error fetching dashboard status:", err);
      res.status(500).json({ message: "Server error fetching dashboard status" });
    }
  }
];

exports.getRecentUsers = [
  checkAdminSession,
  async (req, res) => {
    try {
      const users = await User.find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .select("firstName lastName email mobile createdAt");

      res.json(users);
    } catch (err) {
      console.error("Error fetching recent users:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
];

// Update Address
exports.updateAddress = async (req, res) => {
  const { street, apartment } = req.body;

  if (!street || !apartment) {
    return res.status(400).json({ message: "Street and Apartment are required" });
  }

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Initialize address if not present
  if (!user.address) user.address = {};

  user.address.street = street;
  user.address.apartment = apartment;

  await user.save();

  res.json({ message: "Address updated successfully", address: user.address });
};

// Add Payment Method
exports.addPaymentMethod = async (req, res) => {
  const { type, details } = req.body;
  if (!type || !details) return res.status(400).json({ message: "Type and details required" });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Prevent duplicate same method
  const exists = user.paymentMethods.find(m => m.type === type && JSON.stringify(m.details) === JSON.stringify(details));
  if (!exists) user.paymentMethods.push({ type, details });

  await user.save();
  res.json({ message: "Payment method saved", paymentMethods: user.paymentMethods });
};


// Place Order
exports.createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = products.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // Map frontend names to schema names
    const order = new Order({
      user: req.session.userId,
      products,
      address: shippingAddress,   // <-- Mongoose expects 'address'
      payment: paymentMethod,     // <-- Mongoose expects 'payment'
      total
    });

    const created = await order.save();
    res.status(201).json(created);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// -----------------------------
// Create Razorpay Order
// -----------------------------
exports.createRazorpayOrder = async (req, res) => {
  const { total } = req.body;

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: total * 100, // amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create payment order" });
  }
};

// -----------------------------
// Verify Razorpay Payment
// -----------------------------
exports.verifyRazorpayPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    // Payment success → update order
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = "paid";
    order.paymentDetails = { razorpay_order_id, razorpay_payment_id };
    await order.save();

    return res.json({ success: true, order });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};