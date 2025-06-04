import express from "express";
import db from "../utils/db.js";

const router = express.Router();
const tableName = "guests";

// GET
export const getAllGuests = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM ${tableName}`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getGuestById = async (req, res) => {
    try {
        const { guestId } = req.params;
        const result = await db.query(`SELECT * FROM ${tableName} WHERE guest_id = $1`, [guestId]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getGuestsByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const query = `
            SELECT 
                g.*,
                gr.group_name
            FROM
                guests AS g
            JOIN
                groups AS gr
            ON 
                g.group_id = gr.id
            WHERE
                g.group_id = $1

        `
        const result = await db.query(query, [groupId]);

        const groupName = result.rows.length > 0 ? result.rows[0].group_name : null;

        res.json({ group_name: groupName, guests: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// POST
export const createGuest = async (req, res) => {
    try {
        const { name, email, plusOneAllowed, hasDependents, groupId } = req.body;

        const result = await db.query(
            `INSERT INTO ${tableName} (name, email, plus_one_allowed, has_dependents, group_id) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [name, email, plusOneAllowed, hasDependents, groupId]
        );
        res.status(201).json({
            message: "Guest inserted successfully",
            data: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const createAdditional = async (req, res) => {
    try {
        const { name, email, plusOneAllowed, hasDependents, groupId, primaryGuestId, guestType } = req.body;

        if (guestType !== "dependent" || "plus_one") {
            console.error("Invalid guest type");
            res.status(400).send(`Bad Request. Invalid guest type: ${guestType}. Must be dependent, or plus_one.`);
            return
        }

        const result = await db.query(
            `INSERT INTO ${tableName} (name, email, plus_one_allowed, has_dependents, group_id, added_by_guest_id, additional_guest_type) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [name, email, plusOneAllowed, hasDependents, groupId, primaryGuestId, guestType]
        );
        res.status(201).json({
            message: "Additional guest inserted successfully",
            data: result.rows,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// PUT
export const editGuest = async (req, res) => {
    try {
        const { guestId } = req.params;
        const { name, email, plusOneAllowed, hasDependents, groupId } = req.body;

        const result = await db.query(
            `UPDATE ${tableName} 
            SET name = $1, email = $2, plus_one_allowed = $3, has_dependents = $4, group_id = $5 
            WHERE guest_id = $6 
            RETURNING *`,
            [name, email, plusOneAllowed, hasDependents, groupId, guestId]
        );

        if (result.rowCount === 0) {
            return res.status(404).send("Guest not found");
        }

        res.status(200).json({
            message: "Guest updated successfully",
            data: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// PATCH
export const editHasDependent = async (req, res) => {
    try {
        const { guestId } = req.params;
        const { hasDependents } = req.body;

        const result = await db.query(
            `UPDATE ${tableName}
            SET has_dependents = $1
            WHERE guest_id = $2
            RETURNING *`,
            [hasDependents, guestId]
        );

        res.status(200).json({
            message: "Dependent Flag Updated",
            data: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const editPlusOneAllowed = async (req, res) => {
    try {
        const { guestId } = req.params;
        const { plusOneAllowed } = req.body;

        const result = await db.query(
            `UPDATE ${tableName}
            SET plus_one_allowed = $1
            WHERE guest_id = $2
            RETURNING *`,
            [plusOneAllowed, guestId]
        );

        res.status(200).json({
            message: "Plus One Allowed Flag Updated",
            data: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// DELETE
export const deleteGuest = async (req, res) => {
    try {
        const { guestId } = req.params;

        const result = await db.query(`DELETE FROM ${tableName} WHERE guest_id = $1`, [guestId]);

        if (result.rowCount === 0) {
            return res.status(404).send('Record not found');
        }

        res.status(200).send('Guest deleted successfully');

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}