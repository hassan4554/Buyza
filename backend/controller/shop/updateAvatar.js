const { Shop } = require("../../model");
const {
  catchAsync,
  successResponse,
  AppError,
  uploadSingleImage,
  deleteSingleImage,
} = require("../../utils");

const updateAvatar = catchAsync(async (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.seller;

  if (!avatar) return next(new AppError("No avatar!", 400));

  const { public_id } = req.seller.avatar;
  const avt = await uploadSingleImage(avatar, "avatars");
  const user = await Shop.findByIdAndUpdate(_id, {
    avatar: avt,
  });

  if (!user) return next(new AppError("Avatar not updated!", 400));
  await deleteSingleImage(public_id);

  return successResponse.sendData(res, {
    status: 200,
    message: "Avatar updated successfully!",
  });
});
module.exports = updateAvatar;
