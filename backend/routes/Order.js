const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { sendConfirmationEmail } = require("../utils/emailServiceOrder");


 //Helper to generate order numbers like ORD-20250920-ABC123
const genOrderNumber = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${y}${m}${day}-${rand}`;
};


// Create order (from checkout payload)
router.post("/create", async (req, res) => {
  try {
    const { userId, items, subtotal, shippingAddress, notes, paymentMethod, paymentId, orderId } = req.body;

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

    // Determine payment status
    const isOnlinePayment = paymentMethod === "ONLINE";
    const isPaid = isOnlinePayment && paymentId ? true : false; // ONLINE with payment ID = paid

    const order = new Order({
      orderNumber: genOrderNumber(),
      user: userId,
      items: mapped,
      totalPrice: subtotal || 0,
      shippingAddress: shippingAddress || {},
      notes: notes || "",
      paymentMethod: paymentMethod || "COD",
      paid: isPaid,
      paymentId: paymentId || null,
      orderId: orderId || null,
      status: "Pending", // All orders start as Pending, admin must confirm
    });

    await order.save();

    return res.json({ success: true, message: "Order placed successfully", order });
  } catch (err) {
    console.error("/order/create error", err);
    return res.status(500).json({ success: false, message: "Error placing order", error: err?.message || err });
  }
});

// Cancel an order (only if Pending or Confirmed)
router.patch("/:orderId/cancel", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { cancelReason } = req.body;
    const order = await Order.findById(orderId);
    
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (order.status === "Shipped" || order.status === "Delivered") {
      return res.status(400).json({ success: false, message: `Cannot cancel order in '${order.status}' status` });
    }
    
    order.status = "Cancelled";
    order.cancelledAt = new Date();
    if (cancelReason) order.cancelReason = cancelReason;
    await order.save();
    
    return res.json({ success: true, message: "Order cancelled", order });
  } catch (err) {
    console.error("cancel order error", err)
    return res.status(500).json({ success: false, message: "Error cancelling order", error: err?.message || err });
  }
});

// Get user orders
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching orders", error: err });
  }
});

// Admin: get all orders (optionally filter by status via ?status=Pending)
router.get("/all", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const orders = await Order.find(filter)
      .populate("user", "username email")
      .populate("items.product")
      .sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error fetching orders", error: err?.message || err });
  }
});

// Admin: Confirm order (Pending → Confirmed)
router.patch("/:orderId/confirm", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (order.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Only pending orders can be confirmed" });
    }

    order.status = "Confirmed";
    order.confirmedAt = new Date();
    await order.save();
    
    return res.json({ success: true, message: "Order confirmed successfully", order });
  } catch (err) {
    console.error("Confirm order error", err);
    return res.status(500).json({ success: false, message: "Error confirming order", error: err?.message || err });
  }
});

// Admin: Ship order (Confirmed → Shipped)
router.patch("/:orderId/ship", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { trackingNumber } = req.body;
    const order = await Order.findById(orderId);
    
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (order.status !== "Confirmed") {
      return res.status(400).json({ success: false, message: "Only confirmed orders can be shipped" });
    }

    order.status = "Shipped";
    order.shippedAt = new Date();
    if (trackingNumber) order.trackingNumber = trackingNumber;
    await order.save();
    
    return res.json({ success: true, message: "Order marked as shipped", order });
  } catch (err) {
    console.error("Ship order error", err);
    return res.status(500).json({ success: false, message: "Error shipping order", error: err?.message || err });
  }
});

// User: Deliver order (Shipped → Delivered)
router.patch("/:orderId/deliver", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.body;
    const order = await Order.findById(orderId);
    
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (order.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    if (order.status !== "Shipped") {
      return res.status(400).json({ success: false, message: "Only shipped orders can be marked as delivered" });
    }

    order.status = "Delivered";
    order.deliveredAt = new Date();
    await order.save();
    
    return res.json({ success: true, message: "Order marked as delivered", order });
  } catch (err) {
    console.error("Deliver order error", err);
    return res.status(500).json({ success: false, message: "Error delivering order", error: err?.message || err });
  }
});




module.exports = router;
