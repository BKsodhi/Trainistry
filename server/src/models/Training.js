// const mongoose = require('mongoose');

// const trainingSchema = new mongoose.Schema(
//   {
//     trainer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     title: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String
//     },
//     price: {
//       type: Number,
//       required: true
//     },
//     duration: {
//       type: String
//     },
//     date: {
//       type: Date
//     },
//     status: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',
//         'completed',
//         'cancelled'
//       ],
//       default: 'pending'
//     },
//     paymentStatus: {
//       type: String,
//       enum: [
//         'pending',
//         'paid',
//         'failed'
//       ],
//       default: 'pending'
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Training', trainingSchema);

// const mongoose = require('mongoose');

// const trainingSchema = new mongoose.Schema(
//   {
//     trainer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     title: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String
//     },
//     price: {
//       type: Number,
//       required: true
//     },
//     duration: {
//       type: String
//     },
//     date: {
//       type: Date
//     },
//     // --- STATUS TRACKING ---
//     status: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',   // Accepted by both parties
//         'ongoing',    // Currently in progress (NEW)
//         'completed',
//         'cancelled'
//       ],
//       default: 'pending'
//     },
//     // --- PAYMENT TRANSPARENCY (FEATURE 3) ---
//     paymentStatus: {
//       type: String,
//       enum: [
//         'pending',    // No payment made
//         'advance_paid', // 50% paid (NEW)
//         'paid',       // Full payment cleared
//         'overdue',    // Payment delay (NEW)
//         'failed'
//       ],
//       default: 'pending'
//     },
//     paymentDeadline: {
//       type: Date      // Essential for the "Overdue" logic
//     },
//     // ----------------------------------------
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Training', trainingSchema);

// const mongoose = require('mongoose');

// const trainingSchema = new mongoose.Schema(
//   {
//     trainer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     title: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String
//     },
//     price: {
//       type: Number,
//       required: true
//     },
//     duration: {
//       type: String
//     },
//     date: {
//       type: Date
//     },
//     // --- STATUS TRACKING (Feature 1) ---
//     status: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',   // Accepted by Admin/Parties
//         'ongoing',    // Currently in progress
//         'completed',
//         'cancelled'
//       ],
//       default: 'pending'
//     },
//     // --- PAYMENT TRANSPARENCY (Feature 3) ---
//     paymentStatus: {
//       type: String,
//       enum: [
//         'pending',      // No payment made
//         'advance_paid', // 50% paid
//         'paid',         // Full payment cleared
//         'overdue',      // Payment delay
//         'failed'
//       ],
//       default: 'pending'
//     },
//     paymentDeadline: {
//       type: Date      // Essential for the "Overdue" logic
//     },
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'advance_paid', 'paid', 'overdue'],
//       default: 'pending'
//     }
//   },
  
//   { 
//     timestamps: true,
//     // CRITICAL: This ensures Mongoose looks at your 'projects' collection 
//     // instead of defaulting to an empty 'trainings' collection.
//     collection: 'projects' 
//   }
// );

// module.exports = mongoose.model('Training', trainingSchema);

// const mongoose = require('mongoose');

// const trainingSchema = new mongoose.Schema(
//   {
//     company: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'User', 
//       required: true 
//     },
//     trainer: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'User' 
//       // Note: This might be null if the project is 'open' and no one is hired yet
//     },
//     technology: { type: String, required: true },
//     description: { type: String },
//     location: { type: String },
//     startDate: { type: Date },
//     durationDays: { type: Number },
//     perDayPayment: { type: Number },
//     paymentTerms: { type: String },
    
//     // --- STATUS TRACKING (Feature 1) ---
//     status: {
//       type: String,
//       enum: ['open', 'pending', 'approved', 'ongoing', 'completed', 'cancelled'],
//       default: 'open'
//     },
    
//     // --- PAYMENT TRANSPARENCY (Feature 3) ---
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'advance_paid', 'paid', 'overdue', 'failed'],
//       default: 'pending'
//     },
//     paymentDeadline: { type: Date }
//   },
//   { 
//     timestamps: true,
//     collection: 'projects' 
//   }
// );

// module.exports = mongoose.model('Training', trainingSchema);

const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    company: { 
      type: mongoose.Schema.Types.ObjectId, 
      // CHANGE: Point this to your CompanyProfile model
      ref: 'CompanyProfile', 
      required: true 
    },
    trainer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    technology: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    startDate: { type: Date },
    durationDays: { type: Number },
    perDayPayment: { type: Number },
    paymentTerms: { type: String },
    
    status: {
      type: String,
      enum: ['open', 'pending', 'approved', 'ongoing', 'completed', 'cancelled'],
      default: 'open'
    },
    
    paymentStatus: {
      type: String,
      enum: ['pending', 'advance_paid', 'paid', 'overdue', 'failed'],
      default: 'pending'
    },
    paymentDeadline: { type: Date }
  },
  { 
    timestamps: true,
    collection: 'projects' 
  }
);

module.exports = mongoose.model('Training', trainingSchema);