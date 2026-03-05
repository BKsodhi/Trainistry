const mongoose = require('mongoose');

const trainerProfileSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },

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
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('TrainerProfile', trainerProfileSchema);