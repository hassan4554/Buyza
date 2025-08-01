const { Shop } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const getShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.seller.id);

  if (!shop) {
    return next(new AppError("Shop doesn't exists", 400));
  }

  const { password, ...shopDetails } = shop._doc;
  return successResponse.sendData(res, {
    status: 200,
    message: "Shop found successfully",
    data: shopDetails,
  });
});
module.exports = getShop;
