var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var getConnection = require('./backend/config/connectionPool')

var app = express();

const Router = require('./backend/routes/router')

app.use(express.static(__dirname + '/app/build'));
app.engine('html', require('ejs').renderFile);
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
  
  //app.use(express.static(path.join(__dirname, 'public')));
  // app.get('/', function (req, res) {
  //   res.sendFile(path.join(__dirname+ '/index.html'));
  // });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    //res.header("Access-Control-Allow-Headers", "origin");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Content-Type", "text/html");
    next();
  });
  

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//******SESSION Handle *//
// app.use(session({
//   cookie: {
//     path    : '/api',
//     httpOnly: false,
//     maxAge  : 24*60*60*1000
//   },
//   secret: '1234567890QWERT',
//   saveUninitialized:false,
//   resave:false
// }));
app.use(session({
  secret: '1234567890QWERT',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    path:"/api",
    maxAge  : 6000,
    sameSite:true
   }
}));

//******SESSION Handle *//
app.use('/api', Router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
