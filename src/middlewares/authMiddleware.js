import passport from 'passport';
import { isTokenInvalid } from '../services/tokenService.js';
import { AUTH_MESSAGES } from '../config/messages/authMessages.js';
import { CODE } from '../config/statusCodes/codes.js';
// Main authentication middleware
export const authenticateJWT = passport.authenticate('jwt', { session: false });

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    // 1. Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            statusCode: CODE.UNAUTHORIZED,
            message: AUTH_MESSAGES.TOKEN_REQUIRED
        });
    }

    // 2. Check if token is blacklisted
    if (await isTokenInvalid(token)) {
        return res.status(401).json({
            success: false,
            statusCode: CODE.UNAUTHORIZED,
            message: AUTH_MESSAGES.TOKEN_EXPIRED
        });
    }

    // 3. Verify token with Passport
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                statusCode: CODE.UNAUTHORIZED,
                message: AUTH_MESSAGES.TOKEN_EXPIRED
            });
        }

        // 4. Additional checks (optional)
        // if (!user.isActive) {
        //   return res.status(403).json({ message: 'Account deactivated' });
        // }

        // 5. Attach user to request
        req.user = user;
        next();
    })(req, res, next);
};