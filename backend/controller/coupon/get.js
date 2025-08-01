const { catchAsync, successResponse, AppError } = require("../../utils");
const { Coupon } = require("../../model");

const getCoupon = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  if (!name) return next(new AppError("Coupon Code is required!", 400));

  const coupon = await Coupon.findOne({ name }).populate("shopId");
  if (!coupon) return next(new AppError("No coupon found!", 404));

  successResponse.sendData(res, {
    status: 200,
    message: "Coupon found successfully!",
    data: coupon,
  });
});

module.exports = getCoupon;
