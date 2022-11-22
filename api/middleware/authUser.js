const passport = require('passport')

const authUser = (req, res, next) => {
    if (req.isAuthenticated()){
        return next()
    }
}

module.exports = { authUser }