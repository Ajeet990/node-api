import { INVALID } from "zod";

export const AUTH_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILURE: 'Login failed, please check your credentials',
    REGISTER_SUCCESS: 'Registration successful',
    REGISTER_FAILURE: 'Registration failed, please try again',
    LOGOUT_SUCCESS: 'Logout successful',
    LOGOUT_FAILURE: 'Logout failed, please try again',
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_IN_USE: 'Email is already in use',
    USER_NOT_FOUND: 'User not found',
    UNAUTHORIZED: 'Unauthorized access',
    INTERNAL_ERROR: 'An internal error occurred, please try again later',
    INVALID_CREDENTIALS: 'Invalid credentials provided',
    TOKEN_EXPIRED: 'Token has expired, please log in again',
    TOKEN_INVALID: 'Invalid token provided',
    TOKEN_REQUIRED: 'Token is required for this action',
    TOO_MANY_REQUESTS: 'Too many requests, please try again later',
};