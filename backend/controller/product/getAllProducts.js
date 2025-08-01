const { catchAsync, successResponse, AppError } = require("../../utils");
const { Product } = require("../../model");

const getAllProduct = catchAsync(async (req, res, next) => {
  const { shopId } = req.query;
  let products;

  if (shopId === "undefined") {
    products = await Product.find()
      .populate("shopId")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "User",
        },
      });
  } else {
    products = await Product.find({ shopId })
      .populate("shopId")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "User",
        },
      });
  }
  if (!products.length) return next(new AppError("No products found!", 404));

  successResponse.sendData(res, {
    status: 200,
    message: "Product found successfully!",
    data: products,
  });
});

module.exports = getAllProduct;
