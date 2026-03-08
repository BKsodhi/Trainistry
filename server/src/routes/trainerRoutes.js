const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const uploadResume = require('../middleware/uploadMiddleware');
const { uploadResume: uploadResumeController } = require('../controllers/trainerController');
const {
  getMyProfile,
  updateMyProfile,
  getAllProjects,
  getProjectById,
  applyToProject,
  getMyApplications,
  likeDislikeTrainer,
  addFeedback
} = require('../controllers/trainerController');

// ================= TRAINER PROFILE =================
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);

// ================= PROJECTS =================
router.get('/projects', protect, getAllProjects);
router.get('/projects/:projectId', protect, getProjectById);

// ================= APPLICATIONS =================
router.post('/projects/:projectId/apply', protect, applyToProject);
router.get('/applications', protect, getMyApplications);

// ================= FEEDBACK & LIKES/DISLIKES =================
router.put('/like-dislike', protect, likeDislikeTrainer);
router.post('/feedback', protect, addFeedback);

// ================= RESUME =================
router.post('/upload-resume', protect, uploadResume.single('resume'), uploadResumeController);

module.exports = router;