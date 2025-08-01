const { User } = require("../../model");
const { catchAsync, successResponse, AppError } = require("../../utils");

const addAddress = catchAsync(async (req, res, next) => {
  const address = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  const sameTypeAddress = user.addresses.find(
    (addr) => addr.addressType === address.addressType
  );

  if (sameTypeAddress)
    return next(
      new AppError(`${address.addressType} address already exists!`, 400)
    );

  const addressExists = user.addresses.find(
    (address) => address._id === req.body._id
  );

  if (addressExists) {
    Object.assign(addressExists, req.body);
  } else {
    user.addresses.push(req.body);
  }
  await user.save();

  return successResponse.sendData(res, {
    status: 200,
    message: "User address updated successfully!",
    data: user,
  });
});
module.exports = addAddress;
