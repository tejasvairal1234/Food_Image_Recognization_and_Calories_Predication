import express from 'express';
import {
    getAllUsers,
    getAllFoodLogs,
    deleteUser,
    getDashboardStats
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

/**
 * Admin Routes
 * All routes require authentication and admin role
 */

// Apply protect and adminOnly middleware to all routes
router.use(protect);
router.use(adminOnly);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', getAllUsers);

// @route   GET /api/admin/logs
// @desc    Get all food logs
// @access  Private/Admin
router.get('/logs', getAllFoodLogs);

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', deleteUser);

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', getDashboardStats);

export default router;
