const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
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
router.get('/me', protect, getMyCompany);

// Create company profile
router.post('/', protect, createCompany);

// Get all companies (public)
router.get('/', getCompanies);

// Get company by ID (public)
router.get('/:id', getCompanyById);

// Update company profile (only owner)
router.put('/:id', protect, updateCompany);

// Delete company profile (only owner)
router.delete('/:id', protect, deleteCompany);

// ================= PROJECT MANAGEMENT =================
// Post a new project (company owner only)
router.post('/:companyId/projects', protect, postProject);

// Get all projects of a company
router.get('/:companyId/projects', protect, getCompanyProjects);

// Update project status
router.put('/:companyId/projects/:projectId/status', protect, updateProjectStatus);

// ================= APPLICATION MANAGEMENT =================
// Get all applications for a specific project
router.get('/:companyId/projects/:projectId/applications', protect, getProjectApplications);

// Update application status (shortlist, select, reject, etc.)
router.put('/applications/:applicationId/status', protect, updateApplicationStatus);

// Schedule interview for an application
router.put('/applications/:applicationId/interview', protect, scheduleInterview);

module.exports = router;