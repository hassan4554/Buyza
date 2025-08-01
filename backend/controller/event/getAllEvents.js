const { catchAsync, successResponse, AppError } = require("../../utils");
const { Event } = require("../../model");

const getAllEvents = catchAsync(async (req, res, next) => {
  const { shopId } = req.query;
  let events;

  if (shopId === "undefined") {
    events = await Event.find().populate("shopId");
  } else {
    events = await Event.find({ shopId }).populate("shopId");
  }
  if (!events.length) return next(new AppError("No events found!", 404));

  successResponse.sendData(res, {
    status: 200,
    message: "Event found successfully!",
    data: events,
  });
});

module.exports = getAllEvents;
