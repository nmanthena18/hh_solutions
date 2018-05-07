
const cPool = require('../config/connectionPool');
var jwt = require('jsonwebtoken');

var Tasks={ 
	getAllUsers:function(res, callback){
		cPool(res, (connect) =>{
			connect.query('SELECT * from users;',(err, rows)=> {
				connect.release();
				return callback(err,rows)
			});
		});
	},
	signUp:function(res, callback){
		var sql = "INSERT INTO `users`(`user_id`,`name`,`created_date`,`modified_date`, `email`,`password`) VALUES ('9999','" + "1" + "','" + "123" +"','" + null + "','" +"data.email"+ "','" +"data.encrypted_pass"+ "')";
		cPool(res, (connect) =>{
			connect.query(sql,(err, rows)=> {
				connect.release();
				return callback(err,rows)
			});
		});
	},

	// signUp: (res, classback) => {
	// 	let pwd = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
	// 		return token;
	// 	});

	// 	let data ={
	// 		fname:"some",
	// 		email:"asdasdsa@co.com",
	// 		encrypted_pass: pwd
	// 	}
	// 	var d = new Date();
	// 	let date = d.getDate();
	// 	var sql = "INSERT INTO `users`(`user_id`,`name`,`created_date`,`modified_date`, `email`,`password`) VALUES ('9999','" + data.fname + "','" + data.date +"','" + null + "','" +data.email+ "','" +data.encrypted_pass+ "')";
	// 	cPool(res, (connect) =>{
	// 		connect.query(sql,(err, rows)=> {
	// 			connect.release();
	// 			return callback(err,rows)
	// 		});
	// 	});
	// },
};
 module.exports=Tasks;