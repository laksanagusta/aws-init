var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require("request");
// const jwt = require('express-jwt');
const session = require('express-session');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
var helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
var request = require("request");
const {authenticateJWT} = require('./middlewares/auth');

//put, delete lib
const methodOverride = require('method-override');
const flash = require('connect-flash');

//authentication
// const { auth, requiresAuth  } = require('express-openid-connect');

//import mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dika:xVimZHGeoRlyHzuh@cluster0.vq7q8.mongodb.net/db_jinx?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//router init
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const bankRouter = require('./routes/bank');
const productRouter = require('./routes/product');
const featureRouter = require('./routes/feature');
const apiRouter = require('./routes/api');

// adding Helmet to enhance your API's security
// app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

// app.get('/', (req, res) => {
//     res.render('coba.ejs', {
//         title: "Jinx",
//     });   
// })

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('itsworking')
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

//admin
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/bank', bankRouter);
app.use('/product', productRouter);
app.use('/feature', featureRouter);
app.use('/api/v1', apiRouter);


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
