import { createContext, useState, useContext, useEffect } from 'react';
import { THEME_KEY } from '../utils/constants';

/**
 * Theme Context
 * Manages dark mode state across the application
 */

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Initialize theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem(THEME_KEY) || 'light';
        setTheme(storedTheme);
        applyTheme(storedTheme);
    }, []);

    /**
     * Apply theme to document
     */
    const applyTheme = (newTheme) => {
        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            document.body.classList.remove('dark-mode');
        }
    };

    /**
     * Toggle between light and dark theme
     */
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    };

    /**
     * Set specific theme
     */
    const setThemeMode = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    };

    const value = {
        theme,
        toggleTheme,
        setThemeMode,
        isDarkMode: theme === 'dark'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Custom hook to use theme context
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export default ThemeContext;
