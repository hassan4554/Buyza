const { catchAsync, successResponse, AppError } = require("../../utils");

const getApiKey = catchAsync(async (req, res, next) => {
  const apiKey = process.env.STRIPE_API_KEY;
  if (!apiKey) return next(new AppError("Api key not found!", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Api key found!",
    data: apiKey,
  });
});

module.exports = getApiKey;
