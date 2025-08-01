const createShop = require("./createShop");
const activation = require("./activation");
const login = require("./login");
const getShop = require("./getShop");
const shopLogout = require("./logout");
const getShopInfo = require("./getShopInfo");
const updateAvatar = require("./updateAvatar");
const updateShop = require("./update");
const updatePaymentMethod = require("./updatePaymentMethod");
const deleteWithdrawMethod = require("./deleteWithdrawMethod");

module.exports = {
  createShop,
  activation,
  login,
  getShop,
  shopLogout,
  getShopInfo,
  updateAvatar,
  updateShop,
  updatePaymentMethod,
  deleteWithdrawMethod,
};
