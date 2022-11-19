const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')


function initializePassport(passport) {
    const authenticateUser = (email, password, done) => {
         User.findOne({ email: email }, async (err, user) => {
                if (err) { 
                    return done(err); }
                if (!user) { return done(null, false, { message: 'No user with that email' }); }
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Incorrect password' })
                }
          });
    }
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, authenticateUser))
    passport.serializeUser((user,done) => { done(null, user) })
    passport.deserializeUser((id,done) => { done(null, id) })
}

module.exports = initializePassport