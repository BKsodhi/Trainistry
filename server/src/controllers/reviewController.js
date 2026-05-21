// controllers/reviewController.js
// POST: /api/reviews/submit
exports.submitReview = async (req, res) => {
  try {
    const { projectId, recipientId, rating, comment, reviewerRole } = req.body;
    const review = await Review.create({
      projectId,
      reviewerId: req.user.id, // Authenticated user
      recipientId,
      reviewerRole,
      rating,
      comment
    });
    res.status(201).json({ success: true, data: review });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// GET: /api/reviews/:recipientId
exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ recipientId: req.params.recipientId });
  res.json({ success: true, data: reviews });
};