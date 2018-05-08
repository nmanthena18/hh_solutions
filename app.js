var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var getConnection = require('./backend/config/connectionPool')

var app = express();

const Router = require('./backend/routes/router')

//app.use(express.static(__dirname + '/app/build'));
// app.use(express.static(__dirname + '/public'));
// app.engine('html', require('ejs').renderFile);
// app.get('/', function (req, res) {
  //   res.sendFile('index.html');
  // });
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+ '/index.html'));
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//******SESSION Handle *//
app.use(session({
  key: 'user_sid',
  secret: 'shhhhh',
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: 6000
  }
}));
//******SESSION Handle *//

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', Router);
// app.use('/', index);
// app.use('/users', users);



// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//       res.clearCookie('user_sid');        
//   }
//   next();
// });
//******SESSION Handle *//

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
