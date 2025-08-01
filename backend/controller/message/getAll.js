const { catchAsync, successResponse, AppError } = require("../../utils");
const { Message } = require("../../model");

const getAllMessages = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const messages = await Message.find({ conversationId: id });
  if (!messages) return next(new AppError("No messages!", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Message found successfully!",
    data: messages,
  });
});

module.exports = getAllMessages;
