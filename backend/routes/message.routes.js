const router = require("express").Router();
const { createMessage, getAllMessages } = require("../controller/message");

router.post("/create", createMessage);
router.get("/get-all", getAllMessages);

module.exports = router;
