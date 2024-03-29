const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const diariesRouter = require('./routes/diaries');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

// Load config
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

const whitelist = [
  'https://my-site-diary.netlify.app',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// Routes
app.use('/diaries', diariesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
