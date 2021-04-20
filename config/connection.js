const mysql = require("mysql");
const dbConfig = require("./dbConfig");

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
