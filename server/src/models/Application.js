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
//     enum: [
//       'applied', 
//       'shortlisted', 
//       'interview', 
//       'interview_scheduled', 
//       'selected', 
//       'rejected'
//     ],
//     default: 'applied'
//   },

//   // Fields for interview scheduling
//   interviewDate: {
//     type: Date
//   },

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

// // Add an index to prevent a trainer from applying to the same project twice
// applicationSchema.index({ project: 1, trainer: 1 }, { unique: true });

// module.exports = mongoose.model('Application', applicationSchema);

// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema(
//   {
//     project: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Project',
//       required: true
//     },

//     trainer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'TrainerProfile',
//       required: true
//     },

//     resumeUrl: {
//       type: String,
//       required: true
//     },

//     proposalMessage: {
//       type: String,
//       default: ''
//     },

//     expectedRate: {
//       type: Number
//     },

//     status: {
//       type: String,
//       enum: [
//         'applied', 
//         'shortlisted', 
//         'interview', 
//         'interview_scheduled', 
//         'selected', // Trainer is hired
//         'rejected', // Trainer is rejected
//         'completed' // Project work finished
//       ],
//       default: 'applied'
//     },

//     interviewDate: { type: Date },
//     interviewTime: { type: String },
//     meetingLink: { type: String },
//     feedback: { type: String, default: '' },

//     // --- PAYMENT & DEADLINE TRACKING ---
    
//     projectStartDate: {
//       type: Date
//     },

//     projectEndDate: {
//       type: Date
//     },

//     paymentDeadline: {
//       type: Date
//     },

//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'cleared'],
//       default: 'pending'
//     }

//   }, { timestamps: true });

// /**
//  * Middleware to calculate the Payment Deadline automatically.
//  * FIXED: Converted to an async function to avoid "next is not a function" errors.
//  */
// applicationSchema.pre('save', async function () {
//   // Logic: If status is 'completed', set deadline to projectEndDate + 15 days
//   if (this.isModified('status') && this.status === 'completed' && this.projectEndDate) {
//     const deadline = new Date(this.projectEndDate);
//     deadline.setDate(deadline.getDate() + 15);
//     this.paymentDeadline = deadline;
//   }
//   // With async hooks, we don't need to call next() manually.
// });

// // Ensure a trainer can only apply to a specific project once
// applicationSchema.index({ project: 1, trainer: 1 }, { unique: true });

// module.exports = mongoose.model('Application', applicationSchema);

// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema(
//   {
//     project: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Project',
//       required: true
//     },
//     trainer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'TrainerProfile',
//       required: true
//     },
//     resumeUrl: {
//       type: String,
//       required: true
//     },
//     proposalMessage: {
//       type: String,
//       default: ''
//     },
//     expectedRate: {
//       type: Number
//     },
//     status: {
//       type: String,
//       enum: [
//         'applied', 
//         'shortlisted', 
//         'interview', 
//         'interview_scheduled', 
//         'selected', 
//         'rejected', 
//         'completed'
//       ],
//       default: 'applied'
//     },
//     interviewDate: { type: Date },
//     interviewTime: { type: String },
//     meetingLink: { type: String },
//     feedback: { type: String, default: '' },
//     projectStartDate: { type: Date },
//     projectEndDate: { type: Date },
//     paymentDeadline: { type: Date },
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'cleared'],
//       default: 'pending'
//     }
//   }, { timestamps: true });

// /**
//  * Middleware to calculate the Payment Deadline automatically.
//  * FIXED: Added safety check for projectEndDate and fallback to current date.
//  */
// applicationSchema.pre('save', async function () {
//   if (this.isModified('status') && this.status === 'completed') {
//     // Fallback: If projectEndDate is missing, use now.
//     const endDate = this.projectEndDate || new Date();
    
//     if (!this.projectEndDate) {
//       this.projectEndDate = endDate;
//     }

//     const deadline = new Date(endDate);
//     deadline.setDate(deadline.getDate() + 15);
//     this.paymentDeadline = deadline;
//   }
// });

// applicationSchema.index({ project: 1, trainer: 1 }, { unique: true });

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
        'rejected', 
        'completed'
      ],
      default: 'applied'
    },
    // ======= ADDED FOR REPUTATION SYSTEM =======
    isDisputed: { 
      type: Boolean, 
      default: false 
    },
    // ===========================================
    interviewDate: { type: Date },
    interviewTime: { type: String },
    meetingLink: { type: String },
    feedback: { type: String, default: '' },
    projectStartDate: { type: Date },
    projectEndDate: { type: Date },
    paymentDeadline: { type: Date },
    transactionId: { type: String },
    paymentStatus: {
      type: String,
      enum: ['pending', 'cleared'],
      default: 'pending'
    }
  }, { timestamps: true });

applicationSchema.pre('save', async function () {
  if (this.isModified('status') && this.status === 'completed') {
    const endDate = this.projectEndDate || new Date();
    if (!this.projectEndDate) {
      this.projectEndDate = endDate;
    }
    const deadline = new Date(endDate);
    deadline.setDate(deadline.getDate() + 15);
    this.paymentDeadline = deadline;
  }
});

applicationSchema.index({ project: 1, trainer: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);

