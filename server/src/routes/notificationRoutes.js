const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getCompanyNotifications, 
  getTrainerNotifications, 
  markAsRead 
} = require('../controllers/notificationController');

// ================= COMPANY NOTIFICATIONS =================
router.get('/company/:companyId', getCompanyNotifications);

// ================= TRAINER NOTIFICATIONS =================
router.get('/trainer', protect, getTrainerNotifications);

// ================= MARK AS READ =================
router.put('/:id/read', markAsRead);

module.exports = router;