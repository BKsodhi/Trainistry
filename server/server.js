// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// // Database Connection
// const connectDB = require('./src/config/db');

// // Routes
// const authRoutes = require('./src/routes/authRoutes');
// const companyRoutes = require('./src/routes/companyRoutes');
// const notificationRoutes = require('./src/routes/notificationRoutes');
// const trainerRoutes = require('./src/routes/trainerRoutes');
// const projectRoutes = require('./src/routes/projectRoutes');

// const app = express();

// // Connect to Database
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Route Middleware
// app.use('/api/auth', authRoutes); 
// app.use('/api/company', companyRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/trainer', trainerRoutes);
// app.use('/api/projects', projectRoutes);

// // Test Route
// app.get('/', (req, res) => {
//   res.send('Trainistry Backend Running');
// });

// // Port Setup
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');


// Routes
const authRoutes = require('./src/routes/authRoutes');
const companyRoutes = require('./src/routes/companyRoutes');
const trainerRoutes = require('./src/routes/trainerRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

const app = express();

// ===================
// Database Connection
// ===================
connectDB();

// ===================
// Middleware
// ===================
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use('/uploads', express.static('src/uploads'));

// ===================
// API Routes
// ===================
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);

// ===================
// Test Route
// ===================
app.get('/', (req, res) => {
  res.send('Trainistry Backend Running');
});

// ===================
// 404 Handler
// ===================
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// ===================
// Global Error Handler
// ===================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

// ===================
// Start Server
// ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});