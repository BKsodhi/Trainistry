// const User = require('../models/User');
// const CompanyProfile = require('../models/CompanyProfile');
// const TrainerProfile = require('../models/TrainerProfile');
// const jwt = require('jsonwebtoken');

// // Generate Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '7d'
//   });
// };

// // ================= REGISTER =================
// exports.register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       expertise,
//       experienceYears,
//       location,
//       bio,
//       resumeUrl
//     } = req.body;

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({
//         message: 'All fields are required'
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: 'User already exists'
//       });
//     }

//     // Create User
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role
//     });

//     // Create Company Profile
//     if (role === 'company') {
//   const { industry, location, description } = req.body;

//   await CompanyProfile.create({
//     user: user._id,
//     name,
//     industry,
//     location,
//     description
//   });
// }

//     // Create Trainer Profile
//     if (role === 'trainer') {
//       if (!expertise) {
//         return res.status(400).json({
//           message: 'Expertise is required for trainer'
//         });
//       }

//       await TrainerProfile.create({
//         user: user._id,
//         expertise,
//         experienceYears,
//         location,
//         bio,
//         resumeUrl
//       });
//     }

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

// // // ================= LOGIN =================
// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(401).json({
// //         message: 'Invalid email or password'
// //       });
// //     }

// //     const isMatch = await user.matchPassword(password);

// //     if (!isMatch) {
// //       return res.status(401).json({
// //         message: 'Invalid email or password'
// //       });
// //     }

// //     res.json({
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       role: user.role,
// //       token: generateToken(user._id)
// //     });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       message: error.message
// //     });
// //   }
// // };

// // ================= LOGIN =================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid email or password"
//       });
//     }

//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return res.status(401).json({
//         message: "Invalid email or password"
//       });
//     }

//     let companyId = null;
//     let trainerId = null;

//     // Get Company Profile ID
//     if (user.role === "company") {
//       const companyProfile = await CompanyProfile.findOne({ user: user._id });
//       if (companyProfile) {
//         companyId = companyProfile._id;
//       }
//     }

//     // Get Trainer Profile ID
//     if (user.role === "trainer") {
//       const trainerProfile = await TrainerProfile.findOne({ user: user._id });
//       if (trainerProfile) {
//         trainerId = trainerProfile._id;
//       }
//     }

//     res.json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       companyId,
//       trainerId,
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

// const User = require('../models/User');
// const CompanyProfile = require('../models/CompanyProfile');
// const TrainerProfile = require('../models/TrainerProfile');
// const jwt = require('jsonwebtoken');

// // Generate Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '7d'
//   });
// };

// // ================= REGISTER =================
// exports.register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       phone,            // Collected from frontend
//       expertise,        // Trainer field
//       experienceYears,  // Trainer field
//       location,         // Trainer/Company field
//       bio,              // Trainer field
//       resumeUrl,        // Trainer field
//       industry,         // Company field
//       description       // Company field
//     } = req.body;

//     // 1. Validation: Ensure phone is included since it's required in the Model
//     if (!name || !email || !password || !role || !phone) {
//       return res.status(400).json({
//         message: 'Name, email, password, role, and phone are required'
//       });
//     }

//     // 2. Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: 'User already exists'
//       });
//     }

//     // 3. Create Base User
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//       phone
//     });

//     // 4. Create Role-Specific Profiles
//     if (role === 'company') {
//       await CompanyProfile.create({
//         user: user._id,
//         name: name, // Using contact name as initial company name
//         industry: industry || "General",
//         location: location || "India",
//         description: description || ""
//       });
//     } 
//     else if (role === 'trainer') {
//       if (!expertise) {
//         return res.status(400).json({
//           message: 'Expertise is required for trainer'
//         });
//       }

//       // Build trainer profile object with provided data or defaults
//       const trainerData = {
//         user: user._id,
//         expertise: expertise,
//         experienceYears: experienceYears || 0,
//         location: location || "India",
//         bio: bio || "",
//         resumeUrl: resumeUrl || ""
//       };

//       await TrainerProfile.create(trainerData);
//     }

//     // 5. Successful Response
//     res.status(201).json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     console.error("REGISTER_ERROR:", error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

// // ================= LOGIN =================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid email or password"
//       });
//     }

//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return res.status(401).json({
//         message: "Invalid email or password"
//       });
//     }

//     let companyId = null;
//     let trainerId = null;

//     // Fetch Profile IDs so the frontend can redirect to the correct dashboard
//     if (user.role === "company") {
//       const companyProfile = await CompanyProfile.findOne({ user: user._id });
//       if (companyProfile) {
//         companyId = companyProfile._id;
//       }
//     }

//     if (user.role === "trainer") {
//       const trainerProfile = await TrainerProfile.findOne({ user: user._id });
//       if (trainerProfile) {
//         trainerId = trainerProfile._id;
//       }
//     }

//     res.json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       companyId,
//       trainerId,
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     console.error("LOGIN_ERROR:", error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };


// const User = require('../models/User');
// const CompanyProfile = require('../models/CompanyProfile');
// const TrainerProfile = require('../models/TrainerProfile');
// const jwt = require('jsonwebtoken');

// // Generate Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '7d'
//   });
// };

// // ================= REGISTER =================
// exports.register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       phone,
//       expertise,
//       experienceYears,
//       location,
//       industry,
//       companyName, // Added to match the CompanyRegister field
//       description
//     } = req.body;

//     // 1. Basic Validation
//     if (!name || !email || !password || !role || !phone) {
//       return res.status(400).json({
//         message: 'Name, email, password, role, and phone are required'
//       });
//     }

//     // 2. Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: 'User already exists'
//       });
//     }

//     // 3. Create Base User
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//       phone
//     });

//     // 4. Create Role-Specific Profiles
//     if (role === 'company') {
//       await CompanyProfile.create({
//         user: user._id,
//         name: companyName || name, // Uses organization name if provided
//         industry: industry || "General",
//         location: location || "India",
//         description: description || ""
//       });
//     } 
//     else if (role === 'trainer') {
//       if (!expertise) {
//         return res.status(400).json({
//           message: 'Expertise is required for trainer registration'
//         });
//       }

//       // Handle Verification Document path from Multer (req.file)
//       // This is the key for your "Verified Trainer Badge" feature
//       const verificationDocPath = req.file ? req.file.path : null;

//       await TrainerProfile.create({
//         user: user._id,
//         expertise: expertise.split(',').map(s => s.trim()), // Convert string to array
//         experienceYears: experienceYears || 0,
//         location: location || "India",
//         verificationDoc: verificationDocPath, // Storing path for Admin review
//         isVerified: false // Admin will toggle this to true later
//       });
//     }

//     // 5. Successful Response
//     res.status(201).json({
//       success: true,
//       userId: user._id,
//       name: user.name,
//       role: user.role,
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     console.error("REGISTER_ERROR:", error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

// // ================= LOGIN =================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Use .select('+password') if your User model has select: false for password
//     const user = await User.findOne({ email });

//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({
//         message: "Invalid email or password"
//       });
//     }

//     let profileId = null;

//     // Fetch relevant ID so frontend knows which dashboard to mount
//     if (user.role === "company") {
//       const profile = await CompanyProfile.findOne({ user: user._id });
//       profileId = profile ? profile._id : null;
//     } else if (user.role === "trainer") {
//       const profile = await TrainerProfile.findOne({ user: user._id });
//       profileId = profile ? profile._id : null;
//     }

//     res.json({
//       success: true,
//       userId: user._id,
//       name: user.name,
//       role: user.role,
//       profileId, // Generic profile ID for frontend use
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     console.error("LOGIN_ERROR:", error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

// const User = require('../models/User');
// const CompanyProfile = require('../models/CompanyProfile');
// const TrainerProfile = require('../models/TrainerProfile');
// const jwt = require('jsonwebtoken');

// // Generate Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '7d'
//   });
// };

// // ================= REGISTER =================
// exports.register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       phone,
//       expertise,
//       experienceYears,
//       location,
//       industry,
//       companyName,
//       description,
//       gstNumber, // Added to match CompanyRegister frontend
//       website    // Added to match CompanyRegister frontend
//     } = req.body;

//     // 1. Basic Validation
//     if (!name || !email || !password || !role || !phone) {
//       return res.status(400).json({
//         message: 'Name, email, password, role, and phone are required'
//       });
//     }

//     // 2. Check if user already exists
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       return res.status(400).json({
//         message: 'User already exists'
//       });
//     }

//     // 3. Create Base User
//     const user = await User.create({
//       name,
//       email: email.toLowerCase(),
//       password,
//       role,
//       phone
//     });

//     // Handle Verification Document path from Multer (shared for both roles)
//     const verificationDocPath = req.file ? req.file.path : null;

//     // 4. Create Role-Specific Profiles
//     if (role === 'company') {
//       await CompanyProfile.create({
//         user: user._id,
//         name: companyName || name,
//         industry: industry || "General",
//         location: location || "India",
//         description: description || "",
//         gstNumber: req.body.gstNumber || "N/A",
//         website: req.body.website || "",
//         verificationDoc: verificationDocPath, // Saved for Admin review
//         isVerified: false
//       });
//     } 
//     else if (role === 'trainer') {
//       if (!expertise) {
//         return res.status(400).json({
//           message: 'Expertise is required for trainer registration'
//         });
//       }

//       await TrainerProfile.create({
//         user: user._id,
//         expertise: expertise.split(',').map(s => s.trim()), 
//         experienceYears: experienceYears || 0,
//         location: location || "India",
//         verificationDoc: verificationDocPath, // Saved for Admin review
//         isVerified: false 
//       });
//     }

//     // 5. Successful Response
//     res.status(201).json({
//       success: true,
//       userId: user._id,
//       name: user.name,
//       role: user.role,
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     console.error("REGISTER_ERROR:", error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

// // ================= LOGIN =================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user and include password if your model hides it by default
//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({
//         message: "Invalid email or password"
//       });
//     }

//     let profileId = null;

//     // Fetch relevant ID so frontend knows which dashboard to mount
//     if (user.role === "company") {
//       const profile = await CompanyProfile.findOne({ user: user._id });
//       profileId = profile ? profile._id : null;
//     } else if (user.role === "trainer") {
//       const profile = await TrainerProfile.findOne({ user: user._id });
//       profileId = profile ? profile._id : null;
//     }

//     res.json({
//       success: true,
//       userId: user._id,
//       name: user.name,
//       role: user.role,
//       profileId, 
//       token: generateToken(user._id)
//     });

//   } catch (error) {
//     console.error("LOGIN_ERROR:", error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

// const User = require('../models/User');
// const CompanyProfile = require('../models/CompanyProfile');
// const TrainerProfile = require('../models/TrainerProfile');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// exports.register = async (req, res) => {
//   try {
//     const {
//       name, email, password, role, phone,
//       expertise, experienceYears, location,
//       industry, companyName, description,
//       gstNumber, website
//     } = req.body;

//     if (!name || !email || !password || !role || !phone) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     // 1. Capture the file path from Multer
//     // We use the path saved by Multer in src/uploads/verification
//     const filePath = req.file ? req.file.path : null;

//     // 2. Create Base User with registrationDoc (For Admin Review)
//     const user = await User.create({
//       name,
//       email: email.toLowerCase(),
//       password,
//       role,
//       phone,
//       registrationDoc: filePath, // Unified field name for Admin
//       gstNumber: gstNumber || "N/A"
//     });

//     // 3. Create Role-Specific Profiles
//     if (role === 'company') {
//       await CompanyProfile.create({
//         user: user._id,
//         name: companyName || name,
//         industry: industry || "General",
//         location: location || "India",
//         description: description || "",
//         gstNumber: gstNumber || "N/A",
//         website: website || "",
//         verificationDoc: filePath, // Shared path
//         isVerified: false
//       });
//     } 
//     else if (role === 'trainer') {
//       await TrainerProfile.create({
//         user: user._id,
//         expertise: expertise ? expertise.split(',').map(s => s.trim()) : [],
//         experienceYears: experienceYears || 0,
//         location: location || "India",
//         verificationDoc: filePath, // Shared path
//         isVerified: false 
//       });
//     }

//     res.status(201).json({
//       success: true,
//       token: generateToken(user._id),
//       role: user.role
//     });

//   } catch (error) {
//     console.error("REGISTER_ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // LOGIN remains as you have it
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     let profileId = null;
//     if (user.role === "company") {
//       const profile = await CompanyProfile.findOne({ user: user._id });
//       profileId = profile ? profile._id : null;
//     } else if (user.role === "trainer") {
//       const profile = await TrainerProfile.findOne({ user: user._id });
//       profileId = profile ? profile._id : null;
//     }

//     res.json({
//       success: true,
//       userId: user._id,
//       name: user.name,
//       role: user.role,
//       profileId, 
//       token: generateToken(user._id)
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const User = require('../models/User');
const CompanyProfile = require('../models/CompanyProfile');
const TrainerProfile = require('../models/TrainerProfile');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const {
      name, email, password, role, phone,
      expertise, experienceYears, location,
      industry, companyName, description,
      gstNumber, website
    } = req.body;

    // 1. Basic Validation
    if (!name || !email || !password || !role || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // 3. Capture and Normalize File Path
    // This converts "src\uploads\file.pdf" to "src/uploads/file.pdf" for browser compatibility
    const filePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    // 4. Create Base User (Used by Admin Dashboard Review)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      phone,
      registrationDoc: filePath, // Unified field name for Admin Review
      gstNumber: gstNumber || "N/A"
    });

    // 5. Create Role-Specific Profiles
    if (role === 'company') {
      await CompanyProfile.create({
        user: user._id,
        name: companyName || name,
        industry: industry || "General",
        location: location || "India",
        description: description || "",
        gstNumber: gstNumber || "N/A",
        website: website || "",
        verificationDoc: filePath, // Shared path for Company Dashboard
        isVerified: false
      });
    } 
    else if (role === 'trainer') {
      await TrainerProfile.create({
        user: user._id,
        expertise: expertise ? expertise.split(',').map(s => s.trim()) : [],
        experienceYears: experienceYears || 0,
        location: location || "India",
        verificationDoc: filePath, // Shared path for Trainer Dashboard
        isVerified: false 
      });
    }

    // 6. Successful Response
    res.status(201).json({
      success: true,
      userId: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let profileId = null;
    if (user.role === "company") {
      const profile = await CompanyProfile.findOne({ user: user._id });
      profileId = profile ? profile._id : null;
    } else if (user.role === "trainer") {
      const profile = await TrainerProfile.findOne({ user: user._id });
      profileId = profile ? profile._id : null;
    }

    res.json({
      success: true,
      userId: user._id,
      name: user.name,
      role: user.role,
      profileId, 
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("LOGIN_ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};