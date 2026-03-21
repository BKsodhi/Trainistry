// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');

// const {
//   getMyCompany,
//   createCompany,
//   getCompanies,
//   getCompanyById,
//   updateCompany,
//   deleteCompany,
//   postProject,
//   getCompanyProjects,
//   getProjectApplications,
//   updateApplicationStatus,
//   updateProjectStatus,
//   scheduleInterview
// } = require('../controllers/companyController');


// // ================= COMPANY PROFILE =================

// // Get logged-in company's profile
// router.get('/me', protect, authorize('company'), getMyCompany);

// // Create company profile
// router.post('/', protect, authorize('company'), createCompany);

// // Get all companies (public)
// router.get('/', getCompanies);

// // Get company by ID (public)
// router.get('/:id', getCompanyById);

// // Update company profile (only owner)
// router.put('/:id', protect, authorize('company'), updateCompany);

// // Delete company profile (only owner)
// router.delete('/:id', protect, authorize('company'), deleteCompany);


// // ================= PROJECT MANAGEMENT =================

// // Post a new project (company owner only)
// router.post('/:companyId/projects', protect, authorize('company'), postProject);

// // Get all projects of a company
// router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// // Update project status
// router.put('/:companyId/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);


// // ================= APPLICATION MANAGEMENT =================

// // Get all applications for a specific project
// router.get('/:companyId/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);

// // Update application status
// router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);

// // Schedule interview
// router.put('/applications/:applicationId/interview', protect, authorize('company'), scheduleInterview);


// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');

// const {
//   getCompanyDashboardStats, // Added for Figma Analytics
//   getMyCompany,
//   createCompany,
//   getCompanies,
//   getCompanyById,
//   updateCompany,
//   deleteCompany,
//   postProject,
//   getCompanyProjects,
//   getProjectApplications,
//   updateApplicationStatus,
//   updateProjectStatus,
//   scheduleInterview
// } = require('../controllers/companyController');


// // ================= DASHBOARD & ANALYTICS =================

// // Get analytics for dashboard cards (Figma design)
// router.get('/stats', protect, authorize('company'), getCompanyDashboardStats);


// // ================= COMPANY PROFILE =================

// // Get logged-in company's profile
// router.get('/me', protect, authorize('company'), getMyCompany);

// // Create company profile
// router.post('/', protect, authorize('company'), createCompany);

// // Get all companies (public)
// router.get('/', getCompanies);

// // Get company by ID (public)
// router.get('/:id', getCompanyById);

// // Update company profile (only owner)
// router.put('/:id', protect, authorize('company'), updateCompany);

// // Delete company profile (only owner)
// router.delete('/:id', protect, authorize('company'), deleteCompany);


// // ================= PROJECT MANAGEMENT =================

// // Post a new project (company owner only)
// router.post('/:companyId/projects', protect, authorize('company'), postProject);

// // Get all projects of a company
// router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// // Update project status
// router.put('/:companyId/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);


// // ================= APPLICATION MANAGEMENT =================

// // Get all applications for a specific project
// router.get('/:companyId/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);

// // Update application status
// router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);

// // Schedule interview
// // router.put('/applications/:applicationId/interview', protect, authorize('company'), scheduleInterview);
// router.post('/applications/:applicationId/schedule', protect, authorize('company'), scheduleInterview);
// // Dashboard Stats - Add this line
// router.get('/dashboard/stats', protect, authorize('company'), getCompanyDashboardStats);


// module.exports = router;

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  getCompanyDashboardStats,
  getMyCompany,
  createCompany,
  getCompanies,
  getCompanyById,
  postProject,
  getCompanyProjects,
  getProjectApplications,
  updateApplicationStatus,
  updateProjectStatus,
  resolveDispute,
  scheduleInterview
} = require('../controllers/companyController');

// Profile & Stats (Protected)
router.get('/stats', protect, authorize('company'), getCompanyDashboardStats);
router.get('/me', protect, authorize('company'), getMyCompany);
router.post('/', protect, authorize('company'), createCompany);

// Public Company Info
router.get('/', getCompanies);
router.get('/:id', getCompanyById);

// Projects Management (Protected)
router.post('/:companyId/projects', protect, authorize('company'), postProject);
router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// Update project status (Triggers 15-day deadline)
router.put('/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);

// Application Management (Protected)
router.get('/:companyId/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);

// Update application status (Triggers Selection/Rejection Email)
router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);

// Interview Scheduling
router.post('/applications/:applicationId/schedule', protect, authorize('company'), scheduleInterview);

router.put('/applications/:applicationId/resolve', protect, resolveDispute);

module.exports = router;