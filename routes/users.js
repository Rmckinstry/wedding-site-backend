import express from 'express';
import { getAllUsers } from '../controllers/userController.js';


const router = express.Router();

// GET
router.get('/', getAllUsers);

export default router;