const { catchAsync, successResponse, AppError } = require("../../utils");
const { Product, Order } = require("../../model");

const createOrder = catchAsync(async (req, res, next) => {
  const { cart, user, shippingAddress, totalPrice, paymentInfo } = req.body;

  const cartPromises = cart.map(async (element) => {
    const item = await Product.findById(element.id).populate("shopId");
    return { product: element.id, shop: item.shopId._id, qty: element.qty };
  });

  const cartItems = await Promise.all(cartPromises);
  if (!cartItems.length) return next(new AppError("No items in cart!", 400));
  const shopItemsMap = new Map();

  for (let item of cartItems) {
    const shopId = item.shop.toString();
    if (!shopItemsMap.has(shopId)) {
      shopItemsMap.set(shopId, []);
    }
    shopItemsMap.get(shopId).push(item);
  }

  const orders = [];
  for (const [shopId, items] of shopItemsMap) {
    const order = await Order.create({
      cart: items,
      shippingAddress,
      user: user._id,
      totalPrice,
      paymentInfo,
    });
    orders.push(order);
  }

  if (!orders.length) return next(new AppError("No order placed", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Order placed successfully!",
    data: orders,
  });
});

module.exports = createOrder;
