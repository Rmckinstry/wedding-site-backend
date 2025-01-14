import express from 'express';
import { getAllUsers, getUserById, getUserByGroup, createUser, editUser } from '../controllers/userController.js';


const router = express.Router();

// GET
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/group/:groupId', getUserByGroup);

// POST
router.post('', createUser);

// PUT
router.put('/:userId', editUser);

export default router;