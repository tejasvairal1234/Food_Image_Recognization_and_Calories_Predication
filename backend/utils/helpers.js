/**
 * Helper utility functions
 */

/**
 * Calculate nutrition for specific portion size
 * @param {Object} baseNutrition - Base nutrition per 100g
 * @param {Number} portionSize - Portion multiplier
 * @returns {Object} - Adjusted nutrition values
 */
export const calculatePortionNutrition = (baseNutrition, portionSize = 1) => {
    return {
        calories: Math.round(baseNutrition.calories * portionSize),
        protein: Math.round(baseNutrition.protein * portionSize * 10) / 10,
        carbs: Math.round(baseNutrition.carbs * portionSize * 10) / 10,
        fat: Math.round(baseNutrition.fat * portionSize * 10) / 10,
        sugar: Math.round(baseNutrition.sugar * portionSize * 10) / 10,
        fiber: Math.round(baseNutrition.fiber * portionSize * 10) / 10,
        sodium: Math.round(baseNutrition.sodium * portionSize * 10) / 10
    };
};

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {String} - Formatted date string
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Check if value is valid number
 * @param {*} value - Value to check
 * @returns {Boolean} - True if valid number
 */
export const isValidNumber = (value) => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
};
