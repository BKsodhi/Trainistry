// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema(
// {
//   company: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'CompanyProfile',
//     required: true
//   },

//   title: {
//     type: String,
//     required: true
//   },

//   technology: {
//     type: String,
//     required: true
//   },

//   description: {
//     type: String,
//     default: ''
//   },

//   location: {
//     type: String,
//     required: true
//   },

//   startDate: {
//     type: Date,
//     required: true
//   },

//   durationDays: {
//     type: Number,
//     required: true
//   },

//   perDayPayment: {
//     type: Number,
//     required: true
//   },

//   paymentTerms: {
//     type: String,
//     required: true
//   },

//   tfaProvided: {
//     type: Boolean,
//     default: false
//   },

//   tocProvided: {
//     type: Boolean,
//     default: false
//   },

//   status: {
//     type: String,
//     enum: ['open', 'assigned', 'completed', 'cancelled'],
//     default: 'open'
//   },

//   applicationCount: {
//     type: Number,
//     default: 0
//   }

// },
// { timestamps: true }
// );

// module.exports = mongoose.model('Project', projectSchema);

// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema(
// {
//   company: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'CompanyProfile',
//     required: true
//   },
//   title: { type: String, required: true },
//   technology: { type: String, required: true },
//   description: { type: String, default: '' },
//   location: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   durationDays: { type: Number, required: true },
//   perDayPayment: { type: Number, required: true },
//   paymentTerms: { type: String, required: true },
//   tfaProvided: { type: Boolean, default: false },
//   tocProvided: { type: Boolean, default: false },
  
//   status: {
//     type: String,
//     enum: ['open', 'assigned', 'completed', 'cancelled'],
//     default: 'open'
//   },

//   // --- NEW PAYMENT FIELDS ---
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'cleared'],
//     default: 'pending'
//   },
//   paymentDeadline: {
//     type: Date
//   },
//   // ---------------------------

//   applicationCount: {
//     type: Number,
//     default: 0
//   }
// },
// { timestamps: true }
// );

// module.exports = mongoose.model('Project', projectSchema);

// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema(
//   {
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CompanyProfile',
//       required: true
//     },
//     title: { type: String, required: true },
//     technology: { type: String, required: true },
//     description: { type: String, default: '' },
//     location: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     durationDays: { type: Number, required: true },
//     perDayPayment: { type: Number, required: true },
//     paymentTerms: { type: String, required: true },
//     tfaProvided: { type: Boolean, default: false },
//     tocProvided: { type: Boolean, default: false },
    
//     status: {
//       type: String,
//       enum: ['open', 'assigned', 'completed', 'cancelled'],
//       default: 'open',
//       lowercase: true
//     },

//     // --- PAYMENT & ESCALATION FIELDS ---
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'cleared'],
//       default: 'pending'
//     },
//     paymentDeadline: {
//       type: Date
//     },
    
//     // Dispute Tracking
//     isDisputed: { 
//       type: Boolean, 
//       default: false 
//     },
//     disputeReason: { 
//       type: String, 
//       default: '' 
//     },
//     disputeDate: { 
//       type: Date 
//     },

//     // Escalation Flag
//     isBlacklisted: { 
//       type: Boolean, 
//       default: false 
//     },
//     // ----------------------------------

//     applicationCount: {
//       type: Number,
//       default: 0
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Project', projectSchema);

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyProfile',
      required: true
    },
    title: { type: String, required: true },
    technology: { type: String, required: true },
    description: { type: String, default: '' },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    
    // Updated: Combined definition with Numerical Limits
    durationDays: { 
      type: Number, 
      required: true,
      min: [1, 'Duration cannot be less than 1 day'],
      max: [90, 'Duration cannot exceed 90 days for a single project'] 
    },

    // Updated: Combined definition with Numerical Limits
    perDayPayment: { 
      type: Number, 
      required: true,
      min: [1000, 'Minimum payment must be ₹1,000'],
      max: [100000, 'Payment exceeds security threshold of ₹1,00,000']
    },

    paymentTerms: { type: String, required: true },
    tfaProvided: { type: Boolean, default: false },
    tocProvided: { type: Boolean, default: false },
    
    status: {
      type: String,
      enum: ['open', 'assigned', 'completed', 'cancelled'],
      default: 'open',
      lowercase: true
    },
    //Advance paymets 
    advanceStatus: {
    type: String,
    enum: ['not_required', 'pending', 'paid','none'],
    default: 'not_required' // Set to 'pending' during the selection process
    },
    advanceAmount: {
      type: Number,
      default: 0
    },
    advanceTransactionId: {
      type: String,
      default: ''
    },
    // --- PAYMENT & ESCALATION FIELDS ---
    paymentStatus: {
      type: String,
      enum: ['pending', 'cleared'],
      default: 'pending'
    },
    paymentDeadline: {
      type: Date
    },
    
    // Dispute Tracking
    isDisputed: { 
      type: Boolean, 
      default: false 
    },
    disputeReason: { 
      type: String, 
      default: '' 
    },
    disputeDate: { 
      type: Date 
    },

    // Escalation Flag
    isBlacklisted: { 
      type: Boolean, 
      default: false 
    },
    // ----------------------------------

    applicationCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);