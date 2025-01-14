import express from 'express';
import db from './utils/db.js';
import routes from './routes/index.js'

const app = express();
const port = 3000;
const tableName = "groups"

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// central router from routes/index.js
app.use('/', routes);


app.get('/', async (req, res)=>{
    try{
        const result = await db.query(`SELECT * FROM ${tableName}`);
        res.json(result.rows);
    } catch (err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const result = await db.query(`SELECT (group_name) FROM ${tableName} WHERE id = $1`, [id]);

        res.json(result.rows)
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/', async (req, res) => {
    try {
        // Extract data from the request body
        const {name} = req.body;

        // Parameterized query
        const result = await db.query(`INSERT INTO ${tableName} (group_name) VALUES ($1)`, [name]);
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

        const result = await db.query(`UPDATE ${tableName} SET group_name = $2 WHERE id = $1`,[id, name]);

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
        const {id} = req.params;

        const result = await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).send('Record not found');
        }

        res.status(200).send('Record deleted successfully');

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})