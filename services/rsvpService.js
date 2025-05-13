import db from "../utils/db";

const tableName = "rsvps";

export const createRSVPs = async (rsvpList) => {
    try {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            const createdRSVPs = [];

            for (const rsvp of rsvpList) {
                const { guestId, attendance, spotify } = rsvp;
                const timestamp = new Date(Date.now()).toISOString()

                const result = await client.query(
                    `INSERT INTO ${tableName} (guest_id, attendance, spotify, created_at)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
                    [guestId, attendance, spotify, timestamp]
                );
                createdRSVPs.push(result.rows[0]);
            }

            await client.query('COMMIT');

            res.status(201).json({
                message: "RSVP inserted successfully",
                data: createdRSVPs,
            });

        } catch (error) {
            await client.query('ROLLBACK');
            res.status(500).send('Internal Server Error: Transaction Failed')
            throw new Error(`Failed to create RSVPs - rolling back transaction: ${error}`);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error processing RSVPs:", error);
        res.status(500).send('Internal Server Error');
    }

}