const { catchAsync, successResponse, AppError } = require("../../utils");
const { Conversation } = require("../../model");

const getSellerConversations = catchAsync(async (req, res, next) => {
  const conversations = await Conversation.find({
    members: { $in: [req.seller._id.toString()] },
  }).sort({ updatedAt: -1, createdAt: -1 });

  if (!conversations.length)
    return next(new AppError("No conversation found!", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Conversations found successfully!",
    data: conversations,
  });
});

module.exports = getSellerConversations;
