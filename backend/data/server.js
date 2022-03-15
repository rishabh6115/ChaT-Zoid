const express = require("express");
const app = express();
const { chats } = require("./data");
const dotenv = require("dotenv");
const connectDB = require("../config/db");

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

// app.get("/api/groupchats", (req, res) => {
//   console.log(chats[0].isGroupChat);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
