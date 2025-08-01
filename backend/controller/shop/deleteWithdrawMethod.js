const { catchAsync, AppError, successResponse } = require("../../utils");
const { Shop } = require("../../model");

const deleteWithdrawMethod = catchAsync(async (req, res, next) => {
  const shop = await Shop.findByIdAndUpdate(req.seller._id, {
    withdrawMethod: null,
  });

  if (!shop || !shop.withdrawMethod)
    return next(new AppError("Withdraw method not deleted!", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Withdraw method deleted successfully!",
    data: null,
  });
});

module.exports = deleteWithdrawMethod;
