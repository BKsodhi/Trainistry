const CompanyProfile = require('../models/CompanyProfile');
const Project = require('../models/Project');
const Application = require('../models/Application');


// ===============================
// GET MY COMPANY PROFILE
// ===============================
exports.getMyCompany = async (req, res) => {
  try {
    const company = await CompanyProfile.findOne({ user: req.user._id }).populate('user', 'name email');

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found"
      });
    }

    res.status(200).json({
      success: true,
      data: company
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===============================
// CREATE COMPANY PROFILE
// ===============================
exports.createCompany = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Company access only'
      });
    }

    const existingCompany = await CompanyProfile.findOne({ user: req.user._id });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Company profile already exists'
      });
    }

    const company = await CompanyProfile.create({
      user: req.user._id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      data: company
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===============================
// GET ALL COMPANIES (PUBLIC)
// ===============================
exports.getCompanies = async (req, res) => {
  try {
    const companies = await CompanyProfile.find()
      .populate('user', 'name email')
      .lean();

    res.status(200).json({
      success: true,
      data: companies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===============================
// GET COMPANY BY ID
// ===============================
exports.getCompanyById = async (req, res) => {
  try {
    const company = await CompanyProfile.findById(req.params.id).populate('user', 'name email');

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      data: company
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===============================
// UPDATE COMPANY
// ===============================
exports.updateCompany = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({
        success: false,
        message: 'Company access only'
      });
    }

    const company = await CompanyProfile.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    if (company.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    Object.assign(company, req.body);
    const updatedCompany = await company.save();

    res.status(200).json({
      success: true,
      data: updatedCompany
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// DELETE COMPANY
// ===============================
exports.deleteCompany = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ success: false, message: 'Company access only' });
    }

    const company = await CompanyProfile.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    if (company.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await company.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Company deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// POST PROJECT
// ===============================
exports.postProject = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ success: false, message: 'Company access only' });
    }

    const company = await CompanyProfile.findOne({ user: req.user._id });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
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

// ===============================
// GET PROJECTS OF COMPANY
// ===============================
// exports.getCompanyProjects = async (req, res) => {
//   try {
//     const company = await CompanyProfile.findById(req.params.id);
//     if (!company) {
//       return res.status(404).json({ success: false, message: 'Company not found' });
//     }

//     const projects = await Project.find({ company: company._id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: projects });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// ===============================
// GET PROJECTS OF COMPANY
// ===============================
exports.getCompanyProjects = async (req, res) => {
  try {

    const company = await CompanyProfile.findById(req.params.companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    const projects = await Project.find({
      company: company._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===============================
// GET APPLICATIONS FOR PROJECT
// ===============================
exports.getProjectApplications = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ success: false, message: 'Company access only' });
    }

    const project = await Project.findById(req.params.projectId)
      .populate({
        path: 'company',
        populate: { path: 'user', select: 'name email' }
      });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.company.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const applications = await Application.find({ project: project._id })
      .populate({
        path: 'trainer',
        populate: { path: 'user', select: 'name email' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: applications });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE APPLICATION STATUS
// ===============================
exports.updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ success: false, message: 'Company access only' });
    }

    const allowedStatus = ["applied", "shortlisted", "interview", "selected", "rejected"];
    if (req.body.status && !allowedStatus.includes(req.body.status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.applicationId)
      .populate({
        path: 'project',
        populate: {
          path: 'company',
          populate: { path: 'user', select: 'name email' }
        }
      });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.project.company.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    application.status = req.body.status || application.status;
    application.interviewDate = req.body.interviewDate || application.interviewDate;

    const updatedApplication = await application.save();

    res.status(200).json({ success: true, data: updatedApplication });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};