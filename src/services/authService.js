import { 
    login,
    createUser as createUserRepository
} from "../repositories/authRepository.js";
import { getUserByEmail } from "./userService.js";
import { AUTH_MESSAGES } from "../config/messages/authMessages.js";

async function createUser(userData) {
    const existingUser = await getUserByEmail(userData.email, false);
    if (existingUser) {
        throw new Error(AUTH_MESSAGES.EMAIL_IN_USE);
    }
    return await createUserRepository(userData);
}

async function loginUser(userData) {
  const user = await login(userData.email, userData.password);
  return user;
}

export {
  loginUser,
  createUser
};