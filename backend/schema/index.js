const loginValidationSchema = require("./login");
const signupValidationSchema = require("./signup");
const shopCreateValidationSchema = require("./createShop");
const createProductValidationSchema = require("./createProduct");
const createEventValidationSchema = require("./createEvent");
const createCouponValidationSchema = require("./createCoupon");
const updateUserValidationSchema = require("./updateUser");
const updateUserAvatarValidationSchema = require("./updateUserAvatar");
const updateUserPasswordValidationSchema = require("./updateUserPassword");
const addUserAddressValidationSchema = require("./userAddressSchema");
const updateOrderStatusValidationSchema = require("./updateOrder");
const createReviewValidationSchema = require("./createReview");
const idValidationSchema = require("./id");
const updateShopValidationSchema = require("./updateShop");
const bankInfoValidationSchema = require("./bankInfo");

module.exports = {
  loginValidationSchema,
  signupValidationSchema,
  shopCreateValidationSchema,
  createProductValidationSchema,
  createEventValidationSchema,
  createCouponValidationSchema,
  updateUserValidationSchema,
  updateUserAvatarValidationSchema,
  updateUserPasswordValidationSchema,
  addUserAddressValidationSchema,
  updateOrderStatusValidationSchema,
  createReviewValidationSchema,
  idValidationSchema,
  updateShopValidationSchema,
  bankInfoValidationSchema,
};
