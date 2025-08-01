const { catchAsync, successResponse, AppError, sendMail } = require("../../utils");
const { Order, Product } = require("../../model");

const refundSuccess = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const order = await Order.findByIdAndUpdate(
    id,
    { status: "Refund Success" },
    { new: true }
  )
    .populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .populate({
      path: "user",
      model: "User",
    });
  if (!order) return next(new AppError("No order updated!", 400));

  order.cart.forEach(async (item) => {
    await updateProduct(item.product._id, item.qty);
  });

  const options = {
    email: order.user.email,
    subject: `Update On Order Status`,
    message: `Hi ${order.user.name}.\nYour order with order id: ${order._id} has been refunded`,
  };
  await sendMail(options);

  return successResponse.sendData(res, {
    status: 200,
    message: "Order refunded successfully!",
    data: null,
  });
});

const updateProduct = async (id, qty) => {
  try {
    const product = await Product.findById(id);
    product.stock += qty;
    product.sold_out -= qty;

    await product.save();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = refundSuccess;
