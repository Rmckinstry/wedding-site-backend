import express from 'express';
import db from '../utils/db.js';

const router = express.Router();
const tableName = "rsvps";

export const getAllRSVPs = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM ${tableName}`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

export const getRSVP = async (req, res) => {
    try {
        const { rsvpId } = req.params;
        const result = await db.query(`SELECT * FROM ${tableName} WHERE rsvp_id = $1`, [rsvpId]);

        res.json(result.rows);
    } catch (error) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

export const createRSVP = async (req, res) => {
    try {
        const { guestId, attendance, spotify } = req.body;
        const timestamp = new Date(Date.now()).toISOString()
        console.log(timestamp)

        const result = await db.query(
            `INSERT INTO ${tableName} (guest_id, attendance, spotify, created_at)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [guestId, attendance, spotify, timestamp]
        );

        res.status(201).json({
            message: "RSVP inserted successfully",
            data: result.rows,
        });
    } catch (error) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

export const deleteRSVP = async (req, res) => {
    try {
        const { rsvpId } = req.params;

        const result = await db.query(`DELETE FROM ${tableName} WHERE rsvp_id = $1`, [rsvpId]);

        if (result.rowCount === 0) {
            return res.status(404).send('Record not found');
        }

        res.status(200).send('RSVP deleted successfully');

    } catch (error) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}