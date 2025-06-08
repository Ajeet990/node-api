import { prisma } from '../config/connection/db.js';

async function createUser(userData) {
  return await prisma.user.create({ data: userData });
}

async function findUserById(id) {
  return await prisma.user.findUnique({ where: { id: parseInt(id) } });
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function findAllUsers() {
  return await prisma.user.findMany();
}

async function updateUser(id, userData) {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: userData
  });
}

async function deleteUser(id) {
  return await prisma.user.delete({ where: { id: parseInt(id) } });
}

export {
  createUser,
  findUserById,
  findUserByEmail,
  findAllUsers,
  updateUser,
  deleteUser
};