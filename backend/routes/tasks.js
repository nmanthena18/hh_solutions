
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

	saveProduct:(req, res, callback) =>{
		let query =  "INSERT INTO `hh_solutions`.`products` (`prd_name`, `prd_scode`,`prd_shortname`, `prd_price`, `prd_qty`, `prd_gst`, `prd_desc`) VALUES ('"+req.body.prd_name+"', '"+req.body.prd_scode+"', '"+req.body.prd_shortname+"', '"+req.body.prd_price+"', '"+req.body.prd_qty+"', '"+req.body.prd_gst+"', '"+req.body.prd_desc+"');";
		cPool(res, (connect) =>{
			connect.query(query,(err, rows)=> {
				console.log(err)
				connect.release();
				if(err) return callback(err,'');
				console.log(rows)
				return callback(err,rows);
			});
		});
	},

	editProduct:(req, res, callback) =>{
		let id = req.body.id;		
		let query = "SELECT * from `hh_solutions`.`products` WHERE `prd_id`='"+id+"';";
		cPool(res, (connect) =>{
			connect.query(query,(err, rows)=> {
				console.log(err)
				connect.release();
				if(err) return callback(err,'');
				return callback(err,rows);
			});
		});
	},
	updateProduct:(req, res, callback) =>{
		let id = req.body.id;		
		let data = req.body.form
		let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
		let query = "update `products` set prd_name='"+data.prd_name+"', prd_shortname='"+data.prd_shortname+"', prd_price='"+data.prd_price+"', prd_qty='"+data.prd_qty+"', prd_scode='"+data.prd_scode+"', prd_gst='"+data.prd_gst+"', prd_desc='"+data.prd_desc+"', prd_updated_date='"+timestamp+"'  WHERE `prd_id`="+id;
		cPool(res, (connect) =>{
			connect.query(query,(err, rows)=> {
				console.log(err)
				connect.release();
				if(err) return callback(err,'');
				console.log(rows)
				return callback(err,rows);
			});
		});
	},

	loadAllPrds:(req, res, callback) =>{
		cPool(res, (connect) =>{
			connect.query('SELECT * from products ',(err, rows)=> {
				connect.release();
				if(err) return callback(err,'');
				return callback(err,rows);
			});
		});
	},

	getProductInfo:(req, res, callback) =>{
		let query = req.body.query;
		let sqlQuery = "SELECT * FROM products where prd_name like '%"+query+"%' or prd_shortname like '%"+query+"%'";
		cPool(res, (connect) =>{
			connect.query(sqlQuery, (err, rows)=> {
				connect.release();
				if(err) return callback(err,'');
				return callback(err,rows);
			});
		});
	},

	generateInvoice:(req, res, callback) =>{
		let billing_data = req.body;
		let billing_query = "INSERT into billing_details (customer_name,payment_type,received_amount,total_amount) VALUES ('" + billing_data.customer_name + "', '" + billing_data.paymentMethod + "', '" + billing_data.receivedAmount + "', '" + billing_data.totals.totalAmount + "')";

		cPool(res, (connect) =>{
			let bill_number = 0;
			connect.query(billing_query, (err, rows) => {
				if (err) {
					return callback(err,'');
				}
				bill_number = rows.insertId;
				if (bill_number) {
					var product_cart = billing_data.cart;
					for (key in product_cart) {
						let bill_product_query = "INSERT into bill_products (prd_id,bill_id,prd_price,prd_gst,prd_qty,total) VALUES (" + product_cart[key].prd_id + ", " + bill_number + ", '" + product_cart[key].prd_price + "', '" + product_cart[key].totalGST + "', '" + product_cart[key].purchaseQty + "', '" + product_cart[key].totalPrice + "');UPDATE products SET `prd_qty`='"+(product_cart[key].prd_qty - product_cart[key].purchaseQty)+"' WHERE `prd_id`="+product_cart[key].prd_id;
						connect.query(bill_product_query, [1,2], (err, rows) => {
							if (err) {
								return callback(err,'');
							}
							connect.release();
						});
					}
				}
				return callback(err, rows);
			});
		});
	}

	

};

 module.exports=Tasks;