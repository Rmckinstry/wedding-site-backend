import express from 'express';
import db from '../utils/db.js';
import { createRSVPs } from '../services/rsvpService.js';

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
        const { rsvpList } = req.body;

        if (!Array.isArray(rsvpList) || rsvpList.length === 0) {
            return res.status(400).send("Param must be a non empty array of rsvps");
        }

        const rsvps = await createRSVPs(rsvpList);

        res.status(201).json({
            message: "RSVP(s) inserted successfully",
            data: rsvps,
        });
    } catch (error) {
        console.error(error);
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