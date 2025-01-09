import express from 'express';
import db from './utils/db.js';
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', async (req, res)=>{
    try{
        const result = await db.query('SELECT * FROM my_table');
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
        const result = await db.query('INSERT INTO my_table (id, name) VALUES ($1, $2)', [id, name]);
        res.status(201).send('Data inserted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})