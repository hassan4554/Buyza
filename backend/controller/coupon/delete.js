const {
  catchAsync,
  successResponse,
  AppError,
  deleteBulkImages,
} = require("../../utils");
const { Coupon } = require("../../model");

const deleteCoupon = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const coupon = await Coupon.findById(id);

  if (!coupon) return next(new AppError("No coupon found!", 404));
  const shopId = req.seller._id;

  if (coupon.shopId.toString() !== shopId.toString()) {
    return next(
      new AppError("You can only delete coupons of your own shop!", 400)
    );
  }
  const success = await coupon.deleteOne();

  if (!success.deletedCount)
    return next(new AppError("Error deleting coupon!", 400));

  successResponse.sendData(res, {
    status: 200,
    message: "Coupon deleted successfully!",
  });
});

module.exports = deleteCoupon;
