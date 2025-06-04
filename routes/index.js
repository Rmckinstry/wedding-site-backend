import express from 'express';
import db from '../utils/db.js';
import groupsRoute from './groups.js';
import guestsRoute from './guests.js';
import rsvpsRoute from './rsvps.js';

const router = express.Router();

router.use('/groups', groupsRoute);
router.use('/guests', guestsRoute);
router.use('/rsvps', rsvpsRoute);

router.get('/health', async (req, res) => {
    try {
        const client = await db.getClient();
        const result = await client.query('SELECT NOW()');
        client.release();

        res.status(200).json({
            status: 'healthy',
            timestamp: result.rows[0].now,
            message: 'Server and database are operational',
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({
            status: 'unhealthy',
            message: 'Database connection failed',
            error: error.message,
        });
    }
})

// catch-all route for undefined routes if needed
router.use((req, res, next) => {
    res.status(404).send("Sorry, we couldn't find what you're looking for!");
});

export default router;