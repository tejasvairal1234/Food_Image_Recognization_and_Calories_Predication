import express from 'express';
import {
    analyzeFood,
    searchFood,
    getHistory,
    getFoodLog,
    deleteFoodLog
} from '../controllers/foodController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadSingleImage, handleUploadError } from '../middleware/uploadMiddleware.js';
import { searchValidation } from '../utils/validators.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

/**
 * Food Routes
 * All routes require authentication
 */

// @route   POST /api/food/analyze
// @desc    Upload food image and get nutrition
// @access  Private
router.post(
    '/analyze',
    protect,
    uploadSingleImage,
    handleUploadError,
    analyzeFood
);

// @route   POST /api/food/search
// @desc    Search food by name
// @access  Private
router.post('/search', protect, searchValidation, validate, searchFood);

// @route   GET /api/food/history
// @desc    Get user's food history
// @access  Private
router.get('/history', protect, getHistory);

// @route   GET /api/food/:id
// @desc    Get single food log
// @access  Private
router.get('/:id', protect, getFoodLog);

// @route   DELETE /api/food/:id
// @desc    Delete food log
// @access  Private
router.delete('/:id', protect, deleteFoodLog);

export default router;
