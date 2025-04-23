const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"],
  },
});

// OrderSchema.index({ customer_id: 1 });
// OrderSchema.index({ customer_id: 1, status: 1 });

module.exports = mongoose.model("Order", OrderSchema);
