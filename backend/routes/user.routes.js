const router = require("express").Router();
const { isAuthenticated, validateData } = require("../middleware");
const {
  getUser,
  updateUser,
  updateAvatar,
  updatePassword,
  addAddress,
  deleteAddress,
  getUserInfo,
} = require("../controller/user");
const {
  updateUserValidationSchema,
  updateUserAvatarValidationSchema,
  updateUserPasswordValidationSchema,
  addUserAddressValidationSchema,
} = require("../schema");

router.get("/get-user", isAuthenticated, getUser);
router.get("/get-info", getUserInfo);

router.patch(
  "/update",
  validateData(updateUserValidationSchema),
  isAuthenticated,
  updateUser
);

router.patch(
  "/update-avatar",
  //   validateData(updateUserAvatarValidationSchema),
  isAuthenticated,
  updateAvatar
);

router.patch(
  "/update-password",
  validateData(updateUserPasswordValidationSchema),
  isAuthenticated,
  updatePassword
);

router.patch(
  "/add-address",
  validateData(addUserAddressValidationSchema),
  isAuthenticated,
  addAddress
);

router.delete("/delete-address", isAuthenticated, deleteAddress);

module.exports = router;
