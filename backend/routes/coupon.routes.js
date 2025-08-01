const router = require("express").Router();
const {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
  getCoupon,
} = require("../controller/coupon");
const { isSeller, validateData } = require("../middleware");
const { createCouponValidationSchema } = require("../schema");

router.post(
  "/create",
  validateData(createCouponValidationSchema),
  isSeller,
  createCoupon
);

router.get("/getAll", getAllCoupons);
router.get("/get", getCoupon);
router.delete("/delete", isSeller, deleteCoupon);

module.exports = router;
