const {
  catchAsync,
  successResponse,
  AppError,
  deleteBulkImages,
} = require("../../utils");
const { Product } = require("../../model");

const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const product = await Product.findById(id);

  if (!product) return next(new AppError("No product found!", 404));
  const shopId = req.seller._id;

  if (product.shopId.toString() !== shopId.toString()) {
    return next(
      new AppError("You can only delete products of your own shop!", 400)
    );
  }

  const { images } = product;
  const success = await product.deleteOne();
  await deleteBulkImages(images);

  if (!success.deletedCount)
    return next(new AppError("Error deleting product!", 400));

  successResponse.sendData(res, {
    status: 200,
    message: "Product deleted successfully!",
  });
});

module.exports = deleteProduct;
