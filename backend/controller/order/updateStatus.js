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
      message: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Order Status Update</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; font-family: Arial, sans-serif;">
      <tr>
        <td align="center" bgcolor="#4CAF50" style="padding: 40px 0; color: #ffffff; font-size: 28px; font-weight: bold;">
          Your Order is on its Way!
        </td>
      </tr>
      <tr>
        <td style="padding: 40px 30px 20px 30px;">
          <p style="margin: 0; font-size: 18px;">Hi ${order.user.name},</p>
          <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 24px;">
            We’re excited to let you know that your order <strong>#${
              order._id
            }</strong> has been 
            <span style="color: #4CAF50; font-weight: bold;">${
              order.status === "Delivered" ? "Delivered" : "Shipped"
            }</span>!
          </p>
          <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 24px;">
            You can track your package and see its current status by clicking the button below.
          </p>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0;">
            <tr>
              <td align="center">
                <a href="${process.env.FRONTEND_URL}/user/order/track/${
        order._id
      }" style="background-color: #4CAF50; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; display: inline-block;">
                  Track Your Order
                </a>
              </td>
            </tr>
          </table>
          <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 24px;">
            Thank you for shopping with us! If you have any questions, feel free to reach out to our support team.
          </p>
          <p style="margin: 20px 0 0 0; font-size: 16px;">
            Best regards,<br />
            The Buyza Team
          </p>
        </td>
      </tr>
      <tr>
        <td bgcolor="#eeeeee" style="padding: 20px 30px; text-align: center; font-size: 12px; color: #666666;">
          &copy; 2025 Buyza. All rights reserved.<br />
        </td>
      </tr>
    </table>
  </body>
</html>
`,
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
