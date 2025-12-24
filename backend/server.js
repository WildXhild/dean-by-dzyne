require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Dean by D\'Zyne Backend API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: 'GET /api/health',
            contact: 'POST /api/contact',
            submissions: 'GET /api/submissions',
            submission: 'GET /api/submissions/:id'
        }
    });
});

// API routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.path
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'An error occurred',
        ...(process.env.NODE_ENV === 'development' && { error: err })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║  Dean by D'Zyne Backend API           ║
║  Server running on port ${PORT}            ║
║  Environment: ${process.env.NODE_ENV || 'development'}        ║
║  CORS Origin: ${CORS_ORIGIN}  ║
╚════════════════════════════════════════╝
    `);
    console.log('Endpoints:');
    console.log(`  POST /api/contact - Submit contact form`);
    console.log(`  GET /api/health - Health check`);
    console.log(`  GET /api/submissions - Get all submissions`);
});

module.exports = app;
