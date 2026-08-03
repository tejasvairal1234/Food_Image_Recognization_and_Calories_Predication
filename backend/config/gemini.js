import { GoogleGenAI } from '@google/genai';

/**
 * Initialize Google Gemini AI using the new @google/genai SDK
 * Lazy initialization so that dotenv loads GEMINI_API_KEY before this runs
 */
let _ai = null;

export const getAI = () => {
    if (!_ai) {
        _ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return _ai;
};

// For convenience keep named exports used by geminiService
export const getVisionModel = () => getAI();
export const getTextModel = () => getAI();

export default { getAI, getVisionModel, getTextModel };
