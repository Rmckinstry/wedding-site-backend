import express from 'express';
import { getAllRSVPHandler, createRSVPHandler, deleteRSVPHandler, getRSVPHandler } from '../controllers/rsvpController.js';
const router = express.Router();

// GET
router.get('/', getAllRSVPHandler);
router.get('/:rsvpId', getRSVPHandler);
// POST
router.post('/', createRSVPHandler)
// PUT

// DELETE
router.delete('/:rsvpId', deleteRSVPHandler);
export default router;