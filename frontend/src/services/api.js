import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../utils/constants';

/**
 * Create Axios instance with default configuration
 */
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Request interceptor - Add token to requests
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor - Handle errors globally
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - clear storage and redirect to login
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem('foodapp_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

/**
 * Auth API calls
 */
export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me')
};

/**
 * Food API calls
 */
export const foodAPI = {
    analyzeImage: (formData) => api.post('/food/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    searchFood: (data) => api.post('/food/search', data),
    getHistory: (page = 1, limit = 12) => api.get(`/food/history?page=${page}&limit=${limit}`),
    getFoodLog: (id) => api.get(`/food/${id}`),
    deleteFoodLog: (id) => api.delete(`/food/${id}`)
};

/**
 * Admin API calls
 */
export const adminAPI = {
    getAllUsers: (page = 1, limit = 20) => api.get(`/admin/users?page=${page}&limit=${limit}`),
    getAllLogs: (page = 1, limit = 20) => api.get(`/admin/logs?page=${page}&limit=${limit}`),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    getStats: () => api.get('/admin/stats')
};

export default api;
