const passport = require('passport')

export default authUser = (req, res, next) => {
    if (req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/signin')
    }
}