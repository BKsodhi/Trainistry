// const mongoose = require('mongoose');

// const trainerProfileSchema = new mongoose.Schema(
// {
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },

//   expertise: {
//     type: String,
//     required: true
//   },

//   experienceYears: {
//     type: Number,
//     default: 0
//   },

//   location: {
//     type: String
//   },

//   bio: {
//     type: String,
//     default: ''
//   },

//   resumeUrl: {
//     type: String
//   },

//   // ===============================
//   // Dashboard and interaction features
//   // ===============================
//   availability: {
//     type: String,
//     enum: ['available', 'busy'],
//     default: 'available'
//   },

//   likes: {
//     type: Number,
//     default: 0
//   },

//   dislikes: {
//     type: Number,
//     default: 0
//   },

//   feedbacks: [
//     {
//       sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       comment: { type: String },
//       createdAt: { type: Date, default: Date.now }
//     }
//   ]
// },
// { timestamps: true }
// );

// module.exports = mongoose.model('TrainerProfile', trainerProfileSchema);

const mongoose = require('mongoose');

const trainerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expertise: {
    type: String,
    required: true
  },
  experienceYears: {
    type: Number,
    default: 0
  },
  location: {
    type: String
  },
  bio: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String
  },
  // Availability Toggle (Green for available, Red for busy)
  availability: {
    type: String,
    enum: ['available', 'busy'],
    default: 'available'
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  feedbacks: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('TrainerProfile', trainerProfileSchema);