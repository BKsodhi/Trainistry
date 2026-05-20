// const User = require('../models/User');
// const Training = require('../models/Training');

// // ===============================
// // GET ADMIN DASHBOARD STATS
// // ===============================
// // Useful for the "Expert" pitch to show platform health
// exports.getAdminStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalTrainers = await User.countDocuments({ role: 'trainer' });
//     const totalCompanies = await User.countDocuments({ role: 'company' });
    
//     // Aggregation to calculate total platform volume (Approved Trainings)
//     const revenue = await Training.aggregate([
//       { $match: { status: 'approved' } },
//       { $group: { _id: null, totalVolume: { $sum: "$price" } } }
//     ]);

//     res.json({
//       success: true,
//       stats: {
//         totalUsers,
//         totalTrainers,
//         totalCompanies,
//         platformVolume: revenue[0]?.totalVolume || 0
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // USER MANAGEMENT
// // ===============================
// exports.getAllUsers = async (req, res) => {
//   try {
//     // Select everything except password, sort by newest first
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.json({ success: true, count: users.length, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // TRAINING WORKFLOW
// // ===============================
// exports.getAllTrainings = async (req, res) => {
//   try {
//     const trainings = await Training.find()
//       .populate('trainer', 'name email')
//       .populate('company', 'name email')
//       .sort({ createdAt: -1 });

//     res.json({ success: true, count: trainings.length, trainings });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Approve Training
// exports.approveTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(
//       req.params.id,
//       { status: 'approved' },
//       { new: true } // Returns the updated document
//     );

//     if (!training) {
//       return res.status(404).json({ success: false, message: "Training not found" });
//     }

//     res.json({ success: true, message: "Training approved successfully", training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Reject Training
// exports.rejectTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(
//       req.params.id,
//       { status: 'cancelled' },
//       { new: true }
//     );

//     if (!training) {
//       return res.status(404).json({ success: false, message: "Training not found" });
//     }

//     res.json({ success: true, message: "Training rejected/cancelled", training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const User = require('../models/User');
// const Training = require('../models/Training');

// exports.getAdminStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalTrainers = await User.countDocuments({ role: 'trainer' });
//     const totalCompanies = await User.countDocuments({ role: 'company' });
//     const revenue = await Training.aggregate([
//       { $match: { status: 'approved' } },
//       { $group: { _id: null, totalVolume: { $sum: "$price" } } }
//     ]);
//     res.json({
//       success: true,
//       stats: {
//         totalUsers, totalTrainers, totalCompanies,
//         platformVolume: revenue[0]?.totalVolume || 0
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.json({ success: true, count: users.length, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Fixed to ensure ALL projects are visible
// exports.getAllTrainings = async (req, res) => {
//   try {
//     const trainings = await Training.find()
//       .populate('trainer', 'name email')
//       .populate('company', 'name email')
//       .sort({ createdAt: -1 });
//     res.json({ success: true, count: trainings.length, trainings });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // --- NEW MANAGEMENT FUNCTIONS ---

// exports.toggleVerification = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.isVerified = !user.isVerified;
//     await user.save();
//     res.json({ success: true, isVerified: user.isVerified });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.toggleBlacklist = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.status = user.status === 'active' ? 'blacklisted' : 'active';
//     await user.save();
//     res.json({ success: true, status: user.status });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.approveTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
//     res.json({ success: true, training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.rejectTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
//     res.json({ success: true, training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// const User = require('../models/User');
// const Training = require('../models/Training');

// // ===============================
// // GET ADMIN DASHBOARD STATS
// // ===============================
// exports.getAdminStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalTrainers = await User.countDocuments({ role: 'trainer' });
//     const totalCompanies = await User.countDocuments({ role: 'company' });
    
//     // Aggregation for platform volume
//     const revenue = await Training.aggregate([
//       { $match: { status: 'approved' } },
//       { $group: { _id: null, totalVolume: { $sum: "$price" } } }
//     ]);

//     res.json({
//       success: true,
//       stats: {
//         totalUsers,
//         totalTrainers,
//         totalCompanies,
//         platformVolume: revenue[0]?.totalVolume || 0
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // USER MANAGEMENT
// // ===============================
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.json({ success: true, count: users.length, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.toggleVerification = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
//     user.isVerified = !user.isVerified;
//     await user.save();
//     res.json({ success: true, isVerified: user.isVerified });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.toggleBlacklist = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     user.status = user.status === 'active' ? 'blacklisted' : 'active';
//     await user.save();
//     res.json({ success: true, status: user.status });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // TRAINING & PROJECT MANAGEMENT
// // ===============================
// exports.getAllTrainings = async (req, res) => {
//   try {
//     // 1. Fetch with populate
//     let trainings = await Training.find()
//       .populate('trainer', 'name email')
//       .populate('company', 'name email')
//       .sort({ createdAt: -1 });

//     // 2. DEBUG LOGGING: Check your VS Code Terminal!
//     console.log(`[Admin API] Found ${trainings.length} trainings in DB.`);

//     // 3. Fallback: If populate is breaking things, send raw data so at least SOMETHING shows
//     if (trainings.length === 0) {
//         const rawCheck = await Training.find().limit(1);
//         if (rawCheck.length > 0) {
//             console.log("CRITICAL: Raw trainings exist but populate returned 0. Check User IDs.");
//         }
//     }

//     res.json({ 
//       success: true, 
//       count: trainings.length, 
//       trainings: trainings 
//     });
//   } catch (error) {
//     console.error("Fetch Trainings Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.approveTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(
//         req.params.id, 
//         { status: 'approved' }, 
//         { new: true }
//     ).populate('trainer company', 'name email');
    
//     res.json({ success: true, training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.rejectTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(
//         req.params.id, 
//         { status: 'cancelled' }, 
//         { new: true }
//     ).populate('trainer company', 'name email');

//     res.json({ success: true, training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// const User = require('../models/User');
// const Training = require('../models/Training');

// // ===============================
// // GET ADMIN DASHBOARD STATS
// // ===============================
// exports.getAdminStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalTrainers = await User.countDocuments({ role: 'trainer' });
//     const totalCompanies = await User.countDocuments({ role: 'company' });
    
//     // Calculate volume based on your specific perDayPayment * durationDays
//     const trainings = await Training.find({ status: { $in: ['approved', 'ongoing', 'completed'] } });
//     const totalVolume = trainings.reduce((acc, curr) => {
//       return acc + ((curr.perDayPayment || 0) * (curr.durationDays || 0));
//     }, 0);

//     res.json({
//       success: true,
//       stats: {
//         totalUsers,
//         totalTrainers,
//         totalCompanies,
//         platformVolume: totalVolume
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // USER MANAGEMENT
// // ===============================
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.json({ success: true, count: users.length, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.toggleVerification = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
//     user.isVerified = !user.isVerified;
//     await user.save();
//     res.json({ success: true, isVerified: user.isVerified });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.toggleBlacklist = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
//     user.status = user.status === 'active' ? 'blacklisted' : 'active';
//     await user.save();
//     res.json({ success: true, status: user.status });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PROJECT & PAYMENT MANAGEMENT
// // ===============================
// // exports.getAllTrainings = async (req, res) => {
// //   try {
// //     const trainings = await Training.find()
// //       .populate('trainer', 'name email')
// //       .populate('company', 'name email') // This fetches the name from the User collection
// //       .sort({ createdAt: -1 });

// //     const formattedTrainings = trainings.map(t => {
// //       const totalPrice = (t.perDayPayment || 0) * (t.durationDays || 0);
      
// //       return {
// //         ...t.toObject(), // Use toObject() to get a clean JS object
// //         title: t.technology || "General Training",
// //         price: totalPrice,
// //         // Explicitly map the company name so the frontend sees it clearly
// //         companyName: t.company ? t.company.name : "N/A", 
// //         trainerName: t.trainer ? t.trainer.name : "Unassigned"
// //       };
// //     });

// //     res.json({ 
// //       success: true, 
// //       count: formattedTrainings.length, 
// //       trainings: formattedTrainings 
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// exports.getAllTrainings = async (req, res) => {
//   try {
//     const trainings = await Training.find()
//       .populate('trainer', 'name email')
//       // This will now look into the CompanyProfile collection for the name
//       .populate('company', 'name') 
//       .sort({ createdAt: -1 });

//     const formattedTrainings = trainings.map(t => {
//       const totalPrice = (t.perDayPayment || 0) * (t.durationDays || 0);
      
//       return {
//         ...t.toObject(),
//         title: t.technology || "General Training",
//         price: totalPrice,
//         // If company is found in CompanyProfile table, use that name
//         companyName: t.company ? t.company.name : "N/A", 
//         trainerName: t.trainer ? t.trainer.name : "Unassigned"
//       };
//     });

//     res.json({ 
//       success: true, 
//       count: formattedTrainings.length, 
//       trainings: formattedTrainings 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.approveTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(
//       req.params.id, 
//       { status: 'approved' }, 
//       { new: true }
//     ).populate('trainer company', 'name email');
//     res.json({ success: true, training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.rejectTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(
//       req.params.id, 
//       { status: 'cancelled' }, 
//       { new: true }
//     ).populate('trainer company', 'name email');
//     res.json({ success: true, training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const User = require('../models/User');
// const Training = require('../models/Training');
// const TrainerProfile = require('../models/TrainerProfile');
// const CompanyProfile = require('../models/CompanyProfile');

// // ===============================
// // GET ADMIN DASHBOARD STATS
// // ===============================
// exports.getAdminStats = async (req, res) => {
//   try {
//     const [totalUsers, totalTrainers, totalCompanies, trainings] = await Promise.all([
//       User.countDocuments(),
//       User.countDocuments({ role: 'trainer' }),
//       User.countDocuments({ role: 'company' }),
//       Training.find({ status: { $in: ['approved', 'ongoing', 'completed'] } })
//     ]);

//     // Calculate total volume based on perDayPayment * durationDays
//     const totalVolume = trainings.reduce((acc, curr) => {
//       return acc + ((curr.perDayPayment || 0) * (curr.durationDays || 0));
//     }, 0);

//     res.json({
//       success: true,
//       stats: {
//         totalUsers,
//         totalTrainers,
//         totalCompanies,
//         platformVolume: totalVolume
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // USER MANAGEMENT (Enriched with Profiles)
// // ===============================
// exports.getAllUsers = async (req, res) => {
//   try {
//     // 1. Fetch all users excluding passwords
//     const users = await User.find().select('-password').sort({ createdAt: -1 });

//     // 2. Map through users to attach Profile-specific data (Docs, Location, Bio)
//     const enrichedUsers = await Promise.all(users.map(async (user) => {
//       let profileData = null;

//       if (user.role === 'trainer') {
//         profileData = await TrainerProfile.findOne({ user: user._id })
//           .select('verificationDoc isVerified location expertise experienceYears');
//       } else if (user.role === 'company') {
//         profileData = await CompanyProfile.findOne({ user: user._id })
//           .select('isVerified location industry');
//       }

//       return {
//         ...user.toObject(),
//         // Prioritize profile verification status and attach the document path
//         isVerified: profileData ? profileData.isVerified : user.isVerified,
//         verificationDoc: profileData ? profileData.verificationDoc : null,
//         location: profileData ? profileData.location : "Not Provided",
//         expertise: profileData?.expertise || [],
//         experienceYears: profileData?.experienceYears || 0,
//         industry: profileData?.industry || "N/A"
//       };
//     }));

//     res.json({ success: true, count: enrichedUsers.length, users: enrichedUsers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.toggleVerification = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     let newStatus;

//     // Update Role-Specific Profile
//     if (user.role === 'trainer') {
//       const profile = await TrainerProfile.findOneAndUpdate(
//         { user: user._id },
//         [{ $set: { isVerified: { $not: "$isVerified" } } }], // Atomic toggle
//         { new: true }
//       );
//       newStatus = profile.isVerified;
//     } else if (user.role === 'company') {
//       const profile = await CompanyProfile.findOneAndUpdate(
//         { user: user._id },
//         [{ $set: { isVerified: { $not: "$isVerified" } } }],
//         { new: true }
//       );
//       newStatus = profile.isVerified;
//     }

//     // Sync status with the Base User model for easier searching/login
//     user.isVerified = newStatus;
//     await user.save();

//     res.json({ success: true, isVerified: newStatus });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.toggleBlacklist = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
//     user.status = user.status === 'active' ? 'blacklisted' : 'active';
//     await user.save();
    
//     res.json({ success: true, status: user.status });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PROJECT & PAYMENT MANAGEMENT
// // ===============================
// exports.getAllTrainings = async (req, res) => {
//   try {
//     const trainings = await Training.find()
//       .populate('trainer', 'name email')
//       .populate('company', 'name email') 
//       .sort({ createdAt: -1 });

//     const formattedTrainings = trainings.map(t => {
//       const totalPrice = (t.perDayPayment || 0) * (t.durationDays || 0);
      
//       return {
//         ...t.toObject(),
//         title: t.technology || "General Training",
//         price: totalPrice,
//         companyName: t.company ? t.company.name : "N/A", 
//         trainerName: t.trainer ? t.trainer.name : "Unassigned"
//       };
//     });

//     res.json({ 
//       success: true, 
//       count: formattedTrainings.length, 
//       trainings: formattedTrainings 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.approveTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(
//       req.params.id, 
//       { status: 'approved' }, 
//       { new: true }
//     ).populate('trainer company', 'name email');
//     res.json({ success: true, training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.rejectTraining = async (req, res) => {
//   try {
//     const training = await Training.findByIdAndUpdate(
//       req.params.id, 
//       { status: 'cancelled' }, 
//       { new: true }
//     ).populate('trainer company', 'name email');
//     res.json({ success: true, training });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// --- src/controllers/adminController.js ---

const User = require('../models/User');
const Training = require('../models/Training');
const TrainerProfile = require('../models/TrainerProfile');
const CompanyProfile = require('../models/CompanyProfile');

// ===============================
// GET ADMIN DASHBOARD STATS
// ===============================
exports.getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalTrainers, totalCompanies, trainings] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'trainer' }),
      User.countDocuments({ role: 'company' }),
      Training.find({ status: { $in: ['approved', 'ongoing', 'completed'] } })
    ]);

    const totalVolume = trainings.reduce((acc, curr) => {
      return acc + ((curr.perDayPayment || 0) * (curr.durationDays || 0));
    }, 0);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTrainers,
        totalCompanies,
        platformVolume: totalVolume
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// USER MANAGEMENT (Enriched with Profiles)
// ===============================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    const enrichedUsers = await Promise.all(users.map(async (user) => {
      let profileData = null;

      if (user.role === 'trainer') {
        profileData = await TrainerProfile.findOne({ user: user._id })
          .select('verificationDoc isVerified location expertise experienceYears');
      } else if (user.role === 'company') {
        profileData = await CompanyProfile.findOne({ user: user._id })
          .select('verificationDoc isVerified location industry');
      }

      return {
        ...user.toObject(),
        // Prioritize profile verification status
        isVerified: profileData ? profileData.isVerified : user.isVerified,
        // Ensure registrationDoc is either from profile or user model
        verificationDoc: profileData?.verificationDoc || user.registrationDoc || null,
        location: profileData ? profileData.location : "Not Provided",
        expertise: profileData?.expertise || [],
        experienceYears: profileData?.experienceYears || 0,
        industry: profileData?.industry || "N/A"
      };
    }));

    res.json({ success: true, count: enrichedUsers.length, users: enrichedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleVerification = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Toggle the boolean value
    const newStatus = !user.isVerified;

    // 1. Update the Base User Model
    user.isVerified = newStatus;
    await user.save();

    // 2. Update the Role-Specific Profile Model
    if (user.role === 'trainer') {
      await TrainerProfile.findOneAndUpdate(
        { user: user._id },
        { isVerified: newStatus },
        { new: true, upsert: false }
      );
    } else if (user.role === 'company') {
      await CompanyProfile.findOneAndUpdate(
        { user: user._id },
        { isVerified: newStatus },
        { new: true, upsert: false }
      );
    }

    res.json({ success: true, isVerified: newStatus });
  } catch (error) {
    console.error("Verification Toggle Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleBlacklist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
    user.status = user.status === 'active' ? 'blacklisted' : 'active';
    await user.save();
    
    res.json({ success: true, status: user.status });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// PROJECT & PAYMENT MANAGEMENT
// ===============================
exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find()
      .populate('trainer', 'name email')
      .populate('company', 'name email') 
      .sort({ createdAt: -1 });

    const formattedTrainings = trainings.map(t => {
      const totalPrice = (t.perDayPayment || 0) * (t.durationDays || 0);
      
      return {
        ...t.toObject(),
        title: t.technology || "General Training",
        price: totalPrice,
        companyName: t.company ? t.company.name : "N/A", 
        trainerName: t.trainer ? t.trainer.name : "Unassigned"
      };
    });

    res.json({ 
      success: true, 
      count: formattedTrainings.length, 
      trainings: formattedTrainings 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET ALL TRAINERS
// ===============================
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: 'trainer' }).select('-password').sort({ createdAt: -1 });

    const enrichedTrainers = await Promise.all(trainers.map(async (user) => {
      const profileData = await TrainerProfile.findOne({ user: user._id })
        .select('verificationDoc isVerified location expertise experienceYears');

      return {
        ...user.toObject(),
        isVerified: profileData ? profileData.isVerified : user.isVerified,
        verificationDoc: profileData?.verificationDoc || user.registrationDoc || null,
        location: profileData ? profileData.location : "Not Provided",
        expertise: profileData?.expertise || [],
        experienceYears: profileData?.experienceYears || 0,
      };
    }));

    res.json({ success: true, count: enrichedTrainers.length, users: enrichedTrainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET ALL COMPANIES
// ===============================
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await User.find({ role: 'company' }).select('-password').sort({ createdAt: -1 });

    const enrichedCompanies = await Promise.all(companies.map(async (user) => {
      const profileData = await CompanyProfile.findOne({ user: user._id })
        .select('verificationDoc isVerified location industry');

      return {
        ...user.toObject(),
        isVerified: profileData ? profileData.isVerified : user.isVerified,
        verificationDoc: profileData?.verificationDoc || user.registrationDoc || null,
        location: profileData ? profileData.location : "Not Provided",
        industry: profileData?.industry || "N/A"
      };
    }));

    res.json({ success: true, count: enrichedCompanies.length, users: enrichedCompanies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(
      req.params.id, 
      { status: 'approved' }, 
      { new: true }
    ).populate('trainer company', 'name email');
    res.json({ success: true, training });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.rejectTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(
      req.params.id, 
      { status: 'cancelled' }, 
      { new: true }
    ).populate('trainer company', 'name email');
    res.json({ success: true, training });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};