/**
 * Application Constants
 */

// API Base URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Local Storage Keys
export const TOKEN_KEY = 'foodapp_token';
export const USER_KEY = 'foodapp_user';
export const THEME_KEY = 'foodapp_theme';

// Portion Size Configuration
export const PORTION_CONFIG = {
    min: 0.25,
    max: 5.0,
    step: 0.25,
    default: 1.0
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp']
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// User Roles
export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin'
};
