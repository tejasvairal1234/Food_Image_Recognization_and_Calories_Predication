import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

/**
 * Load environment variables
 */
dotenv.config();

/**
 * Connect to MongoDB
 */
connectDB();

/**
 * Initialize Express app
 */
const app = express();

/**
 * Middleware
 */

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL || 'http://localhost:5173']
    : true; // Allow all origins in development

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Body parser middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

/**
 * Routes
 */

// Health check route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Food Recognition API is running 🍕',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            food: '/api/food',
            admin: '/api/admin'
        }
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/admin', adminRoutes);

/**
 * Error Handling Middleware
 * Should be last in the middleware chain
 */
app.use(notFound); // 404 handler
app.use(errorHandler); // Global error handler

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                  ║
║   🚀 Server running in ${process.env.NODE_ENV || 'development'} mode            ║
║   🌐 Port: ${PORT}                                                              ║
║   📍 URL: http://localhost:${PORT}                                               ║
║                                                                                  ║
╚══════════════════════════════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err.message);
    // Close server & exit process
    process.exit(1);
});
