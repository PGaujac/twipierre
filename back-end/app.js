if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/* Import modules */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const Mongostore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const package = require('../package.json');
const passport = require('passport');

/* Import middlewares */
const cors = require('./middlewares/cors');

/* Import routes */
const indexRouter = require('./routes/index');

/* Create app */
const app = express();

/* Configuration */
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser('vader'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
var database = process.env.DB || 'mongodb://localhost:27017/' + package.name;
mongoose.connect(database, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  console.log('Database connection error');
});
mongoose.connection.once('open', () => {
  console.log('Connected to database on ' + database);
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new Mongostore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

/* CORS */
app.use(cors.handle);

/* XHR filter */
// app.use((req, res, next) => {
//     if(!req.xhr) {
//         return res.status(405).end();
//     }
//     next();
// });

/* Routes */
app.use('/', indexRouter);

module.exports = app;
