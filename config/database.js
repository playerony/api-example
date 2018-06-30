var mysql = require('mysql');
var pool  = null;

exports.connect = function() {
  pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'motorcycle_club'
  });
}

exports.get = function() {
  return pool;
}