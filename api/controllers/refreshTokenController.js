const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401).json({message: 'Unauthorised'});

    const refreshToken = cookies.jwt;

    // res.clearCookie('jwt', { httpOnly: true, SameSite: 'none', secure: true });

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({message: 'Forbidden', error: err})

            const foundUser = await User.findOne({ email: decoded.email }).exec()

            if (!foundUser) return res.status(401).json({message: 'Unauthorised'})

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email,
                        // "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            )

            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }