/* const lodash = require("lodash"); */

const mysql = require('/node_modules/mysql/index.js'); 

const connection = mysql.createConnection({
  host     : 'zedi.hu',
  user     : 'zediihu1_data',
  password : '1Database/2020',
  database : 'zediihu1_database'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
