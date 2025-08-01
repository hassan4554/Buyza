const { Shop } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const shop = await Shop.findOne({ email }).select("+password");

  if (!shop) {
    return next(new AppError("Shop doesn't exists!", 400));
  }

  const isPasswordValid = await shop.comparePassword(password);

  if (!isPasswordValid) {
    return next(new AppError("Invalid Credentials", 400));
  }

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  const token = shop.getJwtToken();

  return successResponse.sendDataAndCookie(res, {
    status: 200,
    message: "Login successful",
    token,
    cookieOptions,
    token_name: "Seller_token",
  });
});
module.exports = login;
