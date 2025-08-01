const { User } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("User doesn't exists", 400));
  }

  return successResponse.sendData(res, {
    status: 200,
    message: "User found successfully",
    data: user,
  });
});
module.exports = getUser;
