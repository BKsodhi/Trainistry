// const mongoose = require('mongoose');

// const AchievementSchema = new mongoose.Schema({
//   trainer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   title: {
//     type: String,
//     required: [true, "Please add a title for your achievement"],
//     trim: true
//   },
//   description: {
//     type: String,
//     required: [true, "Please add a description"],
//   },
//   category: {
//     type: String,
//     enum: ['Project Completion', 'Certification', 'Workshop', 'Award', 'Publication'],
//     default: 'Project Completion'
//   },
//   companyName: {
//     type: String,
//     trim: true
//   },
//   location: {
//     type: String,
//     trim: true
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Achievement', AchievementSchema);

// const mongoose = require('mongoose');

// const AchievementSchema = new mongoose.Schema({
//   trainer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Matches your User model name
//     required: true
//   },
//   description: {
//     type: String,
//     required: [true, 'Please add a description']
//   },
//   category: {
//     type: String,
//     enum: ['Project Completion', 'Certification', 'Workshop', 'Award'],
//     default: 'Project Completion'
//   },
//   companyName: String,
//   location: String,
//   imageUrl: {
//     type: String // Stores the path: "uploads/1710545..."
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Achievement', AchievementSchema);


const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    enum: ['Project Completion', 'Certification', 'Workshop', 'Award'],
    default: 'Project Completion'
  },
  companyName: String,
  location: String,
  imageUrl: {
    type: String 
  },
  // Social Interactions
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      name: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  repostCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);