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


app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.get('/', (req, res) => {
    res.render('coba.ejs', {
        title: "Jinx",
    });   
})

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('itsworking')
});