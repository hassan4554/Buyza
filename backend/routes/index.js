const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const shopRoutes = require("./shop.routes");
const productRoutes = require("./product.routes");
const eventRoutes = require("./event.routes");
const couponRoutes = require("./coupon.routes");
const paymentRoutes = require("./payment.routes");
const orderRoutes = require("./order.routes");
const conversationRoutes = require("./conversation.routes");
const messageRoutes = require("./message.routes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/shop", shopRoutes);
router.use("/product", productRoutes);
router.use("/event", eventRoutes);
router.use("/coupon", couponRoutes);
router.use("/payment", paymentRoutes);
router.use("/order", orderRoutes);
router.use("/conversation", conversationRoutes);
router.use("/message", messageRoutes);

module.exports = router;
