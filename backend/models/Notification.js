const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['order', 'appointment', 'product', 'user', 'system', 'payment'],
    default: 'system'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived'],
    default: 'unread'
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedModel'
  },
  relatedModel: {
    type: String,
    enum: ['Order', 'Appointment', 'Product', 'User']
  },
  actionUrl: {
    type: String
  },
  icon: {
    type: String
  }
}, {
  timestamps: true
});

// Index for faster queries
notificationSchema.index({ status: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
