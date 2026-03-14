// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const uploadResume = require('../middleware/uploadMiddleware');
// const { getTrainerNotifications } = require("../controllers/notificationController");

// const {
//   getMyProfile,
//   updateMyProfile,
//   getAllProjects,
//   getProjectById,
//   applyToProject,
//   getMyApplications,
//   likeDislikeTrainer,
//   addFeedback,
//   uploadResume: uploadResumeController,
//   searchTrainers
// } = require('../controllers/trainerController');

// // ================= TRAINER PROFILE =================
// router.get('/me', protect, getMyProfile);
// router.put('/me', protect, updateMyProfile);

// // ================= TRAINER SEARCH =================
// router.get('/search', protect, searchTrainers);

// // ================= PROJECTS =================
// router.get('/projects', protect, getAllProjects);
// router.get('/projects/:projectId', protect, getProjectById);

// // ================= APPLICATIONS =================
// router.post('/projects/:projectId/apply', protect, applyToProject);
// router.get('/applications', protect, getMyApplications);

// // ================= FEEDBACK & LIKES/DISLIKES =================
// router.put('/like-dislike', protect, likeDislikeTrainer);
// router.post('/feedback', protect, addFeedback);

// // ================= RESUME =================
// router.post('/upload-resume', protect, uploadResume.single('resume'), uploadResumeController);
// router.get("/notifications", protect, getTrainerNotifications);
// module.exports = router;


const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const uploadResume = require('../middleware/uploadMiddleware');
const { getTrainerNotifications } = require("../controllers/notificationController");

const {
  getMyProfile,
  updateMyProfile,
  getAllProjects,
  getProjectById,
  applyToProject,
  getMyApplications,
  likeDislikeTrainer,
  addFeedback,
  uploadResume: uploadResumeController,
  searchTrainers
} = require('../controllers/trainerController');

// ================= TRAINER PROFILE =================
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);

// ================= TRAINER SEARCH =================
router.get('/search', protect, searchTrainers);

// ================= PROJECTS =================
router.get('/projects', protect, getAllProjects);
router.get('/projects/:projectId', protect, getProjectById);

// ================= APPLICATIONS =================
// 🔹 Added multer middleware here to handle resume file upload
router.post(
  '/projects/:projectId/apply',
  protect,
  uploadResume.single('resume'),
  applyToProject
);
router.get('/applications', protect, getMyApplications);

// ================= FEEDBACK & LIKES/DISLIKES =================
router.put('/like-dislike', protect, likeDislikeTrainer);
router.post('/feedback', protect, addFeedback);

// ================= RESUME =================
router.post('/upload-resume', protect, uploadResume.single('resume'), uploadResumeController);
router.get("/notifications", protect, getTrainerNotifications);

module.exports = router;