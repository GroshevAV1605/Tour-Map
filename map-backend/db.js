require('dotenv').config();
const pgp = require('pg-promise')();
const connectionString = process.env.DB_STRING;

const db = pgp(connectionString);

module.exports = db;