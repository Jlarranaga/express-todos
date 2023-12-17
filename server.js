var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')

//The first argument is the "starts with" path
//the paths within the route modules are appended to the starts with paths  
var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mount middlware - middleware function
app.use(function (req,res,next){ //<-- next callback function
  console.log('Hello')
  //Add a time property to res.locals objects 
  //The time property will then be accessible within templates
  res.locals.time = new Date().toLocaleTimeString()

  next() //<-- need this to keep things flowing. If not the website will stall
})

//log in the terminal the HTTP request info
app.use(logger('dev'));
//processes data sent in the body of the request, if its json
app.use(express.json());
//this processes data sent in the 'form' body of the request
//It will create a property on the req.body for each <input>, <select> and/or <text-area>
//in the <form>
app.use(express.urlencoded({ extended: false }));
//Add a cookies property for each cookie sent in the request
app.use(cookieParser());
//if the request is for a static assest, returns the file 
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'))//<-- for delete function

//The first argument is the "starts with" path
//the paths within the route modules are appended to the starts with paths  
app.use('/', indexRouter);
app.use('/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
