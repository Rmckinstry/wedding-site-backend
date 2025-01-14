import express from "express";
import db from "../utils/db.js";

const router = express.Router();
const tableName = "users";

// GET
export const getAllUsers = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM ${tableName}`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(`SELECT * FROM ${tableName} WHERE user_id = $1`, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const result = await db.query(`SELECT * FROM ${tableName} WHERE group_id = $1`, [groupId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// POST
export const createUser = async (req, res) => {
  try {
    const { name, email, plusOneAllowed, hasDependents, groupId } = req.body;

    const result = await db.query(
      `INSERT INTO ${tableName} (name, email, plus_one_allowed, has_dependents, group_id) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,
      [name, email, plusOneAllowed, hasDependents, groupId]
    );
    res.status(201).json({
      message: "Data inserted successfully",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// PUT
export const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, plusOneAllowed, hasDependents, groupId } = req.body;

    const result = await db.query(
      `UPDATE ${tableName} 
         SET name = $1, email = $2, plus_one_allowed = $3, has_dependents = $4, group_id = $5 
         WHERE user_id = $6 
         RETURNING *`,
      [name, email, plusOneAllowed, hasDependents, groupId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Record not found");
    }

    res.status(200).json({
      message: "Record updated successfully",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
