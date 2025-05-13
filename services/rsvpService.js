import db from "../utils/db.js";

const tableName = "rsvps";

export const getAllRSVPs = async () => {
    try {
        const result = await db.query(`SELECT * FROM ${tableName}`);
        return result.rows
    } catch (error) {
        throw new Error(`Failed to fetch RSVPs: ${error.message}`)
    }
}

export const getRSVP = async (rsvpId) => {
    try {
        const result = await db.query(`SELECT * FROM ${tableName} WHERE rsvp_id = $1`, [rsvpId]);
        return result.rows[0];

    } catch (error) {
        throw new Error(`Failed to fetch RSVP: ${error.message}`)
    }
}

export const getGuestRSVP = async (guestId) => {
    try {
        const result = await db.query(`SELECT * FROM ${tableName} WHERE guest_id = $1`, [guestId]);
        return result.rows[0];

    } catch (error) {
        throw new Error(`Failed to fetch guest RSVP: ${error.message}`)
    }
}

export const getGroupRSVPs = async (groupId) => {
    try {
        const result = await db.query(
            `SELECT g.name AS guest_name, gp.group_name, gp.id, r.attendance, r.spotify, r.created_at
            FROM guests AS g
            JOIN groups AS gp ON g.group_id = gp.id
            JOIN rsvps AS r ON g.guest_id = r.guest_id
            WHERE gp.id = $1`
            , [groupId])
        return result.rows
    } catch (error) {
        throw new Error(`Failed to fetch group RSVPs: ${error.message}`)
    }
}

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

export const deleteRSVP = async (rsvpId) => {
    try {
        const result = await db.query(`DELETE FROM ${tableName} WHERE rsvp_id = $1`, [rsvpId]);
        return result;

    } catch (error) {
        throw new Error(`Failed to delete RSVP: ${error.message}`)
    }
}