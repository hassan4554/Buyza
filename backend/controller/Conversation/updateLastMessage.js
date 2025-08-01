const { catchAsync, successResponse, AppError } = require("../../utils");
const { Conversation } = require("../../model");

const updateLastMessage = catchAsync(async (req, res, next) => {
  const { conversationId, lastMessage, lastMessageId } = req.body;

  const isUpdated = await Conversation.findByIdAndUpdate(
    conversationId,
    {
      lastMessage,
      lastMessageId,
    },
    { new: true }
  );

  if (!isUpdated) return next(new AppError("No messages!", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Conversation message updated successfully!",
    data: isUpdated,
  });
});

module.exports = updateLastMessage;
