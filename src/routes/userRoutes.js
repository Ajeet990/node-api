import express from 'express';
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;