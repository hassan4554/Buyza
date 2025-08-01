const { User } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const updateUser = catchAsync(async (req, res, next) => {
  const { name, email, phoneNumber, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) return next(new AppError("Invalid Credentials!", 400));

  user.phoneNumber = phoneNumber;
  user.name = name;
  await user.save();

  return successResponse.sendData(res, {
    status: 200,
    message: "User updated successfully!",
    data: user,
  });
});
module.exports = updateUser;
