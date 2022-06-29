const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroup);
router.route("/rename").put(protect, renameGroup);
router.route("/adduser").put(protect, addUserToGroup);
router.route("/removeuser").put(protect, removeUserFromGroup);

module.exports = router;
