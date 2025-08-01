const { User } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("User doesn't exists!", 400));
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return next(new AppError("Invalid Credentials", 400));
  }

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  const token = user.getJwtToken();

  return successResponse.sendDataAndCookie(res, {
    status: 200,
    message: "Login successful",
    token,
    cookieOptions,
  });
});
module.exports = login;
