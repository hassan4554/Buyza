const { catchAsync, successResponse, AppError } = require("../../utils");
const { Conversation } = require("../../model");

const createConversation = catchAsync(async (req, res, next) => {
  const { groupTitle, userId, shopId } = req.body;

  const isConversationExist = await Conversation.findOne({ groupTitle });

  if (isConversationExist) {
    return successResponse.sendData(res, {
      status: 200,
      message: "Conversation already exists!",
      data: isConversationExist,
    });
  }
  const conversation = await Conversation.create({
    groupTitle,
    members: [userId, shopId],
  });

  if (!conversation) return next(new AppError("No conversation created!", 500));

  return successResponse.sendData(res, {
    status: 200,
    message: "Conversation created successfully!",
    data: conversation,
  });
});

module.exports = createConversation;
