const mongoose = require("mongoose");

const stylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  workingHours: {
    start: {
      type: String,
      default: "9:00 AM"
    },
    end: {
      type: String,
      default: "8:00 PM"
    }
  },
  workingDays: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }
}, {
  timestamps: true
});

const Stylist = mongoose.model("Stylist", stylistSchema);
module.exports = Stylist;
