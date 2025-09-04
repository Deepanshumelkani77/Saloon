const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // duration in minutes
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
