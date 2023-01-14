const express = require('express');
const router = express.Router();
const loginLimiter = require('../middleware/loginLimiter');
const { login, logout, refresh } = require('../controllers/authController');

// @desc    Authenticate user
// @route   POST /auth/signin
router.post('/signin', loginLimiter, login);

// @desc    Authenticate user
// @route   POST /auth/refresh
router.get('/refresh', refresh);

// @desc    Logout user
// @route   /auth/logout
router.post('/logout', logout);

module.exports = router;
