const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  getMyCompany,
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  postProject,
  getCompanyProjects,
  getProjectApplications,
  updateApplicationStatus,
  updateProjectStatus,
  scheduleInterview
} = require('../controllers/companyController');


// ================= COMPANY PROFILE =================

// Get logged-in company's profile
router.get('/me', protect, authorize('company'), getMyCompany);

// Create company profile
router.post('/', protect, authorize('company'), createCompany);

// Get all companies (public)
router.get('/', getCompanies);

// Get company by ID (public)
router.get('/:id', getCompanyById);

// Update company profile (only owner)
router.put('/:id', protect, authorize('company'), updateCompany);

// Delete company profile (only owner)
router.delete('/:id', protect, authorize('company'), deleteCompany);


// ================= PROJECT MANAGEMENT =================

// Post a new project (company owner only)
router.post('/:companyId/projects', protect, authorize('company'), postProject);

// Get all projects of a company
router.get('/:companyId/projects', protect, authorize('company'), getCompanyProjects);

// Update project status
router.put('/:companyId/projects/:projectId/status', protect, authorize('company'), updateProjectStatus);


// ================= APPLICATION MANAGEMENT =================

// Get all applications for a specific project
router.get('/:companyId/projects/:projectId/applications', protect, authorize('company'), getProjectApplications);

// Update application status
router.put('/applications/:applicationId/status', protect, authorize('company'), updateApplicationStatus);

// Schedule interview
router.put('/applications/:applicationId/interview', protect, authorize('company'), scheduleInterview);


module.exports = router;