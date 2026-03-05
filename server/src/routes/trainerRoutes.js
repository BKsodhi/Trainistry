const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const TrainerProfile = require('../models/TrainerProfile');


// ================= GET Logged-in Trainer Profile =================
router.get('/me', protect, async (req, res) => {
  try {
    // Allow only trainers
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ message: 'Access denied. Trainer only.' });
    }

    const profile = await TrainerProfile
      .findOne({ user: req.user._id })
      .populate('user', 'name email role');

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// ================= UPDATE Logged-in Trainer Profile =================
router.put('/me', protect, async (req, res) => {
  try {
    // Allow only trainers
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ message: 'Access denied. Trainer only.' });
    }

    const profile = await TrainerProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const {
      expertise,
      experienceYears,
      location,
      bio,
      resumeUrl
    } = req.body;

    // Update only provided fields
    if (expertise !== undefined) profile.expertise = expertise;
    if (experienceYears !== undefined) profile.experienceYears = experienceYears;
    if (location !== undefined) profile.location = location;
    if (bio !== undefined) profile.bio = bio;
    if (resumeUrl !== undefined) profile.resumeUrl = resumeUrl;

    const updatedProfile = await profile.save();

    res.json(updatedProfile);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;