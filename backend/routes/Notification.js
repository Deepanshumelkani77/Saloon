const express = require('express');
const router = express.Router();
const {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotificationStatus,
  markAllAsRead,
  deleteNotification,
  deleteAllArchived
} = require('../controller/notificationController');

// Get all notifications with optional filters
router.get('/all', getAllNotifications);

// Mark all as read
router.put('/mark-all-read', markAllAsRead);

// Delete all archived
router.delete('/delete-archived', deleteAllArchived);

// Create new notification
router.post('/create', createNotification);

// Update notification status
router.put('/status/:id', updateNotificationStatus);

// Delete notification
router.delete('/delete/:id', deleteNotification);

// Get single notification by ID
router.get('/:id', getNotificationById);

module.exports = router;
