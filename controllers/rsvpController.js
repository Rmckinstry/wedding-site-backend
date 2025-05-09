import express from 'express';
import db from '../utils/db';

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