import express from 'express';
import { getAllUsers, getUserById, getUserByGroup, createUser } from '../controllers/userController.js';


const router = express.Router();

// GET
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/group/:groupId', getUserByGroup);

// POST
router.post('', createUser);

export default router;