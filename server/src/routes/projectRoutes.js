const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  applyToProject,
  getAllProjects,
  getProjectById,
  getOpenProjects // ✅ new
} = require('../controllers/projectController');

// ===================
// GET ALL PROJECTS (Public)
// ===================
router.get('/', getAllProjects);

// ===================
// GET OPEN PROJECTS (Trainers Only)
// ===================
router.get('/open', protect, getOpenProjects);

// ===================
// GET SINGLE PROJECT BY ID (Public)
// ===================
router.get('/:projectId', getProjectById);

// ===================
// APPLY TO PROJECT (Trainer Only)
// ===================
router.post('/:projectId/apply', protect, applyToProject);

module.exports = router;