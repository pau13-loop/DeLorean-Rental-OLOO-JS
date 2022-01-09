// EXPRESS DEFAULT // 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');


//* DB CONNECTION *//
var mongoConfig = require('./db/connection/mongoConfig');
mongoConfig.connect();
var db = mongoConfig.mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// ROUTERS //
var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var vehicleRouter = require('./routes/vehicle');
var customerRouter = require('./routes/customer');
var rentalRouter = require('./routes/rental');


//* APP SETUP *//
var app = express();


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// req.body parser from express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//* MIDELWARE *//
app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/vehicle', vehicleRouter);
app.use('/customer', customerRouter);
app.use('/rental', rentalRouter);


// ERROR HANDLING //
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;