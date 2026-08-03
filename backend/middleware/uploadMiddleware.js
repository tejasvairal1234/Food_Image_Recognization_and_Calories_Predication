import multer from 'multer';
import path from 'path';

/**
 * Multer configuration for file uploads
 * Handles image upload with validation
 */

// Configure storage
const storage = multer.memoryStorage(); // Store in memory for processing

// File filter - only accept images
const fileFilter = (req, file, cb) => {
    // Allowed extensions
    const allowedTypes = /jpeg|jpg|png|webp/;

    // Check extension
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    // Check mime type
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
    }
};

// Create multer instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
    },
    fileFilter: fileFilter
});

/**
 * Middleware to handle single image upload
 */
export const uploadSingleImage = upload.single('image');

/**
 * Error handler for multer errors
 */
export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer-specific errors
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File too large. Maximum size is 5MB'
            });
        }

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                message: 'Unexpected field'
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message
        });
    } else if (err) {
        // Other errors
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    next();
};

export default upload;
