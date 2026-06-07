const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');
require('dotenv').config();

const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');
const { cacheMiddleware } = require('./middleware/cache');

const authRoutes = require('./routes/auth');
const branchRoutes = require('./routes/branches');
const memberRoutes = require('./routes/members');
const donationRoutes = require('./routes/donations');
const pastorRoutes = require('./routes/pastors');
const serviceRoutes = require('./routes/services');
const departmentRoutes = require('./routes/departments');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply caching middleware to read-only routes (5 minute TTL)
app.use('/api/members', cacheMiddleware(300));
app.use('/api/donations', cacheMiddleware(300));
app.use('/api/branches', cacheMiddleware(300));
app.use('/api/pastors', cacheMiddleware(300));
app.use('/api/services', cacheMiddleware(300));
app.use('/api/departments', cacheMiddleware(300));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/pastors', pastorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/departments', departmentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
