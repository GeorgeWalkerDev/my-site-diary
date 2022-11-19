const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')

// @desc    Authenticate user
// @route   POST /auth/local
router.post('/local',  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',  
    failureFlash: true
}))


// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/')
    })
  })
  

module.exports = router;