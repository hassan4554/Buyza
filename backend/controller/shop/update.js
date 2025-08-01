const { Shop } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const updateShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findByIdAndUpdate(req.seller._id, req.body, {
    new: true,
  });

  if (!shop) {
    return next(new AppError("Shop not updated!", 400));
  }

  return successResponse.sendData(res, {
    status: 200,
    message: "Shop updated successfully!",
    data: shop,
  });
});
module.exports = updateShop;
