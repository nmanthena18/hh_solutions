var express = require('express');
var Router = express.Router();
const cPool = require('../config/connectionPool');
const Tasks = require('./tasks');
var jwt = require('jsonwebtoken');


//Register user
Router.post('/signup', (req, res) =>{
  Tasks.signUp(req, res, (err,rows)=>{
    if(err) res.status(400).send({error:err.code, message:err.sqlMessage});
    return res.json(rows);
  });
});

//Login
Router.post('/login', function(req,res){
  console.log(req.session)
  Tasks.signIn(req, res, (err,rows)=>{
    if(err) return res.status(400).send({error:err.code, message:err.sqlMessage});
    if(rows.length <= 0) return res.status(400).send({error:"404", message:"Invalid Credentials"});
    var token = jwt.sign({ id: rows[0].user_id }, 'heydonttrustme', {
      expiresIn: 6000 
    });
    req.session = token;
    res.status(200).send({ auth: true, token: token, rows:rows });
  });
});

//test
Router.get('/test', function(req,res){
  //sessionChecker(req.session)
  Tasks.getAllUsers(req, res, (err,rows)=>{
    if(err) return res.status(400).send({error:err.code, message:err.sqlMessage});
    return res.json(rows)
  });
});


//Logout
Router.post('/logout', function(req,res){
  Tasks.logOut(req, res, (err,rows)=>{
    res.status(200).send({ auth: false, token: null });
  });
});


sessionChecker = (session) =>{
  if(session.email) return true;
}

 
 module.exports=Router;
