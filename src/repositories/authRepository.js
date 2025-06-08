import { prisma } from '../config/connection/db.js';
import bcrypt from 'bcrypt';
import { AUTH_MESSAGES } from '../config/messages/authMessages.js';

async function createUser(userData) {
    const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    return await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });
}

async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error(AUTH_MESSAGES.USER_NOT_FOUND);
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);

  return user;
}

export {
    createUser,
    login
}