/* Import modules */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/* Import middlewares */
const cors = require('./middlewares/cors');

/* Import routes */
const indexRouter = require('./routes/index');

/* Create app */
const app = express();

/* Configuration */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
