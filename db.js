const mongoose = require("mongoose");

// including .env file
require('dotenv').config();

// Define the MongoDB connection URL

//           local mongoose
const mongoURL = process.env.DB_URL_LOCAL // Replace 'mydatabase' with your database name

//            online mongoose
// const mongoURL = process.env.DB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;
