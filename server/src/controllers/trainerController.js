// // const Project = require('../models/Project');
// // const Application = require('../models/Application');
// // const TrainerProfile = require('../models/TrainerProfile');
// // const Notification = require('../models/Notification');

// // // ===============================
// // // GET LOGGED-IN TRAINER PROFILE
// // // ===============================
// // exports.getMyProfile = async (req, res) => {
// //   try {
// //     if (req.user.role !== 'trainer') return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });

// //     const profile = await TrainerProfile.findOne({ user: req.user._id })
// //       .populate('user', 'name email role');

// //     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

// //     res.status(200).json({ success: true, data: profile });

// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ===============================
// // // UPDATE LOGGED-IN TRAINER PROFILE
// // // ===============================
// // exports.updateMyProfile = async (req, res) => {
// //   try {
// //     if (req.user.role !== 'trainer') return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });

// //     const profile = await TrainerProfile.findOne({ user: req.user._id });
// //     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

// //     const { expertise, experienceYears, location, bio, resumeUrl, availability } = req.body;

// //     if (expertise !== undefined) profile.expertise = expertise;
// //     if (experienceYears !== undefined) profile.experienceYears = experienceYears;
// //     if (location !== undefined) profile.location = location;
// //     if (bio !== undefined) profile.bio = bio;
// //     if (resumeUrl !== undefined) profile.resumeUrl = resumeUrl;
// //     if (availability && ['available', 'busy'].includes(availability)) profile.availability = availability;

// //     const updatedProfile = await profile.save();
// //     res.status(200).json({ success: true, data: updatedProfile });

// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ===============================
// // // LIKE OR DISLIKE TRAINER
// // // ===============================
// // exports.likeDislikeTrainer = async (req, res) => {
// //   try {
// //     const { trainerId, action } = req.body;

// //     const profile = await TrainerProfile.findById(trainerId);
// //     if (!profile) return res.status(404).json({ success: false, message: 'Trainer not found' });

// //     if (action === 'like') profile.likes += 1;
// //     else if (action === 'dislike') profile.dislikes += 1;
// //     else return res.status(400).json({ success: false, message: 'Invalid action' });

// //     const updatedProfile = await profile.save();
// //     res.status(200).json({ success: true, data: updatedProfile });

// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ===============================
// // // ADD FEEDBACK TO TRAINER
// // // ===============================
// // exports.addFeedback = async (req, res) => {
// //   try {
// //     const { trainerId, comment } = req.body;

// //     const profile = await TrainerProfile.findById(trainerId);
// //     if (!profile) return res.status(404).json({ success: false, message: 'Trainer not found' });

// //     profile.feedbacks.push({ sender: req.user._id, comment });
// //     const updatedProfile = await profile.save();

// //     res.status(200).json({ success: true, data: updatedProfile });

// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ===============================
// // // GET ALL OPEN PROJECTS
// // // ===============================
// // exports.getAllProjects = async (req, res) => {
// //   try {
// //     if (req.user.role !== 'trainer') return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });

// //     const projects = await Project.find({ status: 'open' })
// //       .populate('company', 'name location industry')
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({ success: true, data: projects });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ===============================
// // // GET SINGLE PROJECT DETAILS
// // // ===============================
// // exports.getProjectById = async (req, res) => {
// //   try {
// //     if (req.user.role !== 'trainer') return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });

// //     const project = await Project.findById(req.params.projectId)
// //       .populate('company', 'name location industry');
// //     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

// //     res.status(200).json({ success: true, data: project });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ===============================
// // // APPLY TO PROJECT
// // // ===============================
// // exports.applyToProject = async (req, res) => {
// //   try {
// //     if (req.user.role !== 'trainer') return res.status(403).json({ success: false, message: 'Only trainers can apply' });

// //     const trainer = await TrainerProfile.findOne({ user: req.user._id });
// //     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

// //     const project = await Project.findById(req.params.projectId);
// //     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

// //     const existingApplication = await Application.findOne({ project: project._id, trainer: trainer._id });
// //     if (existingApplication) return res.status(400).json({ success: false, message: 'Already applied to this project' });

// //     const application = await Application.create({
// //       project: project._id,
// //       trainer: trainer._id,
// //       resumeUrl: req.body.resumeUrl,
// //       proposalMessage: req.body.proposalMessage,
// //       expectedRate: req.body.expectedRate
// //     });

// //     // Notify company of new application
// //     await Notification.create({
// //       recipient: project.company,
// //       recipientType: 'company',
// //       message: `${trainer.user} applied to your project "${project.title}"`,
// //       type: 'new_application',
// //       relatedApplication: application._id
// //     });

// //     const populatedApp = await Application.findById(application._id)
// //       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } });

// //     res.status(201).json({ success: true, data: populatedApp });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // ===============================
// // // GET TRAINER'S OWN APPLICATIONS
// // // ===============================
// // exports.getMyApplications = async (req, res) => {
// //   try {
// //     if (req.user.role !== 'trainer') return res.status(403).json({ success: false, message: 'Only trainers can view applications' });

// //     const trainer = await TrainerProfile.findOne({ user: req.user._id });
// //     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

// //     const applications = await Application.find({ trainer: trainer._id })
// //       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({ success: true, data: applications });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// // // ===============================
// // // UPLOAD TRAINER RESUME
// // // ===============================
// // exports.uploadResume = async (req, res) => {
// //   try {

// //     if (req.user.role !== 'trainer') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Trainer access only'
// //       });
// //     }

// //     const trainer = await TrainerProfile.findOne({ user: req.user._id });

// //     if (!trainer) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Trainer profile not found'
// //       });
// //     }

// //     if (!req.file) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'No resume file uploaded'
// //       });
// //     }

// //     const resumePath = `/uploads/resumes/${req.file.filename}`;

// //     trainer.resumeUrl = resumePath;

// //     await trainer.save();

// //     res.status(200).json({
// //       success: true,
// //       message: 'Resume uploaded successfully',
// //       resumeUrl: resumePath
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };
// // // ===============================
// // // SEARCH TRAINERS
// // // ===============================
// // exports.searchTrainers = async (req, res) => {
// //   try {

// //     const { expertise, location, availability, experienceYears } = req.query;

// //     const filter = {};

// //     if (expertise) {
// //       filter.expertise = { $regex: expertise, $options: 'i' };
// //     }

// //     if (location) {
// //       filter.location = { $regex: location, $options: 'i' };
// //     }

// //     if (availability) {
// //       filter.availability = availability;
// //     }

// //     if (experienceYears) {
// //       filter.experienceYears = { $gte: Number(experienceYears) };
// //     }

// //     const trainers = await TrainerProfile.find(filter)
// //       .populate('user', 'name email')
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: trainers.length,
// //       data: trainers
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };

// const Project = require('../models/Project');
// const Application = require('../models/Application');
// const TrainerProfile = require('../models/TrainerProfile');
// const Notification = require('../models/Notification');

// // ===============================
// // GET LOGGED-IN TRAINER PROFILE
// // ===============================
// exports.getMyProfile = async (req, res) => {
//   try {
//     if (req.user.role !== 'trainer')
//       return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });

//     const profile = await TrainerProfile.findOne({ user: req.user._id })
//       .populate('user', 'name email role');

//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // UPDATE LOGGED-IN TRAINER PROFILE
// // ===============================
// exports.updateMyProfile = async (req, res) => {
//   try {
//     if (req.user.role !== 'trainer')
//       return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });

//     const profile = await TrainerProfile.findOne({ user: req.user._id });
//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     const { expertise, experienceYears, location, bio, resumeUrl, availability } = req.body;

//     if (expertise !== undefined) profile.expertise = expertise;
//     if (experienceYears !== undefined) profile.experienceYears = experienceYears;
//     if (location !== undefined) profile.location = location;
//     if (bio !== undefined) profile.bio = bio;
//     if (resumeUrl !== undefined) profile.resumeUrl = resumeUrl;
//     if (availability && ['available', 'busy'].includes(availability)) profile.availability = availability;

//     const updatedProfile = await profile.save();
//     res.status(200).json({ success: true, data: updatedProfile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // LIKE OR DISLIKE TRAINER
// // ===============================
// exports.likeDislikeTrainer = async (req, res) => {
//   try {
//     const { trainerId, action } = req.body;

//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: 'Trainer not found' });

//     if (action === 'like') profile.likes += 1;
//     else if (action === 'dislike') profile.dislikes += 1;
//     else return res.status(400).json({ success: false, message: 'Invalid action' });

//     const updatedProfile = await profile.save();
//     res.status(200).json({ success: true, data: updatedProfile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // ADD FEEDBACK TO TRAINER
// // ===============================
// exports.addFeedback = async (req, res) => {
//   try {
//     const { trainerId, comment } = req.body;

//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: 'Trainer not found' });

//     profile.feedbacks.push({ sender: req.user._id, comment });
//     const updatedProfile = await profile.save();

//     res.status(200).json({ success: true, data: updatedProfile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // GET ALL OPEN PROJECTS
// // ===============================
// exports.getAllProjects = async (req, res) => {
//   try {
//     if (req.user.role !== 'trainer')
//       return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });

//     const projects = await Project.find({ status: 'open' })
//       .populate('company', 'name location industry')
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // GET SINGLE PROJECT DETAILS
// // ===============================
// exports.getProjectById = async (req, res) => {
//   try {
//     if (req.user.role !== 'trainer')
//       return res.status(403).json({ success: false, message: 'Access denied. Trainer only.' });

//     const project = await Project.findById(req.params.projectId)
//       .populate('company', 'name location industry');
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // APPLY TO PROJECT
// // ===============================
// exports.applyToProject = async (req, res) => {
//   try {
//     if (req.user.role !== 'trainer')
//       return res.status(403).json({ success: false, message: 'Only trainers can apply' });

//     const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const project = await Project.findById(req.params.projectId);
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

//     const existingApplication = await Application.findOne({ project: project._id, trainer: trainer._id });
//     if (existingApplication) return res.status(400).json({ success: false, message: 'Already applied to this project' });

//     // 🔹 Use the uploaded file's path instead of req.body.resumeUrl
//     const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : trainer.resumeUrl;

//     const application = await Application.create({
//       project: project._id,
//       trainer: trainer._id,
//       resumeUrl: resumePath,
//       proposalMessage: req.body.proposalMessage,
//       expectedRate: req.body.expectedRate
//     });

//     // Notify company
//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `${trainer.user.name} applied to your project "${project.title}"`,
//       type: 'new_application',
//       relatedApplication: application._id
//     });

//     const populatedApp = await Application.findById(application._id)
//       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } });

//     res.status(201).json({ success: true, data: populatedApp });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // UPLOAD TRAINER RESUME
// // ===============================
// exports.uploadResume = async (req, res) => {
//   try {
//     if (req.user.role !== 'trainer') {
//       return res.status(403).json({ success: false, message: 'Trainer access only' });
//     }

//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'No resume file uploaded' });
//     }

//     // 🔹 Save uploaded file path
//     const resumePath = `/uploads/resumes/${req.file.filename}`;
//     trainer.resumeUrl = resumePath;
//     await trainer.save();

//     res.status(200).json({
//       success: true,
//       message: 'Resume uploaded successfully',
//       resumeUrl: resumePath
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // GET TRAINER'S OWN APPLICATIONS
// // ===============================
// exports.getMyApplications = async (req, res) => {
//   try {
//     if (req.user.role !== 'trainer')
//       return res.status(403).json({ success: false, message: 'Only trainers can view applications' });

//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const applications = await Application.find({ trainer: trainer._id })
//       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // // ===============================
// // // UPLOAD TRAINER RESUME
// // // ===============================
// // exports.uploadResume = async (req, res) => {
// //   try {
// //     if (req.user.role !== 'trainer') {
// //       return res.status(403).json({ success: false, message: 'Trainer access only' });
// //     }

// //     const trainer = await TrainerProfile.findOne({ user: req.user._id });
// //     if (!trainer) {
// //       return res.status(404).json({ success: false, message: 'Trainer profile not found' });
// //     }

// //     if (!req.file) {
// //       return res.status(400).json({ success: false, message: 'No resume file uploaded' });
// //     }

// //     const resumePath = `/uploads/resumes/${req.file.filename}`;
// //     trainer.resumeUrl = resumePath;
// //     await trainer.save();

// //     res.status(200).json({
// //       success: true,
// //       message: 'Resume uploaded successfully',
// //       resumeUrl: resumePath
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // ===============================
// // SEARCH TRAINERS
// // ===============================
// exports.searchTrainers = async (req, res) => {
//   try {
//     const { expertise, location, availability, experienceYears } = req.query;
//     const filter = {};

//     if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
//     if (location) filter.location = { $regex: location, $options: 'i' };
//     if (availability) filter.availability = availability;
//     if (experienceYears) filter.experienceYears = { $gte: Number(experienceYears) };

//     const trainers = await TrainerProfile.find(filter)
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: trainers.length,
//       data: trainers
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const Project = require('../models/Project');
// const Application = require('../models/Application');
// const TrainerProfile = require('../models/TrainerProfile');
// const Notification = require('../models/Notification');

// // ===============================
// // GET TRAINER DASHBOARD DATA
// // ===============================
// // This handles the stats (Applied, Interviews, Accepted) for the dashboard view
// exports.getTrainerDashboard = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id })
//       .populate('user', 'name email role');
    
//     if (!trainer) {
//       return res.status(404).json({ success: false, message: 'Trainer profile not found' });
//     }

//     // Calculate specific stats for the stats-grid
//     const totalApplications = await Application.countDocuments({ trainer: trainer._id });
//     const interviews = await Application.countDocuments({ 
//       trainer: trainer._id, 
//       status: 'interview_scheduled' 
//     });
//     const accepted = await Application.countDocuments({ 
//       trainer: trainer._id, 
//       status: 'accepted' 
//     });

//     res.status(200).json({ 
//       success: true, 
//       data: { 
//         profile: trainer,
//         stats: { 
//           totalApplications, 
//           interviews, 
//           accepted 
//         }
//       } 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // GET LOGGED-IN TRAINER PROFILE
// // ===============================
// exports.getMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id })
//       .populate('user', 'name email role');

//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // UPDATE PROFILE & TOGGLE STATUS
// // ===============================
// exports.updateMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id });
//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     const { expertise, experienceYears, location, bio, resumeUrl, availability } = req.body;

//     if (expertise !== undefined) profile.expertise = expertise;
//     if (experienceYears !== undefined) profile.experienceYears = experienceYears;
//     if (location !== undefined) profile.location = location;
//     if (bio !== undefined) profile.bio = bio;
//     if (resumeUrl !== undefined) profile.resumeUrl = resumeUrl;
    
//     // Toggle availability logic
//     if (availability && ['available', 'busy'].includes(availability)) {
//         profile.availability = availability;
//     }

//     const updatedProfile = await profile.save();
    
//     // Send back availability specifically for the frontend toggle handler
//     res.status(200).json({ 
//         success: true, 
//         data: updatedProfile, 
//         availability: updatedProfile.availability 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // GET ALL OPEN PROJECTS
// // ===============================
// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ status: 'open' })
//       .populate('company', 'name location industry')
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // GET SINGLE PROJECT DETAILS
// // ===============================
// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId)
//       .populate('company', 'name location industry');
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // APPLY TO PROJECT
// // ===============================
// exports.applyToProject = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const project = await Project.findById(req.params.projectId);
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

//     const existingApplication = await Application.findOne({ project: project._id, trainer: trainer._id });
//     if (existingApplication) return res.status(400).json({ success: false, message: 'Already applied' });

//     const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : trainer.resumeUrl;

//     const application = await Application.create({
//       project: project._id,
//       trainer: trainer._id,
//       resumeUrl: resumePath,
//       proposalMessage: req.body.proposalMessage,
//       expectedRate: req.body.expectedRate
//     });

//     // Notify company of the new application
//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `${trainer.user.name} applied to your project "${project.title}"`,
//       type: 'new_application',
//       relatedApplication: application._id
//     });

//     res.status(201).json({ success: true, data: application });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // GET TRAINER'S OWN APPLICATIONS
// // ===============================
// exports.getMyApplications = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const applications = await Application.find({ trainer: trainer._id })
//       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // UPLOAD TRAINER RESUME
// // ===============================
// exports.uploadResume = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

//     const resumePath = `/uploads/resumes/${req.file.filename}`;
//     trainer.resumeUrl = resumePath;
//     await trainer.save();

//     res.status(200).json({ success: true, message: 'Resume uploaded', resumeUrl: resumePath });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // SEARCH TRAINERS
// // ===============================
// exports.searchTrainers = async (req, res) => {
//   try {
//     const { expertise, location } = req.query;
//     const filter = {};

//     if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
//     if (location) filter.location = { $regex: location, $options: 'i' };

//     const trainers = await TrainerProfile.find(filter).populate('user', 'name email');
//     res.status(200).json({ success: true, count: trainers.length, data: trainers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // LIKE/DISLIKE & FEEDBACK
// // ===============================
// exports.likeDislikeTrainer = async (req, res) => {
//   try {
//     const { trainerId, action } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: 'Trainer not found' });

//     if (action === 'like') profile.likes += 1;
//     else if (action === 'dislike') profile.dislikes += 1;
//     else return res.status(400).json({ success: false, message: 'Invalid action' });

//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.addFeedback = async (req, res) => {
//   try {
//     const { trainerId, comment } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: 'Trainer not found' });

//     profile.feedbacks.push({ sender: req.user._id, comment });
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// // };

// const Project = require('../models/Project');
// const Application = require('../models/Application');
// const TrainerProfile = require('../models/TrainerProfile');
// const Notification = require('../models/Notification');
// const User = require('../models/User');

// // // ===============================
// // // GET TRAINER DASHBOARD DATA
// // // ===============================
// // exports.getTrainerDashboard = async (req, res) => {
// //   try {
// //     const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email role');
// //     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

// //     const totalApplications = await Application.countDocuments({ trainer: trainer._id });
// //     const interviews = await Application.countDocuments({ trainer: trainer._id, status: 'interview_scheduled' });
// //     const accepted = await Application.countDocuments({ trainer: trainer._id, status: 'accepted' });

// //     res.status(200).json({ 
// //       success: true, 
// //       data: { profile: trainer, stats: { totalApplications, interviews, accepted } } 
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// exports.getTrainerDashboard = async (req, res) => {
//   try {
//     // UPDATED: Added followers and following to populate
//     const trainer = await TrainerProfile.findOne({ user: req.user._id })
//       .populate('user', 'name email role followers following');
      
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const totalApplications = await Application.countDocuments({ trainer: trainer._id });
//     const interviews = await Application.countDocuments({ trainer: trainer._id, status: 'interview_scheduled' });
//     const accepted = await Application.countDocuments({ trainer: trainer._id, status: 'accepted' });

//     res.status(200).json({ 
//       success: true, 
//       data: { profile: trainer, stats: { totalApplications, interviews, accepted } } 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // // ===============================
// // // GET LOGGED-IN TRAINER PROFILE
// // // ===============================
// // exports.getMyProfile = async (req, res) => {
// //   try {
// //     const profile = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email role');
// //     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
// //     res.status(200).json({ success: true, data: profile });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// exports.getMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id })
//       .populate({
//         path: 'user',
//         select: 'name email role followers following',
//         // This part is the "Deep Populate" to get the details of the followers themselves
//         populate: [
//           { path: 'followers', select: 'name role' },
//           { path: 'following', select: 'name role' }
//         ]
//       });

//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // UPDATE PROFILE & RESUME
// // ===============================
// exports.updateMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id });
//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     const { expertise, experienceYears, location, bio, availability } = req.body;

//     // Handle JSON stringified arrays from FormData
//     if (expertise) {
//       try {
//         profile.expertise = JSON.parse(expertise);
//       } catch (e) {
//         profile.expertise = expertise;
//       }
//     }

//     if (experienceYears !== undefined) profile.experienceYears = experienceYears;
//     if (location !== undefined) profile.location = location;
//     if (bio !== undefined) profile.bio = bio;
//     if (availability && ['available', 'busy'].includes(availability)) profile.availability = availability;

//     // Handle File Upload
//     if (req.file) {
//       profile.resumeUrl = `http://localhost:5000/uploads/resumes/${req.file.filename}`;
//     }

//     const updatedProfile = await profile.save();
//     res.status(200).json({ success: true, data: updatedProfile, availability: updatedProfile.availability });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PROJECTS & APPLICATIONS
// // ===============================
// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ status: 'open' }).populate('company', 'name location industry').sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId).populate('company', 'name location industry');
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.applyToProject = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
//     const project = await Project.findById(req.params.projectId);
    
//     const existing = await Application.findOne({ project: project._id, trainer: trainer._id });
//     if (existing) return res.status(400).json({ success: false, message: 'Already applied' });

//     const resumePath = req.file ? `http://localhost:5000/uploads/resumes/${req.file.filename}` : trainer.resumeUrl;

//     const application = await Application.create({
//       project: project._id,
//       trainer: trainer._id,
//       resumeUrl: resumePath,
//       proposalMessage: req.body.proposalMessage,
//       expectedRate: req.body.expectedRate
//     });

//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `${trainer.user.name} applied to "${project.title}"`,
//       type: 'new_application',
//       relatedApplication: application._id
//     });

//     res.status(201).json({ success: true, data: application });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyApplications = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     const applications = await Application.find({ trainer: trainer._id })
//       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // // ===============================
// // // SEARCH & SOCIAL
// // // ===============================
// // exports.searchTrainers = async (req, res) => {
// //   try {
// //     const { expertise, location } = req.query;
// //     const filter = {};
// //     if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
// //     if (location) filter.location = { $regex: location, $options: 'i' };
// //     const trainers = await TrainerProfile.find(filter).populate('user', 'name email');
// //     res.status(200).json({ success: true, data: trainers });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// exports.likeDislikeTrainer = async (req, res) => {
//   try {
//     const { trainerId, action } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (action === 'like') profile.likes += 1;
//     else profile.dislikes += 1;
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ===============================
// // WITHDRAW APPLICATION
// // ===============================
// exports.withdrawApplication = async (req, res) => {
//   try {
//     const applicationId = req.params.applicationId;
    
//     // 1. Find the application and ensure it belongs to the logged-in trainer
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     const application = await Application.findOne({ 
//       _id: applicationId, 
//       trainer: trainer._id 
//     });

//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found or unauthorized" });
//     }

//     // 2. Prevent withdrawal if already accepted (optional business logic)
//     if (application.status === 'accepted') {
//       return res.status(400).json({ success: false, message: "Cannot withdraw an accepted application" });
//     }

//     // 3. Delete the application
//     await Application.findByIdAndDelete(applicationId);

//     res.status(200).json({ success: true, message: "Application withdrawn successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// exports.addFeedback = async (req, res) => {
//   try {
//     const { trainerId, comment } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     profile.feedbacks.push({ sender: req.user._id, comment, date: Date.now() });
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // // @desc    Follow or Unfollow a User (Trainer or Company)
// // // @route   PUT /api/trainer/follow/:id
// // exports.followUnfollowUser = async (req, res) => {
// //   try {
// //     const targetUserId = req.params.id;
// //     const currentUserId = req.user.id;

// //     if (targetUserId === currentUserId) {
// //       return res.status(400).json({ success: false, message: "You cannot follow yourself" });
// //     }

// //     const User = require('../models/User'); // Ensure User model is imported
// //     const targetUser = await User.findById(targetUserId);
// //     const currentUser = await User.findById(currentUserId);

// //     if (!targetUser) {
// //       return res.status(404).json({ success: false, message: "User not found" });
// //     }

// //     // Toggle Logic
// //     if (currentUser.following.includes(targetUserId)) {
// //       // Unfollow
// //       currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
// //       targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId);
// //       await currentUser.save();
// //       await targetUser.save();
// //       res.status(200).json({ success: true, message: "Unfollowed successfully", isFollowing: false });
// //     } else {
// //       // Follow
// //       currentUser.following.push(targetUserId);
// //       targetUser.followers.push(currentUserId);
// //       await currentUser.save();
// //       await targetUser.save();
// //       res.status(200).json({ success: true, message: "Followed successfully", isFollowing: true });
// //     }
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };
// // @desc    Follow or Unfollow a user
// // @route   PUT /api/trainer/follow/:id
// // @access  Private
// exports.followUnfollowUser = async (req, res) => {
//   try {
//     const targetUserId = req.params.id;
//     const currentUserId = req.user._id;

//     if (targetUserId === currentUserId.toString()) {
//       return res.status(400).json({ success: false, message: "You cannot follow yourself" });
//     }

//     const targetUser = await User.findById(targetUserId);
//     const currentUser = await User.findById(currentUserId);

//     if (!targetUser) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const isFollowing = currentUser.following.includes(targetUserId);

//     if (isFollowing) {
//       // Unfollow Logic
//       currentUser.following = currentUser.following.filter(
//         (id) => id.toString() !== targetUserId
//       );
//       targetUser.followers = targetUser.followers.filter(
//         (id) => id.toString() !== currentUserId.toString()
//       );
      
//       await currentUser.save();
//       await targetUser.save();

//       return res.status(200).json({
//         success: true,
//         message: "Unfollowed successfully",
//         isFollowing: false,
//       });
//     } else {
//       // Follow Logic
//       currentUser.following.push(targetUserId);
//       targetUser.followers.push(currentUserId);

//       await currentUser.save();
//       await targetUser.save();

//       return res.status(200).json({
//         success: true,
//         message: "Followed successfully",
//         isFollowing: true,
//       });
//     }
//   } catch (error) {
//     console.error("Follow/Unfollow Error:", error);
//     res.status(500).json({ success: false, message: "Server error during connection update" });
//   }
// };
// // @desc    Get achievements from followed users for the Network Feed
// // @route   GET /api/trainer/network-feed
// exports.getNetworkFeed = async (req, res) => {
//   try {
//     const User = require('../models/User'); 
//     const Achievement = require('../models/Achievement');
    
//     const currentUser = await User.findById(req.user.id);
    
//     // Create an array including the user's own ID and everyone they follow
//     const feedUserIds = [...currentUser.following, req.user.id];

//     // Find achievements where the trainer is in our feed list
//     const achievements = await Achievement.find({ trainer: { $in: feedUserIds } })
//       .populate('trainer', 'name role') // Show who posted it
//       .sort({ createdAt: -1 }); // Newest first

//     res.status(200).json({ 
//       success: true, 
//       count: achievements.length,
//       data: achievements 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ===============================
// // SEARCH TRAINERS (Unified)
// // ===============================
// exports.searchTrainers = async (req, res) => {
//   try {
//     const { name, expertise, location } = req.query;
//     let userIds = [];

//     // 1. If searching by name, find users first
//     if (name) {
//       const users = await User.find({ 
//         name: { $regex: name, $options: 'i' },
//         role: 'trainer' 
//       }).select('_id');
//       userIds = users.map(u => u._id);
//     }

//     // 2. Build the Profile Filter
//     const profileFilter = {};
//     if (name) profileFilter.user = { $in: userIds };
//     if (expertise) profileFilter.expertise = { $regex: expertise, $options: 'i' };
//     if (location) profileFilter.location = { $regex: location, $options: 'i' };

//     // 3. Execute Search
//     const trainers = await TrainerProfile.find(profileFilter)
//       .populate('user', 'name email followers following');

//     res.status(200).json({ success: true, data: trainers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const Project = require('../models/Project');
// const Application = require('../models/Application');
// const TrainerProfile = require('../models/TrainerProfile');
// const Notification = require('../models/Notification');
// const User = require('../models/User');
// const Achievement = require('../models/Achievement');

// // ===============================
// // DASHBOARD & PROFILE
// // ===============================

// exports.getTrainerDashboard = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id })
//       .populate('user', 'name email role followers following');
      
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const totalApplications = await Application.countDocuments({ trainer: trainer._id });
//     const interviews = await Application.countDocuments({ trainer: trainer._id, status: 'interview_scheduled' });
//     const accepted = await Application.countDocuments({ trainer: trainer._id, status: 'accepted' });

//     res.status(200).json({ 
//       success: true, 
//       data: { profile: trainer, stats: { totalApplications, interviews, accepted } } 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id })
//       .populate({
//         path: 'user',
//         select: 'name email role followers following',
//         populate: [
//           { path: 'followers', select: 'name role' },
//           { path: 'following', select: 'name role' }
//         ]
//       });

//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.updateMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id });
//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     const { expertise, experienceYears, location, bio, availability } = req.body;

//     if (expertise) {
//       try {
//         profile.expertise = JSON.parse(expertise);
//       } catch (e) {
//         profile.expertise = expertise;
//       }
//     }

//     if (experienceYears !== undefined) profile.experienceYears = experienceYears;
//     if (location !== undefined) profile.location = location;
//     if (bio !== undefined) profile.bio = bio;
//     if (availability && ['available', 'busy'].includes(availability)) profile.availability = availability;

//     if (req.file) {
//       profile.resumeUrl = `http://localhost:5000/uploads/resumes/${req.file.filename}`;
//     }

//     const updatedProfile = await profile.save();
//     res.status(200).json({ success: true, data: updatedProfile, availability: updatedProfile.availability });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PROJECTS & APPLICATIONS
// // ===============================

// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ status: 'open' }).populate('company', 'name location industry').sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId).populate('company', 'name location industry');
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.applyToProject = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
//     const project = await Project.findById(req.params.projectId);
    
//     const existing = await Application.findOne({ project: project._id, trainer: trainer._id });
//     if (existing) return res.status(400).json({ success: false, message: 'Already applied' });

//     const resumePath = req.file ? `http://localhost:5000/uploads/resumes/${req.file.filename}` : trainer.resumeUrl;

//     const application = await Application.create({
//       project: project._id,
//       trainer: trainer._id,
//       resumeUrl: resumePath,
//       proposalMessage: req.body.proposalMessage,
//       expectedRate: req.body.expectedRate
//     });

//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `${trainer.user.name} applied to "${project.title}"`,
//       type: 'new_application',
//       relatedApplication: application._id
//     });

//     res.status(201).json({ success: true, data: application });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyApplications = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     const applications = await Application.find({ trainer: trainer._id })
//       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.withdrawApplication = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     const application = await Application.findOne({ _id: req.params.applicationId, trainer: trainer._id });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });
//     if (application.status === 'accepted') return res.status(400).json({ success: false, message: "Cannot withdraw accepted application" });

//     await Application.findByIdAndDelete(req.params.applicationId);
//     res.status(200).json({ success: true, message: "Application withdrawn" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // SOCIAL & NETWORK
// // ===============================

// exports.searchTrainers = async (req, res) => {
//   try {
//     const { name, expertise, location } = req.query;
//     let userIds = [];

//     if (name) {
//       const users = await User.find({ name: { $regex: name, $options: 'i' }, role: 'trainer' }).select('_id');
//       userIds = users.map(u => u._id);
//     }

//     const filter = {};
//     if (name) filter.user = { $in: userIds };
//     if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
//     if (location) filter.location = { $regex: location, $options: 'i' };

//     const trainers = await TrainerProfile.find(filter).populate('user', 'name email followers following');
//     res.status(200).json({ success: true, data: trainers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // exports.followUnfollowUser = async (req, res) => {
// //   try {
// //     const targetUserId = req.params.id;
// //     const currentUserId = req.user._id;

// //     if (targetUserId === currentUserId.toString()) {
// //       return res.status(400).json({ success: false, message: "Cannot follow yourself" });
// //     }

// //     const targetUser = await User.findById(targetUserId);
// //     const currentUser = await User.findById(currentUserId);

// //     if (!targetUser) return res.status(404).json({ success: false, message: "User not found" });

// //     const isFollowing = currentUser.following.includes(targetUserId);

// //     if (isFollowing) {
// //       currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
// //       targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId.toString());
// //     } else {
// //       currentUser.following.push(targetUserId);
// //       targetUser.followers.push(currentUserId);
// //     }

// //     await currentUser.save();
// //     await targetUser.save();

// //     res.status(200).json({ success: true, isFollowing: !isFollowing });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: "Connection update failed" });
// //   }
// // };
// exports.followUnfollowUser = async (req, res) => {
//   try {
//     const targetUserId = req.params.id;
//     // Use req.user._id (Mongoose Object) or req.user.id (String)
//     const currentUserId = req.user._id || req.user.id; 

//     if (!targetUserId || targetUserId === "undefined") {
//       return res.status(400).json({ success: false, message: "Invalid Target User ID" });
//     }

//     if (targetUserId === currentUserId.toString()) {
//       return res.status(400).json({ success: false, message: "You cannot follow yourself" });
//     }

//     // 1. Fetch users and handle potential nulls
//     const targetUser = await User.findById(targetUserId);
//     const currentUser = await User.findById(currentUserId);

//     if (!targetUser) {
//       return res.status(404).json({ success: false, message: "The user you are trying to follow does not exist." });
//     }
//     if (!currentUser) {
//       return res.status(404).json({ success: false, message: "Your session is invalid. Please re-login." });
//     }

//     // 2. Initialize arrays if they don't exist in DB yet (Prevents .includes crash)
//     if (!currentUser.following) currentUser.following = [];
//     if (!targetUser.followers) targetUser.followers = [];

//     // 3. Check if already following
//     const isFollowing = currentUser.following.some(id => id.toString() === targetUserId);

//     if (isFollowing) {
//       // Unfollow Logic
//       currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
//       targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId.toString());
//     } else {
//       // Follow Logic
//       currentUser.following.push(targetUserId);
//       targetUser.followers.push(currentUserId);
//     }

//     // 4. Save both documents
//     await currentUser.save();
//     await targetUser.save();

//     return res.status(200).json({
//       success: true,
//       message: isFollowing ? "Unfollowed" : "Followed",
//       isFollowing: !isFollowing
//     });

//   } catch (error) {
//     // This will print the EXACT error in your VS Code terminal
//     console.error("CRITICAL FOLLOW ERROR:", error); 
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal Server Error", 
//       error: error.message 
//     });
//   }
// };

// // exports.getNetworkFeed = async (req, res) => {
// //   try {
// //     const currentUser = await User.findById(req.user._id);
// //     const followedUserIds = [...currentUser.following, req.user._id];

// //     // Get profiles for followed users to find their achievements
// //     const profiles = await TrainerProfile.find({ user: { $in: followedUserIds } }).select('_id');
// //     const profileIds = profiles.map(p => p._id);

// //     const achievements = await Achievement.find({ trainer: { $in: profileIds } })
// //       .populate({ path: 'trainer', populate: { path: 'user', select: 'name' } })
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({ success: true, data: achievements });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// exports.getNetworkFeed = async (req, res) => {
//   try {
//     // 1. Get current user to see who they already follow
//     const currentUser = await User.findById(req.user._id).select('following');
    
//     // 2. Fetch ALL achievements from all trainers (not just followed ones)
//     const achievements = await Achievement.find()
//       .populate({
//         path: 'trainer',
//         populate: { path: 'user', select: 'name role followers following' }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ 
//       success: true, 
//       data: achievements,
//       currentUserFollowing: currentUser.following // Send this to help frontend state
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.likeDislikeTrainer = async (req, res) => {
//   try {
//     const { trainerId, action } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (action === 'like') profile.likes += 1;
//     else profile.dislikes += 1;
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.addFeedback = async (req, res) => {
//   try {
//     const { trainerId, comment } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     profile.feedbacks.push({ sender: req.user._id, comment, date: Date.now() });
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// const Project = require('../models/Project');
// const Application = require('../models/Application');
// const TrainerProfile = require('../models/TrainerProfile');
// const Notification = require('../models/Notification');
// const User = require('../models/User');
// const Achievement = require('../models/Achievement');

// // ===============================
// // DASHBOARD & PROFILE
// // ===============================

// exports.getTrainerDashboard = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id })
//       .populate('user', 'name email role followers following');
      
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const totalApplications = await Application.countDocuments({ trainer: trainer._id });
//     const interviews = await Application.countDocuments({ trainer: trainer._id, status: 'interview_scheduled' });
//     const accepted = await Application.countDocuments({ trainer: trainer._id, status: 'accepted' });

//     res.status(200).json({ 
//       success: true, 
//       data: { profile: trainer, stats: { totalApplications, interviews, accepted } } 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id })
//       .populate({
//         path: 'user',
//         select: 'name email role followers following',
//         populate: [
//           { path: 'followers', select: 'name role' },
//           { path: 'following', select: 'name role' }
//         ]
//       });

//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.updateMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id });
//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     const { expertise, experienceYears, location, bio, availability } = req.body;

//     if (expertise) {
//       try {
//         profile.expertise = JSON.parse(expertise);
//       } catch (e) {
//         profile.expertise = expertise;
//       }
//     }

//     if (experienceYears !== undefined) profile.experienceYears = experienceYears;
//     if (location !== undefined) profile.location = location;
//     if (bio !== undefined) profile.bio = bio;
//     if (availability && ['available', 'busy'].includes(availability)) profile.availability = availability;

//     if (req.file) {
//       profile.resumeUrl = `http://localhost:5000/uploads/resumes/${req.file.filename}`;
//     }

//     const updatedProfile = await profile.save();
//     res.status(200).json({ success: true, data: updatedProfile, availability: updatedProfile.availability });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PROJECTS & APPLICATIONS
// // ===============================

// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ status: 'open' }).populate('company', 'name location industry').sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId).populate('company', 'name location industry');
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.applyToProject = async (req, res) => {
//   try {
//     const { projectId } = req.params;
    
//     const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
//     if (!trainer) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    
//     const existing = await Application.findOne({ project: projectId, trainer: trainer._id });
//     if (existing) return res.status(400).json({ success: false, message: 'Already applied to this project' });

//     // Handle resume logic: use upload if present, otherwise use existing profile resume
//     const resumePath = req.file 
//       ? `http://localhost:5000/uploads/resumes/${req.file.filename}` 
//       : trainer.resumeUrl;

//     if (!resumePath) {
//       return res.status(400).json({ success: false, message: "Please upload a resume" });
//     }

//     const application = await Application.create({
//       project: projectId,
//       trainer: trainer._id,
//       resumeUrl: resumePath,
//       proposalMessage: req.body.proposalMessage,
//       expectedRate: req.body.expectedRate
//     });

//     // Create Notification for the Company
//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `${trainer.user.name} applied to your project: "${project.title}"`,
//       type: 'new_application',
//       relatedApplication: application._id
//     });

//     res.status(201).json({ success: true, data: application });
//   } catch (error) {
//     console.error("APPLY_ERROR:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyApplications = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });

//     const applications = await Application.find({ trainer: trainer._id })
//       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.withdrawApplication = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     const application = await Application.findOne({ _id: req.params.applicationId, trainer: trainer._id });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });
//     if (application.status === 'accepted') return res.status(400).json({ success: false, message: "Cannot withdraw accepted application" });

//     await Application.findByIdAndDelete(req.params.applicationId);
//     res.status(200).json({ success: true, message: "Application withdrawn" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // SOCIAL & NETWORK
// // ===============================

// exports.searchTrainers = async (req, res) => {
//   try {
//     const { name, expertise, location } = req.query;
//     let userIds = [];

//     if (name) {
//       const users = await User.find({ name: { $regex: name, $options: 'i' }, role: 'trainer' }).select('_id');
//       userIds = users.map(u => u._id);
//     }

//     const filter = {};
//     if (name) filter.user = { $in: userIds };
//     if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
//     if (location) filter.location = { $regex: location, $options: 'i' };

//     const trainers = await TrainerProfile.find(filter).populate('user', 'name email followers following');
//     res.status(200).json({ success: true, data: trainers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.followUnfollowUser = async (req, res) => {
//   try {
//     const targetUserId = req.params.id;
//     const currentUserId = req.user._id;

//     if (targetUserId === currentUserId.toString()) {
//       return res.status(400).json({ success: false, message: "You cannot follow yourself" });
//     }

//     const targetUser = await User.findById(targetUserId);
//     const currentUser = await User.findById(currentUserId);

//     if (!targetUser || !currentUser) return res.status(404).json({ success: false, message: "User not found" });

//     if (!currentUser.following) currentUser.following = [];
//     if (!targetUser.followers) targetUser.followers = [];

//     const isFollowing = currentUser.following.some(id => id.toString() === targetUserId);

//     if (isFollowing) {
//       currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
//       targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId.toString());
//     } else {
//       currentUser.following.push(targetUserId);
//       targetUser.followers.push(currentUserId);
//     }

//     await currentUser.save();
//     await targetUser.save();

//     res.status(200).json({ success: true, isFollowing: !isFollowing, message: isFollowing ? "Unfollowed" : "Followed" });
//   } catch (error) {
//     console.error("FOLLOW_ERROR:", error);
//     res.status(500).json({ success: false, message: "Connection update failed" });
//   }
// };

// exports.getNetworkFeed = async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.user._id).select('following');
    
//     // Fetch achievements from all trainers for a dynamic network feed
//     const achievements = await Achievement.find()
//       .populate({
//         path: 'trainer',
//         populate: { path: 'user', select: 'name role followers following' }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ 
//       success: true, 
//       data: achievements,
//       currentUserFollowing: currentUser.following 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.likeDislikeTrainer = async (req, res) => {
//   try {
//     const { trainerId, action } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     if (action === 'like') profile.likes += 1;
//     else profile.dislikes += 1;
    
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.addFeedback = async (req, res) => {
//   try {
//     const { trainerId, comment } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     profile.feedbacks.push({ sender: req.user._id, comment, date: Date.now() });
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ===============================
// // PAYMENT & DISPUTES
// // ===============================

// exports.raiseDispute = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { reason } = req.body;

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     // Check if the 15-day deadline has passed
//     const now = new Date();
//     if (now <= new Date(project.paymentDeadline)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Dispute can only be raised after the 15-day payment window expires." 
//       });
//     }

//     project.isDisputed = true;
//     project.disputeReason = reason || "Payment not received within 15-day window.";
//     project.disputeDate = now;
    
//     await project.save();

//     // Notify the Company that a dispute has been raised
//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `URGENT: A dispute has been raised for project "${project.title}" regarding pending payment.`,
//       type: 'dispute_raised'
//     });

//     res.status(200).json({ success: true, message: "Dispute raised successfully. Admin notified." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// const Project = require('../models/Project');
// const Application = require('../models/Application');
// const TrainerProfile = require('../models/TrainerProfile');
// const Notification = require('../models/Notification');
// const User = require('../models/User');
// const Achievement = require('../models/Achievement');

// // ===============================
// // DASHBOARD & PROFILE
// // ===============================

// exports.getTrainerDashboard = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id })
//       .populate('user', 'name email role followers following');
      
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const totalApplications = await Application.countDocuments({ trainer: trainer._id });
//     const interviews = await Application.countDocuments({ trainer: trainer._id, status: 'interview_scheduled' });
//     const accepted = await Application.countDocuments({ trainer: trainer._id, status: 'accepted' });

//     res.status(200).json({ 
//       success: true, 
//       data: { profile: trainer, stats: { totalApplications, interviews, accepted } } 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id })
//       .populate({
//         path: 'user',
//         select: 'name email role followers following',
//         populate: [
//           { path: 'followers', select: 'name role' },
//           { path: 'following', select: 'name role' }
//         ]
//       });

//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.updateMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id });
//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     const { expertise, experienceYears, location, bio, availability } = req.body;

//     if (expertise) {
//       try {
//         profile.expertise = JSON.parse(expertise);
//       } catch (e) {
//         profile.expertise = expertise;
//       }
//     }

//     if (experienceYears !== undefined) profile.experienceYears = experienceYears;
//     if (location !== undefined) profile.location = location;
//     if (bio !== undefined) profile.bio = bio;
//     if (availability && ['available', 'busy'].includes(availability)) profile.availability = availability;

//     if (req.file) {
//       profile.resumeUrl = `http://localhost:5000/uploads/resumes/${req.file.filename}`;
//     }

//     const updatedProfile = await profile.save();
//     res.status(200).json({ success: true, data: updatedProfile, availability: updatedProfile.availability });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PROJECTS & APPLICATIONS
// // ===============================

// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ status: 'open' }).populate('company', 'name location industry').sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId).populate('company', 'name location industry');
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.applyToProject = async (req, res) => {
//   try {
//     const { projectId } = req.params;
    
//     const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
//     if (!trainer) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    
//     const existing = await Application.findOne({ project: projectId, trainer: trainer._id });
//     if (existing) return res.status(400).json({ success: false, message: 'Already applied to this project' });

//     const resumePath = req.file 
//       ? `http://localhost:5000/uploads/resumes/${req.file.filename}` 
//       : trainer.resumeUrl;

//     if (!resumePath) {
//       return res.status(400).json({ success: false, message: "Please upload a resume" });
//     }

//     const application = await Application.create({
//       project: projectId,
//       trainer: trainer._id,
//       resumeUrl: resumePath,
//       proposalMessage: req.body.proposalMessage,
//       expectedRate: req.body.expectedRate
//     });

//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `${trainer.user.name} applied to your project: "${project.title}"`,
//       type: 'new_application',
//       relatedApplication: application._id
//     });

//     res.status(201).json({ success: true, data: application });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyApplications = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });

//     const applications = await Application.find({ trainer: trainer._id })
//       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.withdrawApplication = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     const application = await Application.findOne({ _id: req.params.applicationId, trainer: trainer._id });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });
//     if (application.status === 'accepted') return res.status(400).json({ success: false, message: "Cannot withdraw accepted application" });

//     await Application.findByIdAndDelete(req.params.applicationId);
//     res.status(200).json({ success: true, message: "Application withdrawn" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // SOCIAL & NETWORK (FIXED 500 ERROR)
// // ===============================

// exports.searchTrainers = async (req, res) => {
//   try {
//     const { name, expertise, location } = req.query;
//     let userIds = [];

//     if (name) {
//       const users = await User.find({ name: { $regex: name, $options: 'i' }, role: 'trainer' }).select('_id');
//       userIds = users.map(u => u._id);
//     }

//     const filter = {};
//     if (name) filter.user = { $in: userIds };
//     if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
//     if (location) filter.location = { $regex: location, $options: 'i' };

//     const trainers = await TrainerProfile.find(filter).populate('user', 'name email followers following');
//     res.status(200).json({ success: true, data: trainers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.followUnfollowUser = async (req, res) => {
//   try {
//     const targetUserId = req.params.id;
//     const currentUserId = req.user._id;

//     if (targetUserId === currentUserId.toString()) {
//       return res.status(400).json({ success: false, message: "You cannot follow yourself" });
//     }

//     const targetUser = await User.findById(targetUserId);
//     const currentUser = await User.findById(currentUserId);

//     if (!targetUser || !currentUser) return res.status(404).json({ success: false, message: "User not found" });

//     const isFollowing = currentUser.following.some(id => id.toString() === targetUserId);

//     if (isFollowing) {
//       // Unfollow - Using findByIdAndUpdate bypasses the "required" validation for other fields
//       await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } });
//       await User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } });
//     } else {
//       // Follow
//       await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetUserId } });
//       await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: currentUserId } });
//     }

//     res.status(200).json({ 
//       success: true, 
//       isFollowing: !isFollowing, 
//       message: isFollowing ? "Unfollowed" : "Followed" 
//     });
//   } catch (error) {
//     console.error("FOLLOW_ERROR:", error);
//     res.status(500).json({ success: false, message: "Connection update failed" });
//   }
// };

// exports.getNetworkFeed = async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.user._id).select('following');
    
//     const achievements = await Achievement.find()
//       .populate({
//         path: 'trainer',
//         populate: { path: 'user', select: 'name role followers following' }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ 
//       success: true, 
//       data: achievements,
//       currentUserFollowing: currentUser ? currentUser.following : [] 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // FEEDBACK & LIKES
// // ===============================

// exports.likeDislikeTrainer = async (req, res) => {
//   try {
//     const { trainerId, action } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     if (action === 'like') profile.likes = (profile.likes || 0) + 1;
//     else profile.dislikes = (profile.dislikes || 0) + 1;
    
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.addFeedback = async (req, res) => {
//   try {
//     const { trainerId, comment } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     profile.feedbacks.push({ sender: req.user._id, comment, date: Date.now() });
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PAYMENT & DISPUTES
// // ===============================

// exports.raiseDispute = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { reason } = req.body;

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     // Validate 15-day window
//     const now = new Date();
//     const deadline = new Date(project.paymentDeadline);
    
//     if (now <= deadline) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Dispute can only be raised after the 15-day industrial window expires." 
//       });
//     }

//     // Update dispute status
//     project.isDisputed = true;
//     project.disputeReason = reason || "Automatic: Payment overdue beyond 15-day window.";
//     project.disputeDate = now;
    
//     await project.save();

//     // Notify Company
//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `DISPUTE ALERT: A trainer has raised a dispute for "${project.title}" regarding an overdue payment.`,
//       type: 'dispute_raised'
//     });

//     res.status(200).json({ success: true, message: "Dispute raised. Trainistry Admin has been notified." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// // };

// const Project = require('../models/Project');
// const Application = require('../models/Application');
// const TrainerProfile = require('../models/TrainerProfile');
// const Notification = require('../models/Notification');
// const User = require('../models/User');
// const Achievement = require('../models/Achievement');
// const Post = require('../models/Post'); // ADDED THIS
// const CompanyProfile = require('../models/CompanyProfile'); // ADDED THIS

// // ===============================
// // DASHBOARD & PROFILE
// // ===============================

// exports.getTrainerDashboard = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id })
//       .populate('user', 'name email role followers following');
      
//     if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

//     const totalApplications = await Application.countDocuments({ trainer: trainer._id });
//     const interviews = await Application.countDocuments({ trainer: trainer._id, status: 'interview_scheduled' });
//     const accepted = await Application.countDocuments({ trainer: trainer._id, status: 'accepted' });

//     res.status(200).json({ 
//       success: true, 
//       data: { profile: trainer, stats: { totalApplications, interviews, accepted } } 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id })
//       .populate({
//         path: 'user',
//         select: 'name email role followers following',
//         populate: [
//           { path: 'followers', select: 'name role' },
//           { path: 'following', select: 'name role' }
//         ]
//       });

//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.updateMyProfile = async (req, res) => {
//   try {
//     const profile = await TrainerProfile.findOne({ user: req.user._id });
//     if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

//     const { expertise, experienceYears, location, bio, availability } = req.body;

//     if (expertise) {
//       try {
//         profile.expertise = JSON.parse(expertise);
//       } catch (e) {
//         profile.expertise = expertise;
//       }
//     }

//     if (experienceYears !== undefined) profile.experienceYears = experienceYears;
//     if (location !== undefined) profile.location = location;
//     if (bio !== undefined) profile.bio = bio;
//     if (availability && ['available', 'busy'].includes(availability)) profile.availability = availability;

//     if (req.file) {
//       profile.resumeUrl = `http://localhost:5000/uploads/resumes/${req.file.filename}`;
//     }

//     const updatedProfile = await profile.save();
//     res.status(200).json({ success: true, data: updatedProfile, availability: updatedProfile.availability });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PROJECTS & APPLICATIONS
// // ===============================

// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ status: 'open' }).populate('company', 'name location industry').sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId).populate('company', 'name location industry');
//     if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.applyToProject = async (req, res) => {
//   try {
//     const { projectId } = req.params;
    
//     const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
//     if (!trainer) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    
//     const existing = await Application.findOne({ project: projectId, trainer: trainer._id });
//     if (existing) return res.status(400).json({ success: false, message: 'Already applied to this project' });

//     const resumePath = req.file 
//       ? `http://localhost:5000/uploads/resumes/${req.file.filename}` 
//       : trainer.resumeUrl;

//     if (!resumePath) {
//       return res.status(400).json({ success: false, message: "Please upload a resume" });
//     }

//     const application = await Application.create({
//       project: projectId,
//       trainer: trainer._id,
//       resumeUrl: resumePath,
//       proposalMessage: req.body.proposalMessage,
//       expectedRate: req.body.expectedRate
//     });

//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `${trainer.user.name} applied to your project: "${project.title}"`,
//       type: 'new_application',
//       relatedApplication: application._id
//     });

//     res.status(201).json({ success: true, data: application });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMyApplications = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });

//     const applications = await Application.find({ trainer: trainer._id })
//       .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.withdrawApplication = async (req, res) => {
//   try {
//     const trainer = await TrainerProfile.findOne({ user: req.user._id });
//     const application = await Application.findOne({ _id: req.params.applicationId, trainer: trainer._id });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });
//     if (application.status === 'accepted') return res.status(400).json({ success: false, message: "Cannot withdraw accepted application" });

//     await Application.findByIdAndDelete(req.params.applicationId);
//     res.status(200).json({ success: true, message: "Application withdrawn" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // SOCIAL & NETWORK
// // ===============================

// exports.searchTrainers = async (req, res) => {
//   try {
//     const { name, expertise, location } = req.query;
//     let userIds = [];

//     if (name) {
//       const users = await User.find({ name: { $regex: name, $options: 'i' }, role: 'trainer' }).select('_id');
//       userIds = users.map(u => u._id);
//     }

//     const filter = {};
//     if (name) filter.user = { $in: userIds };
//     if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
//     if (location) filter.location = { $regex: location, $options: 'i' };

//     const trainers = await TrainerProfile.find(filter).populate('user', 'name email followers following');
//     res.status(200).json({ success: true, data: trainers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.followUnfollowUser = async (req, res) => {
//   try {
//     const targetUserId = req.params.id;
//     const currentUserId = req.user._id;

//     if (targetUserId === currentUserId.toString()) {
//       return res.status(400).json({ success: false, message: "You cannot follow yourself" });
//     }

//     const targetUser = await User.findById(targetUserId);
//     const currentUser = await User.findById(currentUserId);

//     if (!targetUser || !currentUser) return res.status(404).json({ success: false, message: "User not found" });

//     const isFollowing = currentUser.following.some(id => id.toString() === targetUserId);

//     if (isFollowing) {
//       await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } });
//       await User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } });
//     } else {
//       await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetUserId } });
//       await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: currentUserId } });
//     }

//     res.status(200).json({ 
//       success: true, 
//       isFollowing: !isFollowing, 
//       message: isFollowing ? "Unfollowed" : "Followed" 
//     });
//   } catch (error) {
//     console.error("FOLLOW_ERROR:", error);
//     res.status(500).json({ success: false, message: "Connection update failed" });
//   }
// };

// exports.getNetworkFeed = async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.user._id).select('following');
    
//     const achievements = await Achievement.find()
//       .populate({
//         path: 'trainer',
//         populate: { path: 'user', select: 'name role followers following' }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ 
//       success: true, 
//       data: achievements,
//       currentUserFollowing: currentUser ? currentUser.following : [] 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // FEEDBACK & LIKES
// // ===============================

// exports.likeDislikeTrainer = async (req, res) => {
//   try {
//     const { trainerId, action } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     if (action === 'like') profile.likes = (profile.likes || 0) + 1;
//     else profile.dislikes = (profile.dislikes || 0) + 1;
    
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.addFeedback = async (req, res) => {
//   try {
//     const { trainerId, comment } = req.body;
//     const profile = await TrainerProfile.findById(trainerId);
//     if (!profile) return res.status(404).json({ success: false, message: "Trainer profile not found" });

//     profile.feedbacks.push({ sender: req.user._id, comment, date: Date.now() });
//     await profile.save();
//     res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===============================
// // PAYMENT & DISPUTES - UPDATED FOR DYNAMIC SCORE
// // ===============================
// exports.markAsDisputed = async (req, res) => {
//   try {
//     // 1. Find the application and the project details
//     const application = await Application.findById(req.params.id).populate('project');
//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found" });
//     }

//     // 2. Mark application as disputed
//     application.isDisputed = true;
//     await application.save();

//     // 3. Find the Company Profile linked to this project
//     const company = await CompanyProfile.findOne({ _id: application.project.company });
    
//     if (company) {
//       // 4. Create a Public Warning Post (MAPPED TO YOUR MODEL FIELDS)
//       await Post.create({
//         user: req.user._id, 
//         authorRole: req.user.role || 'trainer', // Required by model
//         title: "⚠️ Industrial Payment Dispute",    // Required by model
//         description: `A formal dispute has been raised against ${company.companyName || 'the company'} regarding the project "${application.project.title}". The 15-day industrial payment window has been exceeded.`, // Matches 'description' in model
//         postType: 'warning',
//         relatedCompany: company._id
//       });

//       // 5. Deduct 10 points from Trust Score
//       const currentScore = company.paymentTrustScore || 100;
//       company.paymentTrustScore = Math.max(0, currentScore - 10);
      
//       await company.save();
//     }

//     res.status(200).json({ 
//       success: true, 
//       message: "Dispute raised, warning posted, and Trust Score penalized.",
//       newScore: company ? company.paymentTrustScore : null 
//     });
//   } catch (error) {
//     console.error("Dispute Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// exports.raiseDispute = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { reason } = req.body;

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     // Validate 15-day window
//     const now = new Date();
//     const deadline = new Date(project.paymentDeadline);
    
//     if (now <= deadline) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Dispute can only be raised after the 15-day industrial window expires." 
//       });
//     }

//     // Update dispute status
//     project.isDisputed = true;
//     project.disputeReason = reason || "Automatic: Payment overdue beyond 15-day window.";
//     project.disputeDate = now;
    
//     await project.save();

//     // Notify Company
//     await Notification.create({
//       recipient: project.company,
//       recipientType: 'company',
//       message: `DISPUTE ALERT: A trainer has raised a dispute for "${project.title}" regarding an overdue payment.`,
//       type: 'dispute_raised'
//     });

//     res.status(200).json({ success: true, message: "Dispute raised. Trainistry Admin has been notified." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const Project = require('../models/Project');
const Application = require('../models/Application');
const TrainerProfile = require('../models/TrainerProfile');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Achievement = require('../models/Achievement');
const Post = require('../models/Post'); 
const CompanyProfile = require('../models/CompanyProfile'); 

// ===============================
// DASHBOARD & PROFILE
// ===============================

exports.getTrainerDashboard = async (req, res) => {
  try {
    const trainer = await TrainerProfile.findOne({ user: req.user._id })
      .populate('user', 'name email role followers following');
      
    if (!trainer) return res.status(404).json({ success: false, message: 'Trainer profile not found' });

    const totalApplications = await Application.countDocuments({ trainer: trainer._id });
    const interviews = await Application.countDocuments({ trainer: trainer._id, status: 'interview_scheduled' });
    const accepted = await Application.countDocuments({ trainer: trainer._id, status: 'accepted' });

    res.status(200).json({ 
      success: true, 
      data: { profile: trainer, stats: { totalApplications, interviews, accepted } } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await TrainerProfile.findOne({ user: req.user._id })
      .populate({
        path: 'user',
        select: 'name email role followers following',
        populate: [
          { path: 'followers', select: 'name role' },
          { path: 'following', select: 'name role' }
        ]
      });

    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const profile = await TrainerProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

    const { expertise, experienceYears, location, bio, availability } = req.body;

    if (expertise) {
      try {
        profile.expertise = JSON.parse(expertise);
      } catch (e) {
        profile.expertise = expertise;
      }
    }

    if (experienceYears !== undefined) profile.experienceYears = experienceYears;
    if (location !== undefined) profile.location = location;
    if (bio !== undefined) profile.bio = bio;
    if (availability && ['available', 'busy'].includes(availability)) profile.availability = availability;

    if (req.file) {
      profile.resumeUrl = `http://localhost:5000/uploads/resumes/${req.file.filename}`;
    }

    const updatedProfile = await profile.save();
    res.status(200).json({ success: true, data: updatedProfile, availability: updatedProfile.availability });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// PROJECTS & APPLICATIONS
// ===============================

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'open' }).populate('company', 'name location industry').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('company', 'name location industry');
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.applyToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    
    const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
    if (!trainer) return res.status(404).json({ success: false, message: "Trainer profile not found" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    
    const existing = await Application.findOne({ project: projectId, trainer: trainer._id });
    if (existing) return res.status(400).json({ success: false, message: 'Already applied to this project' });

    const resumePath = req.file 
      ? `http://localhost:5000/uploads/resumes/${req.file.filename}` 
      : trainer.resumeUrl;

    if (!resumePath) {
      return res.status(400).json({ success: false, message: "Please upload a resume" });
    }

    const application = await Application.create({
      project: projectId,
      trainer: trainer._id,
      resumeUrl: resumePath,
      proposalMessage: req.body.proposalMessage,
      expectedRate: req.body.expectedRate
    });

    await Notification.create({
      recipient: project.company,
      recipientType: 'company',
      message: `${trainer.user.name} applied to your project: "${project.title}"`,
      type: 'new_application',
      relatedApplication: application._id
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATED: Now fetches paymentStatus and transactionId
exports.getMyApplications = async (req, res) => {
  try {
    const trainer = await TrainerProfile.findOne({ user: req.user._id });
    if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });

    const applications = await Application.find({ trainer: trainer._id })
      .populate({ 
          path: 'project', 
          populate: { path: 'company', select: 'name location industry' } 
      })
      .select('+paymentStatus +transactionId') // Ensures these fields are included if hidden in schema
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.withdrawApplication = async (req, res) => {
  try {
    const trainer = await TrainerProfile.findOne({ user: req.user._id });
    const application = await Application.findOne({ _id: req.params.applicationId, trainer: trainer._id });

    if (!application) return res.status(404).json({ success: false, message: "Application not found" });
    if (application.status === 'accepted') return res.status(400).json({ success: false, message: "Cannot withdraw accepted application" });

    await Application.findByIdAndDelete(req.params.applicationId);
    res.status(200).json({ success: true, message: "Application withdrawn" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// SOCIAL & NETWORK
// ===============================

exports.searchTrainers = async (req, res) => {
  try {
    const { name, expertise, location } = req.query;
    let userIds = [];

    if (name) {
      const users = await User.find({ name: { $regex: name, $options: 'i' }, role: 'trainer' }).select('_id');
      userIds = users.map(u => u._id);
    }

    const filter = {};
    if (name) filter.user = { $in: userIds };
    if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };

    const trainers = await TrainerProfile.find(filter).populate('user', 'name email followers following');
    res.status(200).json({ success: true, data: trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.followUnfollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ success: false, message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) return res.status(404).json({ success: false, message: "User not found" });

    const isFollowing = currentUser.following.some(id => id.toString() === targetUserId);

    if (isFollowing) {
      await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } });
      await User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } });
    } else {
      await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetUserId } });
      await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: currentUserId } });
    }

    res.status(200).json({ 
      success: true, 
      isFollowing: !isFollowing, 
      message: isFollowing ? "Unfollowed" : "Followed" 
    });
  } catch (error) {
    console.error("FOLLOW_ERROR:", error);
    res.status(500).json({ success: false, message: "Connection update failed" });
  }
};

exports.getNetworkFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select('following');
    
    const achievements = await Achievement.find()
      .populate({
        path: 'trainer',
        populate: { path: 'user', select: 'name role followers following' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      data: achievements,
      currentUserFollowing: currentUser ? currentUser.following : [] 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// FEEDBACK & LIKES
// ===============================

exports.likeDislikeTrainer = async (req, res) => {
  try {
    const { trainerId, action } = req.body;
    const profile = await TrainerProfile.findById(trainerId);
    if (!profile) return res.status(404).json({ success: false, message: "Trainer profile not found" });

    if (action === 'like') profile.likes = (profile.likes || 0) + 1;
    else profile.dislikes = (profile.dislikes || 0) + 1;
    
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addFeedback = async (req, res) => {
  try {
    const { trainerId, comment } = req.body;
    const profile = await TrainerProfile.findById(trainerId);
    if (!profile) return res.status(404).json({ success: false, message: "Trainer profile not found" });

    profile.feedbacks.push({ sender: req.user._id, comment, date: Date.now() });
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// PAYMENT & DISPUTES
// ===============================
exports.markAsDisputed = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('project');
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.isDisputed = true;
    await application.save();

    const company = await CompanyProfile.findOne({ _id: application.project.company });
    
    if (company) {
      await Post.create({
        user: req.user._id, 
        authorRole: req.user.role || 'trainer', 
        title: "⚠️ Industrial Payment Dispute", 
        description: `A formal dispute has been raised against ${company.companyName || 'the company'} regarding the project "${application.project.title}". The 15-day industrial payment window has been exceeded.`, 
        postType: 'warning',
        relatedCompany: company._id
      });

      const currentScore = company.paymentTrustScore || 100;
      company.paymentTrustScore = Math.max(0, currentScore - 10);
      
      await company.save();
    }

    res.status(200).json({ 
      success: true, 
      message: "Dispute raised, warning posted, and Trust Score penalized.",
      newScore: company ? company.paymentTrustScore : null 
    });
  } catch (error) {
    console.error("Dispute Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.raiseDispute = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { reason } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    const now = new Date();
    const deadline = new Date(project.paymentDeadline);
    
    if (now <= deadline) {
      return res.status(400).json({ 
        success: false, 
        message: "Dispute can only be raised after the 15-day industrial window expires." 
      });
    }

    project.isDisputed = true;
    project.disputeReason = reason || "Automatic: Payment overdue beyond 15-day window.";
    project.disputeDate = now;
    
    await project.save();

    await Notification.create({
      recipient: project.company,
      recipientType: 'company',
      message: `DISPUTE ALERT: A trainer has raised a dispute for "${project.title}" regarding an overdue payment.`,
      type: 'dispute_raised'
    });

    res.status(200).json({ success: true, message: "Dispute raised. Trainistry Admin has been notified." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};