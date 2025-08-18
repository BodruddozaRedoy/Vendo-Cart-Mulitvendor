import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
  logoutUser,
  getUserById
} from './user.controller';
import { admin, protect } from '../auth/auth.middleware';
// import { protect, admin } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/logout", logoutUser)

router.get('/me', protect, getMe);
router.put('/update', protect, updateUser);
// router.delete('/:id', protect, admin, deleteUser);

// Admin routes
router.get('/', protect, admin, getAllUsers);
router.get("/:id", protect, getUserById)
router.put('/:id', protect, admin, updateUserByAdmin);
router.delete('/:id', protect, admin, deleteUserByAdmin);

export default router;