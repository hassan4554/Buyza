const router = require("express").Router();
const { signup, login, activation, logout } = require("../controller/auth");
const { validateData } = require("../middleware");
const { loginValidationSchema, signupValidationSchema } = require("../schema");
const { isAuthenticated } = require("../middleware/user");

router.post("/signup", validateData(signupValidationSchema), signup);
router.post("/login", validateData(loginValidationSchema), login);
router.get("/logout", isAuthenticated, logout);
router.get("/activation", activation);

module.exports = router;
