const { Shop } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");
const jwt = require("jsonwebtoken");

const activation = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  const newShop = jwt.verify(token, process.env.ACTIVATION_SECRET);

  if (!newShop) {
    return next(new AppError("Invalid token", 400));
  }
  const { name, email, password, avatar, phoneNumber, zipCode, address } =
    newShop;

  let shop = await Shop.findOne({ email });

  if (shop) {
    return next(new AppError("Shop already exists", 400));
  }
  shop = await Shop.create({
    name,
    email,
    password,
    avatar,
    phoneNumber,
    zipCode,
    address,
  });

  const accessToken = await shop.getJwtToken();
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  return successResponse.sendDataAndCookie(res, {
    status: 200,
    message: "Shop registered successfully",
    token: accessToken,
    cookieOptions,
    token_name: "Seller_token",
  });
});

module.exports = activation;
