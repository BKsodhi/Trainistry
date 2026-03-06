const Project = require('../models/Project');
const Application = require('../models/Application');
const TrainerProfile = require('../models/TrainerProfile');

// ===============================
// GET LOGGED-IN TRAINER PROFILE
// ===============================
exports.getMyProfile = async (req, res) => {
  try {
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });
    }

    const profile = await TrainerProfile
      .findOne({ user: req.user._id })
      .populate('user', 'name email role');

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE LOGGED-IN TRAINER PROFILE
// ===============================
exports.updateMyProfile = async (req, res) => {
  try {
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });
    }

    const profile = await TrainerProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    const { expertise, experienceYears, location, bio, resumeUrl } = req.body;

    if (expertise !== undefined) profile.expertise = expertise;
    if (experienceYears !== undefined) profile.experienceYears = experienceYears;
    if (location !== undefined) profile.location = location;
    if (bio !== undefined) profile.bio = bio;
    if (resumeUrl !== undefined) profile.resumeUrl = resumeUrl;

    const updatedProfile = await profile.save();

    res.status(200).json({ success: true, data: updatedProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET ALL OPEN PROJECTS
// ===============================
exports.getAllProjects = async (req, res) => {
  try {
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });
    }

    const projects = await Project.find({ status: 'open' })
      .populate('company', 'name location industry')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET SINGLE PROJECT DETAILS
// ===============================
exports.getProjectById = async (req, res) => {
  try {
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });
    }

    const project = await Project.findById(req.params.projectId)
      .populate('company', 'name location industry');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// APPLY TO PROJECT
// ===============================
exports.applyToProject = async (req, res) => {
  try {
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ success: false, message: 'Only trainers can apply' });
    }

    const trainer = await TrainerProfile.findOne({ user: req.user._id });
    if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const existingApplication = await Application.findOne({ project: project._id, trainer: trainer._id });
    if (existingApplication) return res.status(400).json({ success: false, message: 'Already applied to this project' });

    const application = await Application.create({
      project: project._id,
      trainer: trainer._id,
      resumeUrl: req.body.resumeUrl,
      proposalMessage: req.body.proposalMessage,
      expectedRate: req.body.expectedRate
    });

    // Populate response
    const populatedApp = await Application.findById(application._id)
      .populate({
        path: 'project',
        populate: { path: 'company', select: 'name location industry' }
      });

    res.status(201).json({ success: true, data: populatedApp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET TRAINER'S OWN APPLICATIONS
// ===============================
exports.getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ success: false, message: 'Only trainers can view applications' });
    }

    const trainer = await TrainerProfile.findOne({ user: req.user._id });
    if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

    const applications = await Application.find({ trainer: trainer._id })
      .populate({
        path: 'project',
        populate: { path: 'company', select: 'name location industry' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};