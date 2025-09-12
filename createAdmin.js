const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const admins = [
  { name: 'Admin One', email: 'admin1@dronemart.com', password: 'admin123', userType: 'admin' },
  { name: 'Admin Two', email: 'admin2@dronemart.com', password: 'admin123', userType: 'admin' },
  { name: 'Super Admin', email: 'superadmin@dronemart.com', password: 'super123', userType: 'superadmin' }
];

const createAdmins = async () => {
  try {
    await Admin.deleteMany({}); // clear old admins

    for(const adminData of admins){
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      const admin = new Admin({ ...adminData, password: hashedPassword });
      await admin.save();
      console.log('Admin created:', admin.email);
    }

    console.log('All admins created successfully!');
    process.exit();
  } catch(err){
    console.error(err);
    process.exit(1);
  }
};

createAdmins();
