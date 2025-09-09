const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number, // duration in minutes
    required: true,
    min: 1
  },
  category: {
    type: String,
    required: true,
    enum: ['Hair Cut', 'Hair Color', 'Facial', 'Massage', 'Manicure', 'Pedicure', 'Makeup', 'Skincare']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
