
import { z } from "zod";
// src/utils/responseHandler.js
const responseHandler = {
    /**
     * Success Response
     * @param {Object} res - Express response object
     * @param {Object} options - Response options
     * @param {Object} options.data - Main data payload
     * @param {string} options.message - Success message
     * @param {number} options.statusCode - HTTP status code (default: 200)
     */
    success: (res, { statusCode = 200, message = "Success", data = {} } = {}) => {
        res.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data
        });
    },

    /**
     * Error Response
     * @param {Object} res - Express response object 
     * @param {Error|z.ZodError|string} error - Error object or message
     * @param {Object} options - Additional options
     * @param {number} options.statusCode - Custom status code
     */
    error: (res, error) => {
        // Handle Zod validation errors (both direct and stringified)
        if (error instanceof z.ZodError || (error.message && error.message.includes('"validation"'))) {
            let firstErrorMessage;

            if (error instanceof z.ZodError) {
                firstErrorMessage = error.errors[0].message;
            } else {
                // Extract message from stringified error
                const match = error.message.match(/"message":\s*"([^"]+)"/);
                firstErrorMessage = match ? match[1] : "Validation error";
            }

            return res.status(422).json({
                success: false,
                statusCode: 422,
                message: firstErrorMessage
            });
        }

        // Handle other errors
        const statusCode = error.statusCode || 400;
        const message = error.message || "Something went wrong";
        res.status(statusCode).json({
            success: false,
            statusCode,
            message,
            ...(error.details && { details: error.details })
        });
    }

};

export default responseHandler;