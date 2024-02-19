const { pool } = require('pg');
const dotenv = require('dotenv')

dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
        rejectUnauthorization: false,
  },
});

module.exports = db;