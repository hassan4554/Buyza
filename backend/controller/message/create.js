const {
  catchAsync,
  successResponse,
  AppError,
  uploadSingleImage,
} = require("../../utils");
const { Message } = require("../../model");

const createMessage = catchAsync(async (req, res, next) => {
  const { images, ...messageData } = req.body;

  if (images) {
    const imgs = await uploadSingleImage(images, "avatars");
    messageData.images = imgs;
  }

  const message = new Message({
    ...messageData,
    images: messageData.images ? messageData.images : null,
  });

  await message.save();

  if (!message) return next(new AppError("Message not sent!", 500));

  return successResponse.sendData(res, {
    status: 200,
    message: "Message created successfully!",
    data: message,
  });
});

module.exports = createMessage;
