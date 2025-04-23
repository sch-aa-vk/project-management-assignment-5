const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { customer_id, status } = req.query;
    const filter = {};
   
    if (customer_id) filter.customer_id = customer_id;
    if (status) filter.status = status;

    const orders = await Order.find(filter);
    
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
