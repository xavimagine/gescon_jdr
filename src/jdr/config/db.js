const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
    host: process.env.DB_HOST || "52.55.93.91",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root1234",
    database: process.env.DB_NAME || "concesionario_jdr",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool;
