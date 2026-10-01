const express = require("express");
const router = express.Router();
const { addOrderItems, getMyOrders, getOrderById, cancelOrder, requestReturn } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);
router.put("/:id/return", protect, requestReturn);

module.exports = router;
