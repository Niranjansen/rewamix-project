const Order = require("../models/Order");
const Product = require("../models/Product");

const VALID_STATUSES = Order.schema.path("status").enumValues;

// @desc Get all orders (any customer)
// @route GET /api/admin/orders
// @access Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name email").sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a single order regardless of owner
// @route GET /api/admin/orders/:id
// @access Admin
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update order status
// @route PUT /api/admin/orders/:id/status
// @access Admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const newStatus = req.body.status || order.status;
    if (!VALID_STATUSES.includes(newStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    if (order.status === "Cancelled" && newStatus !== "Cancelled") {
      return res.status(400).json({ message: "A cancelled order cannot be re-opened" });
    }

    // Admin cancelling an order -> put stock back
    if (newStatus === "Cancelled" && order.status !== "Cancelled") {
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock += item.qty;
          await product.save();
        }
      }
      order.cancelledAt = Date.now();
      order.cancelledBy = "admin";
      order.cancelReason = order.cancelReason || req.body.note || "Cancelled by store";
    }

    if (newStatus === "Delivered" && !order.isDelivered) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    if (newStatus === "Returned" && !order.returnedAt) {
      order.returnedAt = Date.now();
    }
    if (req.body.note && ["Returned", "Return Rejected"].includes(newStatus)) {
      order.returnAdminNote = req.body.note;
    }

    order.status = newStatus;

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllOrders, getOrderById, updateOrderStatus };
