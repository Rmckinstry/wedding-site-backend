import express from 'express';
import {
    getAllRSVPHandler,
    createRSVPHandler,
    deleteRSVPHandler,
    getRSVPHandler,
    getGuestRSVPHandler,
    getGroupRSVPHandler
} from '../controllers/rsvpController.js';
const router = express.Router();

// GET
router.get('/', getAllRSVPHandler);
router.get('/:rsvpId', getRSVPHandler);
router.get('/guest/:guestId', getGuestRSVPHandler);
router.get('/group/:groupId', getGroupRSVPHandler);
// POST
router.post('/', createRSVPHandler)
// PUT

// DELETE
router.delete('/:rsvpId', deleteRSVPHandler);
export default router;