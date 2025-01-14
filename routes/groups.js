import express from 'express';
import {getAllGroups, getGroup, addGroup, editGroupName, deleteGroup} from '../controllers/groupController.js'

const router = express.Router();

// GET ALL
router.get('/', getAllGroups);
router.get('/:id', getGroup);
router.post('/', addGroup);
router.put('/', editGroupName);
router.delete('/', deleteGroup);

export default router;