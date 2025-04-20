// app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const errorHandler = require('./middleware/error-handler');

// Import routes
const authRoutes = require('./routes/auth');
const { requestHandler } = require('./middleware/middleware');
// const userRoutes = require('./routes/userRoutes');
// const groupRoutes = require('./routes/groupRoutes');
// const expenseRoutes = require('./routes/expenseRoutes');
// const settlementRoutes = require('./routes/settlementRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');

// Load environment variables from .env file
require('dotenv').config();

// Initialize Express app
const app = express();

// // Connect to database
// require('./config/database');

// // Configure passport authentication
// require('./config/passport')(passport);

// Middleware
app.use(helmet()); // Set security headers
app.use(compression()); // Compress responses
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(logger); // Custom request logger

// Initialize passport
// app.use(passport.initialize());

// API routes
app.use(requestHandler);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

// app.use('/api/users', userRoutes);
// app.use('/api/groups', groupRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/settlements', settlementRoutes);
// app.use('/api/notifications', notificationRoutes);



// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Splitwise API' });
});

// Error handling middleware (must be last)
// app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

module.exports = app;