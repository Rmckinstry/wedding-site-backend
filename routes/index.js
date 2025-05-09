import express from 'express';
import groupsRoute from './groups.js';
import guestsRoute from './guests.js';

const router = express.Router();

router.use('/groups', groupsRoute);
router.use('/guests', guestsRoute);

// catch-all route for undefined routes if needed
router.use((req, res, next) => {
    res.status(404).send("Sorry, we couldn't find what you're looking for!");
});

export default router;