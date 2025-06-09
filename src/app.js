import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { connectDB } from './config/connection/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import passport from './config/passport/passport.js';
import { authenticateJWT, authMiddleware } from './middlewares/authMiddleware.js';
import responseHandler from './utils/responseHandler.js';
import { CODE } from './config/statusCodes/codes.js';
import { RATE_LIMIT_CONST } from './config/constants.js';
import { AUTH_MESSAGES } from './config/messages/authMessages.js';
import setupSwagger from './config/swagger/swagger.js';

const app = express();

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: RATE_LIMIT_CONST.MINUTE * RATE_LIMIT_CONST.WINDOW_MS,
  max: RATE_LIMIT_CONST.MAX_REQUESTS,
  handler: (req, res) => {
    responseHandler.error(res, {
      statusCode: CODE.TOO_MANY_REQUESTS,
      message: AUTH_MESSAGES.TOO_MANY_REQUESTS,
      details: {
        limit: RATE_LIMIT_CONST.MAX_REQUESTS,
        window: `${RATE_LIMIT_CONST.MINUTE} minute(s)`,
        remainingTime: `${Math.ceil(res.get('Retry-After') / 60)} minutes` || 'less than a minute'
      }
    });
  }
});

app.use(limiter);

// CORS Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Swagger setup
setupSwagger(app);

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Connect to database
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/users', authMiddleware, userRoutes);

// Error handling
app.use(errorHandler);

export default app;