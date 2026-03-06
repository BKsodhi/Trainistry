const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getMyProfile,
  updateMyProfile,
  getAllProjects,
  getProjectById,
  applyToProject,
  getMyApplications
} = require('../controllers/trainerController');

// ================= TRAINER PROFILE =================
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);

// ================= PROJECTS =================
router.get('/projects', protect, getAllProjects);            // Open projects
router.get('/projects/:projectId', protect, getProjectById); // Single project

// ================= APPLICATIONS =================
router.post('/projects/:projectId/apply', protect, applyToProject);
router.get('/applications', protect, getMyApplications);

module.exports = router;