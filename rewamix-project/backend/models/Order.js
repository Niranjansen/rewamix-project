const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true, default: "Cash on Delivery" },
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    status: {
      type: String,
      enum: [
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Return Requested",
        "Returned",
        "Return Rejected",
      ],
      default: "Processing",
    },
    // Cancellation (customer can cancel only while status is "Processing")
    cancelledAt: { type: Date },
    cancelReason: { type: String },
    cancelledBy: { type: String, enum: ["customer", "admin"] },
    // Return (customer can request within 7 days of delivery)
    returnRequestedAt: { type: Date },
    returnReason: { type: String },
    returnedAt: { type: Date },
    returnAdminNote: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
