const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Helper to generate order numbers like ORD-20250920-ABC123
const genOrderNumber = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${y}${m}${day}-${rand}`;
};

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
      orderNumber: genOrderNumber(),
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

// Cancel an order (only if still Pending)
router.patch("/:orderId/cancel", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (order.status !== "Pending") {
      return res.status(400).json({ success: false, message: `Cannot cancel order in '${order.status}' status` });
    }
    order.status = "Cancelled";
    await order.save();
    return res.json({ success: true, message: "Order cancelled", order });
  } catch (err) {
    console.error("cancel order error", err)
    return res.status(500).json({ success: false, message: "Error cancelling order", error: err?.message || err });
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
