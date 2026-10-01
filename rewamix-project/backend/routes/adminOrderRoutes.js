const express = require("express");
const router = express.Router();
const { getAllOrders, getOrderById, updateOrderStatus } = require("../controllers/adminOrderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.use(protect, admin);

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
