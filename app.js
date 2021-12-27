// EXPRESS DEFAULT // 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

 //* MongoDB CONNECTION *//


// DEFAULT ROUTERS //
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//* DOMAIN ROUTERS *//
var stockRouter = require('./routes/stock');
//! Need to implement
// var categoryRouter = require('./routes/category');

//* APP SETUP *//

var app = express();

//* DB CONNECTION *//
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:admin@proyectodual.4q26o.mongodb.net/Rent-a-car?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//* MIDELWARE *//
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stock', stockRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;