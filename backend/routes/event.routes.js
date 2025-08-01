const router = require("express").Router();
const {
  createEvent,
  getAllEvents,
  deleteEvent,
} = require("../controller/event");
const { isSeller, validateData } = require("../middleware");
const { createEventValidationSchema } = require("../schema");

router.post(
  "/create",
  validateData(createEventValidationSchema),
  isSeller,
  createEvent
);

router.get("/getAll", getAllEvents);
router.delete("/delete", isSeller, deleteEvent);

module.exports = router;
