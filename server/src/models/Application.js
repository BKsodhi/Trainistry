const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
{
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },

  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainerProfile',
    required: true
  },

  resumeUrl: {
    type: String,
    required: true
  },

  proposalMessage: {
    type: String,
    default: ''
  },

  expectedRate: {
    type: Number
  },

  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'interview', 'selected', 'rejected'],
    default: 'applied'
  },

  interviewDate: {
    type: Date
  },

  feedback: {
    type: String,
    default: ''
  }

}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);