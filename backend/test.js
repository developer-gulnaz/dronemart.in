const mongoose = require('mongoose');
require('dotenv').config();

connectionString = "mongodb+srv://dronemart:je19AZzWuq5lumuE@cluster0.8gzc5ne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString)
    .then(() => {
        console.log('MongoDB connected!');
        process.exit();
    })
    .catch(err => {
        console.error('Connection error:', err);
    });
