const jwt = require("jsonwebtoken");

// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const dotenv = require("dotenv");
dotenv.config();
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "20d",
  });
};

module.exports = generateToken;
