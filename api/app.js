const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser')


const diariesRouter = require('./routes/diaries');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

//Load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session( {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//Initialise passport
const initializePassport = require('./config/passport-config')
initializePassport(passport)

app.use('/api/diaries', diariesRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
