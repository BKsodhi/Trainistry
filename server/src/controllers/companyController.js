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

// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");

// // =====================================
// // GET COMPANY DASHBOARD STATS
// // =====================================
// exports.getCompanyDashboardStats = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id });
//     const projectIds = projects.map(p => p._id);
    
//     const stats = {
//       totalPostings: projects.length,
//       activeProjects: projects.filter(p => p.status === 'open' || p.status === 'active').length,
//       shortlistedTrainers: await Application.countDocuments({ 
//         project: { $in: projectIds }, 
//         status: 'shortlisted' 
//       }),
//       // Updated to match the status used in scheduleInterview
//       interviewsScheduled: await Application.countDocuments({ 
//         project: { $in: projectIds }, 
//         status: 'interview_scheduled' 
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
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     res.status(200).json({ success: true, data: company });
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
// // UPDATE APPLICATION STATUS (Shortlist/Reject)
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
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.scheduleInterview = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     // Extracting 'date' from the request body as sent in Postman
//     const { date, time, link } = req.body; 

//     const application = await Application.findById(applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     // 1. Update Application Record with mapped fields
//     application.status = "interview_scheduled"; 
//     application.interviewDate = date; // This maps 'date' to your schema's 'interviewDate'
//     application.interviewTime = time;
//     application.meetingLink = link;

//     const updated = await application.save();

//     // 2. Create Notification - Using the 'date' variable directly to fix "undefined"
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
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE/DELETE COMPANY & PROJECT STATUS
// // =====================================
// exports.updateCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);
//     if (!company || company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }
//     Object.assign(company, req.body);
//     await company.save();
//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.deleteCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);
//     if (!company || company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }
//     await company.deleteOne();
//     res.status(200).json({ success: true, message: "Company deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.updateProjectStatus = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });
//     project.status = req.body.status || project.status;
//     await project.save();
//     res.status(200).json({ success: true, data: project });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");
// const User = require("../models/User"); // Added to fetch trainer contact info
// const sendEmail = require("../utils/emailService"); // Added for mail requirement

// // =====================================
// // GET COMPANY DASHBOARD STATS
// // =====================================
// exports.getCompanyDashboardStats = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id });
//     const projectIds = projects.map(p => p._id);
    
//     const stats = {
//       totalPostings: projects.length,
//       activeProjects: projects.filter(p => p.status === 'open' || p.status === 'assigned').length,
//       shortlistedTrainers: await Application.countDocuments({ 
//         project: { $in: projectIds }, 
//         status: 'shortlisted' 
//       }),
//       interviewsScheduled: await Application.countDocuments({ 
//         project: { $in: projectIds }, 
//         status: 'interview_scheduled' 
//       })
//     };

//     res.status(200).json({ success: true, data: stats });
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
//       .populate("user", "name email phone"); // Added phone

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     res.status(200).json({ success: true, data: company });
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
//       .populate("user", "name email phone");

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     res.status(200).json({ success: true, data: company });
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
// // GET PROJECT APPLICATIONS
// // =====================================
// exports.getProjectApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ project: req.params.projectId })
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email phone" }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE APPLICATION STATUS (Shortlist/Reject/Select)
// // =====================================
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { status, feedback } = req.body;

//     // Sir's Requirement: Included 'selected' in the logic
//     if (!status || !["shortlisted", "rejected", "selected"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const application = await Application.findById(applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user" }
//       });

//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found" });
//     }

//     application.status = status;
//     if (feedback) application.feedback = feedback;
//     await application.save();

//     // --- AUTOMATED EMAIL & CONTACT LOGIC ---
//     const trainerUser = application.trainer.user;
//     let emailSubject = '';
//     let emailHtml = '';

//     if (status === 'selected') {
//       emailSubject = `Congratulations! You are selected for ${application.project.title}`;
//       emailHtml = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
//           <h2 style="color: #2563eb;">Selection Confirmation</h2>
//           <p>Hi <strong>${trainerUser.name}</strong>,</p>
//           <p>We are pleased to inform you that you have been <b>Selected</b> for the project: <strong>${application.project.title}</strong>.</p>
//           <p>The company will contact you shortly at your registered phone: <strong>${trainerUser.phone}</strong>.</p>
//           <br/>
//           <p>Best regards,<br/>Trainistry Team</p>
//         </div>
//       `;
//     } else if (status === 'rejected') {
//       emailSubject = `Update regarding your application for ${application.project.title}`;
//       emailHtml = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
//           <p>Hi ${trainerUser.name},</p>
//           <p>Thank you for your interest in <strong>${application.project.title}</strong>.</p>
//           <p>Unfortunately, the company has decided to move forward with other candidates at this time.</p>
//           ${feedback ? `<p><b>Interviewer Feedback:</b> ${feedback}</p>` : ''}
//           <br/>
//           <p>We wish you the best in your future applications.</p>
//           <p>Best regards,<br/>Trainistry Team</p>
//         </div>
//       `;
//     }

//     // Send email if selected or rejected
//     if (emailSubject) {
//       await sendEmail({
//         email: trainerUser.email,
//         subject: emailSubject,
//         html: emailHtml
//       });
//     }

//     res.status(200).json({ success: true, data: application, message: `Status updated to ${status} and mail sent.` });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // SCHEDULE INTERVIEW
// // =====================================
// exports.scheduleInterview = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { date, time, link } = req.body; 

//     const application = await Application.findById(applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email" }
//       });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     application.status = "interview_scheduled"; 
//     application.interviewDate = date; 
//     application.interviewTime = time;
//     application.meetingLink = link;

//     const updated = await application.save();

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
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE/DELETE COMPANY & PROJECT STATUS
// // =====================================
// exports.updateCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);
//     if (!company || company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }
//     Object.assign(company, req.body);
//     await company.save();
//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.deleteCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);
//     if (!company || company.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }
//     await company.deleteOne();
//     res.status(200).json({ success: true, message: "Company deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE PROJECT STATUS (With 15-Day Payment Rule)
// // =====================================
// exports.updateProjectStatus = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { status } = req.body;

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     project.status = status || project.status;

//     // Sir's Requirement: Automatic 15-day payment deadline calculation
//     if (status === 'completed') {
//       const completionDate = new Date();
//       const deadline = new Date(completionDate);
//       deadline.setDate(deadline.getDate() + 15);
//       project.paymentDeadline = deadline;
//     }

//     await project.save();
//     res.status(200).json({ 
//       success: true, 
//       data: project, 
//       message: status === 'completed' ? "Project marked completed. Payment deadline set." : "Status updated" 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");
// const User = require("../models/User");
// const sendEmail = require("../utils/emailService");

// // =====================================
// // GET COMPANY DASHBOARD STATS
// // =====================================
// exports.getCompanyDashboardStats = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id });
//     const projectIds = projects.map(p => p._id);
    
//     const stats = {
//       totalPostings: projects.length,
//       activeProjects: projects.filter(p => p.status === 'open' || p.status === 'assigned').length,
//       shortlistedTrainers: await Application.countDocuments({ 
//         project: { $in: projectIds }, 
//         status: 'shortlisted' 
//       }),
//       interviewsScheduled: await Application.countDocuments({ 
//         project: { $in: projectIds }, 
//         status: 'interview_scheduled' 
//       })
//     };

//     res.status(200).json({ success: true, data: stats });
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
//       .populate("user", "name email phone");

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     res.status(200).json({ success: true, data: company });
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
// // GET PROJECT APPLICATIONS
// // =====================================
// exports.getProjectApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ project: req.params.projectId })
//       .populate({
//         path: "trainer",
//         populate: { path: "user", select: "name email phone" }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // UPDATE APPLICATION STATUS (Selection/Interview/Email Logic)
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { status, feedback, date, time, link } = req.body;

//     const application = await Application.findById(applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user" }
//       });

//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found" });
//     }

//     application.status = status;
//     if (feedback) application.feedback = feedback;
    
//     // Handle Interview details if status is changed to interview_scheduled
//     if (status === 'interview_scheduled') {
//       application.interviewDate = date;
//       application.interviewTime = time;
//       application.meetingLink = link;
//     }
    
//     await application.save();

//     const trainerUser = application.trainer.user;
//     let emailSubject = '';
//     let emailHtml = '';

//     // CASE 1: SELECTED
//     if (status === 'selected') {
//       emailSubject = `🎉 Selection Confirmed: ${application.project.title}`;
//       emailHtml = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
//           <h2 style="color: #4338ca;">Congratulations ${trainerUser.name}!</h2>
//           <p>You have been <b>Selected</b> for the industrial project: <strong>${application.project.title}</strong>.</p>
//           <p>The company will reach out to you at <strong>${trainerUser.phone}</strong> to discuss the schedule.</p>
//           <p>Best Regards,<br/><strong>Trainistry Team</strong></p>
//         </div>`;
//     } 
//     // CASE 2: INTERVIEW SCHEDULED
//     else if (status === 'interview_scheduled') {
//       emailSubject = `📅 Interview Scheduled: ${application.project.title}`;
//       emailHtml = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
//           <h2 style="color: #f59e0b;">Interview Invitation</h2>
//           <p>Hi ${trainerUser.name}, an interview has been scheduled for <strong>${application.project.title}</strong>.</p>
//           <p><b>Date:</b> ${date}<br/><b>Time:</b> ${time}</p>
//           <p><b>Meeting Link:</b> <a href="${link}">${link}</a></p>
//           <p>Best Regards,<br/>Trainistry Team</p>
//         </div>`;
//     }
//     // CASE 3: REJECTED
//     else if (status === 'rejected') {
//       emailSubject = `Update: ${application.project.title}`;
//       emailHtml = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
//           <p>Hi ${trainerUser.name},</p>
//           <p>The company has decided not to proceed with your application for <strong>${application.project.title}</strong>.</p>
//           ${feedback ? `<p><b>Note:</b> ${feedback}</p>` : ''}
//           <p>Keep applying!</p>
//         </div>`;
//     }

//     if (emailSubject) {
//       await sendEmail({
//         email: trainerUser.email,
//         subject: emailSubject,
//         html: emailHtml
//       });
//     }

//     res.status(200).json({ success: true, message: `Status updated to ${status} and Trainer notified.` });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // =====================================
// // UPDATE PROJECT STATUS (15-Day Rule)
// // =====================================
// exports.updateProjectStatus = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { status } = req.body;

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     // project.status = status || project.status;
//     project.status = status.toLowerCase();

//     if (status.toLowerCase() === 'completed') {
//       const now = new Date();
      
//       // 1. Set Project details
//       const deadline = new Date(now);
//       deadline.setDate(deadline.getDate() + 15);
//       project.paymentDeadline = deadline;

//       // 2. Find the 'selected' application (the hired trainer) and mark it completed
//       // This triggers the Application model's internal hook
//       await Application.updateMany(
//         { project: projectId, status: 'selected' },
//         { 
//           status: 'completed', 
//           projectEndDate: now,
//           paymentDeadline: deadline 
//         }
//       );
//     }

//     await project.save();
    
//     res.status(200).json({ 
//       success: true, 
//       message: status.toLowerCase() === 'completed' ? "Project and Application completed. Payment deadline set." : "Status updated" 
//     });
//   } catch (error) {
//     console.error("Project Update Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // SCHEDULE INTERVIEW
// // =====================================
// exports.scheduleInterview = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { date, time, link } = req.body; 

//     const application = await Application.findById(applicationId)
//       .populate("project")
//       .populate({ path: "trainer", populate: { path: "user" } });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     application.status = "interview_scheduled"; 
//     application.interviewDate = date; 
//     application.interviewTime = time;
//     application.meetingLink = link;
//     await application.save();

//     await Notification.create({
//       recipient: application.trainer.user._id,
//       recipientType: "trainer",
//       message: `Interview scheduled for "${application.project.title}" on ${date} at ${time}.`,
//       type: "interview_scheduled"
//     });

//     res.status(200).json({ success: true, message: "Interview scheduled" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getCompanies = async (req, res) => {
//   try {
//     const companies = await CompanyProfile.find().populate("user", "name email");
//     res.status(200).json({ success: true, data: companies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getCompanyById = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id).populate("user", "name email phone");
//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// // };

// const CompanyProfile = require("../models/CompanyProfile");
// const Project = require("../models/Project");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification");
// const User = require("../models/User");
// const Post = require("../models/Post"); // Added to calculate Trust Score
// const sendEmail = require("../utils/emailService");

// // // =====================================
// // // GET COMPANY DASHBOARD STATS
// // // =====================================
// // exports.getCompanyDashboardStats = async (req, res) => {
// //   try {
// //     const company = await CompanyProfile.findOne({ user: req.user._id });
// //     if (!company) {
// //       return res.status(404).json({ success: false, message: "Company profile not found" });
// //     }

// //     const projects = await Project.find({ company: company._id });
// //     const projectIds = projects.map(p => p._id);
    
// //     const stats = {
// //       totalPostings: projects.length,
// //       activeProjects: projects.filter(p => p.status === 'open' || p.status === 'assigned').length,
// //       shortlistedTrainers: await Application.countDocuments({ 
// //         project: { $in: projectIds }, 
// //         status: 'shortlisted' 
// //       }),
// //       interviewsScheduled: await Application.countDocuments({ 
// //         project: { $in: projectIds }, 
// //         status: 'interview_scheduled' 
// //       }),
// //       // NEW: Count active disputes for the dashboard
// //       activeDisputes: await Application.countDocuments({
// //         project: { $in: projectIds },
// //         isDisputed: true
// //       })
// //     };

// //     res.status(200).json({ success: true, data: stats });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // =====================================
// // // GET MY COMPANY PROFILE (With Dynamic Trust Score)
// // // =====================================
// // exports.getMyCompany = async (req, res) => {
// //   try {
// //     const company = await CompanyProfile
// //       .findOne({ user: req.user._id })
// //       .populate("user", "name email phone");

// //     if (!company) {
// //       return res.status(404).json({ success: false, message: "Company profile not found" });
// //     }

// //     // DYNAMIC TRUST SCORE LOGIC
// //     // Base score is 100. Every 'warning' post in the network reduces it by 10 points.
// //     const warningCount = await Post.countDocuments({ 
// //       relatedCompany: company._id, 
// //       postType: 'warning' 
// //     });
    
// //     const calculatedScore = Math.max(0, 100 - (warningCount * 10));
    
// //     // Update the document if it changed
// //     if (company.trustScore !== calculatedScore) {
// //       company.trustScore = calculatedScore;
// //       await company.save();
// //     }

// //     res.status(200).json({ success: true, data: company });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // =====================================
// // GET COMPANY DASHBOARD STATS (Fixed to include Dynamic Trust Score)
// // =====================================
// exports.getCompanyDashboardStats = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findOne({ user: req.user._id });
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const projects = await Project.find({ company: company._id });
//     const projectIds = projects.map(p => p._id);

//     // DYNAMIC TRUST SCORE CALCULATION
//     // We calculate it here so the Dashboard "100%" card actually updates
//     const warningCount = await Post.countDocuments({ 
//       relatedCompany: company._id, 
//       postType: 'warning' 
//     });
    
//     const calculatedScore = Math.max(0, 100 - (warningCount * 10));

//     // Update the company document if the score has changed in the background
//     if (company.trustScore !== calculatedScore) {
//       company.trustScore = calculatedScore;
//       await company.save();
//     }
    
//     const stats = {
//       totalPostings: projects.length,
//       activeProjects: projects.filter(p => p.status === 'open' || p.status === 'assigned').length,
//       paymentTrustScore: calculatedScore, // Added this field for the frontend card
//       shortlistedTrainers: await Application.countDocuments({ 
//         project: { $in: projectIds }, 
//         status: 'shortlisted' 
//       }),
//       interviewsScheduled: await Application.countDocuments({ 
//         project: { $in: projectIds }, 
//         status: 'interview_scheduled' 
//       }),
//       activeDisputes: await Application.countDocuments({
//         project: { $in: projectIds },
//         isDisputed: true
//       })
//     };

//     res.status(200).json({ success: true, data: stats });
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
//       .populate("user", "name email phone");

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     // Always recalculate on fetch to ensure accuracy
//     const warningCount = await Post.countDocuments({ 
//       relatedCompany: company._id, 
//       postType: 'warning' 
//     });
    
//     company.trustScore = Math.max(0, 100 - (warningCount * 10));
//     await company.save();

//     res.status(200).json({ success: true, data: company });
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
//       return res.status(400).json({ success: false, message: "Company profile already exists" });
//     }

//     const company = await CompanyProfile.create({
//       user: req.user._id,
//       trustScore: 100, // Initialize Trust Score
//       ...req.body
//     });

//     res.status(201).json({ success: true, data: company });
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

//     // Populate applications to check for 'isDisputed' flags
//     const projects = await Project.find({ company: company._id }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: projects });
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
//         populate: { path: "user", select: "name email phone" }
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // UPDATE APPLICATION STATUS (Selection/Interview/Email Logic)
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { status, feedback, date, time, link } = req.body;

//     const application = await Application.findById(applicationId)
//       .populate("project")
//       .populate({
//         path: "trainer",
//         populate: { path: "user" }
//       });

//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found" });
//     }

//     application.status = status;
//     if (feedback) application.feedback = feedback;
    
//     if (status === 'interview_scheduled') {
//       application.interviewDate = date;
//       application.interviewTime = time;
//       application.meetingLink = link;
//     }
    
//     await application.save();

//     const trainerUser = application.trainer.user;
//     let emailSubject = '';
//     let emailHtml = '';

//     if (status === 'selected') {
//       emailSubject = `🎉 Selection Confirmed: ${application.project.title}`;
//       emailHtml = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
//           <h2 style="color: #4338ca;">Congratulations ${trainerUser.name}!</h2>
//           <p>You have been <b>Selected</b> for the industrial project: <strong>${application.project.title}</strong>.</p>
//           <p>The company will reach out to you at <strong>${trainerUser.phone}</strong> to discuss the schedule.</p>
//           <p>Best Regards,<br/><strong>Trainistry Team</strong></p>
//         </div>`;
//     } 
//     else if (status === 'interview_scheduled') {
//       emailSubject = `📅 Interview Scheduled: ${application.project.title}`;
//       emailHtml = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
//           <h2 style="color: #f59e0b;">Interview Invitation</h2>
//           <p>Hi ${trainerUser.name}, an interview has been scheduled for <strong>${application.project.title}</strong>.</p>
//           <p><b>Date:</b> ${date}<br/><b>Time:</b> ${time}</p>
//           <p><b>Meeting Link:</b> <a href="${link}">${link}</a></p>
//           <p>Best Regards,<br/>Trainistry Team</p>
//         </div>`;
//     }
//     else if (status === 'rejected') {
//       emailSubject = `Update: ${application.project.title}`;
//       emailHtml = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
//           <p>Hi ${trainerUser.name},</p>
//           <p>The company has decided not to proceed with your application for <strong>${application.project.title}</strong>.</p>
//           ${feedback ? `<p><b>Note:</b> ${feedback}</p>` : ''}
//           <p>Keep applying!</p>
//         </div>`;
//     }

//     if (emailSubject) {
//       await sendEmail({
//         email: trainerUser.email,
//         subject: emailSubject,
//         html: emailHtml
//       });
//     }

//     res.status(200).json({ success: true, message: `Status updated to ${status} and Trainer notified.` });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // UPDATE PROJECT STATUS (15-Day Rule)
// // =====================================
// exports.updateProjectStatus = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { status } = req.body;

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ success: false, message: "Project not found" });

//     project.status = status.toLowerCase();

//     if (status.toLowerCase() === 'completed') {
//       const now = new Date();
//       const deadline = new Date(now);
//       deadline.setDate(deadline.getDate() + 15);
//       project.paymentDeadline = deadline;

//       await Application.updateMany(
//         { project: projectId, status: 'selected' },
//         { 
//           status: 'completed', 
//           projectEndDate: now,
//           paymentDeadline: deadline 
//         }
//       );
//     }

//     await project.save();
    
//     res.status(200).json({ 
//       success: true, 
//       message: status.toLowerCase() === 'completed' ? "Project and Application completed. Payment deadline set." : "Status updated" 
//     });
//   } catch (error) {
//     console.error("Project Update Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // SCHEDULE INTERVIEW
// // =====================================
// exports.scheduleInterview = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { date, time, link } = req.body; 

//     const application = await Application.findById(applicationId)
//       .populate("project")
//       .populate({ path: "trainer", populate: { path: "user" } });

//     if (!application) return res.status(404).json({ success: false, message: "Application not found" });

//     application.status = "interview_scheduled"; 
//     application.interviewDate = date; 
//     application.interviewTime = time;
//     application.meetingLink = link;
//     await application.save();

//     await Notification.create({
//       recipient: application.trainer.user._id,
//       recipientType: "trainer",
//       message: `Interview scheduled for "${application.project.title}" on ${date} at ${time}.`,
//       type: "interview_scheduled"
//     });

//     res.status(200).json({ success: true, message: "Interview scheduled" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getCompanies = async (req, res) => {
//   try {
//     const companies = await CompanyProfile.find().populate("user", "name email");
//     res.status(200).json({ success: true, data: companies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getCompanyById = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id).populate("user", "name email phone");
//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // =====================================
// // RESOLVE DISPUTE (Company Side)
// // =====================================
// // exports.resolveDispute = async (req, res) => {
// //   try {
// //     const projectId = req.params.applicationId; // This is the ID from the URL
// //     const { transactionId } = req.body;

// //     console.log("--- DISPUTE RESOLUTION START ---");
// //     console.log("Searching for Project ID:", projectId);

// //     // 1. Find the application linked to this project that is currently disputed
// //     const application = await Application.findOne({ 
// //       project: projectId, 
// //       isDisputed: true 
// //     });

// //     if (!application) {
// //       console.log("RESULT: No application found with isDisputed: true for this Project ID");
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "No active dispute found for this project. Please check if the trainer has actually raised a dispute." 
// //       });
// //     }

// //     console.log("RESULT: Application found!", application._id);

// //     // 2. Update the Application flags (Using 'cleared' to match your Schema enum)
// //     application.isDisputed = false;
// //     application.paymentStatus = 'cleared'; 
// //     application.transactionId = transactionId;
// //     await application.save();

// //     // 3. Delete the Public Warning Post to restore Trust Score
// //     // We check both project ID and company ID to be safe
// //     await Post.deleteMany({ 
// //       relatedCompany: application.project.company || application.project, 
// //       postType: 'warning'
// //     });

// //     // 4. Create Notification (Ensure 'payment_resolved' is in your Notification Model enum!)
// //     try {
// //         await Notification.create({
// //           recipient: application.trainer,
// //           recipientType: "trainer",
// //           message: `Dispute Resolved: Payment received for project. Ref: ${transactionId}`,
// //           type: "payment_resolved" 
// //         });
// //     } catch (noteErr) {
// //         console.log("Notification failed (Check your Notification model enum):", noteErr.message);
// //         // We don't block the whole process if just the notification fails
// //     }

// //     res.status(200).json({ 
// //       success: true, 
// //       message: "Success! Dispute cleared and score restored." 
// //     });

// //   } catch (error) {
// //     console.error("CRITICAL ERROR:", error.message);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// exports.resolveDispute = async (req, res) => {
//   try {
//     const projectId = req.params.applicationId;
//     const { transactionId } = req.body;

//     // 1. Find the application AND populate the trainer's user info for the email
//     const application = await Application.findOne({ 
//       project: projectId, 
//       isDisputed: true 
//     }).populate({
//       path: 'trainer',
//       populate: { path: 'user', select: 'name email' }
//     }).populate('project', 'title company');

//     if (!application) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "No active dispute found for this project." 
//       });
//     }

//     // 2. Update status and save
//     application.isDisputed = false;
//     application.paymentStatus = 'cleared'; 
//     application.status = 'completed'; // Ensure both see it as completed
//     application.transactionId = transactionId;
//     await application.save();

//     // 3. Clear warnings
//     await Post.deleteMany({ 
//       relatedCompany: application.project.company || application.project, 
//       postType: 'warning'
//     });

//     // 4. NEW: Send Email to Trainer
//     const trainerUser = application.trainer.user;
//     const emailHtml = `
//       <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #4338ca; border-radius: 10px;">
//         <h2 style="color: #10b981;">💰 Payment Received!</h2>
//         <p>Hi ${trainerUser.name},</p>
//         <p>The company has resolved the dispute for the project: <strong>${application.project.title}</strong>.</p>
//         <p><b>Transaction Reference:</b> ${transactionId}</p>
//         <p>The payment has been marked as <b>Cleared</b> on your dashboard.</p>
//         <p>Best Regards,<br/><strong>Trainistry Team</strong></p>
//       </div>`;

//     await sendEmail({
//       email: trainerUser.email,
//       subject: `✅ Dispute Resolved & Payment Cleared: ${application.project.title}`,
//       html: emailHtml
//     });

//     // 5. Create In-App Notification
//     await Notification.create({
//       recipient: trainerUser._id,
//       recipientType: "trainer",
//       message: `Dispute Resolved: Payment received for "${application.project.title}". Ref: ${transactionId}`,
//       type: "payment_resolved" 
//     });

//     res.status(200).json({ success: true, message: "Dispute resolved and Trainer notified via email." });

//   } catch (error) {
//     console.error("Resolution Error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const CompanyProfile = require("../models/CompanyProfile");
const Project = require("../models/Project");
const Application = require("../models/Application");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Post = require("../models/Post"); 
const sendEmail = require("../utils/emailService");

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

    const warningCount = await Post.countDocuments({ 
      relatedCompany: company._id, 
      postType: 'warning' 
    });
    
    const calculatedScore = Math.max(0, 100 - (warningCount * 10));

    if (company.trustScore !== calculatedScore) {
      company.trustScore = calculatedScore;
      await company.save();
    }
    
    const stats = {
      totalPostings: projects.length,
      activeProjects: projects.filter(p => p.status === 'open' || p.status === 'assigned').length,
      paymentTrustScore: calculatedScore, 
      shortlistedTrainers: await Application.countDocuments({ 
        project: { $in: projectIds }, 
        status: 'shortlisted' 
      }),
      interviewsScheduled: await Application.countDocuments({ 
        project: { $in: projectIds }, 
        status: 'interview_scheduled' 
      }),
      activeDisputes: await Application.countDocuments({
        project: { $in: projectIds },
        isDisputed: true
      })
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// GET MY COMPANY PROFILE
// =====================================
// exports.getMyCompany = async (req, res) => {
//   try {
//     const company = await CompanyProfile
//       .findOne({ user: req.user._id })
//       .populate("user", "name email phone");

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company profile not found" });
//     }

//     const warningCount = await Post.countDocuments({ 
//       relatedCompany: company._id, 
//       postType: 'warning' 
//     });
    
//     company.trustScore = Math.max(0, 100 - (warningCount * 10));
//     await company.save();

//     res.status(200).json({ success: true, data: company });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// =====================================
// GET MY COMPANY PROFILE (Updated to include Connections)
// =====================================
exports.getMyCompany = async (req, res) => {
  try {
    const company = await CompanyProfile
      .findOne({ user: req.user._id })
      // ADDED 'followers' and 'following' to the populate list here:
      .populate("user", "name email phone followers following");

    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found" });
    }

    const warningCount = await Post.countDocuments({ 
      relatedCompany: company._id, 
      postType: 'warning' 
    });
    
    company.trustScore = Math.max(0, 100 - (warningCount * 10));
    await company.save();

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
    const existing = await CompanyProfile.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: "Company profile already exists" });
    }

    const company = await CompanyProfile.create({
      user: req.user._id,
      trustScore: 100, 
      ...req.body
    });

    res.status(201).json({ success: true, data: company });
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
// GET COMPANY PROJECTS (Updated to merge Application Status)
// =====================================
exports.getCompanyProjects = async (req, res) => {
  try {
    const company = await CompanyProfile.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found" });
    }

    // Get projects and convert to plain objects with .lean()
    const projects = await Project.find({ company: company._id }).sort({ createdAt: -1 }).lean();

    // Merge payment/dispute data from the Application collection
    const projectsWithAppData = await Promise.all(projects.map(async (proj) => {
      const selectedApp = await Application.findOne({ 
        project: proj._id, 
        status: { $in: ['selected', 'completed'] } 
      }).select('isDisputed paymentStatus transactionId');

      return {
        ...proj,
        isDisputed: selectedApp ? selectedApp.isDisputed : false,
        paymentStatus: selectedApp ? selectedApp.paymentStatus : 'pending',
        transactionId: selectedApp ? selectedApp.transactionId : null
      };
    }));

    res.status(200).json({ success: true, data: projectsWithAppData });
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
        populate: { path: "user", select: "name email phone" }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// UPDATE APPLICATION STATUS
// =====================================
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, feedback, date, time, link } = req.body;

    const application = await Application.findById(applicationId)
      .populate("project")
      .populate({
        path: "trainer",
        populate: { path: "user" }
      });

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.status = status;
    if (feedback) application.feedback = feedback;
    
    if (status === 'interview_scheduled') {
      application.interviewDate = date;
      application.interviewTime = time;
      application.meetingLink = link;
    }
    
    await application.save();

    const trainerUser = application.trainer.user;
    let emailSubject = '';
    let emailHtml = '';

    if (status === 'selected') {
      emailSubject = `🎉 Selection Confirmed: ${application.project.title}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4338ca;">Congratulations ${trainerUser.name}!</h2>
          <p>You have been <b>Selected</b> for the industrial project: <strong>${application.project.title}</strong>.</p>
          <p>The company will reach out to you at <strong>${trainerUser.phone}</strong> to discuss the schedule.</p>
          <p>Best Regards,<br/><strong>Trainistry Team</strong></p>
        </div>`;
    } 
    else if (status === 'interview_scheduled') {
      emailSubject = `📅 Interview Scheduled: ${application.project.title}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #f59e0b;">Interview Invitation</h2>
          <p>Hi ${trainerUser.name}, an interview has been scheduled for <strong>${application.project.title}</strong>.</p>
          <p><b>Date:</b> ${date}<br/><b>Time:</b> ${time}</p>
          <p><b>Meeting Link:</b> <a href="${link}">${link}</a></p>
          <p>Best Regards,<br/>Trainistry Team</p>
        </div>`;
    }
    else if (status === 'rejected') {
      emailSubject = `Update: ${application.project.title}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <p>Hi ${trainerUser.name},</p>
          <p>The company has decided not to proceed with your application for <strong>${application.project.title}</strong>.</p>
          ${feedback ? `<p><b>Note:</b> ${feedback}</p>` : ''}
          <p>Keep applying!</p>
        </div>`;
    }

    if (emailSubject) {
      await sendEmail({
        email: trainerUser.email,
        subject: emailSubject,
        html: emailHtml
      });
    }

    res.status(200).json({ success: true, message: `Status updated to ${status} and Trainer notified.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// UPDATE PROJECT STATUS (15-Day Rule)
// =====================================
exports.updateProjectStatus = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    project.status = status.toLowerCase();

    if (status.toLowerCase() === 'completed') {
      const now = new Date();
      const deadline = new Date(now);
      deadline.setDate(deadline.getDate() + 15);
      project.paymentDeadline = deadline;

      await Application.updateMany(
        { project: projectId, status: 'selected' },
        { 
          status: 'completed', 
          projectEndDate: now,
          paymentDeadline: deadline 
        }
      );
    }

    await project.save();
    
    res.status(200).json({ 
      success: true, 
      message: status.toLowerCase() === 'completed' ? "Project and Application completed. Payment deadline set." : "Status updated" 
    });
  } catch (error) {
    console.error("Project Update Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// SCHEDULE INTERVIEW
// =====================================
exports.scheduleInterview = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { date, time, link } = req.body; 

    const application = await Application.findById(applicationId)
      .populate("project")
      .populate({ path: "trainer", populate: { path: "user" } });

    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    application.status = "interview_scheduled"; 
    application.interviewDate = date; 
    application.interviewTime = time;
    application.meetingLink = link;
    await application.save();

    await Notification.create({
      recipient: application.trainer.user._id,
      recipientType: "trainer",
      message: `Interview scheduled for "${application.project.title}" on ${date} at ${time}.`,
      type: "interview_scheduled"
    });

    res.status(200).json({ success: true, message: "Interview scheduled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// RESOLVE DISPUTE (Updated with Email)
// =====================================
exports.resolveDispute = async (req, res) => {
  try {
    const projectId = req.params.applicationId;
    const { transactionId } = req.body;

    const application = await Application.findOne({ 
      project: projectId, 
      isDisputed: true 
    }).populate({
      path: 'trainer',
      populate: { path: 'user', select: 'name email' }
    }).populate('project', 'title company');

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: "No active dispute found for this project." 
      });
    }

    application.isDisputed = false;
    application.paymentStatus = 'cleared'; 
    application.status = 'completed'; 
    application.transactionId = transactionId;
    await application.save();

    await Post.deleteMany({ 
      relatedCompany: application.project.company || application.project, 
      postType: 'warning'
    });

    const trainerUser = application.trainer.user;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #4338ca; border-radius: 10px;">
        <h2 style="color: #10b981;">💰 Payment Received!</h2>
        <p>Hi ${trainerUser.name},</p>
        <p>The company has resolved the dispute for the project: <strong>${application.project.title}</strong>.</p>
        <p><b>Transaction Reference:</b> ${transactionId}</p>
        <p>The payment has been marked as <b>Cleared</b> on your dashboard.</p>
        <p>Best Regards,<br/><strong>Trainistry Team</strong></p>
      </div>`;

    await sendEmail({
      email: trainerUser.email,
      subject: `✅ Dispute Resolved & Payment Cleared: ${application.project.title}`,
      html: emailHtml
    });

    await Notification.create({
      recipient: trainerUser._id,
      recipientType: "trainer",
      message: `Dispute Resolved: Payment received for "${application.project.title}". Ref: ${transactionId}`,
      type: "payment_resolved" 
    });

    res.status(200).json({ success: true, message: "Dispute resolved and Trainer notified via email." });

  } catch (error) {
    console.error("Resolution Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================
// GET COMPANIES / BY ID
// =====================================
exports.getCompanies = async (req, res) => {
  try {
    const companies = await CompanyProfile.find().populate("user", "name email");
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await CompanyProfile.findById(req.params.id).populate("user", "name email phone");
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// =====================================
// SEARCH COMPANIES
// =====================================
exports.searchCompanies = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim().length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // UPDATED: Changed 'companyName' to 'name' to match your Model
    const companies = await CompanyProfile.find({
      $or: [
        { name: { $regex: name.trim(), $options: "i" } },
        { location: { $regex: name.trim(), $options: "i" } }
      ]
    }).populate("user", "name email");

    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.followCompany = async (req, res) => {
  try {
    const targetUserId = req.params.targetId;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ success: false, message: "You cannot connect with yourself" });
    }

    const user = await User.findById(currentUserId);
    const isFollowing = user.following && user.following.includes(targetUserId);

    // Use findByIdAndUpdate to bypass full document validation
    await User.findByIdAndUpdate(currentUserId, {
      [isFollowing ? '$pull' : '$addToSet']: { following: targetUserId }
    });

    res.status(200).json({ 
      success: true, 
      isFollowing: !isFollowing,
      message: isFollowing ? "Unfollowed" : "Followed" 
    });
  } catch (error) {
    console.error("FOLLOW_ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// // =====================================
// // UPDATE COMPANY PROFILE
// // =====================================
// exports.updateCompanyProfile = async (req, res) => {
//   try {
//     const { name, industry, location, description } = req.body;

//     // 1. Find the profile belonging to the logged-in user
//     let profile = await CompanyProfile.findOne({ user: req.user._id });

//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Company profile not found"
//       });
//     }

//     // 2. Update the fields if provided in the request body
//     if (name) profile.name = name;
//     if (industry) profile.industry = industry;
//     if (location) profile.location = location;
//     if (description) profile.description = description;

//     // 3. Save the changes
//     // This uses your existing CompanyProfile model constraints
//     await profile.save();

//     // 4. Return the updated profile with populated user data
//     // This ensures your Frontend state (profile.user.followers, etc.) stays intact
//     const updatedProfile = await CompanyProfile.findOne({ user: req.user._id })
//       .populate("user", "name email phone followers following");

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: updatedProfile
//     });

//   } catch (error) {
//     console.error("UPDATE_PROFILE_ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Server Error: Could not update profile"
//     });
//   }
// };
// =====================================
// UPDATE COMPANY PROFILE (Updated for Verification Toggle)
// =====================================
exports.updateCompanyProfile = async (req, res) => {
  try {
    // 1. Add 'isVerified' to the destructured body
    const { name, industry, location, description, isVerified } = req.body;

    let profile = await CompanyProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found"
      });
    }

    // 2. Update the fields if provided in the request body
    if (name) profile.name = name;
    if (industry) profile.industry = industry;
    if (location) profile.location = location;
    if (description) profile.description = description;
    
    // 3. Handle the verification toggle
    // We check if it's undefined to allow 'false' to be passed
    if (isVerified !== undefined) {
      profile.isVerified = isVerified;
    }

    // 4. Save the changes
    await profile.save();

    // 5. Return the updated profile with populated user data
    const updatedProfile = await CompanyProfile.findOne({ user: req.user._id })
      .populate("user", "name email phone followers following");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile
    });

  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error: Could not update profile"
    });
  }
};