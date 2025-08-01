const { catchAsync, successResponse, AppError } = require("../../utils");
const { Coupon } = require("../../model");

const getAllCoupons = catchAsync(async (req, res, next) => {
  const { shopId } = req.query;
  let coupons;

  if (shopId === "undefined") {
    coupons = await Coupon.find();
  } else {
    coupons = await Coupon.find({ shopId }).populate("shopId");
  }
  if (!coupons.length) return next(new AppError("No coupons found!", 404));

  successResponse.sendData(res, {
    status: 200,
    message: "Coupon found successfully!",
    data: coupons,
  });
});

module.exports = getAllCoupons;
