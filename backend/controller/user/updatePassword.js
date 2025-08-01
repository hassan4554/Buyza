const { User } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword } = req.body;
  const { _id } = req.user;

  const user = await User.findById(_id).select("+password");
  if (!user) return next(new AppError("User not found!", 404));

  const isPasswordValid = user.comparePassword(password);
  if (!isPasswordValid) return next(new AppError("Invalid Credentials!", 400));

  user.password = newPassword;
  await user.save();

  return successResponse.sendData(res, {
    status: 200,
    message: "User password updated successfully!",
  });
});
module.exports = updatePassword;
