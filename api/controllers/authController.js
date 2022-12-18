const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ email: email }).exec();

    if (!foundUser) return res.sendStatus(401); //Unauthorized

    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        // const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    // "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '60s' }
        );

        // Changed to let keyword
        // let newRefreshTokenArray =
        //     !cookies?.jwt
        //         ? foundUser.refreshToken
        //         : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        // if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
        //     const refreshToken = cookies.jwt;
        //     const foundToken = await User.findOne({ refreshToken }).exec();

        //     // Detected refresh token reuse!
        //     if (!foundToken) {
        //         // clear out ALL previous refresh tokens
        //         newRefreshTokenArray = [];
        //     }

        //     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        // }

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, SameSite: 'none', expiresIn: '1d'});

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = { handleLogin };