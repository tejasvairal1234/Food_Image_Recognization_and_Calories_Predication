import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { registerValidation, loginValidation } from '../utils/validators.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

/**
 * Authentication Routes
 */

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', registerValidation, validate, signup);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginValidation, validate, login);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, getMe);

export default router;
