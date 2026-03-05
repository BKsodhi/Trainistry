const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { applyToProject } = require('../controllers/projectController');

router.post('/:projectId/apply', protect, applyToProject);

module.exports = router;