// // const express = require('express');
// // const router = express.Router();
// // const { protect } = require('../middleware/authMiddleware');
// // const uploadResume = require('../middleware/uploadMiddleware');
// // const { getTrainerNotifications } = require("../controllers/notificationController");

// // const {
// //   getMyProfile,
// //   updateMyProfile,
// //   getAllProjects,
// //   getProjectById,
// //   applyToProject,
// //   getMyApplications,
// //   likeDislikeTrainer,
// //   addFeedback,
// //   uploadResume: uploadResumeController,
// //   searchTrainers
// // } = require('../controllers/trainerController');

// // // ================= TRAINER PROFILE =================
// // router.get('/me', protect, getMyProfile);
// // router.put('/me', protect, updateMyProfile);

// // // ================= TRAINER SEARCH =================
// // router.get('/search', protect, searchTrainers);

// // // ================= PROJECTS =================
// // router.get('/projects', protect, getAllProjects);
// // router.get('/projects/:projectId', protect, getProjectById);

// // // ================= APPLICATIONS =================
// // router.post('/projects/:projectId/apply', protect, applyToProject);
// // router.get('/applications', protect, getMyApplications);

// // // ================= FEEDBACK & LIKES/DISLIKES =================
// // router.put('/like-dislike', protect, likeDislikeTrainer);
// // router.post('/feedback', protect, addFeedback);

// // // ================= RESUME =================
// // router.post('/upload-resume', protect, uploadResume.single('resume'), uploadResumeController);
// // router.get("/notifications", protect, getTrainerNotifications);
// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const uploadResume = require('../middleware/uploadMiddleware');
// const { getTrainerNotifications } = require("../controllers/notificationController");

// const {
//   getMyProfile,
//   updateMyProfile,
//   getAllProjects,
//   getProjectById,
//   applyToProject,
//   getMyApplications,
//   likeDislikeTrainer,
//   addFeedback,
//   uploadResume: uploadResumeController,
//   searchTrainers
// } = require('../controllers/trainerController');

// // ================= TRAINER PROFILE =================
// router.get('/me', protect, getMyProfile);
// router.put('/me', protect, updateMyProfile);

// // ================= TRAINER SEARCH =================
// router.get('/search', protect, searchTrainers);

// // ================= PROJECTS =================
// router.get('/projects', protect, getAllProjects);
// router.get('/projects/:projectId', protect, getProjectById);

// // ================= APPLICATIONS =================
// // 🔹 Added multer middleware here to handle resume file upload
// router.post(
//   '/projects/:projectId/apply',
//   protect,
//   uploadResume.single('resume'),
//   applyToProject
// );
// router.get('/applications', protect, getMyApplications);

// // ================= FEEDBACK & LIKES/DISLIKES =================
// router.put('/like-dislike', protect, likeDislikeTrainer);
// router.post('/feedback', protect, addFeedback);

// // ================= RESUME =================
// router.post('/upload-resume', protect, uploadResume.single('resume'), uploadResumeController);
// router.get("/notifications", protect, getTrainerNotifications);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const uploadResume = require('../middleware/uploadMiddleware');
// const { getTrainerNotifications } = require("../controllers/notificationController");

// const {
//   getTrainerDashboard,
//   getMyProfile,
//   updateMyProfile,
//   getAllProjects,
//   getProjectById,
//   applyToProject,
//   getMyApplications,
//   likeDislikeTrainer,
//   addFeedback,
//   uploadResume: uploadResumeController,
//   searchTrainers
// } = require('../controllers/trainerController');

// // All routes are protected
// router.use(protect);

// // Dashboard & Profile
// router.get('/dashboard', getTrainerDashboard);
// router.get('/me', getMyProfile);
// router.put('/me', updateMyProfile);
// router.put('/toggle-status', updateMyProfile); // Using update logic to toggle availability

// // Projects
// router.get('/projects', getAllProjects);
// router.get('/projects/:projectId', getProjectById);

// // Applications
// router.post('/projects/:projectId/apply', uploadResume.single('resume'), applyToProject);
// router.get('/applications', getMyApplications);

// // Social & Misc
// router.get('/search', searchTrainers);
// router.put('/like-dislike', likeDislikeTrainer);
// router.post('/feedback', addFeedback);
// router.post('/upload-resume', uploadResume.single('resume'), uploadResumeController);
// router.get("/notifications", getTrainerNotifications);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const uploadResume = require('../middleware/uploadMiddleware');
// const { getTrainerNotifications } = require("../controllers/notificationController");

// const {
//   getTrainerDashboard,
//   getMyProfile,
//   updateMyProfile,
//   getAllProjects,
//   getProjectById,
//   applyToProject,
//   getMyApplications,
//   likeDislikeTrainer,
//   addFeedback,
//   searchTrainers
// } = require('../controllers/trainerController');

// // All routes are protected
// router.use(protect);

// // Dashboard & Profile
// router.get('/dashboard', getTrainerDashboard);
// router.get('/me', getMyProfile);

// // This matches your frontend Axios call: axios.put(".../api/trainer/profile")
// router.put('/profile', uploadResume.single('resume'), updateMyProfile);

// // Toggle availability (uses the same update logic)
// router.put('/toggle-status', updateMyProfile); 

// // Projects
// router.get('/projects', getAllProjects);
// router.get('/projects/:projectId', getProjectById);

// // Applications
// router.post('/projects/:projectId/apply', uploadResume.single('resume'), applyToProject);
// router.get('/applications', getMyApplications);

// // Social & Misc
// router.get('/search', searchTrainers);
// router.put('/like-dislike', likeDislikeTrainer);
// router.post('/feedback', addFeedback);

// // Notifications
// router.get("/notifications", getTrainerNotifications);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const uploadResume = require('../middleware/uploadMiddleware');
// const { getTrainerNotifications } = require("../controllers/notificationController");

// const {
//   getTrainerDashboard,
//   getMyProfile,
//   updateMyProfile,
//   getAllProjects,
//   getProjectById,
//   applyToProject,
//   getMyApplications,
//   likeDislikeTrainer,
//   addFeedback,
//   searchTrainers,
//   followUnfollowUser,
//   getNetworkFeed,
//   withdrawApplication
// } = require('../controllers/trainerController');

// // All routes are protected
// router.use(protect);

// // Dashboard & Profile
// router.get('/dashboard', getTrainerDashboard);
// router.get('/me', getMyProfile);
// router.put('/profile', uploadResume.single('resume'), updateMyProfile);
// router.put('/toggle-status', updateMyProfile); 
// router.get('/profile/me', getMyProfile);
// // Projects
// router.get('/projects', getAllProjects);
// router.get('/projects/:projectId', getProjectById);

// // Applications
// router.post('/projects/:projectId/apply', uploadResume.single('resume'), applyToProject);
// router.get('/applications', getMyApplications);
// router.delete('/applications/:applicationId', protect, withdrawApplication);

// // Social & Connections
// router.get('/search', searchTrainers);
// router.put('/like-dislike', likeDislikeTrainer);
// router.post('/feedback', addFeedback);
// router.put('/follow/:id', followUnfollowUser);
// router.get('/network-feed', getNetworkFeed);

// // Notifications
// router.get("/notifications", getTrainerNotifications);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const uploadResume = require('../middleware/uploadMiddleware');
// const { getTrainerNotifications } = require("../controllers/notificationController");

// const {
//   getTrainerDashboard,
//   getMyProfile,
//   updateMyProfile,
//   getAllProjects,
//   getProjectById,
//   applyToProject,
//   getMyApplications,
//   likeDislikeTrainer,
//   addFeedback,
//   searchTrainers,
//   followUnfollowUser,
//   getNetworkFeed,
//   withdrawApplication,
//   raiseDispute
// } = require('../controllers/trainerController');

// // All routes below this line will require a valid JWT token
// router.use(protect);

// // ===============================
// // DASHBOARD & PROFILE
// // ===============================
// router.get('/dashboard', getTrainerDashboard);
// router.get('/me', getMyProfile);
// router.get('/profile/me', getMyProfile); // Alias for 'me'

// // Update profile handles both text data and the resume file
// router.put('/profile', uploadResume.single('resume'), (req, res, next) => {
//   updateMyProfile(req, res, next);
// });

// // For status toggles (Available/Busy), we don't need the upload middleware
// router.put('/toggle-status', updateMyProfile); 

// // ===============================
// // PROJECTS & SEARCH
// // ===============================
// router.get('/projects', getAllProjects);
// router.get('/projects/:projectId', getProjectById);
// router.get('/search', searchTrainers);

// // ===============================
// // APPLICATIONS
// // ===============================

// // CRITICAL FIX: Explicitly passing req, res, next to the controller 
// // to prevent the "next is not a function" error.
// router.post('/projects/:projectId/apply', uploadResume.single('resume'), (req, res, next) => {
//   applyToProject(req, res, next);
// });

// router.get('/applications', getMyApplications);
// router.delete('/applications/:applicationId', withdrawApplication);

// // ===============================
// // SOCIAL & NETWORK
// // ===============================
// router.put('/like-dislike', likeDislikeTrainer);
// router.post('/feedback', addFeedback);
// router.put('/follow/:id', followUnfollowUser);
// router.get('/network-feed', getNetworkFeed);

// // ===============================
// // NOTIFICATIONS
// // ===============================
// router.get("/notifications", getTrainerNotifications);

// router.put('/projects/:projectId/dispute', raiseDispute);
// // Add this to your trainerRoutes.js file
// router.put('/applications/:id/dispute', authMiddleware, trainerController.markAsDisputed);


// module.exports = router;


const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Existing middleware name
const uploadResume = require('../middleware/uploadMiddleware');
const { getTrainerNotifications } = require("../controllers/notificationController");

const {
  getTrainerDashboard,
  getMyProfile,
  updateMyProfile,
  getAllProjects,
  getProjectById,
  applyToProject,
  getMyApplications,
  likeDislikeTrainer,
  addFeedback,
  searchTrainers,
  followUnfollowUser,
  getNetworkFeed,
  withdrawApplication,
  raiseDispute,
  markAsDisputed // Added this to the import list
} = require('../controllers/trainerController');

// All routes below this line will require a valid JWT token
router.use(protect);

// ===============================
// DASHBOARD & PROFILE
// ===============================
router.get('/dashboard', getTrainerDashboard);
router.get('/me', getMyProfile);
router.get('/profile/me', getMyProfile); // Alias for 'me'

// Update profile handles both text data and the resume file
router.put('/profile', uploadResume.single('resume'), (req, res, next) => {
  updateMyProfile(req, res, next);
});

// For status toggles (Available/Busy), we don't need the upload middleware
router.put('/toggle-status', updateMyProfile); 

// ===============================
// PROJECTS & SEARCH
// ===============================
router.get('/projects', getAllProjects);
router.get('/projects/:projectId', getProjectById);
router.get('/search', searchTrainers);

// ===============================
// APPLICATIONS
// ===============================

// CRITICAL FIX: Explicitly passing req, res, next to the controller 
router.post('/projects/:projectId/apply', uploadResume.single('resume'), (req, res, next) => {
  applyToProject(req, res, next);
});

router.get('/applications', getMyApplications);
router.delete('/applications/:applicationId', withdrawApplication);

// ===============================
// SOCIAL & NETWORK
// ===============================
router.put('/like-dislike', likeDislikeTrainer);
router.post('/feedback', addFeedback);
router.put('/follow/:id', followUnfollowUser);
router.get('/network-feed', getNetworkFeed);

// ===============================
// NOTIFICATIONS
// ===============================
router.get("/notifications", getTrainerNotifications);

// ===============================
// PAYMENT & DISPUTES
// ===============================

// Route for formal project-level dispute
router.put('/projects/:projectId/dispute', raiseDispute);

// Route for the "Mark Disputed" button on the Applications page
// Fixed: Changed 'authMiddleware' to 'protect' and 'trainerController.markAsDisputed' to 'markAsDisputed'
router.put('/applications/:id/dispute', protect, markAsDisputed);


module.exports = router;