import { prisma } from '../config/connection/db.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants.js';


// Generate JWT token with payload and expiration
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

// Verify token and return decoded payload
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// Add token to blacklist
export const invalidateToken = async (token) => {
  const decoded = jwt.decode(token); // Decode without verification
  if (!decoded) throw new Error('Invalid token');

  return prisma.invalidatedToken.create({
    data: {
      token,
      expiresAt: new Date(decoded.exp * 1000), // Convert JWT expiry timestamp to Date
      userId: decoded.userId
    }
  });
};

// Check if token is blacklisted
export const isTokenInvalid = async (token) => {
  const record = await prisma.invalidatedToken.findUnique({
    where: { token }
  });
  return !!record;
};