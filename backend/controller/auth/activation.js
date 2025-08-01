const { User } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");
const jwt = require("jsonwebtoken");

const activation = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  const newUser = jwt.verify(token, process.env.ACTIVATION_SECRET);

  if (!newUser) {
    return next(new AppError("Invalid token", 400));
  }
  const { name, email, password, avatar } = newUser;

  let user = await User.findOne({ email });

  if (user) {
    return next(new AppError("User already exists", 400));
  }
  user = await User.create({
    name,
    email,
    avatar,
    password,
  });

  const accessToken = user.getJwtToken();
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  return successResponse.sendDataAndCookie(res, {
    status: 200,
    message: "User registered successfully",
    token: accessToken,
    cookieOptions,
  });
});

module.exports = activation;
