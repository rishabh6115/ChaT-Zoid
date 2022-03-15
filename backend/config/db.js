const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db = mongoose.connection;
const dbUrl = process.env.DB_URL;

const connectDB = () => {
  mongoose.connect(dbUrl);

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database Connected");
  });
};

module.exports = connectDB;
