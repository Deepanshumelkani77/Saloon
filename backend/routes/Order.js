const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Create order (from checkout payload)
router.post("/create", async (req, res) => {
  try {
    const { userId, items, subtotal, shippingAddress, notes, paymentMethod } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items are required" });
    }

    // Build items with references + snapshots
    const mapped = items.map((it) => ({
      product: it.productId,
      quantity: it.quantity || 1,
      name: it.name,
      price: it.price,
      image: it.image,
    }));

    const order = new Order({
      user: userId,
      items: mapped,
      totalPrice: subtotal || 0,
      shippingAddress: shippingAddress || {},
      notes: notes || "",
      paymentMethod: paymentMethod || "COD",
      status: paymentMethod === "ONLINE" ? "Pending" : "Pending",
    });

    await order.save();

    // Clear the user's cart after placing order
    try {
      const cart = await Cart.findOne({ user: userId });
      if (cart) {
        cart.items = [];
        await cart.save();
      }
    } catch (_) {}

    return res.json({ success: true, message: "Order placed successfully", order });
  } catch (err) {
    console.error("/order/create error", err);
    return res.status(500).json({ success: false, message: "Error placing order", error: err?.message || err });
  }
});

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
      // map to new schema format
      items: cart.items.map((it) => ({
        product: it.product,
        quantity: it.quantity,
        name: it.product?.name,
        price: it.product?.price,
        image: it.product?.image,
      })),
      totalPrice,
    });

    await newOrder.save();

    // Empty cart after placing order
    cart.items = [];
    await cart.save();

    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error placing order", error: err });
  }
});

// Get user orders
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("items.product");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching orders", error: err });
  }
});

module.exports = router;
