const express = require('express');
const router = express.Router();
const { submitReview, getReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have a protect middleware

router.post('/submit', protect, submitReview);
router.get('/:recipientId', getReviews);

module.exports = router;