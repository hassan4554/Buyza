const { catchAsync, successResponse, AppError } = require("../../utils");
const { Order } = require("../../model");

const getAllOrders = catchAsync(async (req, res, next) => {
  const { _id } = req.seller;

  const orders = await Order.find({ "cart.shop": _id })
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

  if (!orders.length) return next(new AppError("No orders found!", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Orders found successfully!",
    data: orders,
  });
});

module.exports = getAllOrders;
