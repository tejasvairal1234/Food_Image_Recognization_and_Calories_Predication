/**
 * Global error handling middleware
 * Catches all errors and sends formatted response
 */

/**
 * 404 Not Found handler
 * This middleware runs if no other route matches
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Error handler middleware
 * Formats error response
 */
export const errorHandler = (err, req, res, next) => {
    // Set status code (use existing status or 500)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // Send error response
    res.json({
        success: false,
        message: err.message,
        // Only include stack trace in development
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        // Include validation errors if they exist
        errors: err.errors || undefined
    });
};

/**
 * Async handler to wrap async route handlers
 * Catches errors and passes to error middleware
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
