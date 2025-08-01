const getUser = require("./getUser");
const getUserInfo = require("./getUserInfo");
const updateUser = require("./updateUser");
const updateAvatar = require("./updateAvatar");
const updatePassword = require("./updatePassword");
const addAddress = require("./addAddress");
const deleteAddress = require("./deleteAddress");

module.exports = {
  getUser,
  updateUser,
  updateAvatar,
  updatePassword,
  addAddress,
  deleteAddress,
  getUserInfo,
};
