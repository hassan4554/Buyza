const {
  catchAsync,
  successResponse,
  AppError,
  uploadBulkImages,
} = require("../../utils");
const { Product } = require("../../model");

const createProduct = catchAsync(async (req, res, next) => {
  const { images, ...rest } = req.body;

  imgs = await uploadBulkImages(images, "avatars");

  const product = await Product.create({
    images: imgs,
    ...rest,
    shopId: req.seller._id,
  });

  if (!product) return next(new AppError("Error creating product", 400));

  successResponse.sendData(res, {
    status: 200,
    message: "Product created successfully",
    data: product,
  });
});

module.exports = createProduct;
