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
},
{ timestamps: true }
);

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);