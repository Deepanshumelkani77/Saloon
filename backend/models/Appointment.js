const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  servicePrice: {
    type: String,
    required: true
  },
  serviceDuration: {
    type: Number, // duration in minutes
    required: true
  },
  stylistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stylist',
    required: true
  },
  stylistName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String, // format: "HH:MM AM/PM"
    required: true
  },
  endTime: {
    type: String, // calculated based on service duration
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  paid: {
    type: Boolean,
    default: false
  },
  // Premium discount fields
  originalPrice: {
    type: String
  },
  discountApplied: {
    type: Boolean,
    default: false
  },
  discountAmount: {
    type: String
  },
  premiumDiscount: {
    type: Boolean,
    default: false
  }
});

// Index for efficient queries
appointmentSchema.index({ stylistId: 1, appointmentDate: 1, startTime: 1 });
appointmentSchema.index({ userId: 1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
