var express = require('express');
var Router = express.Router();
const cPool = require('../config/connectionPool');
const Tasks = require('./tasks');
var jwt = require('jsonwebtoken');
var session ={}

// const isLoggeIn = (req, res) => {
//  if(!session.user_id) {res.status(401).send({message: "Not authorized"}) }
//  else res.status(200).send({...session, message:"Successfully Loggedin",});
// }

// session expires
let sessionExpire = () =>{
    setTimeout( () => {
      session = {}
    }, 1000*50);
}



// Auth check
Router.get('/', (req, res) =>{
  if(session.user_id){
    res.status(200).send({...session, message:"Successfully Loggedin",});
  }else{
    res.status(200).send({code:401,message: "Not authorized"});
  }
});

//Login
Router.post('/login', function(req,res){
  Tasks.signIn(req, res, (err,rows)=>{
    if(err) return res.status(400).send({error:err.code, message:err.sqlMessage});
    if(rows.length <= 0) return res.status(400).send({message:"Invalid Credentials"});
    var token = jwt.sign({ id: rows[0].user_id }, 'heydonttrustme', { 
      expiresIn : 60*60
    });
    session.user_id = rows[0].user_id;
    session.name = rows[0].name;
    session.email = rows[0].email;
    sessionExpire()
    res.setHeader('x-access-token',token)
    res.status(200).send({user_id:rows[0].user_id, name:rows[0].name, email:rows[0].email, message:"Successfully Loggedin", token});
  });
});

//Register user
Router.post('/signup', (req, res) =>{
  Tasks.signUp(req, res, (err,rows)=>{
    if(err) res.status(400).send({message:"Something went wrong"});
    return res.json(rows);
  });
});




// check for auth users 
// Router.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   // decode token
//   if (token) {
//     // verifies secret and checks exp   
//     jwt.verify(token, 'heydonttrustme', function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//     });

//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });

//   }
// });


//Saving Product
Router.post('/saveProduct', (req,res) => {
  Tasks.saveProduct(req, res, (err, rows) =>{
    if(err) return res.status(400).send({message: "Something went wrong"});
    res.status(200).send({message: "Product Added Successfully", prd_id:rows.insertId});
  })
});

//Get All products details
Router.get('/loadAllPrds', (req, res) =>{
  Tasks.loadAllPrds(req, res, (err, rows)=>{
    if(err)return res.status(400).send({message: "Something went wrong"});
    res.status(200).send(rows);
  })
})

//Logout
Router.get('/logout', function(req,res){
 req.session.destroy(function(err) {
    //res.redirect('/hello')
  });
  session = {}
  res.status(200).send({message: "Logout Successfully"});
});

Router.post('/editProduct', function(req, res){
  Tasks.editProduct(req, res, (err, rows)=>{
    if(err)return res.status(400).send({message: "Something went wrong"});
    res.status(200).send(rows);
  })
});

Router.post('/updateProduct', function(req, res){
  Tasks.updateProduct(req, res, (err, rows)=>{
    if(err)return res.status(400).send({message: "Something went wrong"});
    res.status(200).send({message: "Product Updated Successfully", prd_id:rows.insertId});
  })
});

Router.post('/getProductInfo', function(req, res){
  Tasks.getProductInfo(req, res, (err, rows)=>{
    if(err)return res.status(400).send({message: "Something went wrong"});
    res.json(rows);
  })
});

Router.post('/generateInvoice', function(req, res){
  Tasks.generateInvoice(req, res, (err, rows)=>{
    if(err)return res.status(400).send({message: "Something went wrong"});
    res.json(rows);
  })
});

Router.get('/getbillhistory', function(req, res){
  Tasks.getBillHistory(req, res, (err, rows)=>{
    if(err)return res.status(400).send({message: "Something went wrong"});
    res.json(rows);
  })
});

Router.post('/getsinglebillinformation', function(req, res){
  Tasks.getSingleBillInformation(req, res, (err, rows)=>{
    if(err)return res.status(400).send({message: "Something went wrong"});
    res.json(rows);
  })
});
 
 module.exports=Router;
