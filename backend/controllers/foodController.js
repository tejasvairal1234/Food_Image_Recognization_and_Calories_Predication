import FoodLog from '../models/FoodLog.js';
import { analyzeFoodImage, searchFoodByName } from '../services/geminiService.js';
import { compressImage } from '../services/imageService.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

/**
 * Food Controller
 * Handles food image analysis, search, and history
 */

/**
 * @desc    Analyze food image and get nutrition
 * @route   POST /api/food/analyze
 * @access  Private
 */
export const analyzeFood = asyncHandler(async (req, res) => {
    // Check if image was uploaded
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload an image');
    }

    // Compress image
    const compressedBuffer = await compressImage(req.file.buffer);

    // Analyze with Gemini AI
    const analysisResult = await analyzeFoodImage(compressedBuffer);

    // Get portion size from request (default 1.0)
    const portionSize = parseFloat(req.body.portionSize) || 1.0;

    // Validate portion size
    if (portionSize < 0.25 || portionSize > 10) {
        res.status(400);
        throw new Error('Portion size must be between 0.25 and 10');
    }

    // Save to database
    const foodLog = await FoodLog.create({
        userId: req.user._id,
        foodName: analysisResult.foodName,
        imageUrl: null, // We're not storing images for this version
        nutrition: analysisResult.nutrition,
        portionSize: portionSize,
        aiExplanation: analysisResult.explanation
    });

    // Return adjusted nutrition based on portion size
    const adjustedNutrition = foodLog.getAdjustedNutrition();

    res.status(201).json({
        success: true,
        message: 'Food analyzed successfully',
        data: {
            _id: foodLog._id,
            foodName: foodLog.foodName,
            nutrition: adjustedNutrition,
            baseNutrition: foodLog.nutrition, // Original per 100g values
            portionSize: foodLog.portionSize,
            aiExplanation: foodLog.aiExplanation,
            createdAt: foodLog.createdAt
        }
    });
});

/**
 * @desc    Search food by name
 * @route   POST /api/food/search
 * @access  Private
 */
export const searchFood = asyncHandler(async (req, res) => {
    const { foodName } = req.body;

    if (!foodName) {
        res.status(400);
        throw new Error('Please provide a food name');
    }

    // Search with Gemini AI
    const searchResult = await searchFoodByName(foodName);

    // Get portion size from request (default 1.0)
    const portionSize = parseFloat(req.body.portionSize) || 1.0;

    // Save to database
    const foodLog = await FoodLog.create({
        userId: req.user._id,
        foodName: searchResult.foodName,
        imageUrl: null,
        nutrition: searchResult.nutrition,
        portionSize: portionSize,
        aiExplanation: searchResult.explanation
    });

    // Return adjusted nutrition
    const adjustedNutrition = foodLog.getAdjustedNutrition();

    res.status(201).json({
        success: true,
        message: 'Food search successful',
        data: {
            _id: foodLog._id,
            foodName: foodLog.foodName,
            nutrition: adjustedNutrition,
            baseNutrition: foodLog.nutrition,
            portionSize: foodLog.portionSize,
            aiExplanation: foodLog.aiExplanation,
            createdAt: foodLog.createdAt
        }
    });
});

/**
 * @desc    Get user's food history
 * @route   GET /api/food/history
 * @access  Private
 */
export const getHistory = asyncHandler(async (req, res) => {
    // Get pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get user's food logs
    const foodLogs = await FoodLog.find({ userId: req.user._id })
        .sort({ createdAt: -1 }) // Most recent first
        .skip(skip)
        .limit(limit);

    // Get total count
    const total = await FoodLog.countDocuments({ userId: req.user._id });

    // Format response with adjusted nutrition
    const formattedLogs = foodLogs.map(log => ({
        _id: log._id,
        foodName: log.foodName,
        nutrition: log.getAdjustedNutrition(),
        baseNutrition: log.nutrition,
        portionSize: log.portionSize,
        aiExplanation: log.aiExplanation,
        createdAt: log.createdAt
    }));

    res.json({
        success: true,
        data: formattedLogs,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
        }
    });
});

/**
 * @desc    Get single food log
 * @route   GET /api/food/:id
 * @access  Private
 */
export const getFoodLog = asyncHandler(async (req, res) => {
    const foodLog = await FoodLog.findById(req.params.id);

    if (!foodLog) {
        res.status(404);
        throw new Error('Food log not found');
    }

    // Check if user owns this log
    if (foodLog.userId.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to access this food log');
    }

    res.json({
        success: true,
        data: {
            _id: foodLog._id,
            foodName: foodLog.foodName,
            nutrition: foodLog.getAdjustedNutrition(),
            baseNutrition: foodLog.nutrition,
            portionSize: foodLog.portionSize,
            aiExplanation: foodLog.aiExplanation,
            createdAt: foodLog.createdAt
        }
    });
});

/**
 * @desc    Delete food log
 * @route   DELETE /api/food/:id
 * @access  Private
 */
export const deleteFoodLog = asyncHandler(async (req, res) => {
    const foodLog = await FoodLog.findById(req.params.id);

    if (!foodLog) {
        res.status(404);
        throw new Error('Food log not found');
    }

    // Check if user owns this log
    if (foodLog.userId.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to delete this food log');
    }

    await foodLog.deleteOne();

    res.json({
        success: true,
        message: 'Food log deleted successfully'
    });
});
