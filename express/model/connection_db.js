const config = require('../config/mysql');
const mysql = require("mysql2");

const poolConnection = mysql.createPool({
    connectionLimit: config.CONNECTION_LIMIT,
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    multipleStatements: true
});

poolConnection.getConnection(function (err, connection) {
    if (err) {
        console.log('connecting error!');
        return;
    }
    console.log('connecting success');
    connection.release();
});

module.exports = poolConnection;