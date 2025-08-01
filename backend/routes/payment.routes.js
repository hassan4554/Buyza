const router = require("express").Router();
const { processPayment, getApiKey } = require("../controller/payment");
const { isAuthenticated } = require("../middleware");

router.post("/process", isAuthenticated, processPayment);
router.get("/stripe-api-key", getApiKey);

module.exports = router;
