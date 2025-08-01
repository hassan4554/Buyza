const { Shop } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const getShopInfo = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new AppError("Id is required!", 400));

  const shop = await Shop.findById(id);

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
module.exports = getShopInfo;
