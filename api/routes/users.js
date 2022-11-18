const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')

// @desc    Get all users
// @route   GET /users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
            .sort({ createdAt: 'desc' })
            .lean()
  
        res.send(users)
      } catch (error) {
          console.error(error)
      }
})

// @desc    Create user
// @route   POST /users
router.post('/', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const user = await User.create(req.body)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})



module.exports = router;