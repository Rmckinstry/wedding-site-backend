import express from 'express';
import db from '../utils/db.js';

const router = express.Router();
const tableName = "groups";

export const getAllGroups = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM ${tableName}`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

export const getGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(`SELECT (group_name) FROM ${tableName} WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ status: 404, message: 'Group not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

export const addGroup = async (req, res) => {
    try {
        // Extract data from the request body
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ status: 400, message: "Group name is required" });
        }

        const result = await db.query(`INSERT INTO ${tableName} (group_name) VALUES ($1)`, [name]);

        res.status(201).json({ status: 201, message: "Group created successfully", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

export const editGroupName = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Ensure `name` is provided in the request body
        if (!name) {
            return res.status(400).json({ status: 400, message: 'Name is required' })
        }

        const result = await db.query(`UPDATE ${tableName} SET group_name = $2 WHERE id = $1`, [id, name]);

        // Check if any row was updated
        if (result.rowCount === 0) {
            return res.status(404).json({ status: 404, message: 'Group not found' });
        }

        res.status(200).json({
            status: 200,
            message: 'Group updated successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);

        // Check if any row was updated
        if (result.rowCount === 0) {
            return res.status(404).json({ status: 404, message: 'Group not found' });
        }

        res.status(200).json({ status: 200, message: 'Group deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}