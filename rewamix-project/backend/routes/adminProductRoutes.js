const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminProductController");
const { protect, admin } = require("../middleware/authMiddleware");

router.use(protect, admin);

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
