var express = require('express');
var Router = express.Router();
const cPool = require('../config/connectionPool');
const Tasks = require('./tasks');
var jwt = require('jsonwebtoken');


//Register user
Router.post('/signup', (req, res) =>{
  Tasks.signUp(req, res, (err,rows)=>{
    if(err) res.status(400).send({message:"Something went wrong"});
    return res.json(rows);
  });
});

//Login
Router.post('/login', function(req,res){
  Tasks.signIn(req, res, (err,rows)=>{
    if(err) return res.status(400).send({error:err.code, message:err.sqlMessage});
    if(rows.length <= 0) return res.status(400).send({message:"Invalid Credentials"});
    var token = jwt.sign({ id: rows[0].user_id }, 'heydonttrustme', {
      expiresIn: 6000 
    });
    req.session.user = rows[0].user_id;
    res.status(200).send({user_id:rows[0].user_id, name:rows[0].name, email:rows[0].email, message:"Successfully loggeding"});
  });
});

//test
Router.get('/test', function(req,res){
    Tasks.getAllUsers(req, res, (err,rows)=>{
      if(err) return res.status(400).send({message: "Something went wrong"});
      return res.json(rows)
    });
});

//Saving Product
Router.post('/saveProduct', (req,res) => {
  Tasks.saveProduct(req, res, (err, rows) =>{
    if(err) return res.status(400).send({message: "Something went wrong"});
    res.status(200).send({message: "Product Added Successfully"});
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
  res.status(200).send({message: "Logout Successfully"});
});


isLoggeIn = (req, res) => {
 if(!req.session.user) {res.status(401).send({message: "Not authorized"}) }
 else true
}
 
 module.exports=Router;
