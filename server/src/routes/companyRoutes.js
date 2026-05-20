// // const express = require('express');
// // const router = express.Router();
// // const { protect, authorize } = require('../middleware/authMiddleware');

// // const {
// //   getMyCompany,
// //   createCompany,
// //   getCompanies,
// //   getCompanyById,
// //   updateCompany,
// //   deleteCompany,
// //   postProject,
// //   getCompanyProjects,
// //   getProjectApplications,
// //   updateApplicationStatus,
// //   updateProjectStatus,
// //   scheduleInterview
// // } = require('../controllers/companyController');


// // // ================= COMPANY PROFILE =================

// // // Get logged-in company's profile
// // router.get('/me', protect, authorize('company'), getMyCompany);

// // // Create company profile
// // router.post('/', protect, authorize('company'), createCompany);

// // // Get all companies (public)
// // router.get('/', getCompanies);

// // // Get company by ID (public)
// // router.get('/:id', getCompanyById);

// // // Update company profile (only owner)
// // router.put('/:id', protect, authorize('company'), updateCompany);

// // // Delete company profile (only owner)
// // router.delete('/:id', protect, authorize('company'), deleteCompany);


// // // ================= PROJECT MANAGEMENT =================

// // // Post a new project (company owner only)
// // router.post('/:companyId/projects', protect, authorize('company'), postProject);

// // // Get all projects of a company
// // router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// // // Update project status
// // router.put('/:companyId/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);


// // // ================= APPLICATION MANAGEMENT =================

// // // Get all applications for a specific project
// // router.get('/:companyId/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);

// // // Update application status
// // router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);

// // // Schedule interview
// // router.put('/applications/:applicationId/interview', protect, authorize('company'), scheduleInterview);


// // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const { protect, authorize } = require('../middleware/authMiddleware');

// // const {
// //   getCompanyDashboardStats, // Added for Figma Analytics
// //   getMyCompany,
// //   createCompany,
// //   getCompanies,
// //   getCompanyById,
// //   updateCompany,
// //   deleteCompany,
// //   postProject,
// //   getCompanyProjects,
// //   getProjectApplications,
// //   updateApplicationStatus,
// //   updateProjectStatus,
// //   scheduleInterview
// // } = require('../controllers/companyController');


// // // ================= DASHBOARD & ANALYTICS =================

// // // Get analytics for dashboard cards (Figma design)
// // router.get('/stats', protect, authorize('company'), getCompanyDashboardStats);


// // // ================= COMPANY PROFILE =================

// // // Get logged-in company's profile
// // router.get('/me', protect, authorize('company'), getMyCompany);

// // // Create company profile
// // router.post('/', protect, authorize('company'), createCompany);

// // // Get all companies (public)
// // router.get('/', getCompanies);

// // // Get company by ID (public)
// // router.get('/:id', getCompanyById);

// // // Update company profile (only owner)
// // router.put('/:id', protect, authorize('company'), updateCompany);

// // // Delete company profile (only owner)
// // router.delete('/:id', protect, authorize('company'), deleteCompany);


// // // ================= PROJECT MANAGEMENT =================

// // // Post a new project (company owner only)
// // router.post('/:companyId/projects', protect, authorize('company'), postProject);

// // // Get all projects of a company
// // router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// // // Update project status
// // router.put('/:companyId/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);


// // // ================= APPLICATION MANAGEMENT =================

// // // Get all applications for a specific project
// // router.get('/:companyId/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);

// // // Update application status
// // router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);

// // // Schedule interview
// // // router.put('/applications/:applicationId/interview', protect, authorize('company'), scheduleInterview);
// // router.post('/applications/:applicationId/schedule', protect, authorize('company'), scheduleInterview);
// // // Dashboard Stats - Add this line
// // router.get('/dashboard/stats', protect, authorize('company'), getCompanyDashboardStats);


// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');

// const {
//   getCompanyDashboardStats,
//   getMyCompany,
//   createCompany,
//   updateCompanyProfile,
//   getCompanies,
//   getCompanyById,
//   postProject,
//   getCompanyProjects,
//   getProjectApplications,
//   updateApplicationStatus,
//   updateProjectStatus,
//   resolveDispute,
//   searchCompanies,
//   followCompany,
//   scheduleInterview,
//   confirmAdvancePayment
// } = require('../controllers/companyController');

// // Profile & Stats (Protected)
// router.get('/stats', protect, authorize('company'), getCompanyDashboardStats);
// router.get('/me', protect, authorize('company'), getMyCompany);
// router.post('/', protect, authorize('company'), createCompany);

// router.put('/profile', protect, authorize('company'), updateCompanyProfile);

// // Public Company Info
// router.get('/search', searchCompanies);
// router.get('/', getCompanies);
// router.get('/:id', getCompanyById);

// // Projects Management (Protected)
// router.post('/:companyId/projects', protect, authorize('company'), postProject);
// router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// // Update project status (Triggers 15-day deadline)
// router.put('/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);

// // Application Management (Protected)
// router.get('/:companyId/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);

// // Update application status (Triggers Selection/Rejection Email)
// router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);

// // Interview Scheduling
// router.post('/applications/:applicationId/schedule', protect, authorize('company'), scheduleInterview);

// router.put('/applications/:applicationId/resolve', protect, resolveDispute);
// router.put('/follow/:targetId', protect, followCompany);
// router.put(
//   '/projects/:projectId/confirm-advance', 
//   protect, 
//   authorize('company'), 
//   confirmAdvancePayment // Use the destructured name from your imports at the top
// );

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');

// const {
//   getCompanyDashboardStats,
//   getMyCompany,
//   createCompany,
//   updateCompanyProfile,
//   getCompanies,
//   getCompanyById,
//   postProject,
//   getCompanyProjects, // We will use this for both routes
//   getProjectApplications,
//   updateApplicationStatus,
//   updateProjectStatus,
//   resolveDispute,
//   searchCompanies,
//   followCompany,
//   scheduleInterview,
//   confirmAdvancePayment
// } = require('../controllers/companyController');

// // --- Profile & Stats ---
// router.get('/stats', protect, authorize('company'), getCompanyDashboardStats);
// router.get('/me', protect, authorize('company'), getMyCompany);
// router.post('/', protect, authorize('company'), createCompany);
// router.put('/profile', protect, authorize('company'), updateCompanyProfile);

// // --- Projects Management ---

// // NEW: This is the route your dashboard is calling!
// router.get('/my-projects', protect, authorize('company'), getCompanyProjects);

// // Legacy/Admin routes (keeping for backward compatibility)
// router.post('/:companyId/projects', protect, authorize('company'), postProject);
// router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// // Status updates
// router.put('/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);
// router.put('/projects/:projectId/confirm-advance', protect, authorize('company'), confirmAdvancePayment);

// // --- Application Management ---
// // router.get('/:companyId/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);
// router.get('/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);
// router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);
// router.post('/applications/:applicationId/schedule', protect, authorize('company'), scheduleInterview);
// router.put('/applications/:applicationId/resolve', protect, resolveDispute);

// // --- Social/Public ---
// router.get('/search', searchCompanies);
// router.get('/', getCompanies);
// router.get('/:id', getCompanyById);
// router.put('/follow/:targetId', protect, followCompany);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');

// const {
//   getCompanyDashboardStats,
//   getMyCompany,
//   createCompany,
//   updateCompanyProfile,
//   getCompanies,
//   getCompanyById,
//   postProject,
//   getCompanyProjects,
//   getProjectApplications,
//   updateApplicationStatus,
//   updateProjectStatus,
//   resolveDispute,
//   searchCompanies,
//   followCompany,
//   scheduleInterview,
//   confirmAdvancePayment,
//   getCompanyPaymentStats // 🌟 ADDED THIS IMPORT LINE HERE TO PREVENT THE CRASH
// } = require('../controllers/companyController');

// // --- Profile & Stats ---
// router.get('/stats', protect, authorize('company'), getCompanyDashboardStats);
// router.get('/me', protect, authorize('company'), getMyCompany);
// router.post('/', protect, authorize('company'), createCompany);
// router.put('/profile', protect, authorize('company'), updateCompanyProfile);

// // NEW FEATURE ENDPOINT: Public payment reputation stats
// router.get('/payment-stats/:id', getCompanyPaymentStats); 

// // --- Projects Management ---

// // This is the route your dashboard is calling!
// router.get('/my-projects', protect, authorize('company'), getCompanyProjects);

// // Legacy/Admin routes (keeping for backward compatibility)
// router.post('/:companyId/projects', protect, authorize('company'), postProject);
// router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// // Status updates
// router.put('/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);
// router.put('/projects/:projectId/confirm-advance', protect, authorize('company'), confirmAdvancePayment);

// // --- Application Management ---
// router.get('/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);
// router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);
// router.post('/applications/:applicationId/schedule', protect, authorize('company'), scheduleInterview);
// router.put('/applications/:applicationId/resolve', protect, resolveDispute);

// // --- Social/Public ---
// router.get('/search', searchCompanies);
// router.get('/', getCompanies);
// router.get('/:id', getCompanyById);
// router.put('/follow/:targetId', protect, followCompany);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  getCompanyDashboardStats,
  getMyCompany,
  createCompany,
  updateCompanyProfile,
  getCompanies,
  getCompanyById,
  postProject,
  getCompanyProjects,
  getProjectApplications,
  updateApplicationStatus,
  updateProjectStatus,
  resolveDispute,
  searchCompanies,
  followCompany,
  scheduleInterview,
  confirmAdvancePayment,
  getCompanyPaymentStats,
  // ⭐ NEW IMPORTS FOR SIDEBAR TABS & RATING SYSTEM
  getShortlistedApplications,
  getScheduledInterviews,
  rateTrainer
} = require('../controllers/companyController');

// --- Profile & Stats ---
router.get('/stats', protect, authorize('company'), getCompanyDashboardStats);
router.get('/me', protect, authorize('company'), getMyCompany);
router.post('/', protect, authorize('company'), createCompany);
router.put('/profile', protect, authorize('company'), updateCompanyProfile);

// Public payment reputation stats
router.get('/payment-stats/:id', getCompanyPaymentStats); 

// --- Projects Management ---
// Dashboard active projects overview call
router.get('/my-projects', protect, authorize('company'), getCompanyProjects);

// Legacy/Admin routes (keeping for backward compatibility)
router.post('/:companyId/projects', protect, authorize('company'), postProject);
router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// Status updates
router.put('/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);
router.put('/projects/:projectId/confirm-advance', protect, authorize('company'), confirmAdvancePayment);

// --- Application Management ---
router.get('/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);
router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);
router.post('/applications/:applicationId/schedule', protect, authorize('company'), scheduleInterview);
router.put('/applications/:applicationId/resolve', protect, resolveDispute);

// ⭐ NEW FEATURE ENDPOINTS FOR SIDEBAR TABS & RATING ENGINE
router.get('/applications/shortlisted', protect, authorize('company'), getShortlistedApplications);
router.get('/applications/scheduled-interviews', protect, authorize('company'), getScheduledInterviews);
router.post('/rate-trainer', protect, authorize('company'), rateTrainer);

// --- Social/Public ---
router.get('/search', searchCompanies);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.put('/follow/:targetId', protect, followCompany);

module.exports = router;