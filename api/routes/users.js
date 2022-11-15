const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')

// @desc    Get all users
// @route   GET /users
router.get('/', (req, res) => {
    try {
        res.json(users)
    } catch (error) {
        res.send(error)
    }
})

// @desc    Create user
// @route   POST /users
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        user.password = hash(user.password)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})