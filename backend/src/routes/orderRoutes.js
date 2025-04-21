const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: "Order Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
