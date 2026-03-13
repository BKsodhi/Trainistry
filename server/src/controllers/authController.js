const User = require('../models/User');
const CompanyProfile = require('../models/CompanyProfile');
const TrainerProfile = require('../models/TrainerProfile');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      expertise,
      experienceYears,
      location,
      bio,
      resumeUrl
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Create User
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    // Create Company Profile
    if (role === 'company') {
  const { industry, location, description } = req.body;

  await CompanyProfile.create({
    user: user._id,
    name,
    industry,
    location,
    description
  });
}

    // Create Trainer Profile
    if (role === 'trainer') {
      if (!expertise) {
        return res.status(400).json({
          message: 'Expertise is required for trainer'
        });
      }

      await TrainerProfile.create({
        user: user._id,
        expertise,
        experienceYears,
        location,
        bio,
        resumeUrl
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};

// // ================= LOGIN =================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({
//         message: 'Invalid email or password'
//       });
//     }

//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return res.status(401).json({
//         message: 'Invalid email or password'
//       });
//     }

//     res.json({
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

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    let companyId = null;
    let trainerId = null;

    // Get Company Profile ID
    if (user.role === "company") {
      const companyProfile = await CompanyProfile.findOne({ user: user._id });
      if (companyProfile) {
        companyId = companyProfile._id;
      }
    }

    // Get Trainer Profile ID
    if (user.role === "trainer") {
      const trainerProfile = await TrainerProfile.findOne({ user: user._id });
      if (trainerProfile) {
        trainerId = trainerProfile._id;
      }
    }

    res.json({
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId,
      trainerId,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};