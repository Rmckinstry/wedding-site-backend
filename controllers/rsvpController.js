import express from 'express';
import {
    createRSVPs,
    getAllRSVPs,
    getRSVP,
    deleteRSVP
} from '../services/rsvpService.js';

export const getAllRSVPHandler = async (req, res) => {
    try {
        const result = await getAllRSVPs()
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export const getRSVPHandler = async (req, res) => {
    try {
        const { rsvpId } = req.params;

        if (typeof rsvpId !== "number") {
            return res.status(400).send("rsvpId must be a valid integer")
        }
        const result = await getRSVP(rsvpId);

        if (!result) {
            return res.status(404).send('RSVP not found');
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export const createRSVPHandler = async (req, res) => {
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

export const deleteRSVPHandler = async (req, res) => {
    try {
        const { rsvpId } = req.params;

        if (typeof rsvpId !== "number") {
            return res.status(400).send("rsvpId must be a valid integer")
        }

        const result = await deleteRSVP(rsvpId);

        if (result.rowCount === 0) {
            return res.status(404).send('Record not found');
        }

        res.status(200).send('RSVP deleted successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}