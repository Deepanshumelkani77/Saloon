const Notification = require('../models/Notification');

// Get all notifications with optional filters
const getAllNotifications = async (req, res) => {
  try {
    const { status, type, priority } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (type) filter.type = type;
    if (priority) filter.priority = priority;

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    const stats = {
      total: await Notification.countDocuments(),
      unread: await Notification.countDocuments({ status: 'unread' }),
      read: await Notification.countDocuments({ status: 'read' }),
      archived: await Notification.countDocuments({ status: 'archived' })
    };

    res.json({
      success: true,
      data: notifications,
      stats
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message
    });
  }
};

// Get single notification by ID
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification',
      error: error.message
    });
  }
};

// Create new notification
const createNotification = async (req, res) => {
  try {
    const notificationData = req.body;
    const notification = new Notification(notificationData);
    await notification.save();

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: error.message
    });
  }
};

// Update notification status
const updateNotificationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification status updated successfully',
      data: notification
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification',
      error: error.message
    });
  }
};

// Mark all as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { status: 'unread' },
      { status: 'read' }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking all as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all as read',
      error: error.message
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: error.message
    });
  }
};

// Delete all archived notifications
const deleteAllArchived = async (req, res) => {
  try {
    const result = await Notification.deleteMany({ status: 'archived' });

    res.json({
      success: true,
      message: `${result.deletedCount} archived notifications deleted`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting archived notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete archived notifications',
      error: error.message
    });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotificationStatus,
  markAllAsRead,
  deleteNotification,
  deleteAllArchived
};
