const {
  catchAsync,
  successResponse,
  AppError,
  deleteBulkImages,
} = require("../../utils");
const { Event } = require("../../model");

const deleteEvent = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const event = await Event.findById(id);

  if (!event) return next(new AppError("No event found!", 404));
  const shopId = req.seller._id;

  if (event.shopId.toString() !== shopId.toString()) {
    return next(
      new AppError("You can only delete events of your own shop!", 400)
    );
  }

  const { images } = event;
  const success = await event.deleteOne();
  await deleteBulkImages(images);

  if (!success.deletedCount)
    return next(new AppError("Error deleting event!", 400));

  successResponse.sendData(res, {
    status: 200,
    message: "Event deleted successfully!",
  });
});

module.exports = deleteEvent;
