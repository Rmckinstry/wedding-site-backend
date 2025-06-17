import {
    createRSVPs,
    getAllRSVPs,
    getRSVP,
    deleteRSVP,
    getGuestRSVP,
    getGroupRSVPs,
    editAttendance,
    createRSVPAdditonal
} from '../services/rsvpService.js';
import { isNumber } from '../utils/utils.js'

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

        if (rsvpId === "" || !isNumber(rsvpId)) {
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

export const getGuestRSVPHandler = async (req, res) => {
    try {
        const { guestId } = req.params;

        if (guestId === "" || !isNumber(guestId)) {
            return res.status(400).send("guestId must be a valid integer")
        }
        const result = await getGuestRSVP(guestId);

        if (!result) {
            return res.status(404).send(`RSVP for guestid ${guestId}not found`);
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export const getGroupRSVPHandler = async (req, res) => {
    try {
        const { groupId } = req.params;
        if (groupId === "" || !isNumber(groupId)) {
            return res.status(400).send("groupId must be a valid integer")
        }

        const result = await getGroupRSVPs(groupId);

        if (!result) {
            return res.status(404).send(`RSVP for guestid ${guestId}not found`);
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

        //validating input
        if (!Array.isArray(rsvpList) || rsvpList.length === 0) {
            return res.status(400).send("Param must be a non empty array of rsvps");
        }

        // Validate each RSVP object
        for (const rsvp of rsvpList) {
            if (!rsvp.guestId || typeof rsvp.attendance !== 'boolean' || typeof rsvp.spotify !== 'string') {
                return res.status(400).json({
                    error: "Each RSVP must have a valid guestId, attendance (boolean), and spotify (string)",
                });
            }
        }

        const rsvps = await createRSVPs(rsvpList);

        res.status(201).json({
            message: "RSVP(s) inserted successfully",
            data: rsvps,
        });
    } catch (error) {
        console.error("Error in createRSVPHandler:", error.message);

        // Handle specific error cases
        if (error.message.includes("Group already has existing RSVPs") ||
            error.message.includes("Group has already submitted RSVP")) {
            return res.status(409).json({
                error: error.message,
            });
        }

        // Generic error
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

export const createAdditonalHandler = async (req, res) => {
    try {
        const { additionalGuests, guestId, groupId, additionalType } = req.body["postData"];

        //validating input
        if (!Array.isArray(additionalGuests) || additionalGuests.length === 0) {
            return res.status(400).send("additionalGuests must be a non empty array of names");
        }

        if (!guestId || typeof guestId !== "number") {
            return res.status(400).send("guestId must be a valid integer number")
        }

        if (!groupId || typeof groupId !== "number") {
            return res.status(400).send("groupId must be a valid integer")
        }

        if (!additionalType || typeof additionalType !== "string") {
            return res.status(400).send("additionalName must be a string with a value of plus_one or dependent")
        }

        const additionalGuest = await createRSVPAdditonal(additionalGuests, guestId, groupId, additionalType);

        res.status(201).json({
            message: "Additonal Guest created successfully & RSVP submitted",
            data: additionalGuest,
        });
    } catch (error) {
        if (error.message === "Plus one not allowed for this guest" ||
            error.message === "Dependents not allowed for this guest") {
            return res.status(403).json({
                error: error.message
            });
        }
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

export const deleteRSVPHandler = async (req, res) => {
    try {
        const { rsvpId } = req.params;

        if (rsvpId === "" || !isNumber(rsvpId)) {
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

export const editAttendanceHandler = async (req, res) => {
    try {
        const { rsvpId } = req.params;
        const { attendance } = req.body;

        if (rsvpId === "" || !isNumber(rsvpId)) {
            return res.status(400).send("rsvpId must be a valid integer")
        }

        if (typeof attendance !== "boolean") {
            return res.status(400).send("attendance must be type boolean")
        }

        const result = await editAttendance(rsvpId, attendance);
        res.status(200).json({
            message: "Attendance Updated",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}