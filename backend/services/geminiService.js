import { getAI } from '../config/gemini.js';

/**
 * Gemini AI Service (using new @google/genai SDK)
 * Handles all interactions with Google Gemini API
 */

const PRIMARY_MODEL = 'gemini-3-flash-preview';
const FALLBACK_MODEL = 'gemini-2.0-flash-exp';

/**
 * Retry wrapper with exponential backoff
 * Retries on 503 (overloaded) and 429 (rate limit) errors
 */
const withRetry = async (fn, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            const errText = JSON.stringify(error?.message || error);
            const isRetryable =
                errText.includes('503') ||
                errText.includes('UNAVAILABLE') ||
                errText.includes('429') ||
                errText.includes('RESOURCE_EXHAUSTED');

            if (isRetryable && attempt < maxRetries) {
                const delay = attempt * 3000; // 3s, 6s, 9s
                console.log(`⚠️ Gemini overloaded. Retrying in ${delay / 1000}s (attempt ${attempt}/${maxRetries})...`);
                await new Promise(r => setTimeout(r, delay));
            } else {
                throw error;
            }
        }
    }
};

/**
 * Call Gemini with automatic model fallback
 */
const callGemini = async (payload) => {
    return withRetry(async () => {
        try {
            return await getAI().models.generateContent({ model: PRIMARY_MODEL, ...payload });
        } catch (primaryErr) {
            const errText = JSON.stringify(primaryErr?.message || primaryErr);
            // If primary model is unavailable/not found, try fallback
            if (errText.includes('503') || errText.includes('404') || errText.includes('UNAVAILABLE')) {
                console.log(`⚠️ Primary model failed, trying fallback: ${FALLBACK_MODEL}`);
                return await getAI().models.generateContent({ model: FALLBACK_MODEL, ...payload });
            }
            throw primaryErr;
        }
    });
};

/**
 * Analyze food image and get nutrition information
 * @param {Buffer} imageBuffer - Image file buffer
 * @returns {Promise<Object>} - Food recognition result with nutrition
 */
export const analyzeFoodImage = async (imageBuffer) => {
    try {
        const base64Image = imageBuffer.toString('base64');

        const prompt = `Analyze this food image and return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just pure JSON):
{
  "foodName": "name of the food item",
  "nutrition": {
    "calories": number (per 100g serving),
    "protein": number (grams per 100g),
    "carbs": number (grams per 100g),
    "fat": number (grams per 100g),
    "sugar": number (grams per 100g),
    "fiber": number (grams per 100g),
    "sodium": number (milligrams per 100g)
  },
  "explanation": "Brief 1-2 sentence explanation of how you estimated these nutrition values",
  "isFood": true or false
}

Important rules:
- If this is NOT a food image, set isFood to false and use placeholder nutrition values
- All nutrition values must be numbers (not strings)
- Be as accurate as possible based on visual appearance
- For mixed dishes, estimate based on visible ingredients
- Return ONLY the JSON object, nothing else`;

        const response = await callGemini({
            contents: [
                {
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: 'image/jpeg',
                                data: base64Image
                            }
                        }
                    ]
                }
            ]
        });

        const text = response.text;

        let jsonResponse;
        try {
            const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            jsonResponse = JSON.parse(cleanText);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            console.error('Gemini response:', text);
            throw new Error('Failed to parse AI response. Please try again.');
        }

        if (!jsonResponse.isFood) {
            throw new Error('This does not appear to be a food image. Please upload a clear photo of food.');
        }

        if (!jsonResponse.foodName || !jsonResponse.nutrition) {
            throw new Error('Invalid AI response format');
        }

        return {
            foodName: jsonResponse.foodName,
            nutrition: {
                calories: Number(jsonResponse.nutrition.calories) || 0,
                protein: Number(jsonResponse.nutrition.protein) || 0,
                carbs: Number(jsonResponse.nutrition.carbs) || 0,
                fat: Number(jsonResponse.nutrition.fat) || 0,
                sugar: Number(jsonResponse.nutrition.sugar) || 0,
                fiber: Number(jsonResponse.nutrition.fiber) || 0,
                sodium: Number(jsonResponse.nutrition.sodium) || 0
            },
            explanation: jsonResponse.explanation || 'Nutrition estimated based on visual analysis'
        };

    } catch (error) {
        console.error('Gemini API error:', error.message);
        if (error.message.includes('not appear to be a food image')) throw error;
        throw new Error(`AI analysis failed: ${error.message}`);
    }
};

/**
 * Search for food by name and get nutrition
 * @param {String} foodName - Name of the food
 * @returns {Promise<Object>} - Nutrition information
 */
export const searchFoodByName = async (foodName) => {
    try {
        const prompt = `Provide detailed nutrition information for "${foodName}". Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "foodName": "standardized food name",
  "nutrition": {
    "calories": number (per 100g),
    "protein": number (grams per 100g),
    "carbs": number (grams per 100g),
    "fat": number (grams per 100g),
    "sugar": number (grams per 100g),
    "fiber": number (grams per 100g),
    "sodium": number (milligrams per 100g)
  },
  "explanation": "Brief explanation of typical nutritional content for this food"
}

Use standard nutritional databases (USDA) for accuracy. All values must be numbers.`;

        const response = await callGemini({ contents: prompt });

        const text = response.text;

        let jsonResponse;
        try {
            const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            jsonResponse = JSON.parse(cleanText);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            throw new Error('Failed to parse AI response');
        }

        return {
            foodName: jsonResponse.foodName || foodName,
            nutrition: {
                calories: Number(jsonResponse.nutrition.calories) || 0,
                protein: Number(jsonResponse.nutrition.protein) || 0,
                carbs: Number(jsonResponse.nutrition.carbs) || 0,
                fat: Number(jsonResponse.nutrition.fat) || 0,
                sugar: Number(jsonResponse.nutrition.sugar) || 0,
                fiber: Number(jsonResponse.nutrition.fiber) || 0,
                sodium: Number(jsonResponse.nutrition.sodium) || 0
            },
            explanation: jsonResponse.explanation || 'Standard nutritional information'
        };

    } catch (error) {
        console.error('Food search error:', error.message);
        throw new Error(`Failed to fetch nutrition data: ${error.message}`);
    }
};
