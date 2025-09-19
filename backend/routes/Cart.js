const express = require("express");
const router = express.Router();
const Cart= require("../models/Cart");


// Add product to cart
router.post("/cart/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity; // increase qty
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});





module.exports=router;