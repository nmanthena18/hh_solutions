var express = require('express');
var Router = express.Router();
const cPool = require('../config/connectionPool');
const Tasks = require('./tasks')
Router.get('/test', function(req,res){
  Tasks.getAllUsers(res, (err,rows)=>{
    return res.json(rows);
  });
});

//Register user
Router.post('/signup', (req, res) =>{
  Tasks.signUp(res, (err,rows)=>{
    return res.json(rows);
  });
}

)
 
 module.exports=Router;
