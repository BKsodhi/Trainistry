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
// };

const Project = require('../models/Project');
const Application = require('../models/Application');
const TrainerProfile = require('../models/TrainerProfile');
const Notification = require('../models/Notification');

// ===============================
// GET TRAINER DASHBOARD DATA
// ===============================
exports.getTrainerDashboard = async (req, res) => {
  try {
    const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email role');
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

// ===============================
// GET LOGGED-IN TRAINER PROFILE
// ===============================
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email role');
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE PROFILE & RESUME
// ===============================
exports.updateMyProfile = async (req, res) => {
  try {
    const profile = await TrainerProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

    const { expertise, experienceYears, location, bio, availability } = req.body;

    // Handle JSON stringified arrays from FormData
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

    // Handle File Upload
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
    const trainer = await TrainerProfile.findOne({ user: req.user._id }).populate('user', 'name email');
    const project = await Project.findById(req.params.projectId);
    
    const existing = await Application.findOne({ project: project._id, trainer: trainer._id });
    if (existing) return res.status(400).json({ success: false, message: 'Already applied' });

    const resumePath = req.file ? `http://localhost:5000/uploads/resumes/${req.file.filename}` : trainer.resumeUrl;

    const application = await Application.create({
      project: project._id,
      trainer: trainer._id,
      resumeUrl: resumePath,
      proposalMessage: req.body.proposalMessage,
      expectedRate: req.body.expectedRate
    });

    await Notification.create({
      recipient: project.company,
      recipientType: 'company',
      message: `${trainer.user.name} applied to "${project.title}"`,
      type: 'new_application',
      relatedApplication: application._id
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const trainer = await TrainerProfile.findOne({ user: req.user._id });
    const applications = await Application.find({ trainer: trainer._id })
      .populate({ path: 'project', populate: { path: 'company', select: 'name location industry' } })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// SEARCH & SOCIAL
// ===============================
exports.searchTrainers = async (req, res) => {
  try {
    const { expertise, location } = req.query;
    const filter = {};
    if (expertise) filter.expertise = { $regex: expertise, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    const trainers = await TrainerProfile.find(filter).populate('user', 'name email');
    res.status(200).json({ success: true, data: trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.likeDislikeTrainer = async (req, res) => {
  try {
    const { trainerId, action } = req.body;
    const profile = await TrainerProfile.findById(trainerId);
    if (action === 'like') profile.likes += 1;
    else profile.dislikes += 1;
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
    profile.feedbacks.push({ sender: req.user._id, comment, date: Date.now() });
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};