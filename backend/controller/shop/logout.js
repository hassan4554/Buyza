const { successResponse, catchAsync } = require("../../utils");

const shopLogout = catchAsync(async (req, res, next) => {
  res.clearCookie("Seller_token");
  successResponse.sendData(res, {
    status: 200,
    message: "Loged out successfully",
    data: null,
  });
});

module.exports = shopLogout;
