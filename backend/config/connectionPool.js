
const mysql = require('mysql');
const DB = require('./Database');
const db = DB.Dev
const pool = mysql.createPool({
    host     : db.host,
    user     : db.user,
    password : db.password,
    database : db.database,
    multipleStatements:true
});
 
const getConnection = (res, callback) => {
    pool.getConnection(function(err, connection) {
        if (err){
         throw err;
        }
        callback(connection)
    });

}

  module.exports = getConnection;