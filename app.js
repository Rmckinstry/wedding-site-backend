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

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})