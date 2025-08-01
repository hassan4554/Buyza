const { catchAsync, successResponse, AppError } = require("../../utils");
const { User } = require("../../model");

const deleteAddress = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new AppError("id is required!", 400));

  const { _id } = req.user;
  const updated = await User.findOneAndUpdate(
    { _id },
    { $pull: { addresses: { _id: id } } },
    { new: true }
  );

  if (!updated) return next(new AppError("Address not deleted!", 400));

  successResponse.sendData(res, {
    status: 200,
    message: "Address deleted successfully!",
    data: updated,
  });
});

module.exports = deleteAddress;
