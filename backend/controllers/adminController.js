import User from '../models/User.js';
import FoodLog from '../models/FoodLog.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

/**
 * Admin Controller
 * Handles admin-only operations
 */

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments();

    res.json({
        success: true,
        data: users,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
        }
    });
});

/**
 * @desc    Get all food logs
 * @route   GET /api/admin/logs
 * @access  Private/Admin
 */
export const getAllFoodLogs = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const foodLogs = await FoodLog.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await FoodLog.countDocuments();

    res.json({
        success: true,
        data: foodLogs,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
        }
    });
});

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Don't allow deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error('Cannot delete your own account');
    }

    // Delete user and all their food logs
    await FoodLog.deleteMany({ userId: user._id });
    await user.deleteOne();

    res.json({
        success: true,
        message: 'User and associated data deleted successfully'
    });
});

/**
 * @desc    Get dashboard stats
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalFoodLogs = await FoodLog.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentUsers = await User.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    });

    const recentLogs = await FoodLog.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
        success: true,
        data: {
            totalUsers,
            totalFoodLogs,
            totalAdmins,
            recentUsers,
            recentLogs
        }
    });
});
