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

// const mongoose = require('mongoose');

// const trainerProfileSchema = new mongoose.Schema({
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
//   // Availability Toggle (Green for available, Red for busy)
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
// }, { timestamps: true });

// module.exports = mongoose.model('TrainerProfile', trainerProfileSchema);

// const mongoose = require('mongoose');

// const trainerProfileSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   // UPDATED: Changed from String to [String] to support expertise arrays
//   expertise: {
//     type: [String], 
//     required: true,
//     default: []
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
//   // Availability Toggle (Green for available, Red for busy)
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
// }, { timestamps: true });

// module.exports = mongoose.model('TrainerProfile', trainerProfileSchema);

// const mongoose = require('mongoose');

// const trainerProfileSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   // Supporting expertise arrays for target skill matching
//   expertise: {
//     type: [String], 
//     required: true,
//     default: []
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
//   // Availability Toggle (Green for available, Red for busy)
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
//   // ⭐ ENHANCED: Transformed feedbacks into a robust 5-star rating structure
//   feedbacks: [
//     {
//       sender: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true
//       },
//       rating: { 
//         type: Number, 
//         required: true,
//         min: 1,
//         max: 5
//       },
//       comment: { 
//         type: String,
//         required: true 
//       },
//       createdAt: { 
//         type: Date, 
//         default: Date.now 
//       }
//     }
//   ],
//   // ⭐ NEW METRICS FOR PERFORMANCE DASHBOARD QUERY AGGREGATIONS
//   averageRating: {
//     type: Number,
//     default: 5.0,
//     set: v => Math.round(v * 10) / 10 // Aligns rating to clean single decimal place (e.g., 4.7)
//   },
//   totalReviews: {
//     type: Number,
//     default: 0
//   }
// }, { timestamps: true });

// // ⭐ AUTOMATED PRE-SAVE MIDDLEWARE METHOD
// // Automatically aggregates and calculates rating balances on document modifications
// trainerProfileSchema.pre('save', function (next) {
//   if (this.isModified('feedbacks')) {
//     this.totalReviews = this.feedbacks.length;
    
//     if (this.totalReviews === 0) {
//       this.averageRating = 5.0; // Default reputation footprint
//     } else {
//       const sum = this.feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
//       this.averageRating = sum / this.totalReviews;
//     }
//   }
//   next();
// });

// module.exports = mongoose.model('TrainerProfile', trainerProfileSchema);

const mongoose = require('mongoose');

const trainerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expertise: {
    type: [String], 
    required: true,
    default: []
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
      sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
      },
      rating: { 
        type: Number, 
        required: true,
        min: 1,
        max: 5
      },
      comment: { 
        type: String,
        required: true 
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
      }
    }
  ],
  averageRating: {
    type: Number,
    default: 5.0,
    set: v => Math.round(v * 10) / 10
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// ⭐ SAFE PRE-SAVE MIDDLEWARE
trainerProfileSchema.pre('save', function (next) {
  // Logic to calculate ratings
  if (this.isModified('feedbacks')) {
    this.totalReviews = this.feedbacks ? this.feedbacks.length : 0;
    
    if (!this.feedbacks || this.totalReviews === 0) {
      this.averageRating = 5.0;
    } else {
      const sum = this.feedbacks.reduce((acc, curr) => acc + (curr.rating || 0), 0);
      this.averageRating = sum / this.totalReviews;
    }
  }

  // If next is not a function, we are likely in a context where we should return
  if (typeof next === 'function') {
    next();
  }
});

module.exports = mongoose.model('TrainerProfile', trainerProfileSchema);