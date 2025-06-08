import {
  createUser as createUserRepo,
  findUserById as findUserByIdRepo,
  findUserByEmail as findUserByEmailRepo,
  findAllUsers as findAllUsersRepo,
  updateUser as updateUserRepo,
  deleteUser as deleteUserRepo,
} from '../repositories/userRepository.js';

async function createUser(userData) {
  const existingUser = await findUserByEmailRepo(userData.email);
  if (existingUser) {
    throw new Error('Email already in use');
  }
  return await createUserRepo(userData);
}

async function getUserById(id) {
  const user = await findUserByIdRepo(id);
  if (!user) throw new Error('User not found');
  return user;
}

async function getUserByEmail(email, throwError = true) {
  const user = await findUserByEmailRepo(email);
  if (!user && throwError) throw new Error('User not found');
  return user;
}

async function getAllUsers() {
  return await findAllUsersRepo();
}

async function updateUser(id, userData) {
  await getUserById(id); // Check if user exists
  return await updateUserRepo(id, userData);
}

async function deleteUser(id) {
  await getUserById(id); // Check if user exists
  return await deleteUserRepo(id);
}

export {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByEmail
};