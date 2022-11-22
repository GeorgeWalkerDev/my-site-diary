const express = require('express')
const router = express.Router()
const passport = require('passport')
const loginLimiter = require('../middleware/loginLimiter')
const { handleLogin } = require('../controllers/authController')
const bcrypt = require('bcrypt')

// @desc    Authenticate user
// @route   POST /auth/signin
router.post('/signin', loginLimiter, handleLogin);

// @desc    Authenticate user
// @route   POST /auth/refresh
router.post('/refresh',)



// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/')
    })
  })
  

module.exports = router;