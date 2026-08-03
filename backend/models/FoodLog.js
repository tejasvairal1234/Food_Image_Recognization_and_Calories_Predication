import mongoose from 'mongoose';

/**
 * FoodLog Schema
 * Stores food recognition results and nutrition information
 */
const foodLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        foodName: {
            type: String,
            required: [true, 'Food name is required'],
            trim: true
        },
        imageUrl: {
            type: String,
            default: null
        },
        nutrition: {
            calories: {
                type: Number,
                required: [true, 'Calories are required'],
                min: [0, 'Calories cannot be negative']
            },
            protein: {
                type: Number,
                required: [true, 'Protein is required'],
                min: [0, 'Protein cannot be negative']
            },
            carbs: {
                type: Number,
                required: [true, 'Carbs are required'],
                min: [0, 'Carbs cannot be negative']
            },
            fat: {
                type: Number,
                required: [true, 'Fat is required'],
                min: [0, 'Fat cannot be negative']
            },
            sugar: {
                type: Number,
                default: 0,
                min: [0, 'Sugar cannot be negative']
            },
            fiber: {
                type: Number,
                default: 0,
                min: [0, 'Fiber cannot be negative']
            },
            sodium: {
                type: Number,
                default: 0,
                min: [0, 'Sodium cannot be negative']
            }
        },
        portionSize: {
            type: Number,
            default: 1.0,
            min: [0.25, 'Portion size must be at least 0.25'],
            max: [10, 'Portion size cannot exceed 10']
        },
        aiExplanation: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

// Index for faster queries
foodLogSchema.index({ userId: 1, createdAt: -1 });

/**
 * Get nutrition values adjusted for portion size
 * @returns {Object} - Nutrition values multiplied by portion size
 */
foodLogSchema.methods.getAdjustedNutrition = function () {
    const { nutrition, portionSize } = this;
    return {
        calories: Math.round(nutrition.calories * portionSize),
        protein: Math.round(nutrition.protein * portionSize * 10) / 10,
        carbs: Math.round(nutrition.carbs * portionSize * 10) / 10,
        fat: Math.round(nutrition.fat * portionSize * 10) / 10,
        sugar: Math.round(nutrition.sugar * portionSize * 10) / 10,
        fiber: Math.round(nutrition.fiber * portionSize * 10) / 10,
        sodium: Math.round(nutrition.sodium * portionSize * 10) / 10
    };
};

const FoodLog = mongoose.model('FoodLog', foodLogSchema);

export default FoodLog;
