// // const express = require('express');
// // const router = express.Router();
// // const { protect } = require('../middleware/authMiddleware');
// // const { 
// //   getCompanyNotifications, 
// //   getTrainerNotifications, 
// //   markAsRead 
// // } = require('../controllers/notificationController');

// // // ================= COMPANY NOTIFICATIONS =================
// // // Added protect middleware so only logged-in company can access
// // router.get('/company', protect, getCompanyNotifications);

// // // ================= TRAINER NOTIFICATIONS =================
// // router.get('/trainer', protect, getTrainerNotifications);

// // // ================= MARK AS READ =================
// // router.put('/:id/read', protect, markAsRead);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   getTrainerNotifications,
//   getCompanyNotifications,
//   markAsRead
// } = require("../controllers/notificationController");

// const { protect } = require("../middleware/authMiddleware");

// router.get("/trainer", protect, getTrainerNotifications);

// router.get("/company", protect, getCompanyNotifications);

// router.put("/read/:id", protect, markAsRead);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getTrainerNotifications,
  getCompanyNotifications,
  markAsRead
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

// TRAINER
router.get("/trainer", protect, getTrainerNotifications);

// COMPANY
router.get("/company", protect, getCompanyNotifications);

// MARK READ
router.put("/:id/read", protect, markAsRead);

module.exports = router;