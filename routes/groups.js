import express from 'express';
import {getAllGroups, getGroup, addGroup, editGroupName, deleteGroup} from '../controllers/groupController.js'

const router = express.Router();

// GET ALL
router.get('/', getAllGroups);
router.get('/:id', getGroup);
router.post('/', addGroup);
router.put('/:id', editGroupName);
router.delete('/:id', deleteGroup);

export default router;