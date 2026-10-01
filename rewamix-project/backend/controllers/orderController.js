const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc Create new order
// @route POST /api/orders
// @access Private (logged-in customer)
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const shippingPrice = itemsPrice > 999 ? 0 : 49;
    const totalPrice = itemsPrice + shippingPrice;

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "Cash on Delivery",
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // reduce stock (shared DB — admin panel will see updated stock instantly)
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock = Math.max(0, product.countInStock - item.qty);
        await product.save();
      }
    }

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get logged-in user's orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a single order (only if it belongs to the logged-in customer)
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const RETURN_WINDOW_DAYS = 7;

// @desc Cancel own order (only before it is shipped)
// @route PUT /api/orders/:id/cancel
// @access Private
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this order" });
    }
    if (order.status !== "Processing") {
      return res.status(400).json({
        message:
          order.status === "Cancelled"
            ? "This order is already cancelled"
            : "This order can no longer be cancelled because it has been " + order.status.toLowerCase() + ". Please contact support.",
      });
    }

    // put the stock back (shared DB - admin sees it instantly)
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock += item.qty;
        await product.save();
      }
    }

    order.status = "Cancelled";
    order.cancelledAt = Date.now();
    order.cancelledBy = "customer";
    order.cancelReason = (req.body.reason || "").toString().trim().slice(0, 300) || "No reason given";
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Request a return (only Delivered orders, within 7 days of delivery)
// @route PUT /api/orders/:id/return
// @access Private
const requestReturn = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to return this order" });
    }
    if (order.status !== "Delivered") {
      return res.status(400).json({
        message:
          order.status === "Return Requested"
            ? "A return has already been requested for this order"
            : "Only delivered orders can be returned",
      });
    }

    const deliveredOn = order.deliveredAt || order.updatedAt;
    const deadline = new Date(deliveredOn).getTime() + RETURN_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() > deadline) {
      return res.status(400).json({
        message: `The ${RETURN_WINDOW_DAYS}-day return window for this order has ended`,
      });
    }

    const reason = (req.body.reason || "").toString().trim().slice(0, 300);
    if (!reason) return res.status(400).json({ message: "Please select a reason for the return" });

    order.status = "Return Requested";
    order.returnRequestedAt = Date.now();
    order.returnReason = reason;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrderById, cancelOrder, requestReturn };
