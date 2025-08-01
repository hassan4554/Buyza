const router = require("express").Router();
const {
  createConversation,
  getSellerConversations,
  updateLastMessage,
  getUserConversations,
} = require("../controller/Conversation");
const { isSeller, isAuthenticated } = require("../middleware");

router.post("/create", createConversation);
router.get("/get-seller-conversations", isSeller, getSellerConversations);
router.get("/get-user-conversations", isAuthenticated, getUserConversations);
router.patch("/update-last-message", updateLastMessage);

module.exports = router;
