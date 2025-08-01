const {
  catchAsync,
  successResponse,
  AppError,
  uploadBulkImages,
} = require("../../utils");
const { Event } = require("../../model");

const createEvent = catchAsync(async (req, res, next) => {
  const { images, ...rest } = req.body;

  imgs = await uploadBulkImages(images, "avatars");

  const event = await Event.create({
    images: imgs,
    ...rest,
    shopId: req.seller._id,
  });

  if (!event) return next(new AppError("Error creating event!", 400));

  successResponse.sendData(res, {
    status: 200,
    message: "Event created successfully!",
    data: event,
  });
});

module.exports = createEvent;
