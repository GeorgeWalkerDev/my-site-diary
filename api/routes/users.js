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

// @desc    Get user
// @route   GET /users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .lean()
  
        res.send(user)
      } catch (error) {
          console.error(error)
      }
})


// @desc    Create user
// @route   POST /users
router.post('/', (req, res) => {
    try {
         User.findOne({email: req.body.email}, async (err, user) => {
            if (err) throw err
            if (user) res.send('User already exists')
            if (!user) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
                const user = await User.create(req.body)
                res.send(user)
            }
        })
    } catch (error) {
        res.send(error)
    }
})



module.exports = router;