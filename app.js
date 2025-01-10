import express from 'express';
import db from './utils/db.js';
const app = express();
const port = 3000;
const tableName = "my_table"

app.use(express.json());
app.get('/', async (req, res)=>{
    try{
        const result = await db.query(`SELECT * FROM ${tableName}`);
        res.json(result.rows);
    } catch (err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/', async (req, res) => {
    try {
        // Extract data from the request body
        const { id, name } = req.body;

        // Parameterized query
        const result = await db.query(`INSERT INTO ${tableName} (id, name) VALUES ($1, $2)`, [id, name]);
        res.status(201).send('Data inserted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const {name} = req.body;

        // Ensure `name` is provided in the request body
        if (!name) {
            return res.status(400).send('Name is required');
        }

        const result = await db.query(`UPDATE ${tableName} SET name = $2 WHERE id = $1`,[id, name]);

        // Check if any row was updated
        if (result.rowCount === 0) {
            return res.status(404).send('Record not found');
        }

        res.status(200).send('Record updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.delete('/:id', async(req, res)=>{
    try {
        
    } catch (err) {
        console.error(err);
        
    }
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})