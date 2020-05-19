require('dotenv').config();
const pgp = require('pg-promise')();

const connectionString = process.env.DB_STRING;
console.log(connectionString);

const db = pgp(connectionString);

module.exports = db;