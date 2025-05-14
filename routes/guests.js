import express from "express";
import {
    getAllGuests,
    getGuestById,
    getGuestByGroup,
    createGuest,
    createAdditional,
    editGuest,
    editHasDependent,
    editPlusOneAllowed,
    deleteGuest,
} from "../controllers/guestController.js";

const router = express.Router();

// GET
router.get("/", getAllGuests);
router.get("/:guestId", getGuestById);
router.get("/group/:groupId", getGuestByGroup);

// POST
router.post("", createGuest);
router.post("/additional", createAdditional);

// PUT
router.put("/:guestId", editGuest);

// PATCH
router.patch("/dependent/:guestId", editHasDependent);
router.patch("/plus-one/:guestId", editPlusOneAllowed);

// DELETE
router.delete("/:guestId", deleteGuest);

export default router;
