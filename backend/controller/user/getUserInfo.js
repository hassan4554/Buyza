const { User } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const getUserInfo = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User doesn't exists", 400));
  }

  return successResponse.sendData(res, {
    status: 200,
    message: "User found successfully",
    data: user,
  });
});
module.exports = getUserInfo;
