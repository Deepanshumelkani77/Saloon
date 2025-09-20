const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place order
router.post("/place", async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const newOrder = new Order({
      user: userId,
      items: cart.items,
      totalPrice,
    });

    await newOrder.save();

    // Empty cart after placing order
    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Error placing order", error: err });
  }
});

// Get user orders
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
});

module.exports = router;
