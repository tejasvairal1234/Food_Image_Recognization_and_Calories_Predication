import sharp from 'sharp';

/**
 * Image processing service
 * Handles image compression and optimization
 */

/**
 * Compress and optimize image
 * @param {Buffer} imageBuffer - Original image buffer
 * @returns {Promise<Buffer>} - Compressed image buffer
 */
export const compressImage = async (imageBuffer) => {
    try {
        const compressed = await sharp(imageBuffer)
            .resize(1024, 1024, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({
                quality: 85,
                progressive: true
            })
            .toBuffer();

        return compressed;
    } catch (error) {
        console.error('Image compression error:', error);
        throw new Error('Failed to process image');
    }
};

/**
 * Convert image buffer to base64
 * @param {Buffer} imageBuffer - Image buffer
 * @returns {String} - Base64 encoded string
 */
export const bufferToBase64 = (imageBuffer) => {
    return imageBuffer.toString('base64');
};

/**
 * Get image metadata
 * @param {Buffer} imageBuffer - Image buffer
 * @returns {Promise<Object>} - Image metadata
 */
export const getImageMetadata = async (imageBuffer) => {
    try {
        const metadata = await sharp(imageBuffer).metadata();
        return {
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,
            size: metadata.size
        };
    } catch (error) {
        console.error('Get metadata error:', error);
        throw new Error('Failed to get image metadata');
    }
};
