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
      // If payment completed via Razorpay, consider it paid at creation
      status: paymentMethod === "ONLINE" ? "Paid" : "Pending",
    });

    await order.save();

    // Clear the user's cart after placing order
    try {
      const cart = await Cart.findOne({ userId });
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

// Admin: get all orders (optionally filter by status via ?status=Paid)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const orders = await Order.find(filter)
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error fetching orders", error: err?.message || err });
  }
});

// Admin: update order status (Allowed: Pending, Paid, Shipped, Delivered, Cancelled)
router.patch("/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const allowed = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();
    return res.json({ success: true, message: "Order status updated", order });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error updating status", error: err?.message || err });
  }
});



// Confirm an order by ID
router.put("/confirm/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // update status
    order.status = "Confirmed";
    await order.save();

    // pull details from order itself
    const userDetails = {
      username: order.shippingAddress?.name || order.user?.username,
      email: order.shippingAddress?.email || order.user?.email,
      phone: order.shippingAddress?.phone,
      orderNumber: order.orderNumber,
      totalPrice: order.totalPrice,
      items: order.items.map(i => ({
        name: i.name,
        qty: i.quantity,
        price: i.price,
      })),
    };

    // Send Email
    try {
      if (userDetails.email) {
        await sendConfirmationEmail(userDetails.email, userDetails);
        console.log("📧 Email sent to", userDetails.email);
      }
    } catch (emailErr) {
      console.error("Email error:", emailErr.message);
    }

    // Send SMS
    try {
      if (userDetails.phone) {
        await sendConfirmationSMS(userDetails.phone, userDetails);
        console.log("📱 SMS sent to", userDetails.phone);
      }
    } catch (SMSErr) {
      console.error("SMS error:", SMSErr.message);
    }

    res.json({
      message: "✅ Order confirmed and notifications sent",
      order,
    });
  } catch (err) {
    console.error("Confirm route error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
