const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

const login = async (req, res) => {
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
            { expiresIn: '200s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '200s' }
        );

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

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden" })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: "Unauthorized" })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}




module.exports = { login, refresh ,logout };