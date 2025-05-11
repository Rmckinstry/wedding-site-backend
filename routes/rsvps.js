import express from 'express';
import { getAllRSVPs, createRSVP, getRSVP, deleteRSVP } from '../controllers/rsvpController.js';
const router = express.Router();

// GET
router.get('/', getAllRSVPs);
router.get('/:rsvpId', getRSVP);
// POST
router.post('/', createRSVP)
// PUT

// DELETE
router.delete('/:rsvpId', deleteRSVP);
export default router;