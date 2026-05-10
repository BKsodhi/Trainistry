// const express = require('express');
// const router = express.Router();

// const { register, login } = require('../controllers/authController');

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');

// const { register, login } = require('../controllers/authController');

// // Configure storage for verification documents
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'src/uploads/verification/'); // Ensure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // UPDATED: Added upload middleware to the register route
// // 'verificationDoc' matches the name we used in the Frontend FormData
// router.post('/register', upload.single('verificationDoc'), register);

// router.post('/login', login);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');

// // Ensure this path is correct and the controller uses "exports.register = ..."
// const authController = require('../controllers/authController'); 

// // Check if the functions exist before using them
// if (!authController.register || !authController.login) {
//     console.error("ERROR: register or login function is missing from authController.js");
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'src/uploads/verification/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // The error was here because 'register' or 'login' was likely undefined
// router.post('/register', upload.single('verificationDoc'), authController.register);
// router.post('/login', authController.login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authController = require('../controllers/authController'); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure this folder exists: src/uploads/verification/
    cb(null, 'src/uploads/verification/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// upload.single('verificationDoc') MUST match the frontend data.append key
router.post('/register', upload.single('verificationDoc'), authController.register);
router.post('/login', authController.login);

module.exports = router;