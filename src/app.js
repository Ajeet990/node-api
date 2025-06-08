import express from 'express';
import { connectDB } from './config/connection/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import passport from './config/passport/passport.js';
import { authenticateJWT, authMiddleware } from './middlewares/authMiddleware.js';


const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Connect to database
connectDB();

// Routes
app.use('/auth', authRoutes);
// app.use('/users', userRoutes);
// app.use('/users', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/users', authMiddleware, userRoutes);

// Error handling
app.use(errorHandler);

export default app;