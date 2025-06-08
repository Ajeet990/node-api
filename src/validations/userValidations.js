import { z } from "zod";
import { prisma } from "../config/connection/db.js";

// Validate ID (must be a numeric string or number)
export const userIdSchema = z.string().regex(/^\d+$/, "ID must be numeric").transform(Number);

// Validate User Creation Data
export const createUserSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Password is required and must be at least 6 characters" })
});

export const loginUserSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Password is required and must be at least 6 characters" })
});

export const registerUserSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Password is required and must be at least 6 characters" })
});

export const updateUserSchema = (currentUserId) => 
  z.object({
    name: z.string().min(2).optional(),
    email: z
      .string()
      .email()
      .optional()
      .refine(async (email) => {
        if (!email) return true; // Skip if email not provided
        const user = await prisma.user.findUnique({ where: { email } });
        return !user || user.id === currentUserId; // Allow if email doesn't exist or belongs to current user
      }, { message: "Email already taken" }),
  });