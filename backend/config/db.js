const mongoose = require('mongoose');

const connectDB = async () => {
  // connectionString = "mongodb+srv://dronemart:je19AZzWuq5lumuE@cluster0.8gzc5ne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
