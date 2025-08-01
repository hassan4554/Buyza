const router = require("express").Router();
const {
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
} = require("../controller/shop");
const { validateData, isAuthenticated, isSeller } = require("../middleware");
const {
  shopCreateValidationSchema,
  loginValidationSchema,
  updateShopValidationSchema,
  bankInfoValidationSchema,
} = require("../schema");

router.post(
  "/create",
  validateData(shopCreateValidationSchema),
  isAuthenticated,
  createShop
);

router.get("/activation", activation);
router.post("/login", validateData(loginValidationSchema), login);
router.get("/get", isSeller, getShop);
router.get("/get-shop-info", isSeller, getShopInfo);
router.get("/logout", isSeller, shopLogout);
router.patch(
  "/update-avatar",
  //   validateData(updateUserAvatarValidationSchema),
  isSeller,
  updateAvatar
);
router.patch(
  "/update",
  validateData(updateShopValidationSchema),
  isSeller,
  updateShop
);
router.get("/get-info", getShopInfo);
router.patch(
  "/update-payment-method",
  validateData(bankInfoValidationSchema),
  isSeller,
  updatePaymentMethod
);
router.delete("/delete-withdraw-method", isSeller, deleteWithdrawMethod);

module.exports = router;
