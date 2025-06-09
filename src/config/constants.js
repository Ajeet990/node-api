export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 12;
export const PORT = process.env.PORT || 3000;
export const RATE_LIMIT_CONST = {
    MINUTE: process.env.RATE_LIMIT_MINUTE ? parseInt(process.env.RATE_LIMIT_MINUTE) : 1, // Default to 1 minute
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) : 5 // Limit to 5 requests per window
}