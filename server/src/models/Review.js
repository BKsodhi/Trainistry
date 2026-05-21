// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Who left the review
  recipientId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Who is the review for
  reviewerRole: { type: String, enum: ['Trainer', 'Company'], required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);