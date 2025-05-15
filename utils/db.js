import pg from 'pg';
const { Pool } = pg;

// Used for local
// const pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 5432,
//     database: process.env.DB_NAME
// })
console.log(process.env.DB_URL);
const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: process.env.DB_URL ? true : false
});
console.log(pool);

export default {
    query: (text, params) => pool.query(text, params),
    getClient: () => pool.connect()
};