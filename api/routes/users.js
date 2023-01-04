const express = require('express')
const router = express.Router()
const { getAllUsers, deleteUser, getUser, handleNewUser  } = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// @desc    Get all users
// @route   GET /users
router.get('/', getAllUsers)

// @desc    Get user
// @route   GET /user/:id
router.get('/:id', getUser)

// @desc    Create user
// @route   POST /users
router.post('/', handleNewUser)

// @desc    Delete user
// @route   DELETE /users
router.delete('/', deleteUser)

// @desc    Update user
// @route   PUT /users
// router.put('/', updateUser)





module.exports = router;