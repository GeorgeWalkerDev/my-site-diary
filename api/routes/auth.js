const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')

// @desc    Authenticate user
// @route   POST /auth/signin
router.post('/signin',  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err
        if (!user) res.send('No user exists')
        else {
            req.logIn(user, (err) => {
                if (err) throw err
                res.send('Successfully authenticated')
                console.log(req.user)
            })
        }
    })(req,res,next)
});


// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/')
    })
  })
  

module.exports = router;