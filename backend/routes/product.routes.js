const router = require("express").Router();
const { isSeller, validateData, isAuthenticated } = require("../middleware");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  createReview,
} = require("../controller/product");
const {
  createProductValidationSchema,
  createReviewValidationSchema,
} = require("../schema");

router.post(
  "/create",
  validateData(createProductValidationSchema),
  isSeller,
  createProduct
);

router.get("/getAll", getAllProducts);
router.delete("/delete", isSeller, deleteProduct);
router.patch(
  "/create-review",
  validateData(createReviewValidationSchema),
  isAuthenticated,
  createReview
);

module.exports = router;
