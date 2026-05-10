// const mongoose = require('mongoose');

// const companyProfileSchema = new mongoose.Schema(
// {
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },

//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   industry: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   location: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   description: {
//     type: String,
//     default: '',
//   },
// },
// { timestamps: true }
// );

// module.exports = mongoose.model('CompanyProfile', companyProfileSchema);

const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    // ======= ADDED FOR COMPLIANCE =======
    gstNumber: { 
      type: String,
      default: 'Not Provided' 
    },
    website: { 
      type: String,
      default: '' 
    },
    verificationDoc: { 
      type: String 
    },
    // ===================================
    trustScore: { 
      type: Number, 
      default: 100,
      min: 0,
      max: 100 
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);