import db from "../utils/db.js";

const tableName = "rsvps";

export const createRSVPs = async (rsvpList) => {
    try {
        const client = await db.getClient();
        try {
            await client.query('BEGIN');
            const createdRSVPs = [];

            for (const rsvp of rsvpList) {
                const { guestId, attendance, spotify } = rsvp;
                const timestamp = new Date().toISOString();

                const result = await client.query(
                    `INSERT INTO ${tableName} (guest_id, attendance, spotify, created_at)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *`,
                    [guestId, attendance, spotify, timestamp]
                );
                createdRSVPs.push(result.rows[0]);
            }

            await client.query('COMMIT');
            return createdRSVPs;

        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Failed to create RSVPs - rolling back transaction:", error);
            throw new Error(`Failed to create RSVPs: ${error.message}`);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error processing RSVPs:", error);
        res.status(500).send('Internal Server Error');
    }

}