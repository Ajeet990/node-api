import express from 'express';
import { 
    loginUser,
    registerUser,
    logoutUser
} from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Logout route
// router.post('/logout', logout);

export default router;