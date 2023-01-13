const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const { getAllDiaries, getDiary, addDiary, updateDiary, deleteDiary } = require('../controllers/diariesController')

router.use(verifyJWT)

// @desc    Show all diaries
// @route   GET /diaries
router.get('/', getAllDiaries);

// @desc    Show single diary
// @route   GET /diaries/:id
router.get('/:id', getDiary)

// @desc    Process add form
// @route   POST /diaries
router.post('/', addDiary)

// @desc    Update diary
// @route   PATCH /diaries/:id
router.patch('/', updateDiary)

// @desc    Delete diary
// @route   DELETE /diaries/:id
router.delete('/', deleteDiary)

module.exports = router;