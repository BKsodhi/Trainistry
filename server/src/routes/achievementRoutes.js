// const express = require('express');
// const router = express.Router();
// const { createAchievement, getAchievements } = require('../controllers/achievementController');
// const { protect } = require('../middleware/authMiddleware'); 

// router.route('/')
//   .get(getAchievements)
//   .post(protect, createAchievement);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { createAchievement, getAchievements } = require('../controllers/achievementController');
// const { protect } = require('../middleware/authMiddleware');

// /**
//  * MULTER CONFIGURATION
//  * This defines where the file goes and what it's named.
//  */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // We point to src/uploads to match your server.js configuration
//     cb(null, 'src/uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     // Unique filename: timestamp + original extension
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Filter to ensure only images are uploaded
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// // ==========================================
// // ROUTES
// // ==========================================

// router.route('/')
//   .get(getAchievements)
//   /**
//    * .post handles the multi-part form data.
//    * 'postImage' MUST match the key name in your React FormData:
//    * formData.append("postImage", selectedFile);
//    */
//   .post(protect, upload.single('postImage'), createAchievement);

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  createAchievement, 
  getAchievements, 
  likeAchievement, 
  commentAchievement,
  repostAchievement 
} = require('../controllers/achievementController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

// --- Base Routes ---
router.route('/')
  .get(getAchievements)
  .post(protect, upload.single('postImage'), createAchievement);

// --- Interaction Routes ---
router.put('/:id/like', protect, likeAchievement);
router.post('/:id/comment', protect, commentAchievement);
router.post('/:id/repost', protect, repostAchievement);

module.exports = router;