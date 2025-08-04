const jwt = require("jsonwebtoken");
const { User, Shop } = require("../model/");
const { AppError, catchAsync } = require("../utils");

const isAuthenticated = catchAsync(async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return next(new AppError("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

const isSeller = catchAsync(async (req, res, next) => {
  const Seller_token = req.headers["x-seller-token"];

  if (!Seller_token) {
    return next(new AppError("Please login to continue", 401));
  }

  const decoded = jwt.verify(Seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`${req.user.role} can not access this resources!`, 400)
      );
    }
    next();
  };
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isSeller,
};
