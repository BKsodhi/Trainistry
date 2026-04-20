// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
// {
//   name: {
//     type: String,
//     required: true
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },

//   password: {
//     type: String,
//     required: true
//   },

//   role: {
//     type: String,
//     enum: ['company', 'trainer'],
//     required: true
//   }
// },
// { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;

//   this.password = await bcrypt.hash(this.password, 10);
// });
// // Compare password method
// userSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
// {
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['company', 'trainer'],
//     required: true
//   },
//   // NEW: Connection arrays
//   following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// },
// { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
// });

// // Compare password method
// userSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     role: {
//       type: String,
//       enum: ['company', 'trainer'],
//       required: true
//     },
//     // Connection arrays
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// // Fixed: Removed 'next' parameter to prevent "next is not a function" error
// userSchema.pre('save', async function () {
//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified('password')) {
//     return;
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// // Compare password method
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     // Added phone field as per new requirement
//     phone: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     role: {
//       type: String,
//       enum: ['company', 'trainer'],
//       required: true
//     },
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) {
//     return;
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     phone: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     role: {
//       type: String,
//       enum: ['admin', 'company', 'trainer'], // added admin
//       required: true
//     },
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) {
//     return;
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ['admin', 'company', 'trainer'],
//       required: true
//     },
//     // --- NEW FIELDS FOR ADMIN FEATURE 1 ---
//     isVerified: { type: Boolean, default: false },
//     status: { 
//       type: String, 
//       enum: ['active', 'blacklisted'], 
//       default: 'active' 
//     },
//     // ---------------------------------------
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ['admin', 'company', 'trainer'],
//       required: true
//     },
//     // --- CORPORATE COMPLIANCE FIELDS (NEW) ---
//     gstNumber: { type: String }, // GST Validation
//     companyLocation: {
//       address: { type: String },
//       coordinates: { 
//         lat: { type: Number }, 
//         lng: { type: Number } 
//       }
//     },
//     registrationDoc: { type: String }, // URL to uploaded PDF/Image
//     // -----------------------------------------
//     isVerified: { type: Boolean, default: false },
//     status: { 
//       type: String, 
//       enum: ['active', 'blacklisted'], 
//       default: 'active' 
//     },
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'company', 'trainer'],
      required: true
    },
    // --- CORPORATE COMPLIANCE FIELDS ---
    gstNumber: { type: String },
    companyLocation: {
      address: { type: String },
      coordinates: { 
        lat: { type: Number }, 
        lng: { type: Number } 
      }
    },
    registrationDoc: { type: String }, 
    
    // --- EMBEDDED PROJECTS (No separate schema needed) ---
    projects: [{
      technology: { type: String, required: true },
      perDayPayment: { type: Number, default: 0 },
      durationDays: { type: Number, default: 0 },
      status: { 
        type: String, 
        enum: ['open', 'pending', 'approved', 'ongoing', 'completed', 'cancelled'],
        default: 'pending' 
      },
      paymentStatus: { 
        type: String, 
        enum: ['pending', 'paid', 'overdue'],
        default: 'pending' 
      },
      createdAt: { type: Date, default: Date.now }
    }],

    isVerified: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ['active', 'blacklisted'], 
      default: 'active' 
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);