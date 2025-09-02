import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);         // 👈 GET /api/users
router.get('/:id', getUserById);      // 👈 GET /api/users/:id
router.put('/:id', updateUser);       // 👈 PUT /api/users/:id
router.delete('/:id', deleteUser);    // 👈 DELETE /api/users/:id

export default router;
