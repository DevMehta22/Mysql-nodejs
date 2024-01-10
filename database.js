require('dotenv').config();
const mysql = require('mysql2');
const pool = mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    password: process.env.password,
    database:process.env.database
}).promise();

module.exports = pool;
