import { createContext, useState, useContext, useEffect } from 'react';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';
import { authAPI } from '../services/api';

/**
 * Authentication Context
 * Manages user authentication state across the application
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    /**
     * Login user
     */
    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { token: newToken, ...userData } = response.data.data;

            // Save to state
            setToken(newToken);
            setUser(userData);

            // Save to localStorage
            localStorage.setItem(TOKEN_KEY, newToken);
            localStorage.setItem(USER_KEY, JSON.stringify(userData));

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    /**
     * Register new user
     */
    const signup = async (name, email, password) => {
        try {
            const response = await authAPI.signup({ name, email, password });
            const { token: newToken, ...userData } = response.data.data;

            // Save to state
            setToken(newToken);
            setUser(userData);

            // Save to localStorage
            localStorage.setItem(TOKEN_KEY, newToken);
            localStorage.setItem(USER_KEY, JSON.stringify(userData));

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed'
            };
        }
    };

    /**
     * Logout user
     */
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    };

    /**
     * Check if user is authenticated
     */
    const isAuthenticated = () => {
        return !!token && !!user;
    };

    /**
     * Check if user is admin
     */
    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const value = {
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
