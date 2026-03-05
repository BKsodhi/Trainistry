// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const {
//   createCompany,
//   getCompanies,
//   getCompanyById,
//   updateCompany,
//   deleteCompany,
//   postProject,
//   getCompanyProjects,
//   getProjectApplications,
//   updateApplicationStatus
// } = require('../controllers/companyController');


// // ================= COMPANY PROFILE =================

// // Create company profile (only logged-in company user)
// router.post('/', protect, createCompany);

// // Get all companies (public)
// router.get('/', getCompanies);

// // Get single company by ID (public)
// router.get('/:id', getCompanyById);

// // Update company (only owner company)
// router.put('/:id', protect, updateCompany);

// // Delete company (only owner company)
// router.delete('/:id', protect, deleteCompany);


// // ================= PROJECT MANAGEMENT =================

// // Post new project (only company)
// router.post('/:companyId/projects', protect, postProject);

// // Get projects of a company (public or protected - your choice)
// router.get('/:companyId/projects', getCompanyProjects);


// // ================= APPLICATION MANAGEMENT =================

// // Get applications for a project (only company)
// router.get('/projects/:projectId/applications', protect, getProjectApplications);

// // Update application status (only company)
// router.put('/applications/:applicationId/status', protect, updateApplicationStatus);


// module.exports = router;

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
  updateApplicationStatus
} = require('../controllers/companyController');


// ================= COMPANY PROFILE =================

// Get my company profile
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

// Post project (only company owner)
router.post('/:companyId/projects', protect, postProject);

// Get all projects of a company
router.get('/:companyId/projects', getCompanyProjects);


// ================= APPLICATION MANAGEMENT =================

// Get all applications for a project (only company owner)
router.get('/:companyId/projects/:projectId/applications', protect, getProjectApplications);

// Update application status (only company owner)
router.put('/applications/:applicationId/status', protect, updateApplicationStatus);


module.exports = router;