const router = require("express").Router();
const {
  createOrder,
  getAllUser,
  getOrder,
  getAllSeller,
  updateStatus,
  refund,
  refundSuccess,
} = require("../controller/order");
const { isAuthenticated, isSeller, validateData } = require("../middleware");
const {
  updateOrderStatusValidationSchema,
  idValidationSchema,
} = require("../schema");

router.post("/create", isAuthenticated, createOrder);
router.get("/get-all-user", isAuthenticated, getAllUser);
router.get("/get-all-seller", isSeller, getAllSeller);
router.get("/get", isAuthenticated, getOrder);
router.patch(
  "/update-status",
  validateData(updateOrderStatusValidationSchema),
  isSeller,
  updateStatus
);
router.patch(
  "/refund-success",
  validateData(idValidationSchema, "query"),
  isSeller,
  refundSuccess
);
router.patch(
  "/refund",
  validateData(idValidationSchema, "query"),
  isAuthenticated,
  refund
);

module.exports = router;
