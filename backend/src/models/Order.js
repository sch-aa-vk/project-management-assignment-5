const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true },
  customer_id: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
});

OrderSchema.index({ customer_id: 1 });
OrderSchema.index({ customer_id: 1, status: 1 });

module.exports = mongoose.model("Order", OrderSchema);
