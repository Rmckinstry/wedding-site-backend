import express from 'express';
import { getAllUsers, getUserById, getUserByGroup, createUser, editUser, editHasDependent, editPlusOneAllowed, deleteUser } from '../controllers/userController.js';


const router = express.Router();

// GET
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/group/:groupId', getUserByGroup);

// POST
router.post('', createUser);

// PUT
router.put('/:userId', editUser);

// PATCH
router.patch('/dependent/:userId', editHasDependent);
router.patch('/plus-one/:userId', editPlusOneAllowed);

// DELETE
router.delete('/:userId', deleteUser);

export default router;