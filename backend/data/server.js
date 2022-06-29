const express = require("express");
const app = express();

const dotenv = require("dotenv");
const connectDB = require("../config/db");
const userRoutes = require("../routes/userRoutes");
const chatRoutes = require("../routes/chatRoutes");

const { notFound, errorHandler } = require("../Middleware/ErrorHandler");

dotenv.config();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
