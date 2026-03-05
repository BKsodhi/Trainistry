const Project = require('../models/Project');
const Application = require('../models/Application');
const TrainerProfile = require('../models/TrainerProfile');

exports.applyToProject = async (req, res) => {
  try {

    // 1️⃣ Allow only trainers
    if (req.user.role !== 'trainer') {
      return res.status(403).json({
        success: false,
        message: 'Only trainers can apply to projects'
      });
    }

    const { projectId } = req.params;
    const { resumeUrl, proposalMessage, expectedRate } = req.body;

    // 2️⃣ Validate required fields
    if (!resumeUrl || !proposalMessage) {
      return res.status(400).json({
        success: false,
        message: 'Resume URL and proposal message are required'
      });
    }

    // 3️⃣ Check project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // 4️⃣ Get trainer profile
    const trainerProfile = await TrainerProfile.findOne({
      user: req.user._id
    });

    if (!trainerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Trainer profile not found'
      });
    }

    // 5️⃣ Prevent duplicate applications
    const existingApplication = await Application.findOne({
      project: projectId,
      trainer: trainerProfile._id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this project'
      });
    }

    // 6️⃣ Create application
    const application = await Application.create({
      project: projectId,
      trainer: trainerProfile._id,
      resumeUrl,
      proposalMessage,
      expectedRate
    });

    // 7️⃣ Populate response
    const populatedApplication = await Application.findById(application._id)
      .populate({
        path: 'trainer',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .populate('project');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: populatedApplication
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};