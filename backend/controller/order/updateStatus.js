const {
  catchAsync,
  successResponse,
  AppError,
  sendMail,
} = require("../../utils");
const { Order, Product, Shop } = require("../../model");

const updateStatus = catchAsync(async (req, res, next) => {
  const { id, status } = req.body;

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
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

  if (order.status === "Transferred to delivery partner") {
    order.cart.forEach(async (item) => {
      await updateProduct(item.product._id, item.qty);
    });
  }

  if (order.status === "Delivered") {
    const shop = await Shop.findById(order.cart[0].shop);

    if (!shop) return next(new AppError("No shop found!", 400));

    const serviceTax = order.totalPrice * 0.1;
    const priceAfterTax = order.totalPrice - serviceTax;
    shop.availableBalance += priceAfterTax;

    await shop.save();
  }

  if (order.status === "Delivered" || order.status === "Shipping") {
    const options = {
      email: order.user.email,
      subject: `Update On Order Status`,
      message: `Hi ${order.user.name}.\nYour order with order id: ${order._id} has been ${order.status}`,
    };
    await sendMail(options);
  }

  return successResponse.sendData(res, {
    status: 200,
    message: "Order status updated successfully!",
    data: null,
  });
});

const updateProduct = async (id, qty) => {
  try {
    const product = await Product.findById(id);
    product.stock -= qty;
    product.sold_out += qty;

    await product.save();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = updateStatus;
