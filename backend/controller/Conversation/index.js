const createConversation = require("./create");
const updateLastMessage = require("./updateLastMessage");
const getUserConversations = require("./getUserConversations");
const getSellerConversations = require("./getSellerConversations");

module.exports = {
  updateLastMessage,
  createConversation,
  getUserConversations,
  getSellerConversations,
};
