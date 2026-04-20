// const mongoose = require('mongoose');

// const notificationSchema = new mongoose.Schema(
// {
//   recipient: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },

//   recipientType: {
//     type: String,
//     enum: ['company', 'trainer'],
//     required: true
//   },

//   message: {
//     type: String,
//     required: true
//   },

//   type: {
//     type: String,
//     enum: [
//       'new_application',
//       'interview_scheduled',
//       'application_selected',
//       'application_rejected',
//       'general'
//     ],
//     default: 'general'
//   },

//   isRead: {
//     type: Boolean,
//     default: false
//   },

//   relatedApplication: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Application'
//   }

// }, { timestamps: true });

// module.exports = mongoose.model('Notification', notificationSchema);

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
{
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  recipientType: {
    type: String,
    enum: ['company', 'trainer'],
    required: true
  },

  message: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: [
      'new_application',
      'interview_scheduled',
      'application_selected',
      'application_rejected',
      'dispute_raised',    
      'warning_posted',    
      'payment_deadline',  
      'general',
      'payment_resolved'
    ],
    default: 'general'
  },

  isRead: {
    type: Boolean,
    default: false
  },

  relatedApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }

}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);