// const express = require('express');
// const router = express.Router();

// // Import the middleware
// const { protect, authorize } = require('../middleware/authMiddleware');

// // Import the controller functions
// const {
//   getAllUsers,
//   getAllTrainings,
//   approveTraining,
//   rejectTraining,
//   getAdminStats // Included as it's vital for a professional dashboard
// } = require('../controllers/adminController');

// /**
//  * 🔐 SECURITY LAYER
//  * These middleware run in sequence:
//  * 1. protect: Verifies the JWT and attaches the user to req.user
//  * 2. authorize('admin'): Rejects any user whose role is not 'admin'
//  */
// router.use(protect);
// router.use(authorize('admin'));

// // ===============================
// // DASHBOARD STATS
// // ===============================
// // GET /api/admin/stats
// router.get('/stats', getAdminStats);

// // ===============================
// // USER MANAGEMENT
// // ===============================
// // GET /api/admin/users
// router.get('/users', getAllUsers);

// // ===============================
// // TRAINING & APPROVAL WORKFLOW
// // ===============================
// // GET /api/admin/trainings
// router.get('/trainings', getAllTrainings);

// // PUT /api/admin/approve/:id
// router.put('/approve/:id', approveTraining);

// // PUT /api/admin/reject/:id
// router.put('/reject/:id', rejectTraining);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  getAllUsers,
  getAllTrainings,
  approveTraining,
  rejectTraining,
  getAdminStats,
  toggleVerification,
  toggleBlacklist
} = require('../controllers/adminController');

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.get('/trainings', getAllTrainings);

router.put('/approve/:id', approveTraining);
router.put('/reject/:id', rejectTraining);

// --- NEW ROUTES ---
router.put('/verify/:id', toggleVerification);
router.put('/blacklist/:id', toggleBlacklist);

module.exports = router;