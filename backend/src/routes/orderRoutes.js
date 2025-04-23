const express = require("express");
const uuid = require("uuid");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const owner = req.user?.id;
    const newOrder = new Order({
      ...req.body,
      order_id: uuid.v4(),
      customer_id: owner,
    });
    const savedOrder = await newOrder.save();

    res.json(savedOrder);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const params = req.query;
    const filter = {};

    if (params.customer_id) filter.customer_id = params.customer_id;
    if (params.status) filter.status = params.status;

    const orders = await Order.find(filter);

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orders = await Order.findOne({ order_id: req.params.id });

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const owner = req.user?.id;
    const order = await Order.findOne({ order_id: req.params.id });
    if (order.customer_id.toString() !== owner.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: req.params.id },
      req.body,
      { new: true }
    );

    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const owner = req.user?.id;
    const order = await Order.findOne({ order_id: req.params.id });
    if (order.customer_id.toString() !== owner.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findOneAndDelete({ order_id: req.params.id });

    res.json({ msg: "Order Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
