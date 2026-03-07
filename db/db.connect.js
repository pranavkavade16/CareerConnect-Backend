const mongoose = require("mongoose");

const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.log("Failed to connect mongoDB", error);
    throw error;
  }
};

module.exports = { initializeDatabase };
