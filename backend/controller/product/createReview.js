const { catchAsync, successResponse, AppError } = require("../../utils");
const { Product, Order } = require("../../model");

const createReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return next(new AppError("No product found!", 404));
  let flag = false;

  product.reviews.forEach((review) => {
    if (review.user.toString() === req.user._id.toString()) {
      review.rating = rating;
      review.comment = comment;
      review.user = req.user._id;
      flag = true;
      return;
    }
  });

  const review = {
    user: req.user._id,
    rating,
    comment,
    product: productId,
  };
  if (!flag) product.reviews.push(review);

  let avg = 0;
  product.reviews.forEach((rev) => (avg += rev.rating));
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  return successResponse.sendData(res, {
    status: 200,
    message: "Reviewed successfully!",
    data: null,
  });
});

module.exports = createReview;

//   await Order.findByIdAndUpdate(
//     orderId,
//     { $set: { "cart.$[elem].isReviewed": true } },
//     { arrayFilters: [{ "elem._id": productId }], new: true }
//   );
