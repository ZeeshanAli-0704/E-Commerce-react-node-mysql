// database/connection.js

const mysql2 = require("mysql2");

const pool = mysql2.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "e_commerce",
});

// Export the pool
module.exports = pool;
