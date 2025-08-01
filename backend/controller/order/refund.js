const { catchAsync, successResponse, AppError } = require("../../utils");
const { Order } = require("../../model");

const refund = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const order = await Order.findByIdAndUpdate(id, {
    status: "Processing refund",
  });
  if (!order) return next(new AppError("No order updated!", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Order refund requested successfully!",
    data: null,
  });
});
module.exports = refund;
