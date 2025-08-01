const { catchAsync, successResponse, AppError } = require("../../utils");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = catchAsync(async (req, res, next) => {
  const { amount } = req.body;

  const payment = await stripe.paymentIntents.create({
    amount,
    currency: "USD",
    metadata: {
      company: "Buyza",
    },
  });

  if (!payment) return next(new AppError("Error in payment!", 400));
  return successResponse.sendData(res, {
    status: 200,
    message: "Payment successfull!",
    data: {
      success: true,
      client_secret: payment.client_secret,
    },
  });
});

module.exports = processPayment;
