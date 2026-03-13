const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getCompanyNotifications, 
  getTrainerNotifications, 
  markAsRead 
} = require('../controllers/notificationController');

// ================= COMPANY NOTIFICATIONS =================
// Added protect middleware so only logged-in company can access
router.get('/company', protect, getCompanyNotifications);

// ================= TRAINER NOTIFICATIONS =================
router.get('/trainer', protect, getTrainerNotifications);

// ================= MARK AS READ =================
router.put('/:id/read', protect, markAsRead);

module.exports = router;