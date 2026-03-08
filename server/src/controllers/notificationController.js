const Notification = require('../models/Notification');

// ===============================
// GET ALL UNREAD NOTIFICATIONS FOR A COMPANY
// ===============================
exports.getCompanyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      recipient: req.params.companyId,
      isRead: false 
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: notifications });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET ALL UNREAD NOTIFICATIONS FOR A TRAINER
// ===============================
exports.getTrainerNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      recipient: req.user._id, // trainer ID
      isRead: false 
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: notifications });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// MARK NOTIFICATION AS READ
// ===============================
exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ success: true, message: 'Notification marked as read' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};