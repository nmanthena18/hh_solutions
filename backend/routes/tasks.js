
const cPool = require('../config/connectionPool');
var bcrypt = require('bcrypt');

var Tasks={ 
	getAllUsers:function(req, res, callback){
		cPool(res, (connect) =>{
			connect.query('SELECT * from users;',(err, rows)=> {
				connect.release();
				return callback(err,rows)
			});
		});
	},
	signUp:function(req, res, callback){
		let data = req.body;
		bcrypt.genSalt(7, function(err, salt) {
			bcrypt.hash(data.password, salt, function(err, hash) {
				if(err) pass  = err;
				cPool(res, (connect) =>{
					var sql = "INSERT INTO `users`(`user_id`,`name`,`modified_date`, `email`,`password`) VALUES ('"+data.user_id+"','"+data.name+"','','"+data.email+"','" +hash+ "')";
					connect.query(sql,(err, rows)=> {
						connect.release();
						return callback(err,rows)
					});
				});
			});
		});
		
	},

	signIn:(req, res, callback) =>{
		let uName = req.body.user_id;		
		cPool(res, (connect) =>{
			connect.query('SELECT * from users where user_id = '+uName,(err, rows)=> {
				connect.release();
				if(err) return callback(err,'');
				if(rows.length > 0){
					bcrypt.compare(req.body.password, rows[0].password, function(err, res) {
						if(res){
							callback(err,rows);
						 }
					});
				}else{
					return callback(err,rows);
				}
			});
		});
	},

};

 module.exports=Tasks;