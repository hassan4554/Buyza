const { successResponse, catchAsync } = require("../../utils");

const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  successResponse.sendData(res, {
    status: 200,
    message: "Loged out successfully",
    data: null,
  });
});

module.exports = logout;
