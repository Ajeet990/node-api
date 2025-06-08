import passport from 'passport';

// Main authentication middleware
export const authenticateJWT = passport.authenticate('jwt', { session: false });

// Optional: Enhanced version with additional checks
export const authMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized: Invalid or expired token'
      });
    }
    
    // Additional checks can go here
    // Example: Check if user is active
    // if (!user.isActive) {
    //   return res.status(403).json({ message: 'Account deactivated' });
    // }
    
    req.user = user;
    next();
  })(req, res, next);
};