const { Shop } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const updatePaymentMethod = catchAsync(async (req, res, next) => {
  const withdrawMethod = req.body;
  const shop = await Shop.findByIdAndUpdate(req.seller._id, { withdrawMethod });

  if (!shop) {
    return next(new AppError("Shop not updated!", 400));
  }

  return successResponse.sendData(res, {
    status: 200,
    message: "Withdraw method added successfully!",
    data: null,
  });
});
module.exports = updatePaymentMethod;
