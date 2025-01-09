import pg from 'pg';
const {Pool} = pg;

// use env later
const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432, // default Postgres port
    database: 'testdb'
})

export default {
    query: (text, params) => pool.query(text, params)
};