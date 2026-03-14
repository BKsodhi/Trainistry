// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema(
// {
//   project: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Project',
//     required: true
//   },

//   trainer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'TrainerProfile',
//     required: true
//   },

//   resumeUrl: {
//     type: String,
//     required: true
//   },

//   proposalMessage: {
//     type: String,
//     default: ''
//   },

//   expectedRate: {
//     type: Number
//   },

//   status: {
//     type: String,
//     enum: ['applied', 'shortlisted', 'interview', 'selected', 'rejected'],
//     default: 'applied'
//   },

//   interviewDate: {
//     type: Date
//   },

//   feedback: {
//     type: String,
//     default: ''
//   }

// }, { timestamps: true });

// module.exports = mongoose.model('Application', applicationSchema);

// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema(
// {
//   project: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Project',
//     required: true
//   },

//   trainer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'TrainerProfile',
//     required: true
//   },

//   resumeUrl: {
//     type: String,
//     required: true
//   },

//   proposalMessage: {
//     type: String,
//     default: ''
//   },

//   expectedRate: {
//     type: Number
//   },

//   status: {
//     type: String,
//     // Added 'interview_scheduled' to match your controller logic
//     enum: ['applied', 'shortlisted', 'interview', 'interview_scheduled', 'selected', 'rejected'],
//     default: 'applied'
//   },

//   interviewDate: {
//     type: Date
//   },

//   // Added to support the Figma design and Postman test fields
//   interviewTime: {
//     type: String
//   },

//   meetingLink: {
//     type: String
//   },

//   feedback: {
//     type: String,
//     default: ''
//   }

// }, { timestamps: true });

// module.exports = mongoose.model('Application', applicationSchema);

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
    enum: [
      'applied', 
      'shortlisted', 
      'interview', 
      'interview_scheduled', 
      'selected', 
      'rejected'
    ],
    default: 'applied'
  },

  // Fields for interview scheduling
  interviewDate: {
    type: Date
  },

  interviewTime: {
    type: String
  },

  meetingLink: {
    type: String
  },

  feedback: {
    type: String,
    default: ''
  }

}, { timestamps: true });

// Add an index to prevent a trainer from applying to the same project twice
applicationSchema.index({ project: 1, trainer: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);