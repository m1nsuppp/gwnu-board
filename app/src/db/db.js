const mysql = require('mysql2');
const dbConfig = require('./db-config.json');
const boards = mysql.createConnection(dbConfig);

module.exports = boards;