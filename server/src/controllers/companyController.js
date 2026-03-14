// const CompanyProfile = require('../models/CompanyProfile');
// const Project = require('../models/Project');
// const Application = require('../models/Application');
// const Notification = require('../models/Notification');

// // GET MY COMPANY PROFILE
// exports.getMyCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id }).populate('user', 'name email');

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: company
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // CREATE COMPANY
// exports.createCompany = async (req, res) => {
//   try {

//     if (req.user.role !== 'company') {
//       return res.status(403).json({
//         success: false,
//         message: 'Company access only'
//       });
//     }

//     const existingCompany = await CompanyProfile.findOne({ user: req.user._id });

//     if (existingCompany) {
//       return res.status(400).json({
//         success: false,
//         message: 'Company profile already exists'
//       });
//     }

//     const company = await CompanyProfile.create({
//       user: req.user._id,
//       ...req.body
//     });

//     res.status(201).json({
//       success: true,
//       data: company
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // GET ALL COMPANIES
// exports.getCompanies = async (req, res) => {
//   try {

//     const companies = await CompanyProfile.find()
//       .populate('user', 'name email')
//       .lean();

//     res.status(200).json({
//       success: true,
//       data: companies
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // GET COMPANY BY ID
// exports.getCompanyById = async (req, res) => {
//   try {

//     const company = await CompanyProfile.findById(req.params.id)
//       .populate('user', 'name email');

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: 'Company not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: company
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // UPDATE COMPANY
// exports.updateCompany = async (req, res) => {
//   try {

//     if (req.user.role !== 'company') {
//       return res.status(403).json({
//         success: false,
//         message: 'Company access only'
//       });
//     }

//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: 'Company not found'
//       });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized'
//       });
//     }

//     Object.assign(company, req.body);

//     const updatedCompany = await company.save();

//     res.status(200).json({
//       success: true,
//       data: updatedCompany
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // DELETE COMPANY
// exports.deleteCompany = async (req, res) => {
//   try {

//     if (req.user.role !== 'company') {
//       return res.status(403).json({
//         success: false,
//         message: 'Company access only'
//       });
//     }

//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: 'Company not found'
//       });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized'
//       });
//     }

//     await company.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: 'Company deleted successfully'
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // POST PROJECT
// exports.postProject = async (req, res) => {
//   try {

//     if (req.user.role !== 'company') {
//       return res.status(403).json({
//         success: false,
//         message: 'Company access only'
//       });
//     }

//     const company = await CompanyProfile.findOne({ user: req.user._id });

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: 'Company not found'
//       });
//     }

//     const project = await Project.create({
//       company: company._id,
//       ...req.body
//     });

//     res.status(201).json({
//       success: true,
//       data: project
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // GET COMPANY PROJECTS
// exports.getCompanyProjects = async (req, res) => {
//   try {

//     const company = await CompanyProfile.findById(req.params.companyId);

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company not found"
//       });
//     }

//     const projects = await Project.find({ company: company._id })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: projects
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // GET PROJECT APPLICATIONS
// exports.getProjectApplications = async (req, res) => {
//   try {

//     if (req.user.role !== 'company') {
//       return res.status(403).json({
//         success: false,
//         message: 'Company access only'
//       });
//     }

//     const project = await Project.findById(req.params.projectId)
//       .populate({
//         path: 'company',
//         populate: { path: 'user', select: 'name email' }
//       });

//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: 'Project not found'
//       });
//     }

//     if (project.company.user._id.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized'
//       });
//     }

//     const applications = await Application.find({ project: project._id })
//       .populate({
//         path: 'trainer',
//         populate: { path: 'user', select: 'name email' }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: applications
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // UPDATE APPLICATION STATUS (FIXED AUTHORIZATION)
// exports.updateApplicationStatus = async (req, res) => {
//   try {

//     if (req.user.role !== 'company') {
//       return res.status(403).json({
//         success: false,
//         message: 'Company access only'
//       });
//     }

//     const allowedStatus = ["applied", "shortlisted", "interview", "selected", "rejected"];

//     if (req.body.status && !allowedStatus.includes(req.body.status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status value"
//       });
//     }

//     const application = await Application.findById(req.params.applicationId)
//       .populate({
//         path: 'project',
//         populate: {
//           path: 'company',
//           populate: { path: 'user', select: 'name email' }
//         }
//       });

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     // 🔹 safer authorization check
//     const companyProfile = await CompanyProfile.findOne({ user: req.user._id });

//     if (!companyProfile) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     if (application.project.company._id.toString() !== companyProfile._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized'
//       });
//     }

//     application.status = req.body.status || application.status;
//     application.interviewDate = req.body.interviewDate || application.interviewDate;

//     const updatedApplication = await application.save();

//     // Notification type mapping
//     let notificationType = "general";

//     if (application.status === "selected") notificationType = "application_selected";
//     if (application.status === "rejected") notificationType = "application_rejected";
//     if (application.status === "interview") notificationType = "interview_scheduled";

//     await Notification.create({
//       recipient: application.trainer,
//       recipientType: 'trainer',
//       message: `Your application status has been updated to "${application.status}"`,
//       type: notificationType,
//       relatedApplication: application._id
//     });

//     res.status(200).json({
//       success: true,
//       data: updatedApplication
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // UPDATE PROJECT STATUS
// exports.updateProjectStatus = async (req, res) => {
//   try {

//     if (req.user.role !== 'company') {
//       return res.status(403).json({
//         success: false,
//         message: 'Company access only'
//       });
//     }

//     const project = await Project.findById(req.params.projectId);

//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: 'Project not found'
//       });
//     }

//     project.status = req.body.status || project.status;

//     const updatedProject = await project.save();

//     res.status(200).json({
//       success: true,
//       data: updatedProject
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // SCHEDULE INTERVIEW
// exports.scheduleInterview = async (req, res) => {
//   try {

//     if (req.user.role !== 'company') {
//       return res.status(403).json({
//         success: false,
//         message: 'Company access only'
//       });
//     }

//     const application = await Application.findById(req.params.applicationId)
//       .populate({
//         path: 'project',
//         populate: {
//           path: 'company',
//           populate: { path: 'user', select: 'name email' }
//         }
//       });

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     if (application.project.company.user._id.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized'
//       });
//     }

//     application.interviewDate = req.body.interviewDate;
//     application.status = 'interview';

//     const updatedApp = await application.save();

//     await Notification.create({
//       recipient: application.trainer,
//       recipientType: 'trainer',
//       message: `Interview scheduled for project "${application.project.title}" on ${application.interviewDate}`,
//       type: 'interview_scheduled',
//       relatedApplication: application._id
//     });

//     res.status(200).json({
//       success: true,
//       data: updatedApp
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");


// // =====================================
// // GET MY COMPANY PROFILE
// // =====================================
// exports.getMyCompany = async (req, res) => {
//   try {

//     const company = await CompanyProfile
//       .findOne({ user: req.user._id })
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: company
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // CREATE COMPANY PROFILE
// // =====================================
// exports.createCompany = async (req, res) => {
//   try {

//     const existing = await CompanyProfile.findOne({ user: req.user._id });

//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "Company profile already exists"
//       });
//     }

//     const company = await CompanyProfile.create({
//       user: req.user._id,
//       ...req.body
//     });

//     res.status(201).json({
//       success: true,
//       data: company
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // GET ALL COMPANIES
// // =====================================
// exports.getCompanies = async (req, res) => {
//   try {

//     const companies = await CompanyProfile
//       .find()
//       .populate("user", "name email");

//     res.status(200).json({
//       success: true,
//       data: companies
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // GET COMPANY BY ID
// // =====================================
// exports.getCompanyById = async (req, res) => {
//   try {

//     const company = await CompanyProfile
//       .findById(req.params.id)
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: company
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // UPDATE COMPANY
// // =====================================
// exports.updateCompany = async (req, res) => {
//   try {

//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company not found"
//       });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized"
//       });
//     }

//     Object.assign(company, req.body);

//     const updated = await company.save();

//     res.status(200).json({
//       success: true,
//       data: updated
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // DELETE COMPANY
// // =====================================
// exports.deleteCompany = async (req, res) => {
//   try {

//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company not found"
//       });
//     }

//     await company.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Company deleted"
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // POST PROJECT
// // =====================================
// exports.postProject = async (req, res) => {
//   try {

//     const company = await CompanyProfile.findOne({ user: req.user._id });

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     const project = await Project.create({
//       company: company._id,
//       ...req.body
//     });

//     res.status(201).json({
//       success: true,
//       data: project
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // GET COMPANY PROJECTS
// // =====================================
// exports.getCompanyProjects = async (req, res) => {
//   try {

//     const company = await CompanyProfile.findOne({ user: req.user._id });

//     const projects = await Project.find({ company: company._id })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: projects
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // UPDATE PROJECT STATUS
// // =====================================
// exports.updateProjectStatus = async (req, res) => {
//   try {

//     const project = await Project.findById(req.params.projectId);

//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: "Project not found"
//       });
//     }

//     project.status = req.body.status || project.status;

//     const updated = await project.save();

//     res.status(200).json({
//       success: true,
//       data: updated
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // GET PROJECT APPLICATIONS
// // =====================================
// exports.getProjectApplications = async (req, res) => {
//   try {

//     const applications = await Application
//       .find({ project: req.params.projectId })
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: applications
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // UPDATE APPLICATION STATUS
// // =====================================
// exports.updateApplicationStatus = async (req, res) => {
//   try {

//     const application = await Application
//       .findById(req.params.applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: "Application not found"
//       });
//     }

//     application.status = req.body.status;
//     application.interviewDate = req.body.interviewDate || application.interviewDate;

//     const updated = await application.save();

//     let message = `Your application status for "${application.project.title}" is now "${application.status}"`;

//     if (application.status === "interview") {
//       message = `Interview scheduled on ${application.interviewDate} for "${application.project.title}"`;
//     }

//     await Notification.create({
//       recipient: application.trainer.user,
//       recipientType: "trainer",
//       message,
//       type: "application_update",
//       relatedApplication: application._id
//     });

//     res.status(200).json({
//       success: true,
//       data: updated
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =====================================
// // SCHEDULE INTERVIEW
// // =====================================
// exports.scheduleInterview = async (req, res) => {
//   try {

//     const application = await Application
//       .findById(req.params.applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: "Application not found"
//       });
//     }

//     application.interviewDate = req.body.interviewDate;
//     application.status = "interview";

//     const updated = await application.save();

//     await Notification.create({
//       recipient: application.trainer.user,
//       recipientType: "trainer",
//       message: `Interview scheduled for "${application.project.title}" on ${application.interviewDate}`,
//       type: "interview_scheduled",
//       relatedApplication: application._id
//     });

//     res.status(200).json({
//       success: true,
//       data: updated
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");

// // =====================================
// // GET MY COMPANY PROFILE
// // =====================================
// exports.getMyCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile
//       .findOne({ user: req.user._id })
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: company
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // CREATE COMPANY PROFILE
// // =====================================
// exports.createCompany = async (req, res) => {
//   try {
//     if (req.user.role !== "company") {
//       return res.status(403).json({ success: false, message: "Company access only" });
//     }

//     const existing = await CompanyProfile.findOne({ user: req.user._id });
//     if (existing) {
//       return res.status(400).json({ success: false, message: "Company profile already exists" });
//     }

//     const company = await CompanyProfile.create({
//       user: req.user._id,
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET ALL COMPANIES (Public)
// // =====================================
// exports.getCompanies = async (req, res) => {
//   try {
//     const companies = await CompanyProfile.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: companies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET COMPANY BY ID
// // =====================================
// exports.getCompanyById = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id)
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE COMPANY PROFILE
// // =====================================
// exports.updateCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     Object.assign(company, req.body);
//     const updated = await company.save();

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // DELETE COMPANY PROFILE
// // =====================================
// exports.deleteCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     await company.deleteOne();

//     res.status(200).json({ success: true, message: "Company deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // POST PROJECT
// // =====================================
// exports.postProject = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const project = await Project.create({
//       company: company._id,
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET COMPANY PROJECTS
// // =====================================
// exports.getCompanyProjects = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE PROJECT STATUS
// // =====================================
// exports.updateProjectStatus = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     project.status = req.body.status || project.status;
//     const updated = await project.save();

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET PROJECT APPLICATIONS
// // =====================================
// exports.getProjectApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ project: req.params.projectId })
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE APPLICATION STATUS
// // =====================================
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     application.status = req.body.status;
//     application.interviewDate = req.body.interviewDate || application.interviewDate;
//     const updated = await application.save();

//     // Create notification
//     let message = `Your application for "${application.project.title}" is now "${application.status}"`;
//     if (application.status === "interview") {
//       message = `Interview scheduled on ${application.interviewDate} for "${application.project.title}"`;
//     }

//     await Notification.create({
//       recipient: application.trainer.user,
//       recipientType: "trainer",
//       message,
//       type: "application_update",
//       relatedApplication: application._id
//     });

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // SCHEDULE INTERVIEW
// // =====================================
// exports.scheduleInterview = async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     application.interviewDate = req.body.interviewDate;
//     application.status = "interview";

//     const updated = await application.save();

//     await Notification.create({
//       recipient: application.trainer.user,
//       recipientType: "trainer",
//       message: `Interview scheduled for "${application.project.title}" on ${application.interviewDate}`,
//       type: "interview_scheduled",
//       relatedApplication: application._id
//     });

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");

// // =====================================
// // GET MY COMPANY PROFILE
// // =====================================
// exports.getMyCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile
//       .findOne({ user: req.user._id })
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: company
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // CREATE COMPANY PROFILE
// // =====================================
// exports.createCompany = async (req, res) => {
//   try {
//     if (req.user.role !== "company") {
//       return res.status(403).json({ success: false, message: "Company access only" });
//     }

//     const existing = await CompanyProfile.findOne({ user: req.user._id });
//     if (existing) {
//       return res.status(400).json({ success: false, message: "Company profile already exists" });
//     }

//     const company = await CompanyProfile.create({
//       user: req.user._id,
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET ALL COMPANIES (Public)
// // =====================================
// exports.getCompanies = async (req, res) => {
//   try {
//     const companies = await CompanyProfile.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: companies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET COMPANY BY ID
// // =====================================
// exports.getCompanyById = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id)
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE COMPANY PROFILE
// // =====================================
// exports.updateCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     Object.assign(company, req.body);
//     const updated = await company.save();

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // DELETE COMPANY PROFILE
// // =====================================
// exports.deleteCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     await company.deleteOne();

//     res.status(200).json({ success: true, message: "Company deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // POST PROJECT
// // =====================================
// exports.postProject = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const project = await Project.create({
//       company: company._id,
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET COMPANY PROJECTS
// // =====================================
// exports.getCompanyProjects = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE PROJECT STATUS
// // =====================================
// exports.updateProjectStatus = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     project.status = req.body.status || project.status;
//     const updated = await project.save();

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET PROJECT APPLICATIONS
// // =====================================
// exports.getProjectApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ project: req.params.projectId })
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE APPLICATION STATUS (WORKING VERSION)
// // =====================================
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     // 🔹 Check ownership
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company || !application.project || application.project.company.toString() !== company._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized to update this application" });
//     }

//     // 🔹 Update status
//     application.status = req.body.status || application.status;
//     application.interviewDate = req.body.interviewDate || application.interviewDate;
//     const updated = await application.save();

//     // 🔹 Notification
//     if (application.trainer && application.trainer.user) {
//       let message = `Your application for "${application.project.title}" is now "${application.status}"`;
//       if (application.status === "interview") {
//         message = `Interview scheduled on ${application.interviewDate} for "${application.project.title}"`;
//       }

//       await Notification.create({
//         recipient: application.trainer.user._id,
//         recipientType: "trainer",
//         message,
//         type: "application_update",
//         relatedApplication: application._id
//       });
//     }

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     res.status(500).json({ success: false, message: "Failed to update status. Try again." });
//   }
// };

// // =====================================
// // SCHEDULE INTERVIEW
// // =====================================
// exports.scheduleInterview = async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     application.interviewDate = req.body.interviewDate;
//     application.status = "interview";

//     const updated = await application.save();

//     if (application.trainer && application.trainer.user) {
//       await Notification.create({
//         recipient: application.trainer.user._id,
//         recipientType: "trainer",
//         message: `Interview scheduled for "${application.project.title}" on ${application.interviewDate}`,
//         type: "interview_scheduled",
//         relatedApplication: application._id
//       });
//     }

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     console.error("Error scheduling interview:", error);
//     res.status(500).json({ success: false, message: "Failed to schedule interview. Try again." });
//   }
// // };

// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");

// // =====================================
// // GET MY COMPANY PROFILE
// // =====================================
// exports.getMyCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile
//       .findOne({ user: req.user._id })
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: company
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // CREATE COMPANY PROFILE
// // =====================================
// exports.createCompany = async (req, res) => {
//   try {
//     if (req.user.role !== "company") {
//       return res.status(403).json({ success: false, message: "Company access only" });
//     }

//     const existing = await CompanyProfile.findOne({ user: req.user._id });
//     if (existing) {
//       return res.status(400).json({ success: false, message: "Company profile already exists" });
//     }

//     const company = await CompanyProfile.create({
//       user: req.user._id,
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET ALL COMPANIES (Public)
// // =====================================
// exports.getCompanies = async (req, res) => {
//   try {
//     const companies = await CompanyProfile.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: companies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET COMPANY BY ID
// // =====================================
// exports.getCompanyById = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id)
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE COMPANY PROFILE
// // =====================================
// exports.updateCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     Object.assign(company, req.body);
//     const updated = await company.save();

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // DELETE COMPANY PROFILE
// // =====================================
// exports.deleteCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     await company.deleteOne();

//     res.status(200).json({ success: true, message: "Company deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // POST PROJECT
// // =====================================
// exports.postProject = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const project = await Project.create({
//       company: company._id,
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET COMPANY PROJECTS
// // =====================================
// exports.getCompanyProjects = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE PROJECT STATUS
// // =====================================
// exports.updateProjectStatus = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     project.status = req.body.status || project.status;
//     const updated = await project.save();

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET PROJECT APPLICATIONS
// // =====================================
// exports.getProjectApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ project: req.params.projectId })
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE APPLICATION STATUS (WITH NOTIFICATIONS)
// // =====================================
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { status } = req.body;

//     // Validate status
//     if (!status || !["shortlisted", "rejected"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const application = await Application.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found" });
//     }

//     // Update status
//     application.status = status;
//     await application.save();

//     res.status(200).json({ success: true, data: application });
//   } catch (error) {
//     console.error("Update application status error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // SCHEDULE INTERVIEW
// // =====================================
// exports.scheduleInterview = async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     application.interviewDate = req.body.interviewDate;
//     application.status = "interview";

//     const updated = await application.save();

//     if (application.trainer && application.trainer.user) {
//       await Notification.create({
//         recipient: application.trainer.user._id,
//         recipientType: "trainer",
//         message: `Interview scheduled for "${application.project.title}" on ${application.interviewDate}`,
//         type: "interview_scheduled",
//         relatedApplication: application._id
//       });
//     }

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     console.error("Error scheduling interview:", error);
//     res.status(500).json({ success: false, message: "Failed to schedule interview. Try again." });
//   }
// };

// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");

// // =====================================
// // GET COMPANY DASHBOARD STATS (NEW - For Figma Cards)
// // =====================================
// exports.getCompanyDashboardStats = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id });
    
//     // Calculate stats for the Glassmorphism cards in Figma
//     const stats = {
//       totalPostings: projects.length,
//       activeProjects: projects.filter(p => p.status === 'open' || p.status === 'active').length,
//       shortlistedTrainers: await Application.countDocuments({ 
//         project: { $in: projects.map(p => p._id) }, 
//         status: 'shortlisted' 
//       }),
//       interviewsScheduled: await Application.countDocuments({ 
//         project: { $in: projects.map(p => p._id) }, 
//         status: 'interview' 
//       })
//     };

//     res.status(200).json({
//       success: true,
//       data: stats
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET MY COMPANY PROFILE
// // =====================================
// exports.getMyCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile
//       .findOne({ user: req.user._id })
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: company
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // CREATE COMPANY PROFILE
// // =====================================
// exports.createCompany = async (req, res) => {
//   try {
//     if (req.user.role !== "company") {
//       return res.status(403).json({ success: false, message: "Company access only" });
//     }

//     const existing = await CompanyProfile.findOne({ user: req.user._id });
//     if (existing) {
//       return res.status(400).json({ success: false, message: "Company profile already exists" });
//     }

//     const company = await CompanyProfile.create({
//       user: req.user._id,
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET ALL COMPANIES (Public)
// // =====================================
// exports.getCompanies = async (req, res) => {
//   try {
//     const companies = await CompanyProfile.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: companies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET COMPANY BY ID
// // =====================================
// exports.getCompanyById = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id)
//       .populate("user", "name email");

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE COMPANY PROFILE
// // =====================================
// exports.updateCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     Object.assign(company, req.body);
//     const updated = await company.save();

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // DELETE COMPANY PROFILE
// // =====================================
// exports.deleteCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }

//     await company.deleteOne();

//     res.status(200).json({ success: true, message: "Company deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // POST PROJECT
// // =====================================
// exports.postProject = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const project = await Project.create({
//       company: company._id,
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET COMPANY PROJECTS
// // =====================================
// exports.getCompanyProjects = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: projects });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE PROJECT STATUS
// // =====================================
// exports.updateProjectStatus = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     project.status = req.body.status || project.status;
//     const updated = await project.save();

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // GET PROJECT APPLICATIONS
// // =====================================
// exports.getProjectApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ project: req.params.projectId })
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE APPLICATION STATUS
// // =====================================
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { status } = req.body;

//     if (!status || !["shortlisted", "rejected"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const application = await Application.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found" });
//     }

//     application.status = status;
//     await application.save();

//     res.status(200).json({ success: true, data: application });
//   } catch (error) {
//     console.error("Update application status error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // // =====================================
// // // SCHEDULE INTERVIEW
// // // =====================================
// // exports.scheduleInterview = async (req, res) => {
// //   try {
// //     const application = await Application.findById(req.params.applicationId)
// //       .populate("project")
// //       .populate({
// //         path: "trainer",
// //         populate: { path: "user", select: "name email" }
// //       });

// //     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

// //     application.interviewDate = req.body.interviewDate;
// //     application.status = "interview";

// //     const updated = await application.save();

// //     if (application.trainer && application.trainer.user) {
// //       await Notification.create({
// //         recipient: application.trainer.user._id,
// //         recipientType: "trainer",
// //         message: `Interview scheduled for "${application.project.title}" on ${application.interviewDate}`,
// //         type: "interview_scheduled",
// //         relatedApplication: application._id
// //       });
// //     }

// //     res.status(200).json({ success: true, data: updated });
// //   } catch (error) {
// //     console.error("Error scheduling interview:", error);
// //     res.status(500).json({ success: false, message: "Failed to schedule interview." });
// //   }
// // };
// // =====================================
// // SCHEDULE INTERVIEW (Corrected)
// // =====================================
// exports.scheduleInterview = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     // Extract fields exactly as sent by React/Postman
//     const { date, time, link } = req.body;

//     const application = await Application.findById(applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found" });
//     }

//     // Update with frontend values
//     application.status = "interview_scheduled"; 
//     application.interviewDate = date;
//     application.interviewTime = time;
//     application.meetingLink = link;

//     const updated = await application.save();

//     // Create Notification for the Trainer
//     if (application.trainer && application.trainer.user) {
//       await Notification.create({
//         recipient: application.trainer.user._id,
//         recipientType: "trainer",
//         message: `Interview scheduled for "${application.project.title}" on ${date} at ${time}. Link: ${link}`,
//         type: "interview_scheduled",
//         relatedApplication: application._id
//       });
//     }

//     res.status(200).json({ 
//       success: true, 
//       message: "Interview scheduled successfully", 
//       data: updated 
//     });
//   } catch (error) {
//     console.error("Error scheduling interview:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const CompanyProfile = require("../models/CompanyProfile");
const Project = require("../models/Project");
const Application = require("../models/Application");
const Notification = require("../models/Notification");

// =====================================
// GET COMPANY DASHBOARD STATS
// =====================================
exports.getCompanyDashboardStats = async (req, res) => {
  try {
    const company = await CompanyProfile.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found" });
    }

    const projects = await Project.find({ company: company._id });
    const projectIds = projects.map(p => p._id);
    
    const stats = {
      totalPostings: projects.length,
      activeProjects: projects.filter(p => p.status === 'open' || p.status === 'active').length,
      shortlistedTrainers: await Application.countDocuments({ 
        project: { $in: projectIds }, 
        status: 'shortlisted' 
      }),
      // Updated to match the status used in scheduleInterview
      interviewsScheduled: await Application.countDocuments({ 
        project: { $in: projectIds }, 
        status: 'interview_scheduled' 
      })
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// GET MY COMPANY PROFILE
// =====================================
exports.getMyCompany = async (req, res) => {
  try {
    const company = await CompanyProfile
      .findOne({ user: req.user._id })
      .populate("user", "name email");

    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found" });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// CREATE COMPANY PROFILE
// =====================================
exports.createCompany = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ success: false, message: "Company access only" });
    }

    const existing = await CompanyProfile.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: "Company profile already exists" });
    }

    const company = await CompanyProfile.create({
      user: req.user._id,
      ...req.body
    });

    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// GET ALL COMPANIES (Public)
// =====================================
exports.getCompanies = async (req, res) => {
  try {
    const companies = await CompanyProfile.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// GET COMPANY BY ID
// =====================================
exports.getCompanyById = async (req, res) => {
  try {
    const company = await CompanyProfile.findById(req.params.id)
      .populate("user", "name email");

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// POST PROJECT
// =====================================
exports.postProject = async (req, res) => {
  try {
    const company = await CompanyProfile.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found" });
    }

    const project = await Project.create({
      company: company._id,
      ...req.body
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// GET COMPANY PROJECTS
// =====================================
exports.getCompanyProjects = async (req, res) => {
  try {
    const company = await CompanyProfile.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found" });
    }

    const projects = await Project.find({ company: company._id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// GET PROJECT APPLICATIONS
// =====================================
exports.getProjectApplications = async (req, res) => {
  try {
    const applications = await Application.find({ project: req.params.projectId })
      .populate({
        path: "trainer",
        populate: { path: "user", select: "name email" }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// UPDATE APPLICATION STATUS (Shortlist/Reject)
// =====================================
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!status || !["shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.scheduleInterview = async (req, res) => {
  try {
    const { applicationId } = req.params;
    // Extracting 'date' from the request body as sent in Postman
    const { date, time, link } = req.body; 

    const application = await Application.findById(applicationId)
      .populate("project")
      .populate({
        path: "trainer",
        populate: { path: "user", select: "name email" }
      });

    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    // 1. Update Application Record with mapped fields
    application.status = "interview_scheduled"; 
    application.interviewDate = date; // This maps 'date' to your schema's 'interviewDate'
    application.interviewTime = time;
    application.meetingLink = link;

    const updated = await application.save();

    // 2. Create Notification - Using the 'date' variable directly to fix "undefined"
    if (application.trainer && application.trainer.user) {
      await Notification.create({
        recipient: application.trainer.user._id,
        recipientType: "trainer",
        message: `Interview scheduled for "${application.project.title}" on ${date} at ${time}. Link: ${link}`,
        type: "interview_scheduled",
        relatedApplication: application._id
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Interview scheduled successfully", 
      data: updated 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// UPDATE/DELETE COMPANY & PROJECT STATUS
// =====================================
exports.updateCompany = async (req, res) => {
  try {
    const company = await CompanyProfile.findById(req.params.id);
    if (!company || company.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    Object.assign(company, req.body);
    await company.save();
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await CompanyProfile.findById(req.params.id);
    if (!company || company.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    await company.deleteOne();
    res.status(200).json({ success: true, message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProjectStatus = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    project.status = req.body.status || project.status;
    await project.save();
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};