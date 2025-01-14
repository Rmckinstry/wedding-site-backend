import express from 'express';
import { getAllUsers, getUserById, getUserByGroup } from '../controllers/userController.js';


const router = express.Router();

// GET
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/group/:groupId', getUserByGroup);

export default router;