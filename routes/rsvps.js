import express from 'express';
import {
    getAllRSVPHandler,
    createRSVPHandler,
    deleteRSVPHandler,
    getRSVPHandler,
    getGuestRSVPHandler,
    getGroupRSVPHandler,
    editAttendanceHandler,
    createAdditonalHandler
} from '../controllers/rsvpController.js';
const router = express.Router();

// GET
router.get('/', getAllRSVPHandler);
router.get('/:rsvpId', getRSVPHandler);
router.get('/guest/:guestId', getGuestRSVPHandler);
router.get('/group/:groupId', getGroupRSVPHandler);
// POST
router.post('/', createRSVPHandler);
router.post('/additional', createAdditonalHandler)
// PUT
router.patch('/attendance/:rsvpId', editAttendanceHandler);

// DELETE
router.delete('/:rsvpId', deleteRSVPHandler);
export default router;