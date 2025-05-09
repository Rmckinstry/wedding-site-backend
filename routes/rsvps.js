import express from 'express';
import { getAllRSVPs } from '../controllers/rsvpController';
const router = express.Router();

// GET
router.get('/', getAllRSVPs);
// POST

// PUT

// DELETE

export default router;