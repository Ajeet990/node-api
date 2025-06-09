import {
    login,
    createUser as createUserRepository
} from "../repositories/authRepository.js";
import { getUserByEmail } from "./userService.js";
import { AUTH_MESSAGES } from "../config/messages/authMessages.js";
// import { generateToken } from "../utils/auth.js";
import { generateToken } from "./tokenService.js";

async function createUser(userData) {
    const existingUser = await getUserByEmail(userData.email, false);
    if (existingUser) {
        throw new Error(AUTH_MESSAGES.EMAIL_IN_USE);
    }
    return await createUserRepository(userData);
}

// async function loginUser(userData) {
//     const user = await login(userData.email, userData.password);
//     return user;
// }
async function loginUser(userData) {
    const user = await login(userData.email, userData.password);
    const { password, ...userWithoutPassword } = user;

    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.name
    });

    return {
        user: userWithoutPassword,
        token
    };
}

export {
    loginUser,
    createUser
};