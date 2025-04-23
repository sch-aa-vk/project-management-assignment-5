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
    if (req.query.customer_id) {
      const orders = await Order.find({
        customer_id: req.query.customer_id,
      });

      return res.json(orders);
    }
    
    const orders = await Order.find();

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id);

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({ msg: "Order Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
