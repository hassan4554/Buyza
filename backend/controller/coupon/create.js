const { catchAsync, successResponse, AppError } = require("../../utils");
const { Coupon } = require("../../model");

const createCoupon = catchAsync(async (req, res, next) => {
  const data = req.body;

  const exists = await Coupon.findOne({ name: data.name });
  console.log(exists)
  if (exists) return next(new AppError("Discount Code already exists!", 400));

  const coupon = await Coupon.create({
    ...data,
    shopId: req.seller._id,
  });

  if (!coupon) return next(new AppError("Error creating coupon!", 400));

  successResponse.sendData(res, {
    status: 200,
    message: "Coupon created successfully!",
    data: coupon,
  });
});

module.exports = createCoupon;
