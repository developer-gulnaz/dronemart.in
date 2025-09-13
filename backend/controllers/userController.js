const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user (name, email, userType)
// @route   PUT /api/users/:id
// @access  Admin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.userType = req.body.userType || user.userType;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// -----------------------------
// Dashboard & recent users APIs
// -----------------------------

// @desc    Get dashboard stats
// @route   GET /api/users/dashboard/status
// @access  Admin
exports.getDashboardStatus = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Users
    const totalUsers = await User.countDocuments();
    // For frontend we expose this as newLeads (users created in last 7 days)
    const newLeads = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    // Orders & revenue — optional (require only if model exists)
    let totalOrders = 0;
    let newOrders = 0;
    let revenue = 0;

    try {
      // try to require Order model only if present
      // if file not found, this will be caught and we keep defaults
      // path: ../models/Order (adjust if your model filename differs)
      const Order = require('../models/Order');
      if (Order) {
        totalOrders = await Order.countDocuments();
        newOrders = await Order.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        // revenue aggregation - adapt field name if your order total field differs
        const revenueData = await Order.aggregate([
          { $match: { status: 'completed' } }, // safe default — change if not applicable
          { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
        ]);
        revenue = revenueData[0]?.totalRevenue || 0;
      }
    } catch (e) {
      // optional Order model missing — ignore and use defaults
      // console.warn('Order model not found, skipping order/revenue stats.');
    }

    // Leads (optional)
    let totalLeads = 0;
    try {
      const Lead = require('../models/Leads'); // adjust filename if needed
      if (Lead) {
        totalLeads = await Lead.countDocuments();
        // you already computed newLeads from users — keep both if you use Leads separately
      }
    } catch (e) {
      // optional Leads model missing — ignore
    }

    // Return keys expected by your frontend
    res.json({
      totalUsers,
      newLeads,
      newOrders,
      revenue,
      totalLeads
    });
  } catch (err) {
    console.error('Error fetching dashboard status:', err);
    res.status(500).json({ message: 'Server error fetching dashboard status' });
  }
};

// @desc    Get recent users (latest)
 // @route   GET /api/users/recent
// @access  Admin
exports.getRecentUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email mobile createdAt');

    res.json(users);
  } catch (err) {
    console.error('Error fetching recent users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
