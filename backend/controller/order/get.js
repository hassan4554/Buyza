const { catchAsync, successResponse, AppError } = require("../../utils");
const { Order } = require("../../model");

const getOrder = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new AppError("Order id is required!", 400));

  const order = await Order.findById(id)
    .populate({
      path: "user",
      model: "User",
    })
    .populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .populate({
      path: "cart",
      populate: {
        path: "shop",
        model: "Shop",
      },
    });

  if (!order) return next(new AppError("No order found!", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Order found successfully!",
    data: order,
  });
});

module.exports = getOrder;
