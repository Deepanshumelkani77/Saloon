const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    // Snapshot fields for historical consistency
    name: { type: String },
    price: { type: Number },
    image: { type: String },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], default: [] },
    totalPrice: { type: Number, required: true, default: 0 },
    shippingAddress: { type: addressSchema },
    notes: { type: String },
    
    // Payment fields
    paymentMethod: { type: String, enum: ["COD", "ONLINE"], default: "COD" },
    paid: { type: Boolean, default: false }, // For ONLINE payments - true if payment successful
    paymentId: { type: String }, // Razorpay payment ID for ONLINE payments
    orderId: { type: String }, // Razorpay order ID for ONLINE payments
    
    // Order status workflow: Pending → Confirmed → Shipped → Delivered
    status: { 
      type: String, 
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"], 
      default: "Pending" 
    },
    
    // Workflow tracking
    confirmedAt: { type: Date }, // When admin confirms the order
    shippedAt: { type: Date }, // When admin marks as shipped
    deliveredAt: { type: Date }, // When user marks as delivered
    cancelledAt: { type: Date }, // If order is cancelled
    
    // Additional tracking
    trackingNumber: { type: String }, // Shipping tracking number (optional)
    cancelReason: { type: String }, // Reason for cancellation (optional)
  },
  { timestamps: true }
);

// Helper to generate an order number like ORD-YYYYMMDD-ABC123
function genOrderNumber() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${y}${m}${day}-${rand}`;
}

// Backfill orderNumber for legacy documents when they are updated/saved
orderSchema.pre('validate', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = genOrderNumber();
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);

